# THE LAST TWO

Una experiencia narrativa de supervivencia para dos, pensada para jugar desde una Samsung TV con el mando.

## Qué incluye

- 6 historias largas y diferenciadas.
- 18 decisiones jugadas por noche, estructuradas en 5 actos.
- 20 escenas posibles por historia: cada partida cambia de recorrido y deja escenas sin descubrir.
- Sesiones diseñadas para durar aproximadamente 60–75 minutos.
- Decisiones privadas con revelación posterior.
- Estados de salud, energía, ánimo, confianza, suerte, agua y comida.
- Final con lectura narrativa, métricas, decisiones clave y escenas descubiertas.
- Archivo local, insignias y mejores resultados guardados en `localStorage`.
- Apariencia oscura y clara, guardada en la TV.
- Ilustraciones vectoriales SVG y sonido procedural opcional.
- Sin backend, API, npm ni dependencias externas.

## Historias

1. **La primera noche** — ciudad, escasez y confianza.
2. **Después de la tormenta** — isla, exploración y misterio.
3. **Bajo cero** — montaña, frío y orientación.
4. **Último descenso** — órbita, oxígeno y sacrificio.
5. **La casa sin vecinos** — misterio, percepción y decisiones compartidas.
6. **La última carretera** — distancia, combustible y desgaste.

## Rejugabilidad

Cada historia contiene 20 escenas agrupadas en 5 actos. Una partida juega 18 escenas siguiendo una secuencia de actos, pero selecciona al azar qué escenas aparecen dentro de cada acto. Las decisiones también alteran estadísticas, confianza, suerte, perfil final y desenlace.

## Despliegue

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel, importa el repositorio.
3. Selecciona `Other` si Vercel pide framework.
4. Deja vacío el comando de build.
5. Despliega.

No necesita variables de entorno ni servidor.

## Pantalla completa

La aplicación solicita pantalla completa después de una interacción del usuario. Si el navegador del televisor rechaza la petición, el juego sigue funcionando y se puede usar el control de pantalla completa del navegador.

## Mando de TV

- Flechas: mover el foco.
- OK / Enter: seleccionar.
- Atrás / Escape: volver cuando la situación lo permite.
- `F`: pantalla completa.
- `T`: claro / oscuro.

## Compatibilidad

El proyecto evita frameworks y APIs innecesarias para reducir riesgos en navegadores de TV antiguos. La validación final debe hacerse en el modelo concreto de Samsung porque el motor web cambia entre generaciones.
