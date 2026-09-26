(function () {
  'use strict';

  const root = document.getElementById('app');
  const screen = document.getElementById('screen');
  const homeBtn = document.getElementById('homeBtn');
  const soundBtn = document.getElementById('soundBtn');
  const soundState = document.getElementById('soundState');
  const soundIcon = document.getElementById('soundIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const fullscreenLabel = document.getElementById('fullscreenLabel');
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const sessionPill = document.getElementById('sessionPill');
  const toast = document.getElementById('toast');

  let store = LAST_TWO_ENGINE.loadStore();
  let game = null;
  let route = 'home';
  let audioCtx = null;
  let currentFocusIndex = 0;
  let currentChoices = [];

  const achievementMeta = {
    legend: ['01', 'EXTRAORDINARIO', 'Termina una noche con 80 puntos o más.'],
    'eighteen-rounds': ['18', 'DIECIOCHO RONDAS', 'Completa las dieciocho decisiones de una noche.'],
    'same-brain': ['≈', 'MISMA CABEZA', 'Coincidid en secreto al menos dos veces.'],
    'different-brains': ['≠', 'INSTINTOS OPUESTOS', 'Discrepad en secreto al menos dos veces.'],
    chaos: ['!', 'CAOS', 'Sobrevive una noche al límite.'],
    questionable: ['02', 'DECISIONES DUDOSAS', 'Toma dos decisiones de corte egoísta.'],
    adrenaline: ['04', 'ADRENALINA', 'Acumula cuatro decisiones arriesgadas.'],
    softies: ['03', 'CORAZÓN', 'Toma tres decisiones de cuidado o equipo.'],
    unbreakable: ['90', 'IRROMPIBLES', 'Termina con 90 puntos de confianza o más.']
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch];
    });
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (_) { return ''; }
  }

  function icon(name) { return LAST_TWO_ART.actionIcon(name); }

  function setTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.settings.theme = next;
    LAST_TWO_ENGINE.saveStore(store);
    themeLabel.textContent = next === 'dark' ? 'CLARO' : 'OSCURO';
    themeIcon.innerHTML = icon(next === 'dark' ? 'sun' : 'moon');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#121210' : '#ede7dc');
  }

  function toggleTheme() { setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }

  function updateSoundUI() {
    soundState.textContent = store.settings.sound ? 'SONIDO' : 'SILENCIO';
    soundIcon.innerHTML = icon(store.settings.sound ? 'volume' : 'volumeOff');
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { toast.classList.remove('show'); }, 2100);
  }

  function setScreen(html, title) {
    screen.innerHTML = html;
    if (title) document.title = title + ' · The Last Two';
    currentFocusIndex = 0;
    currentChoices = Array.prototype.slice.call(screen.querySelectorAll('[data-focusable]')).concat([themeBtn, soundBtn, fullscreenBtn, homeBtn]);
    focusCurrent();
  }

  function focusCurrent() {
    if (!currentChoices.length) return;
    currentFocusIndex = Math.max(0, Math.min(currentFocusIndex, currentChoices.length - 1));
    currentChoices.forEach(function (el, i) { el.classList.toggle('remote-focus', i === currentFocusIndex); });
    const el = currentChoices[currentFocusIndex];
    try { el.focus({ preventScroll: true }); } catch (_) { try { el.focus(); } catch (e) {} }
  }

  function moveFocus(delta) {
    if (!currentChoices.length) return;
    currentFocusIndex = (currentFocusIndex + delta + currentChoices.length) % currentChoices.length;
    focusCurrent();
  }

  function activateFocused() {
    const el = currentChoices[currentFocusIndex];
    if (!el || el.disabled) return;
    if (el.tagName === 'INPUT') return;
    el.click();
  }

  function makeAudioContext() {
    if (audioCtx) return audioCtx;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      audioCtx = new AudioCtor();
      return audioCtx;
    } catch (_) { return null; }
  }

  function playTone(type) {
    if (!store.settings.sound) return;
    const ctx = makeAudioContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime;
      const presets = {
        tap: [220, .045],
        move: [130, .026],
        reveal: [110, .26],
        success: [320, .2],
        fail: [76, .24]
      };
      const preset = presets[type] || presets.tap;
      osc.frequency.setValueAtTime(preset[0], now);
      if (type === 'reveal') osc.frequency.exponentialRampToValueAtTime(180, now + preset[1]);
      if (type === 'success') osc.frequency.exponentialRampToValueAtTime(640, now + preset[1]);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.045, now + .008);
      gain.gain.exponentialRampToValueAtTime(.0001, now + preset[1]);
      osc.start(now);
      osc.stop(now + preset[1] + .02);
    } catch (_) {}
  }

  function scenarioById(id) { return GAME_DATA.scenarios.find(function (s) { return s.id === id; }); }
  function scenarioArt(scenario, extraClass) { return `<div class="art-frame ${extraClass || ''}">${LAST_TWO_ART.marks(scenario.id)}</div>`; }
  function buttonArrow() { return `<span class="button-icon-right">${icon('arrow')}</span>`; }

  function renderHome() {
    route = 'home'; game = null; sessionPill.classList.add('hidden');
    const best = store.history.length ? Math.max.apply(null, store.history.map(function (h) { return h.score; })) : null;
    setScreen(`
      <section class="hero home-screen">
        <div class="hero-copy">
          <div class="eyebrow">UNA NOCHE INTERACTIVA PARA DOS</div>
          <h1>THE<br><span class="outline">LAST TWO</span></h1>
          <p class="hero-sub">Una televisión. Un mando. Dos instintos. Dieciocho decisiones. Una historia de 60–75 minutos que cambia cada vez.</p>
          <div class="home-actions">
            <button class="primary-button" data-focusable data-action="start">EMPEZAR LA NOCHE ${buttonArrow()}</button>
            <button class="secondary-button" data-focusable data-action="history">EL ARCHIVO</button>
          </div>
          <div class="home-meta">
            <span>${GAME_DATA.scenarios.length} mundos</span>
            <span>60–75 min por noche</span>
            <span>${best == null ? 'Primera noche' : 'Mejor ' + best + '/100'}</span>
            <span>Guardado en esta TV</span>
          </div>
          <p class="remote-tip">MANDO · <strong>↑ ↓ ← →</strong> mover · <strong>OK</strong> elegir · <strong>ATRÁS</strong> volver · <strong>F</strong> pantalla</p>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="art-frame">${LAST_TWO_ART.hero()}</div>
          <div class="art-tag"><span>02</span><b>Una noche para repetir</b></div>
        </div>
      </section>
    `, 'Inicio');
    bindActions();
  }

  function renderScenarioSelect() {
    route = 'scenarios';
    const cards = GAME_DATA.scenarios.map(function (s, i) {
      const previous = store.history.filter(function (h) { return h.scenarioId === s.id; });
      const best = previous.length ? Math.max.apply(null, previous.map(function (h) { return h.score; })) : null;
      return `<button class="scenario-card accent-${esc(s.accent)}" data-focusable data-action="scenario" data-scenario="${esc(s.id)}">
        <div class="scenario-copy">
          <div>
            <span class="scenario-number">${('0' + (i + 1)).slice(-2)}</span>
            <div class="scenario-eyebrow">${esc(s.eyebrow)}</div>
            <strong>${esc(s.title)}</strong>
            <small>${esc(s.subtitle)}</small>
            <div class="scenario-descriptor">${esc(s.descriptor)}</div>
            <div class="scenario-duration">${esc(s.estimatedMinutes || '60–75 min')} · ${s.events.length} escenas posibles</div>
          </div>
          <span class="scenario-best">${best == null ? 'NUEVO' : 'MEJOR ' + best}</span>
        </div>
        <div class="scenario-art">${LAST_TWO_ART.marks(s.id)}</div>
      </button>`;
    }).join('');
    setScreen(`
      <section class="scenario-screen">
        <div class="section-heading">
          <div><div class="eyebrow">ELIGE VUESTRO MUNDO</div><h2>¿Dónde queréis sobrevivir?</h2><p class="section-lede">Cada escenario es una historia breve con eventos distintos en cada partida. No necesitáis aprender reglas: solo decidir.</p></div>
          <div class="section-meta">${GAME_DATA.scenarios.length} MUNDOS · 18 RONDAS · 60–75 MIN</div>
        </div>
        <div class="scenario-grid">${cards}</div>
        <button class="text-button" data-focusable data-action="back-home">${icon('back')} VOLVER</button>
      </section>
    `, 'Elegir escenario');
    bindActions();
  }

  function renderSetup(scenarioId) {
    const scenario = scenarioById(scenarioId);
    if (!scenario) return renderScenarioSelect();
    route = 'setup';
    setScreen(`
      <section class="setup-screen accent-${esc(scenario.accent)}">
        <div class="setup-layout">
          <div class="setup-art">${LAST_TWO_ART.marks(scenario.id)}</div>
          <div>
            <div class="eyebrow">${esc(scenario.eyebrow)}</div>
            <div class="setup-heading">
              <h2>${esc(scenario.title)}</h2>
              <p>${esc(scenario.subtitle)}</p>
            </div>
            <div class="player-grid">
              <label class="player-field"><span>PERSONA 01</span><input data-focusable id="p1" maxlength="16" value="JUGADOR 01" autocomplete="off" inputmode="text" aria-label="Nombre de la primera persona"></label>
              <div class="versus">Y</div>
              <label class="player-field"><span>PERSONA 02</span><input data-focusable id="p2" maxlength="16" value="JUGADOR 02" autocomplete="off" inputmode="text" aria-label="Nombre de la segunda persona"></label>
            </div>
            <div class="setup-actions">
              <button class="primary-button" data-focusable data-action="begin" data-scenario="${esc(scenario.id)}">ENTRAR EN LA NOCHE ${buttonArrow()}</button>
              <button class="secondary-button" data-focusable data-action="back-scenarios">ATRÁS</button>
            </div>
            <p class="remote-tip">Los nombres son opcionales. Podéis jugar solo con el mando.</p>
          </div>
        </div>
      </section>
    `, scenario.title);
    bindActions();
  }

  function renderIntro() {
    const scenario = scenarioById(game.scenarioId);
    route = 'intro';
    setScreen(`
      <section class="intro-screen accent-${esc(scenario.accent)}">
        <div class="intro-center">
          <div class="intro-index">NOCHE 01 · ${game.totalRounds} RONDAS</div>
          <div class="intro-art">${LAST_TWO_ART.marks(scenario.id)}</div>
          <div class="eyebrow">${esc(scenario.eyebrow)}</div>
          <h2>${esc(scenario.title)}</h2>
          <div class="intro-lines">${scenario.intro.map(function (line, i) { return `<p class="intro-line" style="--delay:${i * 160}ms">${esc(line)}</p>`; }).join('')}</div>
          <div class="intro-rule">Cinco actos · ${scenario.events.length} escenas posibles · Decidid rápido. No busquéis la respuesta perfecta.</div>
          <button class="primary-button intro-button" data-focusable data-action="next-event">EMPEZAR ${buttonArrow()}</button>
        </div>
      </section>
    `, scenario.title);
    bindActions();
  }

  function renderEvent() {
    const scenario = scenarioById(game.scenarioId);
    const event = LAST_TWO_ENGINE.pickEvent(scenario, game);
    game.currentEvent = event;
    route = 'event';
    sessionPill.textContent = `RONDA ${('0' + (game.round + 1)).slice(-2)} / ${game.totalRounds}`;
    sessionPill.classList.remove('hidden');

    const progress = Math.min(100, Math.round((game.round / game.totalRounds) * 100));
    const actNumber = event.act || Math.min(5, Math.floor(game.round / 4) + 1);
    const actMeta = (scenario.acts && scenario.acts[actNumber - 1]) || null;
    const stats = [
      ['SALUD', game.stats.health], ['ENERGÍA', game.stats.energy], ['ÁNIMO', game.stats.morale], ['CONFIANZA', game.stats.trust]
    ].map(function (item) {
      return `<div class="stat-mini"><span>${item[0]}</span><b>${Math.round(item[1])}</b><i><em style="width:${Math.round(item[1])}%"></em></i></div>`;
    }).join('');
    const choices = event.choices.map(function (choice, index) {
      return `<button class="choice-card" data-focusable data-action="choose" data-choice="${esc(choice.id)}">
        <span class="choice-key">${String.fromCharCode(65 + index)}</span>
        <span class="choice-copy"><strong>${esc(choice.label)}</strong><small>${esc(choice.hint)}</small></span>
        <span class="choice-arrow">${icon('arrow')}</span>
      </button>`;
    }).join('');

    const mode = event.type === 'secret' ? 'DECISIÓN PRIVADA · PASAD EL MANDO' : event.type === 'split' ? 'DOS CAMINOS' : 'SITUACIÓN';
    setScreen(`
      <section class="event-screen accent-${esc(scenario.accent)}">
        <div class="progress-line"><span style="width:${progress}%"></span></div>
        <div class="event-topline"><span>ACTO ${('0' + actNumber).slice(-2)} · ${esc(actMeta ? actMeta.title : 'SITUACIÓN')}</span><span>${event.type === 'secret' ? 'PRIVADA' : 'RONDA ' + ('0' + (game.round + 1)).slice(-2) + ' / ' + game.totalRounds}</span></div>
        <div class="event-layout">
          <div class="event-copy">
            <div class="event-type">${mode}</div>
            <h2>${esc(event.title)}</h2>
            <p>${esc(event.text)}</p>
            <div class="choice-list">${choices}</div>
          </div>
          <aside class="stat-panel">
            <div class="stat-title">ESTADO</div>
            ${stats}
            <div class="resource-row"><span>AGUA</span><b>${Math.round(game.stats.water)}</b><span>COMIDA</span><b>${Math.round(game.stats.food)}</b></div>
          </aside>
        </div>
      </section>
    `, event.title);
    bindActions();
  }

  function renderSecretFirst(choiceId) {
    const event = game.currentEvent;
    const choice = event.choices.find(function (c) { return c.id === choiceId; });
    if (!choice) return renderEvent();
    game.secretPending = { choiceId: choiceId };
    route = 'secret-lock';
    setScreen(`
      <section class="lock-screen accent-${esc(scenarioById(game.scenarioId).accent)}">
        <div class="lock-mark">${icon('moon')}</div>
        <div class="eyebrow">${esc(game.players[0])} · DECISIÓN GUARDADA</div>
        <h2>Pasad el mando.</h2>
        <p>${esc(game.players[1])}, este momento es solo vuestro.</p>
        <div class="secret-choice">ELECCIÓN DE ${esc(game.players[0])}</div>
        <button class="primary-button" data-focusable data-action="secret-second">CONTINUAR ${buttonArrow()}</button>
      </section>
    `, 'Decisión privada');
    bindActions();
  }

  function renderSecretSecond() {
    const event = game.currentEvent;
    route = 'secret-second';
    setScreen(`
      <section class="event-screen private-event">
        <div class="event-topline"><span>${esc(game.players[1])}</span><span>DECISIÓN PRIVADA</span></div>
        <div class="event-copy centered-copy">
          <div class="event-type">TU TURNO · SIN MIRAR</div>
          <h2>${esc(event.title)}</h2>
          <p>${esc(event.text)}</p>
          <div class="choice-list narrow">${event.choices.map(function (choice, index) { return `<button class="choice-card" data-focusable data-action="secret-complete" data-choice="${esc(choice.id)}"><span class="choice-key">${String.fromCharCode(65 + index)}</span><span class="choice-copy"><strong>${esc(choice.label)}</strong><small>${esc(choice.hint)}</small></span><span class="choice-arrow">${icon('arrow')}</span></button>`; }).join('')}</div>
        </div>
      </section>
    `, 'Decisión privada');
    bindActions();
  }

  function renderReveal(result, a, b) {
    route = 'reveal';
    const scenario = scenarioById(game.scenarioId);
    setScreen(`
      <section class="reveal-screen accent-${esc(scenario.accent)}">
        <div class="eyebrow">REVELACIÓN · RONDA ${('0' + game.round).slice(-2)}</div>
        <h2>${result.same ? 'Misma cabeza.' : 'Dos instintos.'}</h2>
        <div class="reveal-grid">
          <div class="reveal-card"><span>${esc(game.players[0])}</span><strong>${esc(a.label)}</strong></div>
          <div class="reveal-vs">${result.same ? 'IGUAL' : 'DISTINTO'}</div>
          <div class="reveal-card"><span>${esc(game.players[1])}</span><strong>${esc(b.label)}</strong></div>
        </div>
        <div class="reveal-note">${result.same ? 'Coincidisteis sin saberlo. El equipo gana algo de margen.' : 'No visteis la situación igual. Eso también puede ser una ventaja.'}</div>
        <button class="primary-button" data-focusable data-action="next-event">SEGUIR ${buttonArrow()}</button>
      </section>
    `, 'Revelación');
    bindActions();
    playTone(result.same ? 'success' : 'reveal');
  }

  function choose(choiceId) {
    const event = game.currentEvent;
    const choice = event && event.choices.find(function (c) { return c.id === choiceId; });
    if (!choice) return;
    playTone('tap');
    if (event.type === 'secret') return renderSecretFirst(choiceId);
    const before = game.score;
    LAST_TWO_ENGINE.applyEffects(game, choice.effects, choice.tags || []);
    game.choices.push({ eventId: event.id, choiceId: choiceId, label: choice.label, same: null, impact: Math.round(game.score - before) });
    game.history.push({ eventId: event.id, choiceId: choiceId });
    game.round += 1;
    if (shouldEnd()) return renderEnding();
    renderEvent();
  }

  function completeSecret(choiceId) {
    const event = game.currentEvent;
    const pending = game.secretPending;
    const a = pending && event.choices.find(function (c) { return c.id === pending.choiceId; });
    const b = event.choices.find(function (c) { return c.id === choiceId; });
    if (!a || !b) return renderEvent();
    const before = game.score;
    const result = LAST_TWO_ENGINE.resolveSecret(game, a, b);
    game.choices.push({ eventId: event.id, choiceIdA: a.id, choiceIdB: b.id, labelA: a.label, labelB: b.label, same: result.same, impact: Math.round(game.score - before) });
    game.history.push({ eventId: event.id, choiceId: b.id });
    game.secretPending = null;
    game.round += 1;
    if (shouldEnd()) return renderEnding();
    renderReveal(result, a, b);
  }

  function shouldEnd() {
    return game.round >= game.totalRounds || game.stats.health <= 0 || game.stats.energy <= 0 || game.stats.morale <= 0;
  }

  function reviewHighlight(review) {
    if (!review.biggest) return 'Lo importante fue llegar hasta aquí.';
    return review.biggest.label || review.biggest.labelA || 'Una decisión difícil';
  }

  function renderEnding() {
    const scenario = scenarioById(game.scenarioId);
    const finalScore = LAST_TWO_ENGINE.scoreGame(game);
    const ending = LAST_TWO_ENGINE.getEnding(scenario, finalScore);
    const review = LAST_TWO_ENGINE.deriveReview(game, finalScore);
    game.finalScore = finalScore; game.ending = ending; game.review = review; game.ended = true;
    LAST_TWO_ENGINE.unlockAchievements(store, game, review, finalScore);
    LAST_TWO_ENGINE.safeHistory(store, {
      id: `${Date.now()}-${scenario.id}-${game.seed}`,
      date: new Date().toISOString(), scenarioId: scenario.id, scenarioTitle: scenario.title,
      players: game.players.slice(), score: finalScore, rank: ending.rank, title: ending.title,
      rounds: game.round, dynamic: review.dynamic, sameCount: review.sameCount, differentCount: review.differentCount, eventsSeen: review.eventsSeen, eventsAvailable: review.eventsAvailable
    });
    LAST_TWO_ENGINE.saveStore(store);
    sessionPill.classList.add('hidden');
    route = 'ending';
    playTone(finalScore >= 65 ? 'success' : 'fail');
    const reviewText = finalScore >= 65 ? scenario.review.high : scenario.review.low;
    const alignment = review.privateCount ? Math.round((review.sameCount / review.privateCount) * 100) : 0;
    const rounds = game.round;
    setScreen(`
      <section class="ending-screen accent-${esc(scenario.accent)}">
        <div class="ending-top"><div class="eyebrow">${esc(ending.rank)}</div><span>${esc(scenario.eyebrow)} · NOCHE TERMINADA · ${esc(scenario.estimatedMinutes || '60–75 min')}</span></div>
        <div class="ending-main">
          <div class="ending-score"><span>LECTURA FINAL</span><strong>${finalScore}</strong><small>/ 100</small></div>
          <div class="ending-copy"><div class="dynamic-chip">${esc(review.dynamic)}</div><h2>${esc(ending.title)}</h2><p>${esc(ending.text)}</p><p class="review-line">${esc(reviewText)}</p></div>
        </div>
        <div class="final-review-grid">
          <div class="review-card"><span>EQUIPO</span><b>${Math.round(game.stats.trust)}</b><small>Qué bien seguisteis tomando decisiones como un dúo.</small></div>
          <div class="review-card"><span>VALENTÍA</span><b>${Math.min(100, 32 + review.riskCount * 13)}</b><small>${review.riskCount} decisiones arriesgadas.</small></div>
          <div class="review-card"><span>SINTONÍA</span><b>${alignment}%</b><small>${review.sameCount} coincidencias · ${review.differentCount} diferencias.</small></div>
          <div class="review-card"><span>SUERTE</span><b>${Math.round(game.stats.luck)}</b><small>Parte de habilidad. Parte del universo.</small></div>
        </div>
        <div class="highlight-row">
          <div><span>LA DECISIÓN QUE DEFINE LA NOCHE</span><strong>${esc(reviewHighlight(review))}</strong></div>
          <div><span>ESCENAS DESCUBIERTAS</span><strong>${review.eventsSeen} / ${review.eventsAvailable}</strong></div>
          <div><span>QUEDAN POR DESCUBRIR</span><strong>${review.eventsRemaining}</strong></div>
          <div><span>CONDICIÓN</span><strong>${esc(game.modifier.title)}</strong></div>
          <div><span>PARTIDA</span><strong>#${('0000000000' + game.seed).slice(-10)}</strong></div>
        </div>
        <div class="ending-actions">
          <button class="primary-button" data-focusable data-action="replay">REPETIR ${buttonArrow()}</button>
          <button class="secondary-button" data-focusable data-action="scenarios">OTRO MUNDO</button>
          <button class="text-button" data-focusable data-action="history">VER ARCHIVO</button>
        </div>
      </section>
    `, ending.title);
    bindActions();
  }

  function renderHistory() {
    route = 'history';
    const rows = store.history.length ? store.history.map(function (item) {
      return `<button class="history-row" data-focusable data-action="history-noop" type="button">
        <div class="history-rank">${item.score >= 80 ? '80' : item.score >= 60 ? '60' : '—'}</div>
        <div><strong>${esc(item.scenarioTitle)}</strong><span>${esc((item.players || ['Dos', 'supervivientes']).join(' + '))} · ${esc(formatDate(item.date))} · ${esc(item.dynamic || 'Los supervivientes')}</span></div>
        <b>${item.score}</b>
      </button>`;
    }).join('') : `<div class="empty-history"><span>01</span><p>Vuestra primera noche aún no ha ocurrido.<br>Elegid un mundo y tomad la primera mala decisión.</p></div>`;
    const unlocked = store.achievements.map(function (id) { return achievementMeta[id]; }).filter(Boolean).map(function (item) { return `<div class="achievement"><span>${item[0]}</span><div><strong>${item[1]}</strong><small>${item[2]}</small></div></div>`; }).join('');
    const best = store.history.length ? Math.max.apply(null, store.history.map(function (h) { return h.score; })) : '—';
    const average = store.history.length ? Math.round(store.history.reduce(function (sum, h) { return sum + h.score; }, 0) / store.history.length) : '—';
    setScreen(`
      <section class="history-screen">
        <div class="section-heading"><div><div class="eyebrow">EL ARCHIVO</div><h2>Vuestras noches.</h2><p class="section-lede">La televisión recuerda cómo jugasteis. Nada sale de este navegador.</p></div><div class="section-meta">${store.history.length} PARTIDAS</div></div>
        <div class="archive-stats"><div><span>MEJOR</span><b>${best}</b></div><div><span>MEDIA</span><b>${average}</b></div><div><span>INSIGNIAS</span><b>${store.achievements.length}</b></div></div>
        <div class="history-layout"><div class="history-list">${rows}</div><aside class="achievements"><div class="stat-title">DESBLOQUEADAS</div>${unlocked || '<p class="muted">Jugad una noche para empezar a desbloquearlas.</p>'}</aside></div>
        <div class="history-actions"><button class="primary-button" data-focusable data-action="start">EMPEZAR OTRA NOCHE ${buttonArrow()}</button><button class="text-button" data-focusable data-action="back-home">${icon('back')} VOLVER</button></div>
      </section>
    `, 'El archivo');
    bindActions();
  }

  function startGame(scenarioId) {
    const scenario = scenarioById(scenarioId);
    if (!scenario) return renderScenarioSelect();
    const p1El = document.getElementById('p1');
    const p2El = document.getElementById('p2');
    const p1 = ((p1El && p1El.value) || 'JUGADOR 01').trim().slice(0, 16) || 'JUGADOR 01';
    const p2 = ((p2El && p2El.value) || 'JUGADOR 02').trim().slice(0, 16) || 'JUGADOR 02';
    game = LAST_TWO_ENGINE.initialGame(scenario, p1, p2);
    renderIntro();
  }

  function navigateBack() {
    if (route === 'home') return;
    if (route === 'scenarios') return renderHome();
    if (route === 'setup') return renderScenarioSelect();
    if (route === 'intro') return renderSetup(game.scenarioId);
    if (route === 'history') return renderHome();
    if (route === 'ending') return renderHome();
    if (game && !game.ended) return showToast('La noche no se guarda hasta llegar al final.');
  }

  function bindActions() {
    screen.querySelectorAll('[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const action = btn.dataset.action;
        if (action === 'start') { requestFullscreen(); return renderScenarioSelect(); }
        if (action === 'scenario') return renderSetup(btn.dataset.scenario);
        if (action === 'begin') { requestFullscreen(); return startGame(btn.dataset.scenario); }
        if (action === 'back-home') return renderHome();
        if (action === 'back-scenarios') return renderScenarioSelect();
        if (action === 'history') return renderHistory();
        if (action === 'history-noop') return showToast('Esta partida ya está guardada en la televisión.');
        if (action === 'next-event') { game.currentEvent = null; return renderEvent(); }
        if (action === 'choose') return choose(btn.dataset.choice);
        if (action === 'secret-second') return renderSecretSecond();
        if (action === 'secret-complete') return completeSecret(btn.dataset.choice);
        if (action === 'replay') return startGame(game.scenarioId);
        if (action === 'scenarios') return renderScenarioSelect();
      });
    });
  }

  function requestFullscreen() {
    try {
      if (document.fullscreenElement) return;
      const target = root.requestFullscreen ? root : document.documentElement;
      if (!target || !target.requestFullscreen) return;
      const result = target.requestFullscreen();
      if (result && result.catch) result.catch(function () { showToast('La pantalla completa no está disponible en este navegador.'); });
    } catch (_) { showToast('La pantalla completa no está disponible en este navegador.'); }
  }

  function syncFullscreenLabel() {
    const active = !!document.fullscreenElement;
    fullscreenLabel.textContent = active ? 'SALIR' : 'PANTALLA';
    fullscreenIcon.innerHTML = icon('fullscreen');
  }

  fullscreenBtn.addEventListener('click', function () {
    try {
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
      else requestFullscreen();
    } catch (_) { requestFullscreen(); }
  });

  themeBtn.addEventListener('click', function () { toggleTheme(); playTone('tap'); });

  soundBtn.addEventListener('click', function () {
    store.settings.sound = !store.settings.sound;
    LAST_TWO_ENGINE.saveStore(store);
    updateSoundUI();
    playTone('tap');
  });

  homeBtn.addEventListener('click', function () { renderHome(); });
  document.addEventListener('fullscreenchange', syncFullscreenLabel);

  document.addEventListener('keydown', function (e) {
    const active = document.activeElement;
    const editing = active && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(active.tagName) !== -1;
    if (editing) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); return; }
      if (e.key === 'Enter') { e.preventDefault(); return; }
      if (e.key === 'Escape') { e.preventDefault(); navigateBack(); }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); moveFocus(1); playTone('move'); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); moveFocus(-1); playTone('move'); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateFocused(); }
    else if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); navigateBack(); }
    else if (String(e.key).toLowerCase() === 'f') { e.preventDefault(); requestFullscreen(); }
    else if (String(e.key).toLowerCase() === 't') { e.preventDefault(); toggleTheme(); }
  });

  setTheme(store.settings.theme || 'dark');
  updateSoundUI();
  syncFullscreenLabel();
  renderHome();
})();
