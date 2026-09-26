[README.md](https://github.com/user-attachments/files/32673699/README.md)
# THE LAST TWO — Samsung TV build

Juego narrativo para dos diseñado para jugar desde el navegador de una Samsung Smart TV.

## Despliegue

Sube todos los archivos del directorio a GitHub e importa el repositorio en Vercel.

No necesita Node, npm, backend, API, base de datos ni variables de entorno.

En Vercel:

- Framework: **Other**
- Build Command: vacío
- Output Directory: `.`

La aplicación es estática.

## Compatibilidad TV

Esta versión usa un runtime JavaScript deliberadamente conservador para funcionar también en Samsung antiguas:

- JavaScript ES5-compatible en los archivos de ejecución.
- Sin `let`, `const`, clases, arrow functions, spread, `Set`, `Map`, optional chaining ni template literals en runtime.
- Sin CSS custom properties, Grid, `clamp()`, `min()`, `max()` ni `color-mix()` en la hoja principal de TV.
- Navegación por flechas, Enter/OK, Escape/Back y teclas F/T.
- Fullscreen con variantes estándar y WebKit cuando están disponibles.
- LocalStorage para historial, preferencias e insignias.

Samsung indica que los motores web varían por generación: 2016 usa WebKit r152340, 2017 Chromium M47, 2018 M56 y generaciones posteriores motores Chromium más recientes. Por eso esta edición evita características que no son fiables en las generaciones antiguas.

## Funcionamiento

La partida se ejecuta completamente en la TV. Los escenarios, eventos y reglas están incluidos en `data.js`, `engine.js` y `app.js`.

El almacenamiento local solo se utiliza para:

- tema claro/oscuro
- sonido
- historial
- insignias

No hay cuentas ni datos remotos.

## Solución de arranque

`index.html` contiene una pantalla de arranque estática. Si el JavaScript no puede ejecutarse, ya no queda una pantalla blanca completamente vacía: aparece un mensaje de compatibilidad.

## Contenido

6 mundos, 20 eventos posibles por mundo, 18 rondas por partida, cinco actos y condiciones de partida variables.
