(function () {
  'use strict';

  var STORAGE_KEY = 'the-last-two:v5';
  var LEGACY_STORAGE_KEYS = ['the-last-two:v4', 'the-last-two:v3', 'the-last-two:v2'];
  var MAX_HISTORY = 40;
  var RUN_MODIFIERS = [
    { id: 'clear', title: 'Cielo despejado', text: 'Esta noche podéis confiar un poco más en lo que veis.', effects: { luck: 10, morale: 4 } },
    { id: 'rush', title: 'Sin tiempo', text: 'El margen es menor. Algunas decisiones tendrán que llegar antes.', effects: { energy: -8, luck: 6 } },
    { id: 'thin', title: 'Poco margen', text: 'Empezáis con menos recursos y más necesidad de cuidar cada uno.', effects: { water: -1, food: -1, trust: 6 } },
    { id: 'ready', title: 'Bien preparados', text: 'Algo salió bien antes de empezar: lleváis una pequeña reserva extra.', effects: { water: 1, food: 1, morale: 3, energy: -3 } }
  ];

  function isFiniteNumber(value) {
    return typeof value === 'number' && isFinite(value);
  }

  function clamp(n, min, max) {
    var value = Number(n);
    if (!isFiniteNumber(value)) value = min == null ? 0 : min;
    if (min == null) min = 0;
    if (max == null) max = 100;
    return Math.max(min, Math.min(max, value));
  }

  function copyStats(start) {
    var result = {};
    var key;
    start = start || {};
    for (key in start) {
      if (Object.prototype.hasOwnProperty.call(start, key)) result[key] = start[key];
    }
    return result;
  }

  function makeDefaultStore() {
    return { settings: { sound: true, theme: 'dark' }, history: [], achievements: [], version: 5 };
  }

  function normalizeStore(parsed) {
    var base = makeDefaultStore();
    var theme = parsed && parsed.settings && (parsed.settings.theme === 'light' || parsed.settings.theme === 'dark') ? parsed.settings.theme : 'dark';
    var history = parsed && parsed.history;
    var achievements = parsed && parsed.achievements;
    base.settings.sound = !(parsed && parsed.settings && parsed.settings.sound === false);
    base.settings.theme = theme;
    base.history = history && typeof history.length === 'number' ? history.slice(0, MAX_HISTORY) : [];
    base.achievements = achievements && typeof achievements.length === 'number' ? achievements.slice(0) : [];
    return base;
  }

  function safeStore() {
    var raw = null;
    var i;
    try {
      if (window.localStorage) raw = localStorage.getItem(STORAGE_KEY);
      if (!raw && window.localStorage) {
        for (i = 0; i < LEGACY_STORAGE_KEYS.length && !raw; i += 1) raw = localStorage.getItem(LEGACY_STORAGE_KEYS[i]);
      }
      if (!raw) return makeDefaultStore();
      return normalizeStore(JSON.parse(raw) || {});
    } catch (e) {
      return makeDefaultStore();
    }
  }

  function saveStore(store) {
    try {
      if (window.localStorage) localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeStore(store)));
    } catch (e) {}
  }

  function makeSeed() {
    return ((new Date().getTime() ^ Math.floor(Math.random() * 2147483647)) >>> 0);
  }

  function random01(game) {
    game.seed = (1664525 * game.seed + 1013904223) >>> 0;
    return game.seed / 4294967296;
  }

  function initialGame(scenario, p1, p2) {
    var seed = makeSeed();
    var modifier = RUN_MODIFIERS[seed % RUN_MODIFIERS.length];
    var game = {
      scenarioId: scenario.id,
      players: [p1 || 'JUGADOR 01', p2 || 'JUGADOR 02'],
      stats: copyStats(scenario.start),
      round: 0,
      totalRounds: Number(scenario.totalRounds || GAME_DATA.totalRounds || 18),
      currentScenarioEvents: scenario.events && scenario.events.length ? scenario.events.length : 20,
      score: 46,
      choices: [],
      history: [],
      secretPending: null,
      tags: [],
      seed: seed,
      modifier: modifier,
      startedAt: new Date().getTime(),
      ended: false,
      currentEvent: null
    };
    applyEffects(game, modifier.effects, []);
    game.score = clamp(game.score - 2, 0, 100);
    return game;
  }

  function appendArray(target, values) {
    var i;
    if (!values) return;
    for (i = 0; i < values.length; i += 1) target.push(values[i]);
  }

  function applyEffects(game, effects, tags) {
    var statKeys = ['health', 'water', 'food', 'energy', 'morale', 'trust', 'luck'];
    var i, key, max, delta;
    effects = effects || {};
    tags = tags || [];
    for (i = 0; i < statKeys.length; i += 1) {
      key = statKeys[i];
      if (effects[key] !== undefined) {
        max = (key === 'water' || key === 'food') ? 8 : 100;
        game.stats[key] = clamp(game.stats[key] + Number(effects[key]), 0, max);
      }
    }
    delta = (effects.health || 0) * 0.55 + (effects.energy || 0) * 0.15 + (effects.morale || 0) * 0.2 + (effects.trust || 0) * 0.25 + (effects.luck || 0) * 0.12;
    game.score = clamp(game.score + delta, 0, 100);
    appendArray(game.tags, tags);
  }

  function resolveSecret(game, choiceA, choiceB) {
    var same = choiceA.id === choiceB.id;
    var combined = {};
    var choices = [choiceA, choiceB];
    var i, key, effects, value;
    for (i = 0; i < choices.length; i += 1) {
      effects = choices[i].effects || {};
      for (key in effects) {
        if (Object.prototype.hasOwnProperty.call(effects, key)) {
          value = Number(effects[key]);
          combined[key] = (combined[key] || 0) + value;
        }
      }
    }
    if (same) {
      combined.trust = (combined.trust || 0) + 6;
      combined.morale = (combined.morale || 0) + 4;
      game.score = clamp(game.score + 6);
    } else {
      combined.trust = (combined.trust || 0) - 1;
      game.score = clamp(game.score + 1);
    }
    var combinedTags = [];
    appendArray(combinedTags, choiceA.tags || []);
    appendArray(combinedTags, choiceB.tags || []);
    applyEffects(game, combined, combinedTags);
    return { same: same, combined: combined };
  }

  function containsId(list, id) {
    var i;
    for (i = 0; i < list.length; i += 1) if (list[i] === id) return true;
    return false;
  }

  function filterEvents(events, callback) {
    var result = [], i;
    for (i = 0; i < events.length; i += 1) if (callback(events[i], i)) result.push(events[i]);
    return result;
  }

  function pickEvent(scenario, game) {
    var used = [], i, targetAct, remaining, nonSecret;
    for (i = 0; i < game.history.length; i += 1) used.push(game.history[i].eventId);
    var actPlan = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5];
    targetAct = actPlan[Math.min(game.round, actPlan.length - 1)] || 5;
    remaining = filterEvents(scenario.events, function (event) { return event.act === targetAct && !containsId(used, event.id); });
    if (!remaining.length) remaining = filterEvents(scenario.events, function (event) { return !containsId(used, event.id); });
    if (!remaining.length) remaining = scenario.events.slice(0);
    if (game.currentEvent && game.currentEvent.type === 'secret' && remaining.length > 1) {
      nonSecret = filterEvents(remaining, function (event) { return event.type !== 'secret'; });
      if (nonSecret.length) remaining = nonSecret;
    }
    return remaining[Math.floor(random01(game) * remaining.length)];
  }

  function filterArray(list, callback) {
    var result = [], i;
    for (i = 0; i < list.length; i += 1) if (callback(list[i], i)) result.push(list[i]);
    return result;
  }

  function scoreGame(game) {
    var s = game.stats;
    var resourceScore = clamp((s.health + s.energy + s.morale + s.trust + s.luck) / 5);
    var survivalPenalty = (s.water <= 0 ? 7 : 0) + (s.food <= 0 ? 4 : 0);
    var privateChoices = filterArray(game.choices, function (choice) { return choice.same !== null; });
    var alignedChoices = filterArray(privateChoices, function (choice) { return choice.same === true; });
    var alignment = privateChoices.length ? (alignedChoices.length / privateChoices.length) * 4 : 0;
    return clamp(Math.round((game.score * 0.46) + (resourceScore * 0.50) + alignment - survivalPenalty));
  }

  function getEnding(scenario, finalScore) {
    var endings = scenario.endings.slice(0);
    var i, ending;
    endings.sort(function (a, b) { return b.minScore - a.minScore; });
    for (i = 0; i < endings.length; i += 1) {
      ending = endings[i];
      if (finalScore >= ending.minScore) return ending;
    }
    return endings[endings.length - 1];
  }

  function countTag(tags, allowed) {
    var count = 0, i, j;
    for (i = 0; i < tags.length; i += 1) {
      for (j = 0; j < allowed.length; j += 1) {
        if (tags[i] === allowed[j]) { count += 1; break; }
      }
    }
    return count;
  }

  function deriveReview(game, finalScore) {
    var privateChoices = filterArray(game.choices, function (choice) { return choice.same !== null; });
    var sameChoices = filterArray(privateChoices, function (choice) { return choice.same === true; });
    var differentChoices = filterArray(privateChoices, function (choice) { return choice.same === false; });
    var risk = countTag(game.tags, ['risk', 'chaos', 'brave']);
    var kindness = countTag(game.tags, ['kind', 'empathy', 'team', 'humble']);
    var selfish = countTag(game.tags, ['selfish', 'hard']);
    var sortedChoices = game.choices.slice(0);
    sortedChoices.sort(function (a, b) { return Math.abs((b.impact || 0)) - Math.abs((a.impact || 0)); });
    var biggest = sortedChoices.length ? sortedChoices[0] : null;
    var dynamic = 'LOS DOS SUPERVIVIENTES';
    var reviewLine = 'Habéis sobrevivido adaptándoos cuando el plan dejó de funcionar.';

    if (risk >= 4 && kindness >= 2) dynamic = 'CORAZÓN VALIENTE';
    else if (risk >= 4) dynamic = 'DÚO CAÓTICO';
    else if (kindness >= 3 && game.stats.trust >= 75) dynamic = 'DOS EN UNA LÍNEA';
    else if (selfish >= 2) dynamic = 'INSTINTO SALVAJE';
    else if (sameChoices.length > differentChoices.length && sameChoices.length >= 2) dynamic = 'MISMA CABEZA';
    else if (differentChoices.length >= 3) dynamic = 'INSTINTOS OPUESTOS';

    if (game.stats.trust >= 82) reviewLine = 'Vuestra mejor herramienta fue la confianza: seguisteis decidiendo como un equipo.';
    else if (game.stats.trust <= 42) reviewLine = 'El escenario solo era la mitad del problema. Vuestros instintos tiraban en direcciones distintas.';
    else if (game.stats.luck >= 80) reviewLine = 'Os habéis librado de alguna decisión dudosa. La suerte estaba de vuestro lado.';
    else if (game.stats.morale <= 35) reviewLine = 'La noche pesó. Sobrevivisteis más por insistencia que por optimismo.';

    return {
      dynamic: dynamic,
      reviewLine: reviewLine,
      sameCount: sameChoices.length,
      differentCount: differentChoices.length,
      privateCount: privateChoices.length,
      riskCount: risk,
      kindnessCount: kindness,
      selfishCount: selfish,
      biggest: biggest,
      finalScore: finalScore,
      eventsSeen: game.history.length,
      eventsAvailable: game.currentScenarioEvents || 20,
      eventsRemaining: Math.max(0, (game.currentScenarioEvents || 20) - game.history.length)
    };
  }

  function hasId(list, id) {
    var i; for (i = 0; i < list.length; i += 1) if (list[i] === id) return true; return false;
  }

  function unlockAchievements(store, game, review, finalScore) {
    var ids = store.achievements ? store.achievements.slice(0) : [];
    function add(id) { if (!hasId(ids, id)) ids.push(id); }
    if (finalScore >= 80) add('legend');
    if (game.round >= 18) add('eighteen-rounds');
    if (review.sameCount >= 2) add('same-brain');
    if (review.differentCount >= 2) add('different-brains');
    if (finalScore < 45) add('chaos');
    if (review.selfishCount >= 2) add('questionable');
    if (review.riskCount >= 4) add('adrenaline');
    if (review.kindnessCount >= 3) add('softies');
    if (game.stats.trust >= 90) add('unbreakable');
    store.achievements = ids;
  }

  function safeHistory(store, entry) {
    store.history.unshift(entry);
    store.history = store.history.slice(0, MAX_HISTORY);
  }

  window.LAST_TWO_ENGINE = {
    STORAGE_KEY: STORAGE_KEY,
    clamp: clamp,
    loadStore: safeStore,
    saveStore: saveStore,
    initialGame: initialGame,
    applyEffects: applyEffects,
    RUN_MODIFIERS: RUN_MODIFIERS,
    resolveSecret: resolveSecret,
    pickEvent: pickEvent,
    scoreGame: scoreGame,
    getEnding: getEnding,
    deriveReview: deriveReview,
    unlockAchievements: unlockAchievements,
    safeHistory: safeHistory
  };
}());
