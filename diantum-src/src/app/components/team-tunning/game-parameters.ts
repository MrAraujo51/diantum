import {
  Injectable
} from '@angular/core';

@Injectable()
export class GameParameters {
  public colorByType
  public names
  public behav
  public performance
  public quality
  public actions

  constructor() {
    this.colorByType = {
      1: {
        green: 70,
        yellow: 20,
        red: 10,
      },
      2: {
        green: 20,
        yellow: 30,
        red: 50,
      },
      3: {
        green: 60,
        yellow: 30,
        red: 10,
      },
      4: {
        green: 10,
        yellow: 30,
        red: 60,
      }
    }

    this.names = {
      'm': ["Pablo", "Roberto", "David", "Jorge", "Pedro", "Eduardo", "Felipe", "Alberto"],
      'f': ["Sofía", "Alicia", "Ana", "Emilia", "Eva", "Sara", "Andrea", "Natalia"]
    }

    this.behav = {
      1: {
        planificacion: 3,
        priorizar: 3,
        coordinacion: 3,
        tomaDecisiones: 3,
        motivacion: 3,
        solProblemas: 3,
        transparencia: 3,
        calidad: 3,
        relacion: 3,
        formacion: 3,
        coaching: 3,
        carreraPro: 2
      },
      2: {
        planificacion: 3,
        priorizar: 3,
        coordinacion: 3,
        tomaDecisiones: 3,
        motivacion: 2,
        solProblemas: 3,
        transparencia: 3,
        calidad: 3,
        relacion: 2,
        formacion: 3,
        coaching: 3,
        carreraPro: 2
      },
      3: {
        planificacion: 1,
        priorizar: 1,
        coordinacion: 2,
        tomaDecisiones: 1,
        motivacion: 3,
        solProblemas: 2,
        transparencia: 3,
        calidad: 3,
        relacion: 2,
        formacion: 1,
        coaching: 1,
        carreraPro: 2
      },
      4: {
        planificacion: 3,
        priorizar: 3,
        coordinacion: 1,
        tomaDecisiones: 3,
        motivacion: 3,
        solProblemas: 1,
        transparencia: 2,
        calidad: 3,
        relacion: 1,
        formacion: 1,
        coaching: 1,
        carreraPro: 1
      },
      5: {
        planificacion: 1,
        priorizar: 2,
        coordinacion: 2,
        tomaDecisiones: 1,
        motivacion: 1,
        solProblemas: 1,
        transparencia: 1,
        calidad: 1,
        relacion: 2,
        formacion: 2,
        coaching: 2,
        carreraPro: 2
      },
      6: {
        planificacion: 2,
        priorizar: 1,
        coordinacion: 2,
        tomaDecisiones: 1,
        motivacion: 2,
        solProblemas: 1,
        transparencia: 1,
        calidad: 1,
        relacion: 1,
        formacion: 2,
        coaching: 2,
        carreraPro: 2
      },
      7: {
        planificacion: 1,
        priorizar: 1,
        coordinacion: 1,
        tomaDecisiones: 1,
        motivacion: 2,
        solProblemas: 1,
        transparencia: 1,
        calidad: 2,
        relacion: 2,
        formacion: 1,
        coaching: 1,
        carreraPro: 1
      },
      8: {
        planificacion: 2,
        priorizar: 1,
        coordinacion: 1,
        tomaDecisiones: 1,
        motivacion: 1,
        solProblemas: 1,
        transparencia: 1,
        calidad: 1,
        relacion: 1,
        formacion: 1,
        coaching: 1,
        carreraPro: 1
      }
    }

    this.performance = {
      1: {
        'green': [110, 150],
        'yellow': [90, 110],
        'red': [80, 90]
      },
      2: {
        'green': [110, 140],
        'yellow': [80, 110],
        'red': [70, 80]
      },
      3: {
        'green': [110, 130],
        'yellow': [90, 110],
        'red': [80, 90]
      },
      4: {
        'green': [100, 130],
        'yellow': [80, 100],
        'red': [70, 80]
      },
      5: {
        'green': [60, 80],
        'yellow': [40, 60],
        'red': [30, 40]
      },
      6: {
        'green': [60, 70],
        'yellow': [40, 60],
        'red': [30, 40]
      },
      7: {
        'green': [60, 80],
        'yellow': [40, 60],
        'red': [30, 40]
      },
      8: {
        'green': [50, 70],
        'yellow': [40, 50],
        'red': [30, 40]
      }
    }

    this.quality = {
      1: {
        'green': 100,
        'yellow': 100,
        'red': 90
      },
      2: {
        'green': 100,
        'yellow': 100,
        'red': 90
      },
      3: {
        'green': 100,
        'yellow': 100,
        'red': 90
      },
      4: {
        'green': 100,
        'yellow': 100,
        'red': 90
      },
      5: {
        'green': 80,
        'yellow': 70,
        'red': 60
      },
      6: {
        'green': 70,
        'yellow': 60,
        'red': 50
      },
      7: {
        'green': 70,
        'yellow': 60,
        'red': 50
      },
      8: {
        'green': 70,
        'yellow': 60,
        'red': 50
      }
    }

    this.actions = {
      1: {
        name: 'Promocionar',
        act: {
          1: {
            name: 'Acción de reconocimiento',
            time: 120,
            1: 3,
            2: 3,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          },
          2: {
            name: 'Reducir tiempo de supervision',
            time: 120,
            1: 3,
            2: 3,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          },
          3: {
            name: 'Acción de mentoring',
            time: 480,
            1: 3,
            2: 3,
            3: 2,
            4: 2,
            5: 2,
            6: 2,
            7: 2,
            8: 2
          },
          4: {
            name: 'Dar feedback positivo',
            time: 120,
            1: 3,
            2: 3,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          },
          5: {
            name: 'Organizar que sea coacher de otros',
            time: 480,
            1: 3,
            2: 2,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          },
          6: {
            name: 'Promover que sea formador de otros',
            time: 480,
            1: 2,
            2: 3,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          },
          7: {
            name: 'Compartir información de sus logros',
            time: 240,
            1: 3,
            2: 3,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          }
        }

      },
      2: {
        name: 'Eliminar dependencia',
        act: {
          1: {
              name: 'Reducir o eliminar la  implicación en sus temas',
              time: 120,
              1: 3,
              2: 3,
              3: 3,
              4: 3,
              5: 1,
              6: 1,
              7: 1,
              8: 1
          },
          2: {
              name: 'Enseñar a buscar soluciones antes de ir a preguntar',
              time: 240,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 2,
              6: 2,
              7: 1,
              8: 1
          },
          3: {
              name: 'Enseñar a ir a las reuniones con respuestas a los problemas',
              time: 480,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 2,
              6: 2,
              7: 1,
              8: 1
          },
          4: {
              name: 'Enseñar a planificar en sustitución de hacer looby',
              time: 240,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 1,
              6: 1,
              7: 1,
              8: 1
          },
          5: {
              name: 'Enseñar a priorizar y tomar decisiones',
              time: 480,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 1,
              6: 1,
              7: 1,
              8: 1
          },
          6: {
              name: 'Eliminar interacciones improvisadas y mantener solo las planificadas',
              time: 240,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 1,
              6: 1,
              7: 1,
              8: 1
          },
          7: {
              name: 'Seguimiento de los progresos en eliminar dependencia',
              time: 120,
              1: 1,
              2: 1,
              3: 3,
              4: 1,
              5: 1,
              6: 1,
              7: 1,
              8: 1
          }
        }
      },
      3: {
        name: 'Eliminar Fricciones',
        act: {
          1: {
            name: 'Explicar el impacto de su comportamiento en el equipo',
            time: 120,
            1: 2,
            2: 2,
            3: 2,
            4: 3,
            5: 3,
            6: 3,
            7: 3,
            8: 3
          },
          2: {
            name: 'Dejar de solucionar los problemas que crea',
            time: 480,
            1: 1,
            2: 1,
            3: 2,
            4: 3,
            5: 1,
            6: 1,
            7: 2,
            8: 2
          },
          3: {
            name: 'Plan de acción para cambiar comportamientos',
            time: 240,
            1: 1,
            2: 1,
            3: 3,
            4: 3,
            5: 3,
            6: 3,
            7: 1,
            8: 3
          },
          4: {
            name: 'Vincular cumplimiento de sus objetivos a su cambio de comportamientos',
            time: 240,
            1: 1,
            2: 1,
            3: 2,
            4: 3,
            5: 3,
            6: 3,
            7: 1,
            8: 3
          },
          5: {
            name: 'Formación en habiliadades gerenciales',
            time: 240,
            1: 1,
            2: 1,
            3: 3,
            4: 3,
            5: 2,
            6: 2,
            7: 2,
            8: 2
          },
          6: {
            name: 'Acción de coaching',
            time: 480,
            1: 1,
            2: 1,
            3: 3,
            4: 3,
            5: 1,
            6: 1,
            7: 3,
            8: 1
          },
          7: {
            name: 'Seguimiento de los progresos en eliminar fricciones',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 3,
            5: 1,
            6: 1,
            7: 1,
            8: 1
          }
        }
      },
      4: {
        name: 'Aumentar su implicación',
        act: {
          1: {
            name: 'Implicarle para dar mas de si',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 1,
            7: 1,
            8: 3
          },
          2: {
            name: 'Clarificar lo que se espera de él',
            time: 240,
            1: 1,
            2: 1,
            3: 2,
            4: 2,
            5: 3,
            6: 3,
            7: 1,
            8: 3
          },
          3: {
            name: 'Conciliar su descripción del puesto y sus objetivos',
            time: 240,
            1: 1,
            2: 1,
            3: 2,
            4: 2,
            5: 3,
            6: 3,
            7: 2,
            8: 3
          },
          4: {
            name: 'Reunión de revisión del nivel de desempeño',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 3,
            7: 3,
            8: 3
          },
          5: {
            name: 'Invitarle a explicar lo que hace',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 3,
            7: 2,
            8: 3
          },
          6: {
            name: 'Sesión de motivación',
            time: 240,
            1: 2,
            2: 2,
            3: 2,
            4: 2,
            5: 3,
            6: 1,
            7: 2,
            8: 2
          },
          7: {
            name: 'Seguimiento de los progresos en aumentar su implicación',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 1,
            7: 1,
            8: 2
          }
        }
      },
      5: {
        name: 'Refocalizar',
        act: {
          1: {
            name: 'Evaluar sus competencias para el puesto',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 3,
            7: 3,
            8: 2
          },
          2: {
            name: 'Establecer límite de actuación y eliminar distracciones',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 3,
            7: 1,
            8: 2
          },
          3: {
            name: 'Definir sus funciones y responsabilidades',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 3,
            7: 3,
            8: 3
          },
          4: {
            name: 'Revisar los detalles de cómo consume su tiempo',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 3,
            7: 2,
            8: 3
          },
          5: {
            name: 'Acción de monitorizar su actividad',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 3,
            7: 2,
            8: 2
          },
          6: {
            name: 'Seguimiento de los progresos de refocalización',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 3,
            7: 1,
            8: 2
          },
          7: {
            name: 'Ayudarle a encontrar otra función y reemplazar el recurso',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 0,
            7: 0,
            8: 0
          }
        }
      },
      6: {
        name: 'Alinear competencias a las necesidades del puesto de trabajo',
        act: {
          1: {
            name: 'Explicar que el rendimiento actual es inaceptable',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 3,
            8: 3
          },
          2: {
            name: 'Reunión de revisión del nivel de desempeño',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 3,
            7: 3,
            8: 2
          },
          3: {
            name: 'Recopilar las evaluaciones del desempeño anteriores',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 3,
            6: 3,
            7: 3,
            8: 3
          },
          4: {
            name: 'Establecer un plan de mejora incluyendo formación y/o coaching',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 2,
            7: 3,
            8: 3
          },
          5: {
            name: 'Acciones de training y coaching para adecuar competencias a la función',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 2,
            7: 3,
            8: 2
          },
          6: {
            name: 'Seguimiento de los progresos mejorando competencias para el puesto',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 1,
            6: 1,
            7: 3,
            8: 1
          },
          7: {
            name: 'Ayudarle a encontrar otra función y reemplazar el recurso',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 0,
            7: 0,
            8: 0
          }
        }
      },
      7: {
        name: 'Desbloquear la motivación',
        act: {
          1: {
            name: 'Explicar que el comportamiento actual es inaceptable',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 1,
            6: 2,
            7: 1,
            8: 3
          },
          2: {
            name: 'Poner una fecha límite para cambiar de actitud',
            time: 120,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 1,
            6: 2,
            7: 1,
            8: 3
          },
          3: {
            name: 'Documentar expectativas sobre el rendimiento y el  puesto',
            time: 240,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 3,
            8: 3
          },
          4: {
            name: 'Plan de acción para conseguir la remotivación',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 3
          },
          5: {
            name: 'Positivar los efectos de un cambio de actitud',
            time: 240,
            1: 1,
            2: 1,
            3: 2,
            4: 2,
            5: 2,
            6: 2,
            7: 1,
            8: 3
          },
          6: {
            name: 'Acciones de formación o coaching',
            time: 240,
            1: 2,
            2: 2,
            3: 3,
            4: 3,
            5: 1,
            6: 2,
            7: 2,
            8: 3
          },
          7: {
            name: 'Ayudarle a encontrar otra función y reemplazar el recurso',
            time: 480,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 0,
            7: 0,
            8: 0
          }
        }
      }
    }
  }
}