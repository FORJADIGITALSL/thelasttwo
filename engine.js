const STORAGE_KEY = 'the-last-two:v4';
const LEGACY_STORAGE_KEYS = ['the-last-two:v3', 'the-last-two:v2'];
const MAX_HISTORY = 40;
const RUN_MODIFIERS = [
  { id: 'clear', title: 'Cielo despejado', text: 'Esta noche podéis confiar un poco más en lo que veis.', effects: { luck: 10, morale: 4 } },
  { id: 'rush', title: 'Sin tiempo', text: 'El margen es menor. Algunas decisiones tendrán que llegar antes.', effects: { energy: -8, luck: 6 } },
  { id: 'thin', title: 'Poco margen', text: 'Empezáis con menos recursos y más necesidad de cuidar cada uno.', effects: { water: -1, food: -1, trust: 6 } },
  { id: 'ready', title: 'Bien preparados', text: 'Algo salió bien antes de empezar: lleváis una pequeña reserva extra.', effects: { water: 1, food: 1, morale: 3, energy: -3 } }
];

function clamp(n, min = 0, max = 100) {
  const value = Number(n);
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

function makeDefaultStore() {
  return { settings: { sound: true, theme: 'dark' }, history: [], achievements: [], version: 3 };
}

function normalizeStore(parsed) {
  const base = makeDefaultStore();
  const theme = parsed && parsed.settings && (parsed.settings.theme === 'light' || parsed.settings.theme === 'dark') ? parsed.settings.theme : 'dark';
  base.settings.sound = !(parsed && parsed.settings && parsed.settings.sound === false);
  base.settings.theme = theme;
  base.history = Array.isArray(parsed && parsed.history) ? parsed.history.slice(0, MAX_HISTORY) : [];
  base.achievements = Array.isArray(parsed && parsed.achievements) ? parsed.achievements : [];
  return base;
}

function safeStore() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      for (let i = 0; i < LEGACY_STORAGE_KEYS.length && !raw; i += 1) raw = localStorage.getItem(LEGACY_STORAGE_KEYS[i]);
    }
    if (!raw) return makeDefaultStore();
    return normalizeStore(JSON.parse(raw) || {});
  } catch (_) {
    return makeDefaultStore();
  }
}

function saveStore(store) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeStore(store))); } catch (_) {}
}

function makeSeed() {
  return (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
}

function random01(game) {
  game.seed = (1664525 * game.seed + 1013904223) >>> 0;
  return game.seed / 4294967296;
}

function initialGame(scenario, p1, p2) {
  const seed = makeSeed();
  const modifier = RUN_MODIFIERS[seed % RUN_MODIFIERS.length];
  const game = {
    scenarioId: scenario.id,
    players: [p1 || 'JUGADOR 01', p2 || 'JUGADOR 02'],
    stats: { ...scenario.start },
    round: 0,
    totalRounds: Number(scenario.totalRounds || GAME_DATA.totalRounds || 18),
    currentScenarioEvents: Array.isArray(scenario.events) ? scenario.events.length : 20,
    score: 46,
    choices: [],
    history: [],
    secretPending: null,
    tags: [],
    seed,
    modifier,
    startedAt: Date.now(),
    ended: false,
    currentEvent: null
  };
  applyEffects(game, modifier.effects, []);
  game.score = clamp(game.score - 2, 0, 100);
  return game;
}

function applyEffects(game, effects = {}, tags = []) {
  const statKeys = ['health', 'water', 'food', 'energy', 'morale', 'trust', 'luck'];
  statKeys.forEach(function (key) {
    if (effects[key] !== undefined) {
      const max = key === 'water' || key === 'food' ? 8 : 100;
      game.stats[key] = clamp(game.stats[key] + Number(effects[key]), 0, max);
    }
  });
  const delta = (effects.health || 0) * 0.55
    + (effects.energy || 0) * 0.15
    + (effects.morale || 0) * 0.2
    + (effects.trust || 0) * 0.25
    + (effects.luck || 0) * 0.12;
  game.score = clamp(game.score + delta, 0, 100);
  game.tags.push(...tags);
}

function resolveSecret(game, choiceA, choiceB) {
  const same = choiceA.id === choiceB.id;
  const combined = {};
  [choiceA, choiceB].forEach(function (choice) {
    Object.keys(choice.effects || {}).forEach(function (key) {
      combined[key] = (combined[key] || 0) + Number(choice.effects[key]);
    });
  });
  if (same) {
    combined.trust = (combined.trust || 0) + 6;
    combined.morale = (combined.morale || 0) + 4;
    game.score = clamp(game.score + 6);
  } else {
    combined.trust = (combined.trust || 0) - 1;
    game.score = clamp(game.score + 1);
  }
  applyEffects(game, combined, [...(choiceA.tags || []), ...(choiceB.tags || [])]);
  return { same, combined };
}

function pickEvent(scenario, game) {
  const used = game.history.map(function (item) { return item.eventId; });
  const actPlan = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5];
  const targetAct = actPlan[Math.min(game.round, actPlan.length - 1)] || 5;
  let remaining = scenario.events.filter(function (event) {
    return event.act === targetAct && used.indexOf(event.id) === -1;
  });
  if (!remaining.length) {
    remaining = scenario.events.filter(function (event) { return used.indexOf(event.id) === -1; });
  }
  if (!remaining.length) remaining = scenario.events.slice();
  if (game.currentEvent && game.currentEvent.type === 'secret' && remaining.length > 1) {
    const nonSecret = remaining.filter(function (event) { return event.type !== 'secret'; });
    if (nonSecret.length) remaining = nonSecret;
  }
  return remaining[Math.floor(random01(game) * remaining.length)];
}

function scoreGame(game) {
  const s = game.stats;
  const resourceScore = clamp((s.health + s.energy + s.morale + s.trust + s.luck) / 5);
  const survivalPenalty = (s.water <= 0 ? 7 : 0) + (s.food <= 0 ? 4 : 0);
  const privateCount = game.choices.filter(function (choice) { return choice.same !== null; }).length;
  const alignment = privateCount ? (game.choices.filter(function (choice) { return choice.same === true; }).length / privateCount) * 4 : 0;
  return clamp(Math.round((game.score * 0.46) + (resourceScore * 0.50) + alignment - survivalPenalty));
}

function getEnding(scenario, finalScore) {
  const sorted = scenario.endings.slice().sort(function (a, b) { return b.minScore - a.minScore; });
  return sorted.find(function (ending) { return finalScore >= ending.minScore; }) || sorted[sorted.length - 1];
}

function deriveReview(game, finalScore) {
  const privateChoices = game.choices.filter(function (choice) { return choice.same !== null; });
  const sameCount = privateChoices.filter(function (choice) { return choice.same === true; }).length;
  const differentCount = privateChoices.filter(function (choice) { return choice.same === false; }).length;
  const risk = game.tags.filter(function (tag) { return ['risk', 'chaos', 'brave'].indexOf(tag) !== -1; }).length;
  const kindness = game.tags.filter(function (tag) { return ['kind', 'empathy', 'team', 'humble'].indexOf(tag) !== -1; }).length;
  const selfish = game.tags.filter(function (tag) { return ['selfish', 'hard'].indexOf(tag) !== -1; }).length;
  const biggest = game.choices.slice().sort(function (a, b) { return Math.abs((b.impact || 0)) - Math.abs((a.impact || 0)); })[0];
  let dynamic = 'LOS DOS SUPERVIVIENTES';
  if (risk >= 4 && kindness >= 2) dynamic = 'CORAZÓN VALIENTE';
  else if (risk >= 4) dynamic = 'DÚO CAÓTICO';
  else if (kindness >= 3 && game.stats.trust >= 75) dynamic = 'DOS EN UNA LÍNEA';
  else if (selfish >= 2) dynamic = 'INSTINTO SALVAJE';
  else if (sameCount > differentCount && sameCount >= 2) dynamic = 'MISMA CABEZA';
  else if (differentCount >= 3) dynamic = 'INSTINTOS OPUESTOS';

  let reviewLine = 'Habéis sobrevivido adaptándoos cuando el plan dejó de funcionar.';
  if (game.stats.trust >= 82) reviewLine = 'Vuestra mejor herramienta fue la confianza: seguisteis decidiendo como un equipo.';
  else if (game.stats.trust <= 42) reviewLine = 'El escenario solo era la mitad del problema. Vuestros instintos tiraban en direcciones distintas.';
  else if (game.stats.luck >= 80) reviewLine = 'Os habéis librado de alguna decisión dudosa. La suerte estaba de vuestro lado.';
  else if (game.stats.morale <= 35) reviewLine = 'La noche pesó. Sobrevivisteis más por insistencia que por optimismo.';

  return { dynamic, reviewLine, sameCount, differentCount, privateCount: privateChoices.length, riskCount: risk, kindnessCount: kindness, selfishCount: selfish, biggest, finalScore, eventsSeen: game.history.length, eventsAvailable: game.currentScenarioEvents || 20, eventsRemaining: Math.max(0, (game.currentScenarioEvents || 20) - game.history.length) };
}

function unlockAchievements(store, game, review, finalScore) {
  const ids = new Set(store.achievements);
  if (finalScore >= 80) ids.add('legend');
  if (game.round >= 18) ids.add('eighteen-rounds');
  if (review.sameCount >= 2) ids.add('same-brain');
  if (review.differentCount >= 2) ids.add('different-brains');
  if (finalScore < 45) ids.add('chaos');
  if (review.selfishCount >= 2) ids.add('questionable');
  if (review.riskCount >= 4) ids.add('adrenaline');
  if (review.kindnessCount >= 3) ids.add('softies');
  if (game.stats.trust >= 90) ids.add('unbreakable');
  store.achievements = [...ids];
}

function safeHistory(store, entry) {
  store.history.unshift(entry);
  store.history = store.history.slice(0, MAX_HISTORY);
}

window.LAST_TWO_ENGINE = {
  STORAGE_KEY, clamp, loadStore: safeStore, saveStore, initialGame, applyEffects, RUN_MODIFIERS,
  resolveSecret, pickEvent, scoreGame, getEnding, deriveReview, unlockAchievements, safeHistory
};
