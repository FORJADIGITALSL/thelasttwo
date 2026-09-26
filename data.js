const GAME_DATA = {
  "version": 4,
  "totalRounds": 18,
  "scenarios": [
    {
      "id": "outbreak",
      "eyebrow": "EPISODIO 01 · LA CIUDAD",
      "title": "La primera noche",
      "shortTitle": "La ciudad",
      "subtitle": "Las calles se han vaciado. Falta una hora para que anochezca.",
      "descriptor": "Confianza · escasez · ruido",
      "accent": "ember",
      "start": {
        "health": 86,
        "water": 3,
        "food": 3,
        "energy": 82,
        "morale": 78,
        "trust": 72,
        "luck": 44
      },
      "intro": [
        "El último mensaje que recibiste decía: «No salgáis de casa cuando oscurezca».",
        "A las 19:14 la red eléctrica cae. En la calle solo quedan sirenas lejanas.",
        "Tenéis una mochila, dos linternas y la sensación de que esperar ya no es una opción."
      ],
      "review": {
        "high": "No ganasteis por tener el plan perfecto. Ganasteis por seguir hablándoos cuando el plan dejó de servir.",
        "low": "La ciudad os obligó a elegir deprisa. Algunas decisiones dolieron; otras abrieron una segunda oportunidad."
      },
      "events": [
        {
          "id": "outbreak-01",
          "type": "choice",
          "title": "La farmacia",
          "text": "La persiana está a medio cerrar. Dentro podría haber medicinas. También podría haber alguien esperando.",
          "choices": [
            {
              "id": "enter",
              "label": "Entrar despacio",
              "hint": "El riesgo puede valer una noche menos de dolor.",
              "effects": {
                "health": 4,
                "energy": -8,
                "luck": 5
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "watch",
              "label": "Observar primero",
              "hint": "Cinco minutos de paciencia pueden ahorrar una mala noche.",
              "effects": {
                "energy": -3,
                "trust": 4,
                "luck": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Seguir andando",
              "hint": "No toda oportunidad merece una oportunidad.",
              "effects": {
                "energy": -4,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "outbreak-02",
          "type": "split",
          "title": "La puerta blindada",
          "text": "Un edificio de oficinas tiene la entrada cerrada. La otra puerta da a un callejón oscuro.",
          "choices": [
            {
              "id": "force",
              "label": "Forzarla",
              "hint": "Hacer ruido ahora para ganar refugio después.",
              "effects": {
                "energy": -12,
                "morale": 4,
                "luck": 6
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "search",
              "label": "Buscar otra entrada",
              "hint": "Más lento, más silencioso.",
              "effects": {
                "energy": -7,
                "luck": 8
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "skip",
              "label": "No entrar",
              "hint": "Mantener distancia de cualquier edificio desconocido.",
              "effects": {
                "energy": -3,
                "trust": 2
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "outbreak-03",
          "type": "event",
          "title": "La alarma",
          "text": "Una alarma de coche empieza a sonar a dos calles. Algo se mueve entre los coches.",
          "choices": [
            {
              "id": "run",
              "label": "Correr hasta cubrirse",
              "hint": "Moverse antes de que llegue lo que ha oído la alarma.",
              "effects": {
                "energy": -9,
                "health": -2,
                "morale": 4
              }
            },
            {
              "id": "still",
              "label": "Quedarse quietos",
              "hint": "El silencio puede ser más seguro que la velocidad.",
              "effects": {
                "energy": -2,
                "trust": 3,
                "luck": 4
              },
              "tags": [
                "careful"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "outbreak-04",
          "type": "secret",
          "title": "La última botella",
          "text": "Encontráis una botella de agua que apenas alcanza para una persona cómoda. Los dos tenéis sed.",
          "choices": [
            {
              "id": "share",
              "label": "Compartirla",
              "hint": "Menos para cada uno. Más tranquilidad.",
              "effects": {
                "water": 1,
                "trust": 9,
                "morale": 5
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla para quien caiga antes",
              "hint": "Decidir más tarde quién la necesita de verdad.",
              "effects": {
                "water": 1,
                "trust": 4,
                "morale": 3
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "drink",
              "label": "Beber ahora",
              "hint": "Mañana no está garantizado.",
              "effects": {
                "water": 1,
                "health": 4,
                "trust": -10,
                "morale": -4
              },
              "tags": [
                "selfish"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "outbreak-05",
          "type": "choice",
          "title": "La voz",
          "text": "Alguien pide ayuda desde el interior de una casa. No sabéis cuántas personas hay dentro.",
          "choices": [
            {
              "id": "open",
              "label": "Abrir",
              "hint": "Ayudar primero. Preguntar después.",
              "effects": {
                "health": -3,
                "trust": 8,
                "morale": 9,
                "luck": -4
              },
              "tags": [
                "empathy"
              ]
            },
            {
              "id": "talk",
              "label": "Hablar desde fuera",
              "hint": "Averiguar qué sucede sin comprometer la salida.",
              "effects": {
                "energy": -3,
                "trust": 4,
                "luck": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Seguir andando",
              "hint": "La primera responsabilidad sigue siendo sobrevivir.",
              "effects": {
                "trust": -4,
                "morale": -2,
                "energy": -2
              },
              "tags": [
                "hard"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "outbreak-06",
          "type": "event",
          "title": "La lluvia",
          "text": "Empieza a llover con fuerza. Tenéis dos minutos antes de que una avenida se convierta en un río.",
          "choices": [
            {
              "id": "collect",
              "label": "Recoger agua",
              "hint": "Perder tiempo ahora para ganar un recurso raro.",
              "effects": {
                "water": 2,
                "energy": -4,
                "morale": 3
              }
            },
            {
              "id": "shelter",
              "label": "Buscar techo",
              "hint": "La lluvia también puede ser una amenaza.",
              "effects": {
                "health": 5,
                "energy": -2,
                "water": -1
              }
            }
          ],
          "act": 2
        },
        {
          "id": "outbreak-07",
          "type": "choice",
          "title": "El tejado",
          "text": "Desde un edificio alto veis una luz que parece un punto de rescate. Solo tenéis una batería externa.",
          "choices": [
            {
              "id": "signal",
              "label": "Encenderla",
              "hint": "Una señal visible puede cambiar la noche.",
              "effects": {
                "luck": 17,
                "morale": 8,
                "energy": -5
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar",
              "hint": "Una señal también puede atraer a quien no queréis.",
              "effects": {
                "health": 2,
                "trust": 2,
                "energy": -3
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "light",
              "label": "Usar la linterna",
              "hint": "Señal menor. Conserváis la batería grande.",
              "effects": {
                "luck": 8,
                "energy": -2
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "outbreak-08",
          "type": "secret",
          "title": "La discusión",
          "text": "Una decisión vuestra ha salido mal. Los dos estáis cansados. Cada uno decide cómo afrontar el siguiente minuto.",
          "choices": [
            {
              "id": "own",
              "label": "Asumir la culpa",
              "hint": "Cortar la discusión antes de que os rompa el ritmo.",
              "effects": {
                "trust": 11,
                "morale": 5
              },
              "tags": [
                "humble"
              ]
            },
            {
              "id": "share",
              "label": "Repartir la culpa",
              "hint": "Nadie gana. Pero nadie queda solo.",
              "effects": {
                "trust": 2,
                "morale": -1
              },
              "tags": [
                "neutral"
              ]
            },
            {
              "id": "blame",
              "label": "Señalar al otro",
              "hint": "Quizá descargar la rabia os dé energía.",
              "effects": {
                "trust": -13,
                "morale": -8,
                "luck": -3
              },
              "tags": [
                "selfish"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "outbreak-09",
          "type": "choice",
          "title": "El control",
          "text": "Un punto de luz se mueve entre barricadas. Puede ser un control seguro. Puede ser exactamente lo contrario.",
          "choices": [
            {
              "id": "approach",
              "label": "Acercarse",
              "hint": "Tomar la posibilidad de que sea ayuda.",
              "effects": {
                "health": 3,
                "luck": 13,
                "energy": -6
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "observe",
              "label": "Esperar y mirar",
              "hint": "Entender el patrón antes de entrar en él.",
              "effects": {
                "energy": -5,
                "luck": 8,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "avoid",
              "label": "Rodearlo",
              "hint": "No caminar hacia una amenaza armada sin necesidad.",
              "effects": {
                "energy": -12,
                "health": 2,
                "morale": -2
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "outbreak-10",
          "type": "event",
          "title": "El puente",
          "text": "El paso peatonal está parcialmente derrumbado. Debajo, el agua arrastra todo lo que encuentra.",
          "choices": [
            {
              "id": "over",
              "label": "Pasar por arriba",
              "hint": "Rápido, visible, inestable.",
              "effects": {
                "energy": -9,
                "health": -5,
                "luck": 7
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "under",
              "label": "Bajar y rodear",
              "hint": "Más sucio. Más escondido.",
              "effects": {
                "energy": -7,
                "health": 1,
                "morale": -3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "back",
              "label": "Retroceder",
              "hint": "Cambiar de plan antes de pagar un precio alto.",
              "effects": {
                "energy": -6,
                "morale": -5,
                "trust": 2
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "outbreak-11",
          "type": "choice",
          "title": "El generador",
          "text": "Un supermercado mantiene un generador encendido. Podríais cargar la radio. El ruido podría atraer atención.",
          "choices": [
            {
              "id": "charge",
              "label": "Cargar la radio",
              "hint": "La información puede valer más que la calma.",
              "effects": {
                "energy": -5,
                "luck": 14,
                "morale": 6
              },
              "tags": [
                "risk",
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Dejarlo atrás",
              "hint": "El silencio también es un recurso.",
              "effects": {
                "energy": 2,
                "trust": 3,
                "luck": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "outbreak-12",
          "type": "secret",
          "title": "El refugio",
          "text": "Una nota promete una habitación segura a tres calles. Puede ser una trampa. Cada uno decide en secreto si confiar.",
          "choices": [
            {
              "id": "trust",
              "label": "Confiar",
              "hint": "A veces la esperanza también es información.",
              "effects": {
                "luck": 15,
                "morale": 7
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "avoid",
              "label": "Ignorarla",
              "hint": "Esta noche no se abren puertas desconocidas.",
              "effects": {
                "energy": -3,
                "trust": 4,
                "health": 2
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "scout",
              "label": "Reconocer la zona",
              "hint": "Gastar tiempo para reducir el riesgo.",
              "effects": {
                "energy": -6,
                "luck": 9,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "outbreak-13",
          "act": 1,
          "type": "choice",
          "title": "La boca del metro",
          "text": "El acceso al metro está abierto, pero las luces de emergencia siguen encendidas bajo tierra.",
          "choices": [
            {
              "id": "down",
              "label": "Bajar al metro",
              "hint": "Puede ser una ruta rápida hacia el otro lado.",
              "effects": {
                "energy": -8,
                "luck": 12,
                "trust": 3
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "surface",
              "label": "Seguir por la calle",
              "hint": "Más visible, pero no dependéis de un espacio cerrado.",
              "effects": {
                "energy": -6,
                "morale": 3,
                "luck": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "outbreak-14",
          "act": 1,
          "type": "event",
          "title": "La persiana",
          "text": "Un taller tiene la puerta medio levantada y un pequeño generador encendido.",
          "choices": [
            {
              "id": "tools",
              "label": "Entrar por herramientas",
              "hint": "Podríais reparar la radio o conseguir una palanca.",
              "effects": {
                "energy": -5,
                "luck": 10,
                "food": 1
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "pass",
              "label": "Pasar de largo",
              "hint": "No necesitáis una segunda razón para hacer ruido.",
              "effects": {
                "energy": -2,
                "trust": 3,
                "morale": 2
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "outbreak-15",
          "act": 5,
          "type": "secret",
          "title": "El desconocido",
          "text": "Un hombre os hace una señal desde un portal. No sabéis si está pidiendo ayuda o esperando que os acerquéis.",
          "choices": [
            {
              "id": "approach",
              "label": "Acercarme",
              "hint": "Quiero saber quién es antes de decidir.",
              "effects": {
                "trust": 5,
                "luck": 10,
                "morale": 4
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "ignore",
              "label": "No acercarme",
              "hint": "Hoy la distancia también es una herramienta.",
              "effects": {
                "energy": -2,
                "trust": 3,
                "health": 2
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "signal",
              "label": "Hablar desde lejos",
              "hint": "Preguntar sin entrar en su espacio.",
              "effects": {
                "energy": -3,
                "luck": 6,
                "trust": 6
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "outbreak-16",
          "act": 5,
          "type": "event",
          "title": "La azotea",
          "text": "Subís una planta y encontráis una azotea con una manta térmica y una radio rota.",
          "choices": [
            {
              "id": "repair",
              "label": "Intentar reparar la radio",
              "hint": "Gastaréis energía, pero quizá podáis escuchar algo útil.",
              "effects": {
                "energy": -9,
                "luck": 16,
                "morale": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "rest",
              "label": "Descansar primero",
              "hint": "La información sirve menos si no podéis moveros.",
              "effects": {
                "energy": 8,
                "health": 3,
                "morale": 5
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "outbreak-17",
          "act": 3,
          "type": "split",
          "title": "Dos rutas",
          "text": "Una calle huele a humo. La otra está completamente silenciosa.",
          "choices": [
            {
              "id": "smoke",
              "label": "Hacia el humo",
              "hint": "Puede haber gente. Puede haber fuego.",
              "effects": {
                "health": -4,
                "luck": 18,
                "morale": 6,
                "energy": -8
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "quiet",
              "label": "Hacia el silencio",
              "hint": "Menos información, menos ruido.",
              "effects": {
                "energy": -6,
                "luck": 8,
                "trust": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "outbreak-18",
          "act": 3,
          "type": "choice",
          "title": "El supermercado",
          "text": "Las puertas automáticas están abiertas. Dentro hay estanterías volcadas y un único pasillo seco.",
          "choices": [
            {
              "id": "food",
              "label": "Buscar comida",
              "hint": "Cinco minutos pueden cambiar mañana.",
              "effects": {
                "food": 2,
                "energy": -6,
                "luck": 11
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "water",
              "label": "Buscar agua",
              "hint": "El hambre puede esperar más que la sed.",
              "effects": {
                "water": 2,
                "energy": -4,
                "luck": 8
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "leave",
              "label": "No tocar nada",
              "hint": "Salir antes de que el edificio deje de parecer vacío.",
              "effects": {
                "energy": -2,
                "trust": 3,
                "morale": 2
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "outbreak-19",
          "act": 4,
          "type": "secret",
          "title": "El último mensaje",
          "text": "La radio capta una voz: «Si alguien escucha esto, no vayáis al estadio». Cada uno decide si seguir el aviso.",
          "choices": [
            {
              "id": "listen",
              "label": "Creer la advertencia",
              "hint": "No hace falta comprobar cada peligro en persona.",
              "effects": {
                "trust": 8,
                "luck": 12,
                "morale": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "check",
              "label": "Comprobar el estadio",
              "hint": "La voz podría estar intentando desviaros.",
              "effects": {
                "energy": -10,
                "luck": 9,
                "trust": 2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "ignore",
              "label": "Seguir vuestro plan",
              "hint": "No dejar que una voz desconocida mande sobre vosotros.",
              "effects": {
                "energy": -6,
                "trust": -2,
                "morale": 2
              },
              "tags": [
                "hard"
              ]
            }
          ]
        },
        {
          "id": "outbreak-20",
          "act": 4,
          "type": "event",
          "title": "El túnel",
          "text": "Encontráis un túnel de servicio que atraviesa la zona más peligrosa de la ciudad.",
          "choices": [
            {
              "id": "enter",
              "label": "Entrar",
              "hint": "Oscuro, estrecho y probablemente más corto.",
              "effects": {
                "energy": -10,
                "health": -3,
                "luck": 19
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "around",
              "label": "Rodear",
              "hint": "El camino seguro siempre cuesta más pasos.",
              "effects": {
                "energy": -14,
                "morale": -2,
                "luck": 8
              },
              "tags": [
                "safe"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "Amanecer limpio",
          "text": "A las 06:11 una columna de rescate os encuentra en un punto alto. Tenéis hambre, estáis agotados y seguís juntos.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "La ciudad queda atrás",
          "text": "Llegáis a una zona segura cuando empieza a amanecer. No ha salido perfecto. Ha salido suficiente.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "Una noche más",
          "text": "Sobrevivís hasta el amanecer, pero la ciudad sigue siendo peligrosa. Mañana necesitaréis un plan nuevo.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "La noche gana",
          "text": "Se os acaba el margen antes de que llegue la mañana. La historia no termina aquí: ahora ya sabéis qué no volver a hacer.",
          "rank": "NO ESTA VEZ"
        }
      ],
      "totalRounds": 18,
      "estimatedMinutes": "60–75 min",
      "acts": [
        {
          "n": 1,
          "title": "La caída",
          "subtitle": "La ciudad cambia delante de vosotros."
        },
        {
          "n": 2,
          "title": "La noche",
          "subtitle": "Aprendéis qué ruido conviene hacer y cuál no."
        },
        {
          "n": 3,
          "title": "La grieta",
          "subtitle": "Los recursos bajan. Las decisiones pesan más."
        },
        {
          "n": 4,
          "title": "La salida",
          "subtitle": "Aparece una posibilidad real de abandonar la zona."
        },
        {
          "n": 5,
          "title": "El amanecer",
          "subtitle": "La última parte del camino exige decidir juntos."
        }
      ]
    },
    {
      "id": "stranded",
      "eyebrow": "EPISODIO 02 · LA ISLA",
      "title": "Después de la tormenta",
      "shortTitle": "La isla",
      "subtitle": "El mar os ha dejado aquí. La isla ofrece recursos y demasiadas preguntas.",
      "descriptor": "Exploración · misterio · paciencia",
      "accent": "ocean",
      "start": {
        "health": 84,
        "water": 2,
        "food": 3,
        "energy": 82,
        "morale": 82,
        "trust": 74,
        "luck": 48
      },
      "intro": [
        "La tormenta ha durado tres horas. Recordáis el barco, pero no recordáis exactamente dónde se ha hundido.",
        "Despertáis en una playa que no aparece en ningún mapa que conozcáis.",
        "Hay selva detrás, mar delante y una línea de humo en algún lugar del interior."
      ],
      "review": {
        "high": "La isla os obligó a elegir entre explorar y construir. Cuando supisteis esperar, el mundo empezó a daros pistas.",
        "low": "Había muchas salidas posibles y casi ninguna era segura. La isla consiguió que dudaseis incluso de lo que parecía obvio."
      },
      "events": [
        {
          "id": "island-01",
          "type": "choice",
          "title": "El agua dulce",
          "text": "Encontráis un arroyo. El agua está limpia, pero no veis de dónde nace.",
          "choices": [
            {
              "id": "drink",
              "label": "Beber",
              "hint": "La sed de ahora pesa más que la duda.",
              "effects": {
                "water": 2,
                "health": -2,
                "energy": 2
              }
            },
            {
              "id": "boil",
              "label": "Hervirla",
              "hint": "Más lento, pero más seguro.",
              "effects": {
                "water": 2,
                "energy": -5,
                "health": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "source",
              "label": "Seguir el arroyo",
              "hint": "Encontrar el origen antes de decidir.",
              "effects": {
                "energy": -7,
                "luck": 9,
                "water": 1
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "island-02",
          "type": "split",
          "title": "El refugio",
          "text": "Podéis construir un refugio excelente entre los dos o cubrir más terreno por separado.",
          "choices": [
            {
              "id": "one",
              "label": "Construir juntos",
              "hint": "Más sólido. Más coordinado.",
              "effects": {
                "energy": -10,
                "health": 6,
                "trust": 8
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "two",
              "label": "Separarse un rato",
              "hint": "Más terreno. Menos control sobre el otro.",
              "effects": {
                "energy": -8,
                "luck": 10,
                "trust": -4
              },
              "tags": [
                "risk"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "island-03",
          "type": "event",
          "title": "La señal",
          "text": "Encontráis una bengala vieja en la arena. Funciona una sola vez.",
          "choices": [
            {
              "id": "fire",
              "label": "Lanzarla ahora",
              "hint": "Una posibilidad mínima de rescate.",
              "effects": {
                "luck": 20,
                "morale": 8
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla",
              "hint": "Mañana puede existir una mejor ventana.",
              "effects": {
                "luck": 5,
                "trust": 4,
                "morale": 3
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "island-04",
          "type": "choice",
          "title": "La cueva",
          "text": "Una cueva ofrece suelo seco. En el interior hay huellas que no son vuestras.",
          "choices": [
            {
              "id": "enter",
              "label": "Explorar",
              "hint": "El refugio podría compensar el riesgo.",
              "effects": {
                "energy": -5,
                "luck": 13,
                "health": -4
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "camp",
              "label": "Acampar fuera",
              "hint": "Evitar lo que no entendéis.",
              "effects": {
                "health": 2,
                "energy": -2,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "island-05",
          "type": "secret",
          "title": "El coco",
          "text": "Encontráis un coco perfecto. Los dos lo queréis y no hay otro cerca.",
          "choices": [
            {
              "id": "share",
              "label": "Partirlo",
              "hint": "Nadie se queda con la mejor mitad.",
              "effects": {
                "water": 1,
                "food": 1,
                "trust": 8,
                "morale": 5
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "race",
              "label": "Quien lo abra, se lo queda",
              "hint": "Una competición completamente innecesaria.",
              "effects": {
                "food": 1,
                "energy": -6,
                "trust": 1,
                "morale": 8
              },
              "tags": [
                "chaos"
              ]
            },
            {
              "id": "save",
              "label": "Guardarlo",
              "hint": "El hambre de mañana es más difícil de predecir.",
              "effects": {
                "food": 1,
                "trust": 4,
                "morale": -2
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "island-06",
          "type": "event",
          "title": "El cielo",
          "text": "La noche se despeja. Por primera vez veis la Vía Láctea completa.",
          "choices": [
            {
              "id": "rest",
              "label": "Quedarse mirando",
              "hint": "La moral también mantiene con vida.",
              "effects": {
                "health": 5,
                "morale": 12,
                "energy": 7
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "work",
              "label": "Aprovechar la luz",
              "hint": "Construir mientras el cielo ayuda.",
              "effects": {
                "energy": -7,
                "health": 2,
                "trust": 3
              },
              "tags": [
                "team"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "island-07",
          "type": "choice",
          "title": "Las huellas",
          "text": "Huellas frescas salen del bosque hacia una zona que no habéis explorado.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguirlas",
              "hint": "Alguien más podría estar aquí.",
              "effects": {
                "energy": -9,
                "luck": 14,
                "health": -3
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "avoid",
              "label": "Evitarlas",
              "hint": "La isla ya tiene suficientes misterios.",
              "effects": {
                "health": 4,
                "energy": -2,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "island-08",
          "type": "secret",
          "title": "La balsa",
          "text": "Tenéis materiales para una balsa. Podría funcionar. Podría ser una idea terrible.",
          "choices": [
            {
              "id": "build",
              "label": "Construirla",
              "hint": "Ir a por todas o quedarse varado.",
              "effects": {
                "energy": -18,
                "luck": 18,
                "morale": 10
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "test",
              "label": "Probar un prototipo",
              "hint": "Invertir menos ahora para aprender.",
              "effects": {
                "energy": -9,
                "luck": 9,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "stay",
              "label": "No tocarla",
              "hint": "La isla puede tener una respuesta mejor.",
              "effects": {
                "energy": 3,
                "trust": 5,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "island-09",
          "type": "choice",
          "title": "La campana",
          "text": "Al atardecer oís una campana grave desde el interior. No debería haber nadie en esta isla.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguir el sonido",
              "hint": "Una persona significa una posibilidad de rescate.",
              "effects": {
                "energy": -10,
                "luck": 15,
                "health": -3
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar al amanecer",
              "hint": "De noche cada misterio parece peor.",
              "effects": {
                "energy": 3,
                "morale": 4,
                "trust": 4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "signal",
              "label": "Responder con una señal",
              "hint": "Que se revelen ellos primero.",
              "effects": {
                "luck": 10,
                "morale": 7,
                "energy": -2
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "island-10",
          "type": "secret",
          "title": "La caja",
          "text": "Detrás de un árbol aparece un antiguo kit de emergencia. Hay una comida perfecta para uno o dos raciones pequeñas.",
          "choices": [
            {
              "id": "equal",
              "label": "Repartirla",
              "hint": "Nadie recibe más que el otro.",
              "effects": {
                "food": 2,
                "energy": 5,
                "trust": 9
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "weak",
              "label": "Dársela a quien esté peor",
              "hint": "Usar el recurso donde más cambia el resultado.",
              "effects": {
                "food": 2,
                "health": 6,
                "trust": 6,
                "morale": 4
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla",
              "hint": "El hambre futura siempre parece más urgente.",
              "effects": {
                "food": 2,
                "morale": -3,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "island-11",
          "type": "event",
          "title": "La torre",
          "text": "Veis una estructura metálica entre los árboles. Podría ser un puesto de observación abandonado.",
          "choices": [
            {
              "id": "climb",
              "label": "Subir",
              "hint": "Ganar una vista completa de la costa.",
              "effects": {
                "energy": -7,
                "luck": 15,
                "health": -2
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "circle",
              "label": "Rodearla",
              "hint": "Buscar una entrada a nivel del suelo.",
              "effects": {
                "energy": -4,
                "luck": 8,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "island-12",
          "type": "secret",
          "title": "El último fuego",
          "text": "Solo queda madera seca para una gran hoguera. Puede servir para señalizar o para pasar una noche caliente.",
          "choices": [
            {
              "id": "signal",
              "label": "Usarlo como señal",
              "hint": "Quemar el recurso para que alguien os vea.",
              "effects": {
                "luck": 17,
                "morale": 7,
                "energy": -2
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "keep",
              "label": "Guardar calor",
              "hint": "Una noche fría también puede decidirlo todo.",
              "effects": {
                "health": 8,
                "morale": 5,
                "luck": 4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "split",
              "label": "Dividir el fuego",
              "hint": "Ninguna de las dos opciones será perfecta.",
              "effects": {
                "health": 4,
                "luck": 8,
                "trust": 7
              },
              "tags": [
                "team"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "stranded-13",
          "act": 1,
          "type": "choice",
          "title": "La marea baja",
          "text": "El agua retrocede más de lo normal y deja al descubierto una línea de rocas negras.",
          "choices": [
            {
              "id": "explore",
              "label": "Seguir las rocas",
              "hint": "Podrían conducir hacia otra cala.",
              "effects": {
                "energy": -7,
                "luck": 14,
                "water": 1
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "stay",
              "label": "Quedarse en la playa",
              "hint": "Primero agua y refugio; después misterios.",
              "effects": {
                "energy": -2,
                "morale": 4,
                "trust": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "stranded-14",
          "act": 1,
          "type": "event",
          "title": "La caja seca",
          "text": "Entre restos de la tormenta encontráis una caja hermética atrapada entre dos troncos.",
          "choices": [
            {
              "id": "open",
              "label": "Forzarla",
              "hint": "Dentro puede haber algo útil. También podéis romperlo.",
              "effects": {
                "energy": -6,
                "luck": 13,
                "food": 1
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "careful",
              "label": "Abrirla con calma",
              "hint": "Tomará más tiempo, pero no estáis en una carrera.",
              "effects": {
                "energy": -3,
                "luck": 11,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "stranded-15",
          "act": 5,
          "type": "secret",
          "title": "La fruta",
          "text": "Encontráis un árbol con fruta madura, pero no sabéis cuánto tardará en sentaros mal. Cada uno decide.",
          "choices": [
            {
              "id": "try",
              "label": "Probar una",
              "hint": "Necesitáis descubrir si es comestible.",
              "effects": {
                "food": 2,
                "health": -2,
                "luck": 12
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar",
              "hint": "Observar animales antes de arriesgaros.",
              "effects": {
                "energy": -3,
                "luck": 9,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "skip",
              "label": "No tocarla",
              "hint": "No vale la pena arriesgar un día entero.",
              "effects": {
                "morale": -2,
                "trust": 5
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "stranded-16",
          "act": 5,
          "type": "event",
          "title": "Las huellas",
          "text": "Encontráis huellas pequeñas junto a un charco. No son humanas.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguirlas",
              "hint": "Podrían llevar hasta agua.",
              "effects": {
                "energy": -7,
                "water": 1,
                "luck": 13
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "avoid",
              "label": "Evitar la zona",
              "hint": "No sabéis qué animal las dejó.",
              "effects": {
                "energy": -4,
                "health": 2,
                "trust": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "stranded-17",
          "act": 3,
          "type": "choice",
          "title": "El pozo",
          "text": "Una estructura de piedra parece un antiguo pozo. El agua está oscura, pero fresca.",
          "choices": [
            {
              "id": "filter",
              "label": "Filtrarla",
              "hint": "Necesitaréis tiempo y cuidado.",
              "effects": {
                "water": 3,
                "energy": -9,
                "health": 2,
                "luck": 12
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "wait",
              "label": "Dejarla reposar",
              "hint": "No es mucho, pero quizá baste.",
              "effects": {
                "water": 1,
                "energy": -2,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "stranded-18",
          "act": 3,
          "type": "secret",
          "title": "El sendero",
          "text": "Una marca roja aparece en los árboles, siempre a la misma altura. Uno de vosotros cree que es una ruta. El otro puede no estar de acuerdo.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguir las marcas",
              "hint": "Una señal repetida rara vez es accidente.",
              "effects": {
                "luck": 16,
                "energy": -7,
                "trust": 7
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Ignorarlas",
              "hint": "Una isla desconocida no se recorre obedeciendo símbolos.",
              "effects": {
                "energy": -4,
                "trust": 3,
                "morale": 2
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "test",
              "label": "Probar solo una",
              "hint": "Avanzar hasta confirmar que la ruta existe.",
              "effects": {
                "luck": 10,
                "energy": -5,
                "trust": 5
              },
              "tags": [
                "balanced"
              ]
            }
          ]
        },
        {
          "id": "stranded-19",
          "act": 4,
          "type": "event",
          "title": "El campamento vacío",
          "text": "Encontráis un campamento abandonado. Hay una cama, una brújula y una taza todavía limpia.",
          "choices": [
            {
              "id": "use",
              "label": "Usarlo",
              "hint": "Un refugio construido vale más que uno imaginado.",
              "effects": {
                "health": 7,
                "morale": 9,
                "trust": 4,
                "energy": 6
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "search",
              "label": "Registrar todo",
              "hint": "Puede haber una explicación y recursos.",
              "effects": {
                "energy": -7,
                "luck": 18,
                "food": 1
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "No tocar nada",
              "hint": "Si alguien se fue con prisa, quizá vuelva.",
              "effects": {
                "energy": -4,
                "luck": 6,
                "trust": 2
              },
              "tags": [
                "careful"
              ]
            }
          ]
        },
        {
          "id": "stranded-20",
          "act": 4,
          "type": "choice",
          "title": "La radio vieja",
          "text": "En el campamento hay una radio de manivela. El dial solo encuentra silencio.",
          "choices": [
            {
              "id": "turn",
              "label": "Buscar señal",
              "hint": "El coste es paciencia y brazos.",
              "effects": {
                "energy": -8,
                "luck": 20,
                "morale": 6
              },
              "tags": [
                "hope",
                "smart"
              ]
            },
            {
              "id": "save",
              "label": "Guardar fuerzas",
              "hint": "Una radio no sirve si no tenéis cómo llegar lejos.",
              "effects": {
                "energy": 2,
                "trust": 4,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "El horizonte",
          "text": "La balsa llega a una costa habitada justo cuando cae el sol. La isla queda atrás como un secreto que solo vosotros entendéis.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "Tierra firme",
          "text": "Una embarcación ve vuestra señal. No sabéis explicar cómo lo habéis conseguido, pero ya no importa.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "Una segunda oportunidad",
          "text": "Encontráis un refugio estable y suficiente agua para aguantar. Mañana volveréis a intentarlo.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "La isla os guarda",
          "text": "No encontráis una salida esta noche. El refugio aguanta y seguís juntos. A veces sobrevivir es comprar otro día.",
          "rank": "NO ESTA VEZ"
        }
      ],
      "totalRounds": 18,
      "estimatedMinutes": "60–75 min",
      "acts": [
        {
          "n": 1,
          "title": "Tierra",
          "subtitle": "Sobrevivir al primer día antes de entender la isla."
        },
        {
          "n": 2,
          "title": "Marea",
          "subtitle": "El agua manda el ritmo y deja pistas."
        },
        {
          "n": 3,
          "title": "Interior",
          "subtitle": "Lo desconocido empieza a parecer una oportunidad."
        },
        {
          "n": 4,
          "title": "La señal",
          "subtitle": "Alguien más estuvo aquí antes que vosotros."
        },
        {
          "n": 5,
          "title": "Regreso",
          "subtitle": "La isla os obliga a decidir cuándo iros."
        }
      ]
    },
    {
      "id": "whiteout",
      "eyebrow": "EPISODIO 03 · LA MONTAÑA",
      "title": "Bajo cero",
      "shortTitle": "La montaña",
      "subtitle": "La ventisca ha borrado el camino. El frío convierte cada error en tiempo.",
      "descriptor": "Tiempo · orientación · resistencia",
      "accent": "ice",
      "start": {
        "health": 81,
        "water": 2,
        "food": 3,
        "energy": 88,
        "morale": 76,
        "trust": 77,
        "luck": 46
      },
      "intro": [
        "El parte decía visibilidad reducida. No decía que desaparecería la montaña entera.",
        "Lleváis unas horas fuera del refugio y el viento ya tapa vuestras huellas.",
        "La radio sigue viva. La batería no llega para muchas conversaciones."
      ],
      "review": {
        "high": "Aquí no ganó quien fue más valiente. Ganó quien supo cuándo moverse y cuándo parar.",
        "low": "La montaña no necesitó un gran error. Le bastaron pequeñas decisiones acumuladas bajo frío y prisa."
      },
      "events": [
        {
          "id": "mount-01",
          "type": "choice",
          "title": "La baliza",
          "text": "Encontráis una baliza de mantenimiento. Marca una dirección distinta a vuestro mapa.",
          "choices": [
            {
              "id": "trust",
              "label": "Seguirla",
              "hint": "Confiar en infraestructura antes que en memoria.",
              "effects": {
                "luck": 13,
                "energy": -8,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "map",
              "label": "Mantener el rumbo",
              "hint": "No cambiar por una sola señal.",
              "effects": {
                "energy": -6,
                "morale": 4,
                "luck": 4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "check",
              "label": "Comparar ambos",
              "hint": "Gastar minutos para ganar seguridad.",
              "effects": {
                "energy": -9,
                "luck": 10,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "mount-02",
          "type": "event",
          "title": "El refugio cerrado",
          "text": "Un refugio de montaña está a cien metros, pero la puerta no abre. El viento está ganando fuerza.",
          "choices": [
            {
              "id": "force",
              "label": "Forzar la puerta",
              "hint": "Entrar antes de que el cuerpo empiece a enfriarse.",
              "effects": {
                "energy": -8,
                "health": 4,
                "luck": 5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "shelter",
              "label": "Buscar un abrigo natural",
              "hint": "No romper nada. No gastar energía de más.",
              "effects": {
                "energy": -3,
                "health": 3,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "mount-03",
          "type": "split",
          "title": "La cornisa",
          "text": "El camino corto cruza una cornisa. El camino largo baja hacia una zona con más protección.",
          "choices": [
            {
              "id": "short",
              "label": "Tomar el atajo",
              "hint": "Ahorrar tiempo a cambio de exposición.",
              "effects": {
                "energy": -5,
                "luck": 15,
                "health": -7
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "low",
              "label": "Bajar",
              "hint": "Más lento, pero menos expuesto.",
              "effects": {
                "energy": -10,
                "health": 4,
                "trust": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "mount-04",
          "type": "secret",
          "title": "La comida",
          "text": "Os queda una comida completa. Los dos tenéis hambre y todavía faltan horas.",
          "choices": [
            {
              "id": "share",
              "label": "Partirla",
              "hint": "Dos raciones pequeñas, una noche más llevadera.",
              "effects": {
                "food": 1,
                "energy": 6,
                "trust": 9
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "strong",
              "label": "Que coma más quien esté peor",
              "hint": "Priorizar el cuerpo que más lo necesite.",
              "effects": {
                "food": 1,
                "health": 5,
                "trust": 7,
                "morale": 4
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla",
              "hint": "Guardar fuerzas para el peor momento.",
              "effects": {
                "food": 1,
                "energy": 2,
                "morale": -3,
                "luck": 4
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "mount-05",
          "type": "choice",
          "title": "El hielo",
          "text": "Una placa cubre el siguiente tramo. Hay una cuerda, pero no sabéis si el punto de anclaje aguanta.",
          "choices": [
            {
              "id": "anchor",
              "label": "Asegurarlo",
              "hint": "Invertir tiempo para quitar riesgo.",
              "effects": {
                "energy": -7,
                "luck": 12,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "cross",
              "label": "Cruzar rápido",
              "hint": "La velocidad puede ser más segura que quedarse quietos.",
              "effects": {
                "energy": -5,
                "health": -6,
                "luck": 13
              },
              "tags": [
                "risk"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "mount-06",
          "type": "event",
          "title": "La radio",
          "text": "La radio capta una voz. La señal llega rota y solo podéis responder una vez.",
          "choices": [
            {
              "id": "coordinates",
              "label": "Dar coordenadas",
              "hint": "Priorizar la información útil.",
              "effects": {
                "luck": 17,
                "energy": -3,
                "morale": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "help",
              "label": "Pedir ayuda",
              "hint": "La emoción también comunica.",
              "effects": {
                "luck": 10,
                "morale": 10,
                "trust": 4
              },
              "tags": [
                "hope"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "mount-07",
          "type": "choice",
          "title": "La bifurcación",
          "text": "El sendero se divide. Uno es más corto. El otro tiene huellas recientes.",
          "choices": [
            {
              "id": "short",
              "label": "Tomar el corto",
              "hint": "La ruta más directa también puede ser la más dura.",
              "effects": {
                "energy": -7,
                "luck": 14,
                "health": -4
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "tracks",
              "label": "Seguir las huellas",
              "hint": "Alguien pasó por aquí antes que vosotros.",
              "effects": {
                "energy": -9,
                "luck": 12,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "mount-08",
          "type": "secret",
          "title": "La mochila",
          "text": "La mochila pesa demasiado. Uno de los dos podría cargarla hasta el final.",
          "choices": [
            {
              "id": "carry",
              "label": "Yo la llevo",
              "hint": "Aceptar el peso por el equipo.",
              "effects": {
                "energy": -10,
                "trust": 10,
                "morale": 5
              },
              "tags": [
                "team",
                "brave"
              ]
            },
            {
              "id": "split",
              "label": "Repartirla",
              "hint": "Ambos pesan menos. Ambos avanzan más despacio.",
              "effects": {
                "energy": -6,
                "trust": 8,
                "morale": 7
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "drop",
              "label": "Soltar equipo",
              "hint": "Dejar atrás cosas útiles para ganar velocidad.",
              "effects": {
                "energy": 5,
                "luck": -5,
                "morale": -2
              },
              "tags": [
                "risk"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "mount-09",
          "type": "choice",
          "title": "El cable",
          "text": "Un cable de mantenimiento desaparece entre la niebla. Podría conducir a una estación de servicio más abajo.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguirlo",
              "hint": "Usar la infraestructura de la montaña.",
              "effects": {
                "energy": -9,
                "luck": 16,
                "health": -2
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "stay",
              "label": "Mantener la ruta",
              "hint": "No perseguir atajos inciertos.",
              "effects": {
                "energy": -5,
                "trust": 3,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "mount-10",
          "type": "event",
          "title": "La tormenta se abre",
          "text": "Durante unos segundos aparece una franja de cielo claro. Es la primera referencia visual que tenéis en una hora.",
          "choices": [
            {
              "id": "move",
              "label": "Avanzar ya",
              "hint": "Aprovechar la ventana antes de perderla.",
              "effects": {
                "energy": -6,
                "luck": 14,
                "morale": 5
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "mark",
              "label": "Marcar la posición",
              "hint": "Usar el momento para orientarse.",
              "effects": {
                "energy": -3,
                "luck": 11,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "mount-11",
          "type": "secret",
          "title": "El último mensaje",
          "text": "La radio puede enviar un único mensaje corto. Cada uno decide qué quiere transmitir.",
          "choices": [
            {
              "id": "location",
              "label": "La ubicación",
              "hint": "La información más útil para encontraros.",
              "effects": {
                "luck": 18,
                "energy": -2,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "together",
              "label": "Que seguimos juntos",
              "hint": "Un mensaje simple para casa.",
              "effects": {
                "morale": 16,
                "trust": 10
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "rescue",
              "label": "Pedir rescate",
              "hint": "Ser directos y gastar la última transmisión.",
              "effects": {
                "luck": 13,
                "morale": 8,
                "trust": 6
              },
              "tags": [
                "hope"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "mount-12",
          "type": "choice",
          "title": "La bajada",
          "text": "La noche está cayendo. Debéis escoger entre seguir hasta una carretera o parar y protegeros.",
          "choices": [
            {
              "id": "continue",
              "label": "Seguir",
              "hint": "Más riesgo físico. Más posibilidades de salir hoy.",
              "effects": {
                "energy": -12,
                "luck": 18,
                "health": -5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "stop",
              "label": "Parar",
              "hint": "Perder tiempo para conservaros enteros.",
              "effects": {
                "health": 8,
                "energy": -2,
                "morale": 6,
                "trust": 5
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "whiteout-13",
          "act": 1,
          "type": "choice",
          "title": "La baliza",
          "text": "Veis una luz roja fija a través de la nieve. No sabéis si es un refugio o una baliza antigua.",
          "choices": [
            {
              "id": "toward",
              "label": "Ir hacia ella",
              "hint": "Una referencia física vale más que el mapa.",
              "effects": {
                "energy": -9,
                "luck": 16,
                "health": -2
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "mark",
              "label": "Marcarla y seguir",
              "hint": "No perder la posición por una intuición.",
              "effects": {
                "energy": -5,
                "luck": 9,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "whiteout-14",
          "act": 1,
          "type": "event",
          "title": "Las raquetas",
          "text": "Un poste de mantenimiento sostiene unas raquetas de nieve usadas, pero enteras.",
          "choices": [
            {
              "id": "use",
              "label": "Ponérselas",
              "hint": "Más agarre, más tiempo para ajustar.",
              "effects": {
                "energy": 5,
                "luck": 12,
                "morale": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Dejarlas",
              "hint": "Seguir con vuestro ritmo actual.",
              "effects": {
                "energy": -3,
                "trust": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "whiteout-15",
          "act": 5,
          "type": "secret",
          "title": "El calor",
          "text": "Encontráis un hueco donde el viento casi no entra. Uno quiere descansar; el otro quiere aprovechar la ventana.",
          "choices": [
            {
              "id": "rest",
              "label": "Parar diez minutos",
              "hint": "El cuerpo necesita recuperar antes de otro tramo.",
              "effects": {
                "health": 8,
                "energy": 5,
                "morale": 7
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "move",
              "label": "Seguir",
              "hint": "El frío solo empeora cuanto más esperáis.",
              "effects": {
                "energy": -8,
                "luck": 15,
                "health": -3
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "plan",
              "label": "Planear la ruta",
              "hint": "Usar el descanso para decidir el próximo tramo.",
              "effects": {
                "energy": 1,
                "trust": 8,
                "luck": 10
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "whiteout-16",
          "act": 5,
          "type": "event",
          "title": "La cornisa",
          "text": "La ruta principal bordea una cornisa invisible bajo la nieve.",
          "choices": [
            {
              "id": "rope",
              "label": "Asegurarse",
              "hint": "Perder tiempo para ganar margen físico.",
              "effects": {
                "energy": -8,
                "health": 5,
                "luck": 13
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "careful",
              "label": "Cruzar sin cuerda",
              "hint": "El terreno parece estable.",
              "effects": {
                "energy": -4,
                "health": -6,
                "luck": 10
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "whiteout-17",
          "act": 3,
          "type": "choice",
          "title": "El poste rojo",
          "text": "Un poste de señalización emerge de la nieve. Tiene una flecha que apunta cuesta abajo.",
          "choices": [
            {
              "id": "down",
              "label": "Seguir la flecha",
              "hint": "Por fin una ruta hecha por alguien.",
              "effects": {
                "energy": -10,
                "luck": 18,
                "morale": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "check",
              "label": "Buscar la siguiente marca",
              "hint": "No asumir que una señal aislada basta.",
              "effects": {
                "energy": -6,
                "luck": 13,
                "trust": 5
              },
              "tags": [
                "careful"
              ]
            }
          ]
        },
        {
          "id": "whiteout-18",
          "act": 3,
          "type": "secret",
          "title": "La cuerda",
          "text": "Solo tenéis una cuerda lo bastante larga para asegurar a una persona en el tramo más expuesto.",
          "choices": [
            {
              "id": "p1",
              "label": "Asegurar al que va delante",
              "hint": "Uno abre camino. El otro controla la cuerda.",
              "effects": {
                "health": -2,
                "energy": -5,
                "trust": 11,
                "luck": 12
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "p2",
              "label": "Cambiar a mitad",
              "hint": "Repartir el riesgo aunque complique el paso.",
              "effects": {
                "energy": -7,
                "trust": 9,
                "morale": 5,
                "luck": 9
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "none",
              "label": "No usarla",
              "hint": "Evitar una falsa sensación de seguridad.",
              "effects": {
                "energy": -4,
                "luck": 7,
                "trust": 3
              },
              "tags": [
                "careful"
              ]
            }
          ]
        },
        {
          "id": "whiteout-19",
          "act": 4,
          "type": "event",
          "title": "El refugio técnico",
          "text": "Una caseta aparece bajo el hielo. Dentro hay un banco, una radio y un mapa plastificado.",
          "choices": [
            {
              "id": "stay",
              "label": "Quedarse unos minutos",
              "hint": "Calentaros y estudiar el mapa.",
              "effects": {
                "health": 9,
                "energy": 4,
                "luck": 14,
                "morale": 7
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "map",
              "label": "Copiar la ruta",
              "hint": "No malgastar tiempo dentro.",
              "effects": {
                "energy": -4,
                "luck": 19,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "whiteout-20",
          "act": 4,
          "type": "choice",
          "title": "La antena",
          "text": "La radio funciona solo cuando una antena portátil apunta hacia el valle.",
          "choices": [
            {
              "id": "raise",
              "label": "Subir la antena",
              "hint": "Necesitaréis salir al viento otra vez.",
              "effects": {
                "energy": -8,
                "luck": 22,
                "morale": 8,
                "health": -3
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar otra ventana",
              "hint": "Conservar energía y confiar en la tormenta.",
              "effects": {
                "energy": -5,
                "health": 4,
                "luck": 11
              },
              "tags": [
                "safe"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "Debajo del cielo",
          "text": "Llegáis a una estación de montaña antes del amanecer. El viento sigue rugiendo, pero por fin hay una puerta que cierra.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "Tierra baja",
          "text": "Aparece una carretera y el primer coche os ve. El frío no se olvida tan rápido.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "Refugio",
          "text": "Encontráis protección suficiente para pasar la noche. Mañana tocará negociar otra vez con la montaña.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "Sin huellas",
          "text": "La ventisca os obliga a parar. Sobrevivir hasta mañana ya es la misión.",
          "rank": "NO ESTA VEZ"
        }
      ],
      "totalRounds": 18,
      "estimatedMinutes": "60–75 min",
      "acts": [
        {
          "n": 1,
          "title": "Blanco",
          "subtitle": "Perder el camino es fácil. Recuperarlo, no."
        },
        {
          "n": 2,
          "title": "Pulso",
          "subtitle": "El frío convierte el tiempo en un recurso."
        },
        {
          "n": 3,
          "title": "Altura",
          "subtitle": "La montaña abre una ruta y cierra otra."
        },
        {
          "n": 4,
          "title": "La ventana",
          "subtitle": "Aparece una oportunidad entre dos tormentas."
        },
        {
          "n": 5,
          "title": "Bajada",
          "subtitle": "Queda el tramo donde todo cuenta."
        }
      ]
    },
    {
      "id": "orbit",
      "eyebrow": "EPISODIO 04 · ÓRBITA",
      "title": "Último descenso",
      "shortTitle": "Órbita",
      "subtitle": "Seis horas de oxígeno. Dos personas. Un aterrizaje que nadie esperaba.",
      "descriptor": "Presión · sacrificio · retorno",
      "accent": "violet",
      "start": {
        "health": 88,
        "water": 2,
        "food": 2,
        "energy": 83,
        "morale": 80,
        "trust": 79,
        "luck": 47
      },
      "intro": [
        "La misión iba a durar nueve días. Ahora el panel marca seis horas de oxígeno.",
        "La cápsula de emergencia está intacta, pero el sistema de navegación no confía en vuestra trayectoria.",
        "La Tierra ocupa media ventana. Nadie dice en voz alta lo que significaría no volver."
      ],
      "review": {
        "high": "En órbita todo parece técnico hasta que una decisión os obliga a elegir qué significa «juntos».",
        "low": "No hubo una solución limpia. Hubo decisiones, minutos y la capacidad de seguir funcionando juntos bajo presión."
      },
      "events": [
        {
          "id": "orbit-01",
          "type": "choice",
          "title": "La avería",
          "text": "Un fallo divide el sistema de energía. Solo podéis proteger una de las dos áreas críticas.",
          "choices": [
            {
              "id": "lab",
              "label": "Aislar el laboratorio",
              "hint": "Conservar equipos de investigación.",
              "effects": {
                "energy": -5,
                "luck": 8,
                "morale": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "bridge",
              "label": "Aislar navegación",
              "hint": "Proteger el regreso antes que el resto.",
              "effects": {
                "energy": -5,
                "luck": 11,
                "trust": 4
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "manual",
              "label": "Intentar reparar",
              "hint": "Riesgo alto. Recompensa alta.",
              "effects": {
                "energy": -12,
                "luck": 19,
                "health": -3
              },
              "tags": [
                "risk"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "orbit-02",
          "type": "split",
          "title": "La señal",
          "text": "Control de misión recibe fragmentos de vuestra transmisión. Tenéis una sola respuesta antes de perder cobertura.",
          "choices": [
            {
              "id": "status",
              "label": "Enviar estado",
              "hint": "Darles la situación completa.",
              "effects": {
                "luck": 12,
                "energy": -3,
                "morale": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "coordinates",
              "label": "Enviar coordenadas",
              "hint": "Corto, preciso y útil.",
              "effects": {
                "luck": 16,
                "energy": -2,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "orbit-03",
          "type": "event",
          "title": "La compuerta",
          "text": "Un panel bloquea la cápsula. Una persona tendría que salir al exterior de la nave.",
          "choices": [
            {
              "id": "go",
              "label": "Salir",
              "hint": "Alguien tiene que hacerlo.",
              "effects": {
                "health": -9,
                "energy": -12,
                "luck": 15,
                "morale": 6
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "reroute",
              "label": "Desviar energía",
              "hint": "Resolverlo desde dentro.",
              "effects": {
                "energy": -10,
                "luck": 10
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 1
        },
        {
          "id": "orbit-04",
          "type": "secret",
          "title": "La cápsula",
          "text": "La cápsula de emergencia solo está certificada para una persona. Quizá podáis repararla para dos.",
          "choices": [
            {
              "id": "repair",
              "label": "Repararla para dos",
              "hint": "Arriesgarlo todo para volver juntos.",
              "effects": {
                "energy": -18,
                "luck": 22,
                "trust": 11
              },
              "tags": [
                "team",
                "risk"
              ]
            },
            {
              "id": "one",
              "label": "Enviar a una persona",
              "hint": "Supervivencia a un precio terrible.",
              "effects": {
                "luck": 12,
                "trust": -19,
                "morale": -16
              },
              "tags": [
                "hard"
              ]
            },
            {
              "id": "stay",
              "label": "Seguir juntos",
              "hint": "No separaros aunque sea la opción peor.",
              "effects": {
                "trust": 13,
                "morale": 8,
                "luck": -5
              },
              "tags": [
                "team"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "orbit-05",
          "type": "choice",
          "title": "El ordenador",
          "text": "El sistema pide una orden. Podéis reiniciar navegación o soporte vital, pero no ambas cosas.",
          "choices": [
            {
              "id": "nav",
              "label": "Navegación",
              "hint": "Encontrar una trayectoria de regreso.",
              "effects": {
                "luck": 17,
                "health": -3
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "life",
              "label": "Soporte vital",
              "hint": "Comprar tiempo.",
              "effects": {
                "health": 10,
                "luck": 5,
                "energy": -4
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "orbit-06",
          "type": "event",
          "title": "El mensaje",
          "text": "Llega un mensaje retrasado desde la Tierra: «Os vemos».",
          "choices": [
            {
              "id": "answer",
              "label": "Responder",
              "hint": "Que sepan que seguís ahí.",
              "effects": {
                "morale": 16,
                "trust": 4,
                "energy": -2
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "work",
              "label": "Seguir trabajando",
              "hint": "Sentimientos después. Supervivencia ahora.",
              "effects": {
                "energy": 4,
                "health": 3,
                "morale": 4
              },
              "tags": [
                "smart"
              ]
            }
          ],
          "act": 2
        },
        {
          "id": "orbit-07",
          "type": "choice",
          "title": "El regreso",
          "text": "La trayectoria no es perfecta. Podéis corregirla con un impulso arriesgado o esperar otra ventana.",
          "choices": [
            {
              "id": "burn",
              "label": "Corregir ahora",
              "hint": "Una oportunidad única.",
              "effects": {
                "luck": 24,
                "energy": -14,
                "health": -5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar",
              "hint": "El oxígeno es el precio de la paciencia.",
              "effects": {
                "health": 6,
                "energy": -8,
                "luck": 6
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "orbit-08",
          "type": "secret",
          "title": "El último minuto",
          "text": "El panel marca 00:59. Queda una última acción antes del cierre automático.",
          "choices": [
            {
              "id": "hold",
              "label": "Mirarse y respirar",
              "hint": "A veces la acción correcta no es técnica.",
              "effects": {
                "morale": 20,
                "trust": 14,
                "luck": 4
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "repair",
              "label": "Reparar una cosa más",
              "hint": "No rendirse.",
              "effects": {
                "energy": -8,
                "luck": 18,
                "morale": 6
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "signal",
              "label": "Enviar una señal final",
              "hint": "Que en la Tierra sepan que lo intentasteis.",
              "effects": {
                "luck": 12,
                "morale": 12,
                "trust": 8
              },
              "tags": [
                "hope"
              ]
            }
          ],
          "act": 3
        },
        {
          "id": "orbit-09",
          "type": "choice",
          "title": "La caja negra",
          "text": "El registrador contiene los únicos datos limpios de navegación. Descargarlo consume energía crítica.",
          "choices": [
            {
              "id": "download",
              "label": "Descargarlo",
              "hint": "La información puede salvar el regreso.",
              "effects": {
                "energy": -7,
                "luck": 17,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "life",
              "label": "Proteger soporte vital",
              "hint": "Comprar otro minuto antes de aprender más.",
              "effects": {
                "health": 8,
                "energy": -2,
                "luck": 5
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "orbit-10",
          "type": "secret",
          "title": "La ventana",
          "text": "La Tierra llena la ventana. Durante unos segundos no hay nada técnico que hacer. Cada uno decide qué hacer en privado.",
          "choices": [
            {
              "id": "talk",
              "label": "Hablar",
              "hint": "Usar el silencio.",
              "effects": {
                "morale": 14,
                "trust": 12
              },
              "tags": [
                "kind",
                "team"
              ]
            },
            {
              "id": "work",
              "label": "Revisar sistemas",
              "hint": "Siempre hay una cosa más que comprobar.",
              "effects": {
                "energy": -3,
                "luck": 10,
                "morale": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "look",
              "label": "Mirar la Tierra",
              "hint": "Recordar qué significa volver.",
              "effects": {
                "morale": 18,
                "trust": 6,
                "luck": 3
              },
              "tags": [
                "kind"
              ]
            }
          ],
          "act": 4
        },
        {
          "id": "orbit-11",
          "type": "event",
          "title": "El último cálculo",
          "text": "Dos trayectorias. Una consume menos combustible; la otra os deja menos margen de error.",
          "choices": [
            {
              "id": "fuel",
              "label": "Ahorrar combustible",
              "hint": "Más margen al final.",
              "effects": {
                "energy": 4,
                "luck": 11,
                "morale": 2
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "precision",
              "label": "Priorizar precisión",
              "hint": "Menos margen, más control.",
              "effects": {
                "energy": -6,
                "luck": 18,
                "health": -2
              },
              "tags": [
                "risk"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "orbit-12",
          "type": "choice",
          "title": "El descenso",
          "text": "La atmósfera aparece delante. El sistema ofrece una corrección final.",
          "choices": [
            {
              "id": "manual",
              "label": "Tomarla manualmente",
              "hint": "Confiar en vuestra lectura de la trayectoria.",
              "effects": {
                "luck": 20,
                "energy": -9,
                "morale": 7
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "auto",
              "label": "Dejar el automático",
              "hint": "No tocar nada que aún funciona.",
              "effects": {
                "health": 5,
                "luck": 12,
                "trust": 4
              },
              "tags": [
                "safe"
              ]
            }
          ],
          "act": 5
        },
        {
          "id": "orbit-13",
          "act": 1,
          "type": "choice",
          "title": "La gravedad",
          "text": "Una vibración cambia la trayectoria y durante dos segundos la cabina parece perder referencia.",
          "choices": [
            {
              "id": "brace",
              "label": "Aseguraros",
              "hint": "Menos velocidad, menos daños.",
              "effects": {
                "health": 5,
                "energy": -4,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "measure",
              "label": "Medir la deriva",
              "hint": "Usar el fallo como información.",
              "effects": {
                "energy": -5,
                "luck": 17,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "orbit-14",
          "act": 1,
          "type": "event",
          "title": "El panel auxiliar",
          "text": "Un panel de control responde con retraso. Podéis reiniciarlo o trabajar alrededor de él.",
          "choices": [
            {
              "id": "restart",
              "label": "Reiniciarlo",
              "hint": "Un minuto de riesgo puede ahorrar una hora de errores.",
              "effects": {
                "energy": -9,
                "luck": 18,
                "health": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "bypass",
              "label": "Rodearlo",
              "hint": "Menos elegante. Más conservador.",
              "effects": {
                "energy": -5,
                "luck": 10,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "orbit-15",
          "act": 5,
          "type": "secret",
          "title": "La respiración",
          "text": "El oxígeno baja. La nave os indica que respiréis con calma durante un minuto.",
          "choices": [
            {
              "id": "breathe",
              "label": "Seguir la indicación",
              "hint": "No desperdiciar energía en pánico.",
              "effects": {
                "energy": 2,
                "morale": 11,
                "trust": 8
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "work",
              "label": "Seguir trabajando",
              "hint": "Cada segundo puede ser útil.",
              "effects": {
                "energy": -7,
                "luck": 12,
                "morale": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "rest",
              "label": "Sentarse juntos",
              "hint": "No arregla una avería, pero devuelve el pulso.",
              "effects": {
                "morale": 15,
                "trust": 12,
                "energy": -2
              },
              "tags": [
                "kind"
              ]
            }
          ]
        },
        {
          "id": "orbit-16",
          "act": 5,
          "type": "event",
          "title": "La antena exterior",
          "text": "La antena está fuera de eje. Un panel permite corregirla con un impulso manual.",
          "choices": [
            {
              "id": "manual",
              "label": "Corregirla",
              "hint": "Exigir precisión bajo presión.",
              "effects": {
                "energy": -10,
                "luck": 21,
                "health": -4
              },
              "tags": [
                "brave",
                "risk"
              ]
            },
            {
              "id": "software",
              "label": "Usar software",
              "hint": "El sistema puede hacerlo aunque tarde más.",
              "effects": {
                "energy": -6,
                "luck": 14,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "orbit-17",
          "act": 3,
          "type": "choice",
          "title": "El combustible",
          "text": "Queda combustible para una gran corrección o dos pequeñas.",
          "choices": [
            {
              "id": "one",
              "label": "Una grande",
              "hint": "Conseguir una ruta más limpia de una vez.",
              "effects": {
                "energy": -11,
                "luck": 22,
                "morale": 5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "two",
              "label": "Dos pequeñas",
              "hint": "Menos espectacular. Más control.",
              "effects": {
                "energy": -8,
                "luck": 15,
                "trust": 6
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "orbit-18",
          "act": 3,
          "type": "secret",
          "title": "La decisión imposible",
          "text": "El sistema identifica un módulo que podéis apagar para ahorrar oxígeno, pero contiene la única copia de vuestros datos.",
          "choices": [
            {
              "id": "save",
              "label": "Salvar los datos",
              "hint": "Puede que el trabajo de años vuelva con vosotros.",
              "effects": {
                "energy": -7,
                "luck": 16,
                "morale": 5,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "oxygen",
              "label": "Ahorrar oxígeno",
              "hint": "Ahora solo importa regresar.",
              "effects": {
                "health": 8,
                "energy": 5,
                "morale": -3,
                "trust": 8
              },
              "tags": [
                "hard"
              ]
            },
            {
              "id": "together",
              "label": "Mantenerlo todo",
              "hint": "Arriesgar más con tal de no elegir.",
              "effects": {
                "energy": -12,
                "luck": 11,
                "trust": 13,
                "morale": 9
              },
              "tags": [
                "team",
                "risk"
              ]
            }
          ]
        },
        {
          "id": "orbit-19",
          "act": 4,
          "type": "event",
          "title": "La ventana azul",
          "text": "La Tierra aparece completa. La comunicación funciona durante veinte segundos.",
          "choices": [
            {
              "id": "call",
              "label": "Hablar con control",
              "hint": "Enviar información y escuchar una voz humana.",
              "effects": {
                "morale": 15,
                "trust": 6,
                "energy": -3,
                "luck": 18
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "silence",
              "label": "Guardar la señal",
              "hint": "Usarla solo cuando haya una instrucción crítica.",
              "effects": {
                "energy": 1,
                "luck": 12,
                "trust": 3
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "orbit-20",
          "act": 4,
          "type": "choice",
          "title": "El último ajuste",
          "text": "La trayectoria de descenso entra en tolerancia, pero todavía admite una corrección final.",
          "choices": [
            {
              "id": "touch",
              "label": "Corregir",
              "hint": "Mejorar el margen ahora.",
              "effects": {
                "energy": -7,
                "luck": 21,
                "health": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "leave",
              "label": "No tocar",
              "hint": "Cuando algo funciona, no lo empeoréis.",
              "effects": {
                "health": 4,
                "trust": 5,
                "luck": 14
              },
              "tags": [
                "safe"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "Regreso",
          "text": "La cápsula atraviesa las nubes. Abajo, dos luces se encienden en una ciudad que nunca supo lo cerca que estuvisteis de no volver.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "Trayectoria de vuelta",
          "text": "La nave se estabiliza. Será un viaje largo, pero el azul está donde tiene que estar.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "Una órbita más",
          "text": "Habéis estabilizado la nave. El rescate no está garantizado, pero todavía tenéis margen.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "Señal perdida",
          "text": "La nave se queda sin margen. Una cosa sí habéis hecho bien: no habéis dejado de intentar volver juntos.",
          "rank": "NO ESTA VEZ"
        }
      ],
      "totalRounds": 18,
      "estimatedMinutes": "60–75 min",
      "acts": [
        {
          "n": 1,
          "title": "Deriva",
          "subtitle": "La nave deja de comportarse como debería."
        },
        {
          "n": 2,
          "title": "Oxígeno",
          "subtitle": "El margen se mide en minutos."
        },
        {
          "n": 3,
          "title": "Trayectoria",
          "subtitle": "Volver exige elegir qué sistema sacrificar."
        },
        {
          "n": 4,
          "title": "La última ventana",
          "subtitle": "Tierra está cerca y, aun así, parece lejana."
        },
        {
          "n": 5,
          "title": "Descenso",
          "subtitle": "Ya no queda tiempo para una solución perfecta."
        }
      ]
    },
    {
      "id": "house",
      "eyebrow": "EPISODIO 05 · LA CASA",
      "title": "La casa sin vecinos",
      "shortTitle": "La casa",
      "subtitle": "Llegáis a una casa donde todas las luces están encendidas y nadie responde.",
      "descriptor": "misterio · confianza · silencio",
      "accent": "plum",
      "estimatedMinutes": "60–75 min",
      "totalRounds": 18,
      "start": {
        "health": 88,
        "water": 3,
        "food": 3,
        "energy": 82,
        "morale": 76,
        "trust": 76,
        "luck": 50
      },
      "intro": [
        "Lleváis dos horas buscando un sitio donde pasar la noche.",
        "La casa aparece al final de una carretera que no figura en el mapa.",
        "No hay coches. No hay vecinos. Sin embargo, la luz del pasillo está encendida."
      ],
      "review": {
        "high": "La casa intentó convertir cada silencio en una amenaza. Vosotros aprendisteis a distinguir miedo de información.",
        "low": "No todo lo extraño era peligroso, pero cada decisión os hizo pagar por no saberlo."
      },
      "acts": [
        {
          "n": 1,
          "title": "La puerta",
          "subtitle": "Entrar es fácil. Saber si debéis hacerlo, no."
        },
        {
          "n": 2,
          "title": "Las habitaciones",
          "subtitle": "La casa parece preparada para dos personas."
        },
        {
          "n": 3,
          "title": "Lo que falta",
          "subtitle": "Empezáis a encontrar cosas que no deberían estar allí."
        },
        {
          "n": 4,
          "title": "La noche",
          "subtitle": "Las reglas de la casa aparecen una a una."
        },
        {
          "n": 5,
          "title": "La mañana",
          "subtitle": "Tenéis una salida, pero no sabéis qué puerta es."
        }
      ],
      "events": [
        {
          "id": "house-01",
          "act": 1,
          "type": "choice",
          "title": "La verja",
          "text": "La verja no tiene candado. Solo una placa metálica que dice: «Entrad antes de que oscurezca».",
          "choices": [
            {
              "id": "enter",
              "label": "Entrar",
              "hint": "La casa puede ser la única forma de pasar la noche.",
              "effects": {
                "health": 2,
                "luck": 8,
                "morale": 4
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar fuera",
              "hint": "Comprobar si aparece alguien.",
              "effects": {
                "energy": -5,
                "trust": 4,
                "luck": 6
              },
              "tags": [
                "careful"
              ]
            }
          ]
        },
        {
          "id": "house-02",
          "act": 1,
          "type": "event",
          "title": "El recibidor",
          "text": "Hay dos paraguas secos junto a la puerta, aunque fuera lleva horas sin llover.",
          "choices": [
            {
              "id": "inspect",
              "label": "Revisarlos",
              "hint": "Buscar señales antes de avanzar.",
              "effects": {
                "luck": 12,
                "energy": -3,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "ignore",
              "label": "Seguir",
              "hint": "No convertir cada objeto en una pista.",
              "effects": {
                "energy": -2,
                "morale": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-03",
          "act": 1,
          "type": "secret",
          "title": "La habitación azul",
          "text": "Una puerta tiene una pequeña placa azul. Cada uno decide en privado si abrirla.",
          "choices": [
            {
              "id": "open",
              "label": "Abrir",
              "hint": "No sabéis qué hay al otro lado.",
              "effects": {
                "luck": 15,
                "morale": 6,
                "energy": -4
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "leave",
              "label": "Dejarla cerrada",
              "hint": "Una casa ajena tiene límites.",
              "effects": {
                "trust": 8,
                "health": 3
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "listen",
              "label": "Escuchar",
              "hint": "Buscar primero una señal de vida.",
              "effects": {
                "energy": -2,
                "luck": 10,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "house-04",
          "act": 1,
          "type": "choice",
          "title": "La cocina",
          "text": "Hay comida preparada para dos, todavía caliente.",
          "choices": [
            {
              "id": "eat",
              "label": "Comer",
              "hint": "No desperdiciar una oportunidad tan rara.",
              "effects": {
                "food": 2,
                "health": 5,
                "morale": 7,
                "luck": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar",
              "hint": "Puede haber una explicación detrás de la mesa.",
              "effects": {
                "energy": -3,
                "trust": 7,
                "luck": 7
              },
              "tags": [
                "careful"
              ]
            }
          ]
        },
        {
          "id": "house-05",
          "act": 2,
          "type": "event",
          "title": "El piso de arriba",
          "text": "Escucháis un golpe en el segundo piso. Cuando miráis, no queda nadie.",
          "choices": [
            {
              "id": "go",
              "label": "Subir",
              "hint": "Si hay alguien, no queréis dejarlo solo.",
              "effects": {
                "energy": -8,
                "luck": 15,
                "morale": 7
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "stay",
              "label": "Quedarse abajo",
              "hint": "La escalera es un cuello de botella.",
              "effects": {
                "trust": 5,
                "energy": -2,
                "health": 3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-06",
          "act": 2,
          "type": "split",
          "title": "El pasillo",
          "text": "Dos puertas se cierran al mismo tiempo. Una conserva una luz cálida; la otra, una línea de luz fría.",
          "choices": [
            {
              "id": "warm",
              "label": "Ir a la cálida",
              "hint": "La casa parece menos hostil ahí.",
              "effects": {
                "morale": 7,
                "luck": 12,
                "trust": 5
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "cold",
              "label": "Ir a la fría",
              "hint": "La luz más extraña puede esconder la respuesta.",
              "effects": {
                "energy": -6,
                "luck": 18
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "house-07",
          "act": 2,
          "type": "secret",
          "title": "La fotografía",
          "text": "Encontráis una fotografía en la que aparecen dos personas parecidas a vosotros, pero la foto parece antigua.",
          "choices": [
            {
              "id": "keep",
              "label": "Guardarla",
              "hint": "Quizá la imagen tenga una explicación.",
              "effects": {
                "luck": 18,
                "morale": 6,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "burn",
              "label": "Romperla",
              "hint": "No queréis que la casa empiece a contaros quiénes sois.",
              "effects": {
                "health": 3,
                "trust": 8,
                "morale": 2
              },
              "tags": [
                "hard"
              ]
            },
            {
              "id": "leave",
              "label": "Dejarla",
              "hint": "Una coincidencia sigue siendo una coincidencia.",
              "effects": {
                "energy": 3,
                "trust": 3,
                "luck": 5
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-08",
          "act": 2,
          "type": "event",
          "title": "La radio",
          "text": "Una radio antigua se enciende sola y transmite una habitación silenciosa.",
          "choices": [
            {
              "id": "listen",
              "label": "Escuchar",
              "hint": "Tal vez alguien esté al otro lado.",
              "effects": {
                "energy": -4,
                "luck": 17,
                "morale": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "turn",
              "label": "Apagarla",
              "hint": "No alimentar una historia que no entendéis.",
              "effects": {
                "energy": 3,
                "trust": 5,
                "luck": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-09",
          "act": 3,
          "type": "choice",
          "title": "La puerta cerrada",
          "text": "Una puerta tiene tres cerrojos por dentro. No por fuera.",
          "choices": [
            {
              "id": "open",
              "label": "Abrirla",
              "hint": "La habitación puede explicar la casa.",
              "effects": {
                "energy": -8,
                "luck": 20,
                "morale": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "leave",
              "label": "No tocarla",
              "hint": "Algunas respuestas son más peligrosas que la pregunta.",
              "effects": {
                "trust": 10,
                "energy": -2,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-10",
          "act": 3,
          "type": "event",
          "title": "La escalera",
          "text": "Una escalera que ayer tenía doce peldaños parece tener uno más.",
          "choices": [
            {
              "id": "count",
              "label": "Contar otra vez",
              "hint": "La memoria también es una herramienta.",
              "effects": {
                "energy": -3,
                "luck": 13,
                "trust": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "move",
              "label": "Seguir",
              "hint": "No dejar que una impresión gobierne la noche.",
              "effects": {
                "energy": -6,
                "morale": 5
              },
              "tags": [
                "brave"
              ]
            }
          ]
        },
        {
          "id": "house-11",
          "act": 3,
          "type": "secret",
          "title": "La promesa",
          "text": "En un cajón hay una nota: «No salgáis juntos de la casa».",
          "choices": [
            {
              "id": "together",
              "label": "Ignorarla juntos",
              "hint": "No vais a aceptar una regla que os separe.",
              "effects": {
                "trust": 16,
                "morale": 10,
                "luck": -3
              },
              "tags": [
                "team"
              ]
            },
            {
              "id": "divide",
              "label": "Tomársela en serio",
              "hint": "Tal vez haya una razón.",
              "effects": {
                "trust": -6,
                "luck": 13,
                "energy": -3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "test",
              "label": "Probar la puerta principal",
              "hint": "Comprobar si la regla tiene algún efecto.",
              "effects": {
                "luck": 15,
                "energy": -5,
                "trust": 4
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "house-12",
          "act": 3,
          "type": "choice",
          "title": "El reloj",
          "text": "Todos los relojes marcan las 03:17 excepto uno.",
          "choices": [
            {
              "id": "follow",
              "label": "Seguir el único reloj distinto",
              "hint": "La anomalía puede señalar una salida.",
              "effects": {
                "luck": 19,
                "energy": -5,
                "morale": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "ignore",
              "label": "No hacer caso",
              "hint": "Un reloj no decide vuestra noche.",
              "effects": {
                "trust": 6,
                "energy": 2
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-13",
          "act": 4,
          "type": "event",
          "title": "Las luces",
          "text": "Las luces de toda la casa se apagan excepto una en el jardín.",
          "choices": [
            {
              "id": "outside",
              "label": "Salir al jardín",
              "hint": "La respuesta puede estar fuera.",
              "effects": {
                "energy": -10,
                "health": -3,
                "luck": 21
              },
              "tags": [
                "brave",
                "risk"
              ]
            },
            {
              "id": "inside",
              "label": "Quedarse dentro",
              "hint": "No regalarle a la casa otra ventaja.",
              "effects": {
                "trust": 10,
                "morale": 5,
                "energy": -3
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "house-14",
          "act": 4,
          "type": "split",
          "title": "Dos llaves",
          "text": "Encontráis dos llaves idénticas. Solo una abre la salida que recordáis.",
          "choices": [
            {
              "id": "left",
              "label": "Probar la izquierda",
              "hint": "No hay tiempo para analizarlo.",
              "effects": {
                "luck": 16,
                "energy": -4
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "right",
              "label": "Probar la derecha",
              "hint": "Seguir la intuición.",
              "effects": {
                "luck": 11,
                "trust": 5,
                "energy": -3
              },
              "tags": [
                "brave"
              ]
            }
          ]
        },
        {
          "id": "house-15",
          "act": 4,
          "type": "secret",
          "title": "El nombre",
          "text": "Una voz dice vuestro nombre desde una habitación vacía. Cada uno decide si responder.",
          "choices": [
            {
              "id": "answer",
              "label": "Responder",
              "hint": "No dejar que el miedo hable por vosotros.",
              "effects": {
                "morale": 10,
                "trust": 11,
                "luck": 14
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "silent",
              "label": "Guardar silencio",
              "hint": "No negociar con algo que no entendéis.",
              "effects": {
                "energy": -2,
                "trust": 8,
                "luck": 8
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Buscar la salida",
              "hint": "Responder sería perder tiempo.",
              "effects": {
                "energy": -7,
                "luck": 13,
                "morale": -3
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "house-16",
          "act": 4,
          "type": "event",
          "title": "El sótano",
          "text": "En el sótano encontráis un panel eléctrico que parece controlar toda la casa.",
          "choices": [
            {
              "id": "switch",
              "label": "Cortar la corriente",
              "hint": "Dejar la casa a oscuras puede romper su patrón.",
              "effects": {
                "energy": -4,
                "luck": 20,
                "morale": -2
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "observe",
              "label": "Estudiarlo",
              "hint": "Quizá podáis descubrir qué activa cada circuito.",
              "effects": {
                "energy": -8,
                "luck": 17,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "house-17",
          "act": 5,
          "type": "choice",
          "title": "La mañana",
          "text": "La primera luz entra por una ventana. La puerta principal está donde recordáis, pero ahora tiene una cadena.",
          "choices": [
            {
              "id": "break",
              "label": "Romperla",
              "hint": "No esperar otra señal.",
              "effects": {
                "energy": -10,
                "health": -2,
                "luck": 18
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "key",
              "label": "Buscar la llave",
              "hint": "La casa quizá os la esté dejando encontrar.",
              "effects": {
                "energy": -6,
                "luck": 22,
                "morale": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "house-18",
          "act": 5,
          "type": "event",
          "title": "La habitación de invitados",
          "text": "La habitación está perfectamente hecha y preparada para dos.",
          "choices": [
            {
              "id": "stay",
              "label": "Quedarse cinco minutos",
              "hint": "Quizá la noche ya haya terminado.",
              "effects": {
                "health": 5,
                "energy": 8,
                "morale": 9,
                "trust": 7
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "leave",
              "label": "No mirar atrás",
              "hint": "La carretera es mejor que cualquier respuesta.",
              "effects": {
                "energy": -5,
                "luck": 14,
                "trust": 4
              },
              "tags": [
                "brave"
              ]
            }
          ]
        },
        {
          "id": "house-19",
          "act": 5,
          "type": "secret",
          "title": "La última puerta",
          "text": "Hay una puerta detrás del espejo del pasillo. Uno de vosotros cree que es una salida; el otro, una trampa.",
          "choices": [
            {
              "id": "open",
              "label": "Abrir",
              "hint": "Ya habéis llegado demasiado lejos para quedaros a un metro de la respuesta.",
              "effects": {
                "luck": 25,
                "energy": -9,
                "trust": 8
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "walk",
              "label": "Marcharse",
              "hint": "No necesitáis entender una casa para salir de ella.",
              "effects": {
                "luck": 13,
                "morale": 8,
                "energy": -4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "wait",
              "label": "Esperar al amanecer",
              "hint": "A veces la mejor decisión es dejar que el tiempo resuelva algo.",
              "effects": {
                "health": 5,
                "energy": -3,
                "trust": 12,
                "morale": 10
              },
              "tags": [
                "team"
              ]
            }
          ]
        },
        {
          "id": "house-20",
          "act": 5,
          "type": "event",
          "title": "La carretera",
          "text": "Cuando por fin salís, la carretera parece mucho más larga que la noche anterior.",
          "choices": [
            {
              "id": "walk",
              "label": "Seguir andando",
              "hint": "No volver a mirar atrás.",
              "effects": {
                "energy": -9,
                "luck": 21,
                "morale": 8
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "call",
              "label": "Buscar cobertura",
              "hint": "El mundo de fuera también puede explicar algo.",
              "effects": {
                "energy": -4,
                "luck": 18,
                "trust": 6
              },
              "tags": [
                "smart"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "La casa os deja ir",
          "text": "A primera hora de la mañana encontráis la puerta correcta y salís sin mirar atrás. Lo que ocurrió dentro tardará un rato en dejar de parecer imposible.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "Una noche en silencio",
          "text": "Encontráis una salida y la carretera vuelve a aparecer. No habéis resuelto todos los misterios, pero habéis elegido qué creer.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "La puerta de atrás",
          "text": "Salís cansados y con demasiadas preguntas. La casa sigue detrás de vosotros cuando empieza a amanecer.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "No era una casa vacía",
          "text": "La noche os gana antes de encontrar una salida clara. Algunas historias no quieren ser resueltas a la primera.",
          "rank": "NO ESTA VEZ"
        }
      ]
    },
    {
      "id": "road",
      "eyebrow": "EPISODIO 06 · LA CARRETERA",
      "title": "La última carretera",
      "shortTitle": "La carretera",
      "subtitle": "El coche se detiene a 320 kilómetros del último lugar habitado.",
      "descriptor": "distancia · combustible · confianza",
      "accent": "sand",
      "estimatedMinutes": "60–75 min",
      "totalRounds": 18,
      "start": {
        "health": 92,
        "water": 3,
        "food": 2,
        "energy": 86,
        "morale": 82,
        "trust": 75,
        "luck": 48
      },
      "intro": [
        "El indicador de combustible lleva diez minutos en rojo.",
        "No hay cobertura y la carretera continúa recta hasta perderse en el calor.",
        "Tenéis agua para dos días si no cometéis errores."
      ],
      "review": {
        "high": "No llegasteis porque la carretera fuese fácil. Llegasteis porque convertisteis cada kilómetro en una decisión compartida.",
        "low": "La distancia no se puede negociar. Solo se puede atravesar, y cada pequeño error pesa al final."
      },
      "acts": [
        {
          "n": 1,
          "title": "Kilómetro cero",
          "subtitle": "Decidir cuánto guardar y cuánto arriesgar."
        },
        {
          "n": 2,
          "title": "El desvío",
          "subtitle": "La carretera ofrece atajos que no prometen nada."
        },
        {
          "n": 3,
          "title": "La sed",
          "subtitle": "El calor empieza a cambiar vuestras prioridades."
        },
        {
          "n": 4,
          "title": "La señal",
          "subtitle": "Por fin aparece alguien más en el horizonte."
        },
        {
          "n": 5,
          "title": "El tramo final",
          "subtitle": "Ya veis destino. Todavía puede salir mal."
        }
      ],
      "events": [
        {
          "id": "road-01",
          "act": 1,
          "type": "choice",
          "title": "El depósito",
          "text": "El indicador está en rojo y el próximo pueblo está lejos.",
          "choices": [
            {
              "id": "slow",
              "label": "Reducir velocidad",
              "hint": "Llegar menos deprisa para llegar más lejos.",
              "effects": {
                "energy": -3,
                "luck": 12,
                "morale": 4
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "normal",
              "label": "Mantener ritmo",
              "hint": "No saber cuánto queda es peor que avanzar.",
              "effects": {
                "energy": -8,
                "luck": 10
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "road-02",
          "act": 1,
          "type": "event",
          "title": "La estación cerrada",
          "text": "Una gasolinera aparece, pero las bombas están apagadas.",
          "choices": [
            {
              "id": "search",
              "label": "Buscar combustible",
              "hint": "Quizá haya un depósito manual.",
              "effects": {
                "energy": -7,
                "luck": 18,
                "water": 1
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "leave",
              "label": "Seguir",
              "hint": "Perder tiempo aquí también cuesta gasolina.",
              "effects": {
                "energy": -4,
                "luck": 11
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-03",
          "act": 1,
          "type": "secret",
          "title": "La última botella",
          "text": "Solo queda una botella grande en la nevera portátil.",
          "choices": [
            {
              "id": "share",
              "label": "Compartirla ahora",
              "hint": "Sed para dos, pero ningún resentimiento.",
              "effects": {
                "water": 2,
                "trust": 12,
                "morale": 8
              },
              "tags": [
                "team",
                "kind"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla",
              "hint": "El desierto decide quién la necesita más tarde.",
              "effects": {
                "water": 2,
                "trust": 5,
                "luck": 8
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "drink",
              "label": "Beberla",
              "hint": "Conduciendo cansado también se cometen errores.",
              "effects": {
                "health": 6,
                "water": 2,
                "trust": -9,
                "morale": -3
              },
              "tags": [
                "selfish"
              ]
            }
          ]
        },
        {
          "id": "road-04",
          "act": 1,
          "type": "split",
          "title": "El cruce",
          "text": "Un cartel ofrece un desvío de 18 kilómetros hacia una estación de servicio.",
          "choices": [
            {
              "id": "detour",
              "label": "Desviaros",
              "hint": "Más kilómetros, más posibilidades de encontrar ayuda.",
              "effects": {
                "energy": -8,
                "luck": 22,
                "morale": 5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "straight",
              "label": "Seguir recto",
              "hint": "No apostar combustible a un cartel antiguo.",
              "effects": {
                "energy": -5,
                "trust": 4,
                "luck": 10
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-05",
          "act": 2,
          "type": "event",
          "title": "El polvo",
          "text": "Una tormenta de polvo cubre la carretera durante unos minutos.",
          "choices": [
            {
              "id": "stop",
              "label": "Parar",
              "hint": "La visibilidad vale más que un kilómetro.",
              "effects": {
                "energy": 3,
                "health": 3,
                "luck": 14,
                "morale": 4
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "slow",
              "label": "Avanzar despacio",
              "hint": "No queréis perder la oportunidad de salir del polvo.",
              "effects": {
                "energy": -7,
                "health": -3,
                "luck": 18
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "road-06",
          "act": 2,
          "type": "choice",
          "title": "La señal",
          "text": "Una torre de comunicaciones aparece a lo lejos.",
          "choices": [
            {
              "id": "approach",
              "label": "Acercarse",
              "hint": "Podría devolveros la cobertura.",
              "effects": {
                "energy": -11,
                "luck": 21,
                "morale": 8
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "watch",
              "label": "No desviarse",
              "hint": "Una torre no significa que funcione.",
              "effects": {
                "energy": -5,
                "luck": 10,
                "trust": 4
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "road-07",
          "act": 2,
          "type": "secret",
          "title": "La discusión",
          "text": "Uno quiere buscar agua; el otro quiere conservar combustible.",
          "choices": [
            {
              "id": "water",
              "label": "Ir a por agua",
              "hint": "La sed acabará imponiendo su propia decisión.",
              "effects": {
                "water": 2,
                "energy": -8,
                "luck": 15,
                "trust": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "fuel",
              "label": "Buscar combustible",
              "hint": "El coche sigue siendo la salida más rápida.",
              "effects": {
                "luck": 18,
                "energy": -6,
                "trust": 4
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "together",
              "label": "Hacer ambas cosas cerca",
              "hint": "Aceptar una pequeña pérdida en ambos recursos.",
              "effects": {
                "water": 1,
                "luck": 11,
                "trust": 12,
                "morale": 6
              },
              "tags": [
                "team"
              ]
            }
          ]
        },
        {
          "id": "road-08",
          "act": 2,
          "type": "event",
          "title": "La casa de campo",
          "text": "Una casa aparece a medio kilómetro de la carretera.",
          "choices": [
            {
              "id": "ask",
              "label": "Pedir ayuda",
              "hint": "Puede haber agua o un teléfono.",
              "effects": {
                "water": 2,
                "luck": 18,
                "trust": 6,
                "morale": 7
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "pass",
              "label": "Seguir",
              "hint": "No convertir una casa aislada en otra incógnita.",
              "effects": {
                "energy": -4,
                "trust": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-09",
          "act": 3,
          "type": "choice",
          "title": "El calor",
          "text": "El aire parece inmóvil y la botella baja demasiado rápido.",
          "choices": [
            {
              "id": "shade",
              "label": "Parar a la sombra",
              "hint": "Un descanso ahora puede ahorrar agua después.",
              "effects": {
                "energy": 8,
                "water": 1,
                "morale": 6
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "drive",
              "label": "Conducir",
              "hint": "El coche sigue avanzando; eso importa.",
              "effects": {
                "energy": -9,
                "water": -1,
                "luck": 13
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "road-10",
          "act": 3,
          "type": "event",
          "title": "El neumático",
          "text": "Un neumático empieza a perder presión.",
          "choices": [
            {
              "id": "change",
              "label": "Cambiarlo",
              "hint": "Parar ahora para no perder la rueda después.",
              "effects": {
                "energy": -9,
                "luck": 16,
                "health": 3
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "continue",
              "label": "Seguir",
              "hint": "Quizá aguante hasta la próxima salida.",
              "effects": {
                "energy": -6,
                "luck": 10,
                "health": -5
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "road-11",
          "act": 3,
          "type": "secret",
          "title": "El mapa",
          "text": "El mapa antiguo marca un río que ya no aparece en los carteles.",
          "choices": [
            {
              "id": "trust",
              "label": "Seguir el mapa",
              "hint": "La información vieja puede seguir siendo mejor que ninguna.",
              "effects": {
                "water": 2,
                "luck": 16,
                "energy": -8
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "ignore",
              "label": "Confiar en la carretera",
              "hint": "No abandonar una ruta segura por una línea dibujada.",
              "effects": {
                "energy": -5,
                "trust": 8,
                "luck": 7
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "verify",
              "label": "Buscar una prueba",
              "hint": "Desviaros solo lo suficiente para comprobarlo.",
              "effects": {
                "energy": -7,
                "luck": 18,
                "trust": 5
              },
              "tags": [
                "balanced"
              ]
            }
          ]
        },
        {
          "id": "road-12",
          "act": 3,
          "type": "choice",
          "title": "La radio",
          "text": "La radio capta una emisora durante cuatro segundos.",
          "choices": [
            {
              "id": "search",
              "label": "Buscarla",
              "hint": "Quizá sea información de la zona.",
              "effects": {
                "energy": -4,
                "luck": 22,
                "morale": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "save",
              "label": "Guardar batería",
              "hint": "No sabéis cuándo volverá a aparecer.",
              "effects": {
                "energy": 1,
                "trust": 4,
                "luck": 8
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-13",
          "act": 4,
          "type": "event",
          "title": "El otro coche",
          "text": "Un vehículo aparece detenido en el arcén. Las puertas están abiertas.",
          "choices": [
            {
              "id": "stop",
              "label": "Parar",
              "hint": "Podrían necesitaros.",
              "effects": {
                "health": -3,
                "luck": 18,
                "morale": 10,
                "trust": 7
              },
              "tags": [
                "empathy"
              ]
            },
            {
              "id": "pass",
              "label": "Seguir",
              "hint": "No sabemos por qué está vacío.",
              "effects": {
                "energy": -3,
                "luck": 9,
                "trust": 4
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-14",
          "act": 4,
          "type": "split",
          "title": "La bifurcación",
          "text": "El navegador deja de funcionar justo donde la carretera se divide.",
          "choices": [
            {
              "id": "left",
              "label": "Izquierda",
              "hint": "Parece la ruta más larga pero asfaltada.",
              "effects": {
                "energy": -8,
                "luck": 15,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "right",
              "label": "Derecha",
              "hint": "La señal es vieja, pero apunta hacia el pueblo.",
              "effects": {
                "energy": -7,
                "luck": 20
              },
              "tags": [
                "risk"
              ]
            }
          ]
        },
        {
          "id": "road-15",
          "act": 4,
          "type": "secret",
          "title": "La reserva",
          "text": "Encontráis una garrafa de combustible en el maletero. Solo sirve para una parte del trayecto.",
          "choices": [
            {
              "id": "tank",
              "label": "Usarla ya",
              "hint": "No queréis llegar a cero en mitad de la carretera.",
              "effects": {
                "luck": 18,
                "trust": 6,
                "morale": 6
              },
              "tags": [
                "smart"
              ]
            },
            {
              "id": "save",
              "label": "Guardarla",
              "hint": "Puede salvaros más tarde.",
              "effects": {
                "luck": 14,
                "trust": 8,
                "energy": -2
              },
              "tags": [
                "safe"
              ]
            },
            {
              "id": "share",
              "label": "Repartir el riesgo",
              "hint": "Usarla solo en el tramo más dudoso.",
              "effects": {
                "luck": 16,
                "trust": 13,
                "morale": 8
              },
              "tags": [
                "team"
              ]
            }
          ]
        },
        {
          "id": "road-16",
          "act": 4,
          "type": "event",
          "title": "La gasolinera",
          "text": "Una estación aparece al final de una recta, pero parece abandonada.",
          "choices": [
            {
              "id": "enter",
              "label": "Entrar",
              "hint": "No parar ahora sería absurdo.",
              "effects": {
                "water": 2,
                "food": 1,
                "luck": 20,
                "energy": -6
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "look",
              "label": "Reconocer primero",
              "hint": "La esperanza también puede ser una trampa.",
              "effects": {
                "energy": -7,
                "luck": 17,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "road-17",
          "act": 5,
          "type": "choice",
          "title": "Cobertura",
          "text": "El teléfono recupera una barra de señal.",
          "choices": [
            {
              "id": "call",
              "label": "Llamar",
              "hint": "Una voz externa puede acabar con la incertidumbre.",
              "effects": {
                "morale": 16,
                "trust": 7,
                "luck": 18,
                "energy": -2
              },
              "tags": [
                "hope"
              ]
            },
            {
              "id": "save",
              "label": "Guardar batería",
              "hint": "Quizá el último pueblo esté cerca.",
              "effects": {
                "energy": 1,
                "luck": 13,
                "trust": 5
              },
              "tags": [
                "smart"
              ]
            }
          ]
        },
        {
          "id": "road-18",
          "act": 5,
          "type": "event",
          "title": "El último desvío",
          "text": "Hay un cartel a 6 kilómetros: «Centro de evacuación». No sabéis si sigue abierto.",
          "choices": [
            {
              "id": "go",
              "label": "Ir",
              "hint": "Seis kilómetros no son muchos cuando el final tiene nombre.",
              "effects": {
                "energy": -8,
                "luck": 24,
                "morale": 8
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "stay",
              "label": "Seguir a vuestro destino",
              "hint": "No desviarse cuando ya casi habéis llegado.",
              "effects": {
                "energy": -5,
                "luck": 15,
                "trust": 5
              },
              "tags": [
                "safe"
              ]
            }
          ]
        },
        {
          "id": "road-19",
          "act": 5,
          "type": "secret",
          "title": "La última decisión",
          "text": "El coche vibra. Podéis apagar el aire acondicionado y ahorrar combustible o mantenerlo para llegar con vosotros enteros.",
          "choices": [
            {
              "id": "save",
              "label": "Ahorrar combustible",
              "hint": "Llegar primero; respirar después.",
              "effects": {
                "luck": 19,
                "energy": -6,
                "trust": 5
              },
              "tags": [
                "risk"
              ]
            },
            {
              "id": "comfort",
              "label": "Mantenerlo",
              "hint": "No todo debe convertirse en una prueba de resistencia.",
              "effects": {
                "health": 6,
                "energy": -7,
                "morale": 8,
                "trust": 9
              },
              "tags": [
                "kind"
              ]
            },
            {
              "id": "middle",
              "label": "Reducirlo",
              "hint": "Aceptar una pérdida moderada en ambos lados.",
              "effects": {
                "luck": 14,
                "energy": -4,
                "trust": 8,
                "morale": 6
              },
              "tags": [
                "balanced"
              ]
            }
          ]
        },
        {
          "id": "road-20",
          "act": 5,
          "type": "event",
          "title": "Los primeros edificios",
          "text": "La carretera entra en una zona poblada. Tenéis una última curva.",
          "choices": [
            {
              "id": "keep",
              "label": "No parar",
              "hint": "Llegar mientras aún haya luz.",
              "effects": {
                "energy": -7,
                "luck": 22,
                "morale": 9
              },
              "tags": [
                "brave"
              ]
            },
            {
              "id": "slow",
              "label": "Tomarlo con calma",
              "hint": "Ya no merece la pena arriesgarlo al final.",
              "effects": {
                "health": 5,
                "luck": 17,
                "trust": 6
              },
              "tags": [
                "safe"
              ]
            }
          ]
        }
      ],
      "endings": [
        {
          "minScore": 90,
          "title": "Llegar de día",
          "text": "El depósito marca vacío cuando aparece la primera gasolinera. No habéis llegado con margen, pero sí juntos.",
          "rank": "EXTRAORDINARIO"
        },
        {
          "minScore": 72,
          "title": "La carretera termina",
          "text": "Llegáis cuando el cielo ya está cambiando de color. Lo peor queda detrás.",
          "rank": "SUPERVIVIENTES"
        },
        {
          "minScore": 50,
          "title": "A pie",
          "text": "El coche no llega con vosotros, pero conseguís alcanzar una zona con cobertura.",
          "rank": "AL LÍMITE"
        },
        {
          "minScore": 0,
          "title": "Sin gasolina",
          "text": "La carretera gana antes del último tramo. Aún queda una salida, pero no era la que esperabais.",
          "rank": "NO ESTA VEZ"
        }
      ]
    }
  ]
};
window.GAME_DATA = GAME_DATA;
