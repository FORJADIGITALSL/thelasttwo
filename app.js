(function () {
  'use strict';

  var root = document.getElementById('app');
  var screen = document.getElementById('screen');
  var homeBtn = document.getElementById('homeBtn');
  var soundBtn = document.getElementById('soundBtn');
  var soundState = document.getElementById('soundState');
  var soundIcon = document.getElementById('soundIcon');
  var fullscreenBtn = document.getElementById('fullscreenBtn');
  var fullscreenIcon = document.getElementById('fullscreenIcon');
  var fullscreenLabel = document.getElementById('fullscreenLabel');
  var themeBtn = document.getElementById('themeBtn');
  var themeIcon = document.getElementById('themeIcon');
  var themeLabel = document.getElementById('themeLabel');
  var sessionPill = document.getElementById('sessionPill');
  var toast = document.getElementById('toast');

  var store = LAST_TWO_ENGINE.loadStore();
  var game = null;
  var route = 'home';
  var audioCtx = null;
  var currentFocusIndex = 0;
  var currentChoices = [];

  var achievementMeta = {
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
    var next = theme === 'light' ? 'light' : 'dark';
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
    var el = currentChoices[currentFocusIndex];
    try { el.focus({ preventScroll: true }); } catch (_) { try { el.focus(); } catch (e) {} }
  }

  function moveFocus(delta) {
    if (!currentChoices.length) return;
    currentFocusIndex = (currentFocusIndex + delta + currentChoices.length) % currentChoices.length;
    focusCurrent();
  }

  function activateFocused() {
    var el = currentChoices[currentFocusIndex];
    if (!el || el.disabled) return;
    if (el.tagName === 'INPUT') return;
    el.click();
  }

  function makeAudioContext() {
    if (audioCtx) return audioCtx;
    try {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      audioCtx = new AudioCtor();
      return audioCtx;
    } catch (_) { return null; }
  }

  function playTone(type) {
    if (!store.settings.sound) return;
    var ctx = makeAudioContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') ctx.resume();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      var now = ctx.currentTime;
      var presets = {
        tap: [220, .045],
        move: [130, .026],
        reveal: [110, .26],
        success: [320, .2],
        fail: [76, .24]
      };
      var preset = presets[type] || presets.tap;
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

  function scenarioById(id) { var i; for (i = 0; i < GAME_DATA.scenarios.length; i += 1) if (GAME_DATA.scenarios[i].id === id) return GAME_DATA.scenarios[i]; return null; }
  function choiceById(event, id) { var i; if (!event || !event.choices) return null; for (i = 0; i < event.choices.length; i += 1) if (event.choices[i].id === id) return event.choices[i]; return null; }
  function scenarioArt(scenario, extraClass) { return "<div class=\"art-frame " + (extraClass || '') + "\">" + (LAST_TWO_ART.marks(scenario.id)) + "</div>"; }
  function buttonArrow() { return "<span class=\"button-icon-right\">" + (icon('arrow')) + "</span>"; }

  function renderHome() {
    route = 'home'; game = null; sessionPill.classList.add('hidden');
    var best = store.history.length ? Math.max.apply(null, store.history.map(function (h) { return h.score; })) : null;
    setScreen("\n      <section class=\"hero home-screen\">\n        <div class=\"hero-copy\">\n          <div class=\"eyebrow\">UNA NOCHE INTERACTIVA PARA DOS</div>\n          <h1>THE<br><span class=\"outline\">LAST TWO</span></h1>\n          <p class=\"hero-sub\">Una televisión. Un mando. Dos instintos. Dieciocho decisiones. Una historia de 60–75 minutos que cambia cada vez.</p>\n          <div class=\"home-actions\">\n            <button class=\"primary-button\" data-focusable data-action=\"start\">EMPEZAR LA NOCHE " + (buttonArrow()) + "</button>\n            <button class=\"secondary-button\" data-focusable data-action=\"history\">EL ARCHIVO</button>\n          </div>\n          <div class=\"home-meta\">\n            <span>" + (GAME_DATA.scenarios.length) + " mundos</span>\n            <span>60–75 min por noche</span>\n            <span>" + (best == null ? 'Primera noche' : 'Mejor ' + best + '/100') + "</span>\n            <span>Guardado en esta TV</span>\n          </div>\n          <p class=\"remote-tip\">MANDO · <strong>↑ ↓ ← →</strong> mover · <strong>OK</strong> elegir · <strong>ATRÁS</strong> volver · <strong>F</strong> pantalla</p>\n        </div>\n        <div class=\"hero-art\" aria-hidden=\"true\">\n          <div class=\"art-frame\">" + (LAST_TWO_ART.hero()) + "</div>\n          <div class=\"art-tag\"><span>02</span><b>Una noche para repetir</b></div>\n        </div>\n      </section>\n    ", 'Inicio');
    bindActions();
  }

  function renderScenarioSelect() {
    route = 'scenarios';
    var cards = GAME_DATA.scenarios.map(function (s, i) {
      var previous = store.history.filter(function (h) { return h.scenarioId === s.id; });
      var best = previous.length ? Math.max.apply(null, previous.map(function (h) { return h.score; })) : null;
      return "<button class=\"scenario-card accent-" + (esc(s.accent)) + "\" data-focusable data-action=\"scenario\" data-scenario=\"" + (esc(s.id)) + "\">\n        <div class=\"scenario-copy\">\n          <div>\n            <span class=\"scenario-number\">" + (('0' + (i + 1)).slice(-2)) + "</span>\n            <div class=\"scenario-eyebrow\">" + (esc(s.eyebrow)) + "</div>\n            <strong>" + (esc(s.title)) + "</strong>\n            <small>" + (esc(s.subtitle)) + "</small>\n            <div class=\"scenario-descriptor\">" + (esc(s.descriptor)) + "</div>\n            <div class=\"scenario-duration\">" + (esc(s.estimatedMinutes || '60–75 min')) + " · " + (s.events.length) + " escenas posibles</div>\n          </div>\n          <span class=\"scenario-best\">" + (best == null ? 'NUEVO' : 'MEJOR ' + best) + "</span>\n        </div>\n        <div class=\"scenario-art\">" + (LAST_TWO_ART.marks(s.id)) + "</div>\n      </button>";
    }).join('');
    setScreen("\n      <section class=\"scenario-screen\">\n        <div class=\"section-heading\">\n          <div><div class=\"eyebrow\">ELIGE VUESTRO MUNDO</div><h2>¿Dónde queréis sobrevivir?</h2><p class=\"section-lede\">Cada escenario es una historia breve con eventos distintos en cada partida. No necesitáis aprender reglas: solo decidir.</p></div>\n          <div class=\"section-meta\">" + (GAME_DATA.scenarios.length) + " MUNDOS · 18 RONDAS · 60–75 MIN</div>\n        </div>\n        <div class=\"scenario-grid\">" + (cards) + "</div>\n        <button class=\"text-button\" data-focusable data-action=\"back-home\">" + (icon('back')) + " VOLVER</button>\n      </section>\n    ", 'Elegir escenario');
    bindActions();
  }

  function renderSetup(scenarioId) {
    var scenario = scenarioById(scenarioId);
    if (!scenario) return renderScenarioSelect();
    route = 'setup';
    setScreen("\n      <section class=\"setup-screen accent-" + (esc(scenario.accent)) + "\">\n        <div class=\"setup-layout\">\n          <div class=\"setup-art\">" + (LAST_TWO_ART.marks(scenario.id)) + "</div>\n          <div>\n            <div class=\"eyebrow\">" + (esc(scenario.eyebrow)) + "</div>\n            <div class=\"setup-heading\">\n              <h2>" + (esc(scenario.title)) + "</h2>\n              <p>" + (esc(scenario.subtitle)) + "</p>\n            </div>\n            <div class=\"player-grid\">\n              <label class=\"player-field\"><span>PERSONA 01</span><input data-focusable id=\"p1\" maxlength=\"16\" value=\"JUGADOR 01\" autocomplete=\"off\" inputmode=\"text\" aria-label=\"Nombre de la primera persona\"></label>\n              <div class=\"versus\">Y</div>\n              <label class=\"player-field\"><span>PERSONA 02</span><input data-focusable id=\"p2\" maxlength=\"16\" value=\"JUGADOR 02\" autocomplete=\"off\" inputmode=\"text\" aria-label=\"Nombre de la segunda persona\"></label>\n            </div>\n            <div class=\"setup-actions\">\n              <button class=\"primary-button\" data-focusable data-action=\"begin\" data-scenario=\"" + (esc(scenario.id)) + "\">ENTRAR EN LA NOCHE " + (buttonArrow()) + "</button>\n              <button class=\"secondary-button\" data-focusable data-action=\"back-scenarios\">ATRÁS</button>\n            </div>\n            <p class=\"remote-tip\">Los nombres son opcionales. Podéis jugar solo con el mando.</p>\n          </div>\n        </div>\n      </section>\n    ", scenario.title);
    bindActions();
  }

  function renderIntro() {
    var scenario = scenarioById(game.scenarioId);
    route = 'intro';
    setScreen("\n      <section class=\"intro-screen accent-" + (esc(scenario.accent)) + "\">\n        <div class=\"intro-center\">\n          <div class=\"intro-index\">NOCHE 01 · " + (game.totalRounds) + " RONDAS</div>\n          <div class=\"intro-art\">" + (LAST_TWO_ART.marks(scenario.id)) + "</div>\n          <div class=\"eyebrow\">" + (esc(scenario.eyebrow)) + "</div>\n          <h2>" + (esc(scenario.title)) + "</h2>\n          <div class=\"intro-lines\">" + (scenario.intro.map(function (line, i) { return '<p class="intro-line" style="animation-delay:' + (i * 160) + 'ms">' + esc(line) + '</p>'; }).join('')) + "</div>\n          <div class=\"intro-rule\">Cinco actos · " + (scenario.events.length) + " escenas posibles · Decidid rápido. No busquéis la respuesta perfecta.</div>\n          <button class=\"primary-button intro-button\" data-focusable data-action=\"next-event\">EMPEZAR " + (buttonArrow()) + "</button>\n        </div>\n      </section>\n    ", scenario.title);
    bindActions();
  }

  function renderEvent() {
    var scenario = scenarioById(game.scenarioId);
    var event = LAST_TWO_ENGINE.pickEvent(scenario, game);
    game.currentEvent = event;
    route = 'event';
    sessionPill.textContent = "RONDA " + (('0' + (game.round + 1)).slice(-2)) + " / " + (game.totalRounds) + "";
    sessionPill.classList.remove('hidden');

    var progress = Math.min(100, Math.round((game.round / game.totalRounds) * 100));
    var actNumber = event.act || Math.min(5, Math.floor(game.round / 4) + 1);
    var actMeta = (scenario.acts && scenario.acts[actNumber - 1]) || null;
    var stats = [
      ['SALUD', game.stats.health], ['ENERGÍA', game.stats.energy], ['ÁNIMO', game.stats.morale], ['CONFIANZA', game.stats.trust]
    ].map(function (item) {
      return "<div class=\"stat-mini\"><span>" + (item[0]) + "</span><b>" + (Math.round(item[1])) + "</b><i><em style=\"width:" + (Math.round(item[1])) + "%\"></em></i></div>";
    }).join('');
    var choices = event.choices.map(function (choice, index) {
      return "<button class=\"choice-card\" data-focusable data-action=\"choose\" data-choice=\"" + (esc(choice.id)) + "\">\n        <span class=\"choice-key\">" + (String.fromCharCode(65 + index)) + "</span>\n        <span class=\"choice-copy\"><strong>" + (esc(choice.label)) + "</strong><small>" + (esc(choice.hint)) + "</small></span>\n        <span class=\"choice-arrow\">" + (icon('arrow')) + "</span>\n      </button>";
    }).join('');

    var mode = event.type === 'secret' ? 'DECISIÓN PRIVADA · PASAD EL MANDO' : event.type === 'split' ? 'DOS CAMINOS' : 'SITUACIÓN';
    setScreen("\n      <section class=\"event-screen accent-" + (esc(scenario.accent)) + "\">\n        <div class=\"progress-line\"><span style=\"width:" + (progress) + "%\"></span></div>\n        <div class=\"event-topline\"><span>ACTO " + (('0' + actNumber).slice(-2)) + " · " + (esc(actMeta ? actMeta.title : 'SITUACIÓN')) + "</span><span>" + (event.type === 'secret' ? 'PRIVADA' : 'RONDA ' + ('0' + (game.round + 1)).slice(-2) + ' / ' + game.totalRounds) + "</span></div>\n        <div class=\"event-layout\">\n          <div class=\"event-copy\">\n            <div class=\"event-type\">" + (mode) + "</div>\n            <h2>" + (esc(event.title)) + "</h2>\n            <p>" + (esc(event.text)) + "</p>\n            <div class=\"choice-list\">" + (choices) + "</div>\n          </div>\n          <aside class=\"stat-panel\">\n            <div class=\"stat-title\">ESTADO</div>\n            " + (stats) + "\n            <div class=\"resource-row\"><span>AGUA</span><b>" + (Math.round(game.stats.water)) + "</b><span>COMIDA</span><b>" + (Math.round(game.stats.food)) + "</b></div>\n          </aside>\n        </div>\n      </section>\n    ", event.title);
    bindActions();
  }

  function renderSecretFirst(choiceId) {
    var event = game.currentEvent;
    var choice = choiceById(event, choiceId);
    if (!choice) return renderEvent();
    game.secretPending = { choiceId: choiceId };
    route = 'secret-lock';
    setScreen("\n      <section class=\"lock-screen accent-" + (esc(scenarioById(game.scenarioId).accent)) + "\">\n        <div class=\"lock-mark\">" + (icon('moon')) + "</div>\n        <div class=\"eyebrow\">" + (esc(game.players[0])) + " · DECISIÓN GUARDADA</div>\n        <h2>Pasad el mando.</h2>\n        <p>" + (esc(game.players[1])) + ", este momento es solo vuestro.</p>\n        <div class=\"secret-choice\">ELECCIÓN DE " + (esc(game.players[0])) + "</div>\n        <button class=\"primary-button\" data-focusable data-action=\"secret-second\">CONTINUAR " + (buttonArrow()) + "</button>\n      </section>\n    ", 'Decisión privada');
    bindActions();
  }

  function renderSecretSecond() {
    var event = game.currentEvent;
    route = 'secret-second';
    setScreen("\n      <section class=\"event-screen private-event\">\n        <div class=\"event-topline\"><span>" + (esc(game.players[1])) + "</span><span>DECISIÓN PRIVADA</span></div>\n        <div class=\"event-copy centered-copy\">\n          <div class=\"event-type\">TU TURNO · SIN MIRAR</div>\n          <h2>" + (esc(event.title)) + "</h2>\n          <p>" + (esc(event.text)) + "</p>\n          <div class=\"choice-list narrow\">" + (event.choices.map(function (choice, index) { return '<button class="choice-card" data-focusable data-action="secret-complete" data-choice="' + esc(choice.id) + '"><span class="choice-key">' + String.fromCharCode(65 + index) + '</span><span class="choice-copy"><strong>' + esc(choice.label) + '</strong><small>' + esc(choice.hint) + '</small></span><span class="choice-arrow">' + icon('arrow') + '</span></button>'; }).join('')) + "</div>\n        </div>\n      </section>\n    ", 'Decisión privada');
    bindActions();
  }

  function renderReveal(result, a, b) {
    route = 'reveal';
    var scenario = scenarioById(game.scenarioId);
    setScreen("\n      <section class=\"reveal-screen accent-" + (esc(scenario.accent)) + "\">\n        <div class=\"eyebrow\">REVELACIÓN · RONDA " + (('0' + game.round).slice(-2)) + "</div>\n        <h2>" + (result.same ? 'Misma cabeza.' : 'Dos instintos.') + "</h2>\n        <div class=\"reveal-grid\">\n          <div class=\"reveal-card\"><span>" + (esc(game.players[0])) + "</span><strong>" + (esc(a.label)) + "</strong></div>\n          <div class=\"reveal-vs\">" + (result.same ? 'IGUAL' : 'DISTINTO') + "</div>\n          <div class=\"reveal-card\"><span>" + (esc(game.players[1])) + "</span><strong>" + (esc(b.label)) + "</strong></div>\n        </div>\n        <div class=\"reveal-note\">" + (result.same ? 'Coincidisteis sin saberlo. El equipo gana algo de margen.' : 'No visteis la situación igual. Eso también puede ser una ventaja.') + "</div>\n        <button class=\"primary-button\" data-focusable data-action=\"next-event\">SEGUIR " + (buttonArrow()) + "</button>\n      </section>\n    ", 'Revelación');
    bindActions();
    playTone(result.same ? 'success' : 'reveal');
  }

  function choose(choiceId) {
    var event = game.currentEvent;
    var choice = event && choiceById(event, choiceId);
    if (!choice) return;
    playTone('tap');
    if (event.type === 'secret') return renderSecretFirst(choiceId);
    var before = game.score;
    LAST_TWO_ENGINE.applyEffects(game, choice.effects, choice.tags || []);
    game.choices.push({ eventId: event.id, choiceId: choiceId, label: choice.label, same: null, impact: Math.round(game.score - before) });
    game.history.push({ eventId: event.id, choiceId: choiceId });
    game.round += 1;
    if (shouldEnd()) return renderEnding();
    renderEvent();
  }

  function completeSecret(choiceId) {
    var event = game.currentEvent;
    var pending = game.secretPending;
    var a = pending && choiceById(event, pending.choiceId);
    var b = choiceById(event, choiceId);
    if (!a || !b) return renderEvent();
    var before = game.score;
    var result = LAST_TWO_ENGINE.resolveSecret(game, a, b);
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
    var scenario = scenarioById(game.scenarioId);
    var finalScore = LAST_TWO_ENGINE.scoreGame(game);
    var ending = LAST_TWO_ENGINE.getEnding(scenario, finalScore);
    var review = LAST_TWO_ENGINE.deriveReview(game, finalScore);
    game.finalScore = finalScore; game.ending = ending; game.review = review; game.ended = true;
    LAST_TWO_ENGINE.unlockAchievements(store, game, review, finalScore);
    LAST_TWO_ENGINE.safeHistory(store, {
      id: "" + (Date.now()) + "-" + (scenario.id) + "-" + (game.seed) + "",
      date: new Date().toISOString(), scenarioId: scenario.id, scenarioTitle: scenario.title,
      players: game.players.slice(), score: finalScore, rank: ending.rank, title: ending.title,
      rounds: game.round, dynamic: review.dynamic, sameCount: review.sameCount, differentCount: review.differentCount, eventsSeen: review.eventsSeen, eventsAvailable: review.eventsAvailable
    });
    LAST_TWO_ENGINE.saveStore(store);
    sessionPill.classList.add('hidden');
    route = 'ending';
    playTone(finalScore >= 65 ? 'success' : 'fail');
    var reviewText = finalScore >= 65 ? scenario.review.high : scenario.review.low;
    var alignment = review.privateCount ? Math.round((review.sameCount / review.privateCount) * 100) : 0;
    var rounds = game.round;
    setScreen("\n      <section class=\"ending-screen accent-" + (esc(scenario.accent)) + "\">\n        <div class=\"ending-top\"><div class=\"eyebrow\">" + (esc(ending.rank)) + "</div><span>" + (esc(scenario.eyebrow)) + " · NOCHE TERMINADA · " + (esc(scenario.estimatedMinutes || '60–75 min')) + "</span></div>\n        <div class=\"ending-main\">\n          <div class=\"ending-score\"><span>LECTURA FINAL</span><strong>" + (finalScore) + "</strong><small>/ 100</small></div>\n          <div class=\"ending-copy\"><div class=\"dynamic-chip\">" + (esc(review.dynamic)) + "</div><h2>" + (esc(ending.title)) + "</h2><p>" + (esc(ending.text)) + "</p><p class=\"review-line\">" + (esc(reviewText)) + "</p></div>\n        </div>\n        <div class=\"final-review-grid\">\n          <div class=\"review-card\"><span>EQUIPO</span><b>" + (Math.round(game.stats.trust)) + "</b><small>Qué bien seguisteis tomando decisiones como un dúo.</small></div>\n          <div class=\"review-card\"><span>VALENTÍA</span><b>" + (Math.min(100, 32 + review.riskCount * 13)) + "</b><small>" + (review.riskCount) + " decisiones arriesgadas.</small></div>\n          <div class=\"review-card\"><span>SINTONÍA</span><b>" + (alignment) + "%</b><small>" + (review.sameCount) + " coincidencias · " + (review.differentCount) + " diferencias.</small></div>\n          <div class=\"review-card\"><span>SUERTE</span><b>" + (Math.round(game.stats.luck)) + "</b><small>Parte de habilidad. Parte del universo.</small></div>\n        </div>\n        <div class=\"highlight-row\">\n          <div><span>LA DECISIÓN QUE DEFINE LA NOCHE</span><strong>" + (esc(reviewHighlight(review))) + "</strong></div>\n          <div><span>ESCENAS DESCUBIERTAS</span><strong>" + (review.eventsSeen) + " / " + (review.eventsAvailable) + "</strong></div>\n          <div><span>QUEDAN POR DESCUBRIR</span><strong>" + (review.eventsRemaining) + "</strong></div>\n          <div><span>CONDICIÓN</span><strong>" + (esc(game.modifier.title)) + "</strong></div>\n          <div><span>PARTIDA</span><strong>#" + (('0000000000' + game.seed).slice(-10)) + "</strong></div>\n        </div>\n        <div class=\"ending-actions\">\n          <button class=\"primary-button\" data-focusable data-action=\"replay\">REPETIR " + (buttonArrow()) + "</button>\n          <button class=\"secondary-button\" data-focusable data-action=\"scenarios\">OTRO MUNDO</button>\n          <button class=\"text-button\" data-focusable data-action=\"history\">VER ARCHIVO</button>\n        </div>\n      </section>\n    ", ending.title);
    bindActions();
  }

  function renderHistory() {
    route = 'history';
    var rows = store.history.length ? store.history.map(function (item) {
      return "<button class=\"history-row\" data-focusable data-action=\"history-noop\" type=\"button\">\n        <div class=\"history-rank\">" + (item.score >= 80 ? '80' : item.score >= 60 ? '60' : '—') + "</div>\n        <div><strong>" + (esc(item.scenarioTitle)) + "</strong><span>" + (esc((item.players || ['Dos', 'supervivientes']).join(' + '))) + " · " + (esc(formatDate(item.date))) + " · " + (esc(item.dynamic || 'Los supervivientes')) + "</span></div>\n        <b>" + (item.score) + "</b>\n      </button>";
    }).join('') : "<div class=\"empty-history\"><span>01</span><p>Vuestra primera noche aún no ha ocurrido.<br>Elegid un mundo y tomad la primera mala decisión.</p></div>";
    var unlocked = store.achievements.map(function (id) { return achievementMeta[id]; }).filter(Boolean).map(function (item) { return "<div class=\"achievement\"><span>" + (item[0]) + "</span><div><strong>" + (item[1]) + "</strong><small>" + (item[2]) + "</small></div></div>"; }).join('');
    var best = store.history.length ? Math.max.apply(null, store.history.map(function (h) { return h.score; })) : '—';
    var average = store.history.length ? Math.round(store.history.reduce(function (sum, h) { return sum + h.score; }, 0) / store.history.length) : '—';
    setScreen("\n      <section class=\"history-screen\">\n        <div class=\"section-heading\"><div><div class=\"eyebrow\">EL ARCHIVO</div><h2>Vuestras noches.</h2><p class=\"section-lede\">La televisión recuerda cómo jugasteis. Nada sale de este navegador.</p></div><div class=\"section-meta\">" + (store.history.length) + " PARTIDAS</div></div>\n        <div class=\"archive-stats\"><div><span>MEJOR</span><b>" + (best) + "</b></div><div><span>MEDIA</span><b>" + (average) + "</b></div><div><span>INSIGNIAS</span><b>" + (store.achievements.length) + "</b></div></div>\n        <div class=\"history-layout\"><div class=\"history-list\">" + (rows) + "</div><aside class=\"achievements\"><div class=\"stat-title\">DESBLOQUEADAS</div>" + (unlocked || '<p class="muted">Jugad una noche para empezar a desbloquearlas.</p>') + "</aside></div>\n        <div class=\"history-actions\"><button class=\"primary-button\" data-focusable data-action=\"start\">EMPEZAR OTRA NOCHE " + (buttonArrow()) + "</button><button class=\"text-button\" data-focusable data-action=\"back-home\">" + (icon('back')) + " VOLVER</button></div>\n      </section>\n    ", 'El archivo');
    bindActions();
  }

  function startGame(scenarioId) {
    var scenario = scenarioById(scenarioId);
    if (!scenario) return renderScenarioSelect();
    var p1El = document.getElementById('p1');
    var p2El = document.getElementById('p2');
    var p1 = ((p1El && p1El.value) || 'JUGADOR 01').trim().slice(0, 16) || 'JUGADOR 01';
    var p2 = ((p2El && p2El.value) || 'JUGADOR 02').trim().slice(0, 16) || 'JUGADOR 02';
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

  function getAttr(el, name) { return el.getAttribute ? (el.getAttribute('data-' + name) || '') : ''; }

  function bindActions() {
    var nodes = screen.querySelectorAll ? screen.querySelectorAll('[data-action]') : [];
    var i, btn, action;
    for (i = 0; i < nodes.length; i += 1) {
      btn = nodes[i];
      btn.addEventListener('click', function () {
        action = getAttr(this, 'action');
        if (action === 'start') { requestFullscreen(); return renderScenarioSelect(); }
        if (action === 'scenario') return renderSetup(getAttr(this, 'scenario'));
        if (action === 'begin') { requestFullscreen(); return startGame(getAttr(this, 'scenario')); }
        if (action === 'back-home') return renderHome();
        if (action === 'back-scenarios') return renderScenarioSelect();
        if (action === 'history') return renderHistory();
        if (action === 'history-noop') return showToast('Esta partida ya está guardada en la televisión.');
        if (action === 'next-event') { game.currentEvent = null; return renderEvent(); }
        if (action === 'choose') return choose(getAttr(this, 'choice'));
        if (action === 'secret-second') return renderSecretSecond();
        if (action === 'secret-complete') return completeSecret(getAttr(this, 'choice'));
        if (action === 'replay') return startGame(game.scenarioId);
        if (action === 'scenarios') return renderScenarioSelect();
      });
    }
  }

  function requestFullscreen() {
    try {
      var doc = document;
      var target = root || doc.documentElement;
      if (doc.fullscreenElement || doc.webkitFullscreenElement) return;
      if (target.requestFullscreen) { target.requestFullscreen(); return; }
      if (target.webkitRequestFullscreen) { target.webkitRequestFullscreen(); return; }
      if (target.webkitRequestFullScreen) { target.webkitRequestFullScreen(); return; }
      showToast('La pantalla completa no está disponible en este navegador.');
    } catch (err) { showToast('La pantalla completa no está disponible en este navegador.'); }
  }

  function exitFullscreen() {
    try {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    } catch (err) {}
  }

  function syncFullscreenLabel() {
    var active = !!(document.fullscreenElement || document.webkitFullscreenElement);
    fullscreenLabel.textContent = active ? 'SALIR' : 'PANTALLA';
    fullscreenIcon.innerHTML = icon('fullscreen');
  }

  fullscreenBtn.addEventListener('click', function () {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) exitFullscreen();
      else requestFullscreen();
    } catch (err) { requestFullscreen(); }
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
  document.addEventListener('webkitfullscreenchange', syncFullscreenLabel);

  document.addEventListener('keydown', function (e) {
    e = e || window.event;
    var active = document.activeElement;
    var tag = active && active.tagName;
    var editing = tag && (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
    var code = e.keyCode || 0;
    var key = e.key || '';
    function prevent() { if (e.preventDefault) e.preventDefault(); else e.returnValue = false; }

    if (editing) {
      if (code === 40 || key === 'ArrowDown') { prevent(); moveFocus(1); return; }
      if (code === 38 || key === 'ArrowUp') { prevent(); moveFocus(-1); return; }
      if (code === 13 || key === 'Enter') { prevent(); return; }
      if (code === 27 || key === 'Escape') { prevent(); navigateBack(); }
      return;
    }
    if (code === 40 || code === 39 || key === 'ArrowDown' || key === 'ArrowRight') { prevent(); moveFocus(1); playTone('move'); }
    else if (code === 38 || code === 37 || key === 'ArrowUp' || key === 'ArrowLeft') { prevent(); moveFocus(-1); playTone('move'); }
    else if (code === 13 || code === 32 || key === 'Enter' || key === ' ') { prevent(); activateFocused(); }
    else if (code === 27 || code === 8 || key === 'Escape' || key === 'Backspace') { prevent(); navigateBack(); }
    else if (code === 70 || String(key).toLowerCase() === 'f') { prevent(); requestFullscreen(); }
    else if (code === 84 || String(key).toLowerCase() === 't') { prevent(); toggleTheme(); }
  });

  setTheme(store.settings.theme || 'dark');
  updateSoundUI();
  syncFullscreenLabel();
  renderHome();
})();
