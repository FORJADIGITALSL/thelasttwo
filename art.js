(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch];
    });
  }

  function frame(id, caption, inner) {
    return `
      <svg class="art-svg" viewBox="0 0 560 420" role="img" aria-label="${esc(caption)}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="${id}-wash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="var(--art-wash)"/>
            <stop offset="1" stop-color="transparent"/>
          </linearGradient>
          <pattern id="${id}-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="var(--art-dot)"/>
          </pattern>
        </defs>
        <rect x="18" y="18" width="524" height="384" rx="4" fill="url(#${id}-wash)" opacity=".62"/>
        <rect x="18" y="18" width="524" height="384" rx="4" fill="url(#${id}-dots)" opacity=".24"/>
        <path d="M48 62 H510" class="art-rule"/>
        <path d="M48 364 H510" class="art-rule"/>
        ${inner}
        <text x="48" y="389" class="art-caption">THE LAST TWO · ${esc(caption.toUpperCase())}</text>
      </svg>`;
  }

  function outbreak() {
    return frame('outbreak', 'La ciudad después de las sirenas', `
      <g class="art-ink">
        <path d="M74 308 L74 190 L122 160 L122 308 M138 308 L138 129 L190 101 L190 308 M207 308 L207 176 L252 153 L252 308 M272 308 L272 113 L322 88 L322 308 M344 308 L344 148 L392 118 L392 308 M415 308 L415 182 L470 148 L470 308"/>
        <path d="M64 308 H482"/>
        <path d="M298 91 C318 72 345 63 372 67 C390 70 407 79 422 91" class="art-soft"/>
        <circle cx="399" cy="77" r="23" class="art-fill"/>
        <path d="M84 247 l32 -31 32 31 M156 238 l27 -28 28 28 M286 244 l28 -26 27 26 M358 238 l27 -28 25 28" class="art-soft"/>
        <path d="M102 314 C166 287 206 286 264 312 C320 336 375 336 450 303" class="art-accent"/>
        <path d="M284 126 C296 137 302 151 304 168 M318 120 C327 131 332 145 333 160" class="art-thin"/>
        <rect x="432" y="196" width="19" height="31" rx="1" class="art-window"/>
        <rect x="151" y="177" width="15" height="26" rx="1" class="art-window"/>
        <rect x="286" y="152" width="15" height="26" rx="1" class="art-window"/>
      </g>`);
  }

  function island() {
    return frame('island', 'Una costa que no aparece en el mapa', `
      <g class="art-ink">
        <path d="M55 311 C116 287 170 300 214 317 C264 336 333 326 385 301 C436 277 479 286 505 303"/>
        <path d="M92 285 C112 252 126 213 128 165 C132 117 148 85 171 69 C176 106 174 149 194 190 C204 211 214 232 231 253" class="art-accent"/>
        <path d="M147 259 C137 227 139 188 151 157 C163 128 179 107 198 92"/>
        <path d="M182 271 C207 240 219 213 226 179 C233 147 247 118 267 97" class="art-soft"/>
        <path d="M322 129 C351 115 377 115 401 130 C383 147 363 160 340 174 C324 160 319 144 322 129 Z" class="art-fill"/>
        <circle cx="409" cy="91" r="27" class="art-fill"/>
        <path d="M408 70 C428 85 435 98 438 115" class="art-thin"/>
        <path d="M70 336 C132 318 186 319 238 337 C291 355 356 350 418 327 C451 315 477 313 501 322" class="art-soft"/>
        <path d="M281 246 c14 -8 29 -8 45 0 c-6 11 -13 20 -23 26 c-9 -6 -16 -15 -22 -26 Z" class="art-window"/>
      </g>`);
  }

  function whiteout() {
    return frame('whiteout', 'Una montaña que desaparece en la niebla', `
      <g class="art-ink">
        <path d="M56 315 L165 165 L221 238 L286 96 L414 315"/>
        <path d="M165 165 L188 201 L221 238 L248 190 L286 96" class="art-soft"/>
        <path d="M286 96 L317 155 L347 205 L414 315" class="art-accent"/>
        <path d="M106 315 L185 236 L221 279 L276 204 L335 268 L394 215 L456 315" class="art-thin"/>
        <path d="M52 228 C117 194 160 191 224 216 C288 240 339 242 403 210 C445 190 477 189 512 203" class="art-soft"/>
        <path d="M52 250 C117 216 160 214 224 239 C288 263 339 265 403 233 C445 213 477 212 512 226" class="art-soft"/>
        <path d="M352 98 C376 74 409 69 434 83 C448 91 458 102 464 115" class="art-fill"/>
        <circle cx="426" cy="86" r="24" class="art-fill" opacity=".7"/>
        <path d="M270 266 l24 -41 l21 37 l20 -31" class="art-window"/>
      </g>`);
  }

  function orbit() {
    return frame('orbit', 'La Tierra debajo de una cabina silenciosa', `
      <g class="art-ink">
        <circle cx="386" cy="178" r="98" class="art-fill"/>
        <path d="M319 212 C343 184 368 165 398 158 C429 151 456 158 480 171 C458 212 427 246 389 271 C359 262 335 242 319 212 Z" class="art-soft"/>
        <path d="M78 309 C151 282 209 281 276 306 C319 322 368 321 437 297 C468 286 492 288 511 301"/>
        <path d="M136 308 C164 276 200 251 239 239 C260 233 279 232 298 234" class="art-accent"/>
        <path d="M108 170 C167 120 225 98 286 95 C305 94 323 96 341 100" class="art-soft"/>
        <path d="M144 204 L238 184 L286 208 L248 245 L176 240 Z" class="art-window"/>
        <path d="M251 208 L300 208 L338 191" class="art-thin"/>
        <circle cx="403" cy="175" r="55" class="art-ring"/>
        <circle cx="403" cy="175" r="73" class="art-ring" opacity=".45"/>
      </g>`);
  }

  function house() {
    return frame('house', 'Una casa iluminada donde nadie responde', `
      <g class="art-ink">
        <path d="M71 313 L112 187 L204 129 L296 187 L296 313 Z"/>
        <path d="M296 313 L296 187 L388 129 L481 187 L481 313 Z" class="art-soft"/>
        <path d="M100 185 L204 111 L312 185" class="art-accent"/>
        <path d="M294 185 L389 111 L492 185" class="art-soft"/>
        <rect x="132" y="224" width="42" height="89" class="art-window"/>
        <rect x="374" y="205" width="53" height="55" class="art-window"/>
        <path d="M205 313 V248 C205 226 231 216 252 229 V313" class="art-fill"/>
        <path d="M318 314 V226 L356 201 L392 225 V314" class="art-soft"/>
        <circle cx="425" cy="73" r="28" class="art-fill"/>
        <path d="M66 338 C145 315 210 316 280 337 C350 358 421 351 501 323" class="art-accent"/>
        <path d="M82 353 C152 338 208 339 269 353 C330 367 392 363 474 343" class="art-thin"/>
      </g>`);
  }

  function road() {
    return frame('road', 'Una carretera larga que atraviesa el calor', `
      <g class="art-ink">
        <path d="M72 320 C143 280 201 255 260 244 C321 233 401 244 488 299" class="art-soft"/>
        <path d="M79 349 C151 312 204 290 263 281 C329 271 402 283 491 325" class="art-accent"/>
        <path d="M76 318 L73 350 M488 298 L490 329" class="art-thin"/>
        <path d="M119 291 L118 313 M155 274 L154 296 M399 272 L400 293 M445 285 L447 306" class="art-thin"/>
        <path d="M92 182 C146 153 190 148 235 163 C280 178 327 178 380 155 C424 136 466 137 505 152" class="art-soft"/>
        <path d="M165 236 C176 196 185 160 187 116 C204 138 217 168 224 203" class="art-accent"/>
        <path d="M407 235 C421 201 428 163 426 125 C444 145 454 169 460 202" class="art-soft"/>
        <circle cx="92" cy="82" r="29" class="art-fill"/>
        <path d="M66 82 H118 M92 56 V108" class="art-thin"/>
        <rect x="286" y="218" width="66" height="36" rx="3" class="art-window"/>
        <circle cx="301" cy="258" r="8" class="art-fill"/>
        <circle cx="336" cy="258" r="8" class="art-fill"/>
      </g>`);
  }


  function hero() {
    return frame('hero', 'Dos personas frente a lo desconocido', `
      <g class="art-ink">
        <circle cx="383" cy="131" r="38" class="art-fill"/>
        <circle cx="253" cy="147" r="30" class="art-fill"/>
        <path d="M338 173 C324 194 315 222 309 264 L301 320 M413 169 C434 195 444 228 449 262 L456 320"/>
        <path d="M237 177 C219 198 208 226 205 258 L196 320 M281 180 C301 198 310 226 316 260 L321 320"/>
        <path d="M300 319 H190 M457 319 H301" class="art-thin"/>
        <path d="M263 103 C248 104 236 112 230 125 M388 94 C404 96 417 107 423 121" class="art-soft"/>
        <path d="M98 324 C165 292 219 286 277 302 C337 318 387 318 456 291 C479 282 497 282 516 289" class="art-accent"/>
        <path d="M82 344 C139 326 195 325 252 340 C312 357 370 356 432 335 C463 324 489 323 512 329" class="art-soft"/>
        <circle cx="92" cy="82" r="31" class="art-ring"/>
        <path d="M92 51v62 M61 82h62" class="art-thin"/>
      </g>`);
  }

  function marks(kind) {
    const m = {
      outbreak: { small: '01', label: 'ciudad', draw: outbreak },
      stranded: { small: '02', label: 'isla', draw: island },
      whiteout: { small: '03', label: 'montaña', draw: whiteout },
      orbit: { small: '04', label: 'órbita', draw: orbit },
      house: { small: '05', label: 'casa', draw: house },
      road: { small: '06', label: 'carretera', draw: road }
    }[kind] || { small: '00', label: 'escena', draw: outbreak };
    return m.draw();
  }

  function miniIcon(kind) {
    const common = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    const paths = {
      outbreak: '<path d="M4 17h16M6 17V9l3-2v10M11 17V6l4-2v13M17 17v-6l3-2v8"/><path d="M3 20h18"/>',
      stranded: '<path d="M3 17c4-3 7-3 11 0s7 3 7 0M4 13c4-2 7-2 10 0s6 2 8 0"/><path d="M12 4v10M12 4c3 0 5 1 7 3"/>',
      whiteout: '<path d="M4 19l7-10 4 5 4-7 5 12M3 21h18"/><path d="M6 7c3-2 6-2 9 0s6 2 9 0"/>',
      orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-25 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(25 12 12)"/>',
      house: '<path d="M3 11 12 4l9 7v8H3Z"/><path d="M9 20v-6h6v6"/><path d="M17 4v3h3"/>',
      road: '<path d="M4 20c3-6 5-10 8-14 3 4 5 8 8 14"/><path d="M9 16h6M10 12h4M11 8h2"/>'
    };
    return `<svg class="mini-icon" viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[kind] || paths.outbreak}</svg>`;
  }

  function actionIcon(kind) {
    const common = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
    const map = {
      arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
      back: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
      play: '<path d="M8 5.5 18 12 8 18.5Z"/>',
      sun: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.4 1.4M17.67 17.67l1.4 1.4M2 12h2M20 12h2M4.93 19.07l1.4-1.4M17.67 6.33l1.4-1.4"/>',
      moon: '<path d="M19 14.2A7.6 7.6 0 0 1 9.8 5a7.8 7.8 0 1 0 9.2 9.2Z"/>',
      volume: '<path d="M4 10h3l4-3v10l-4-3H4Z"/><path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10"/>',
      volumeOff: '<path d="M4 10h3l4-3v10l-4-3H4Z"/><path d="m16 10 4 4M20 10l-4 4"/>',
      fullscreen: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5"/>'
    };
    return `<svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true" ${common}>${map[kind] || map.arrow}</svg>`;
  }

  window.LAST_TWO_ART = { marks, hero, miniIcon, actionIcon };
}());
