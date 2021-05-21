import * as figures from 'figures';

import { MessaggioOptions } from './messaggio-options';
import { COLOR_NAME } from './color-name';
import { LOG_LEVEL } from './log-level';
import { UNICODE_CHARACTERS } from './unicode-characters';

/**
 * The default options with which a new Messaggio instance is instantiated
 */
export const messaggioOptionsDefault: MessaggioOptions = {
    alignLongLinesHorizontally: true,
    messageFormat: 'line',
    messageTypes: {
        'debug': {
            boxColor: COLOR_NAME.MAGENTA,
            logLevel: LOG_LEVEL.DEBUG,
            name: 'debug',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.bullet,
                    style: {
                        color: COLOR_NAME.MAGENTA
                    }
                },
                label: {
                    enabled: true,
                    value: 'debug',
                    style: {
                        color: COLOR_NAME.MAGENTA
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'error': {
            boxColor: COLOR_NAME.RED,
            logLevel: LOG_LEVEL.ERROR,
            name: 'error',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.cross,
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                label: {
                    enabled: true,
                    value: 'error',
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'fatal': {
            boxColor: COLOR_NAME.RED,
            logLevel: LOG_LEVEL.FATAL,
            name: 'fatal',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.cross,
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                label: {
                    enabled: true,
                    value: 'fatal error',
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                    
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'info': {
            boxColor: COLOR_NAME.BLUE,
            logLevel: LOG_LEVEL.INFO,
            name: 'info',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.info,
                    style: {
                        color: COLOR_NAME.BLUE
                    }
                },
                label: {
                    enabled: true,
                    value: 'info',
                    style: {
                        color: COLOR_NAME.BLUE
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'warning': {
            boxColor: COLOR_NAME.YELLOW,
            logLevel: LOG_LEVEL.WARN,
            name: 'warn',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.warning,
                    style: {
                        color: COLOR_NAME.YELLOW
                    }
                },
                label: {
                    enabled: true,
                    value: 'warning',
                    style: {
                        color: COLOR_NAME.YELLOW
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                    
                }
            }
        },
        'success': {
            boxColor: COLOR_NAME.GREEN,
            logLevel: LOG_LEVEL.INFO,
            name: 'success',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.tick,
                    style: {
                        color: COLOR_NAME.GREEN
                    }
                },
                label: {
                    enabled: true,
                    value: 'success',
                    style: {
                        color: COLOR_NAME.GREEN
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'questionYesNo': {
            boxColor: COLOR_NAME.CYAN,
            logLevel: LOG_LEVEL.INFO,
            name: 'questionYesNo',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: '?',
                    style: {
                        color: COLOR_NAME.CYAN
                    }
                },
                label: {
                    enabled: true,
                    value: 'question',
                    style: {
                        color: COLOR_NAME.CYAN
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    },
                    value: '(yes|no)' + UNICODE_CHARACTERS.SPACE
                }
            },
            requiresUserInput: true
        },
        'timerStart': {
            boxColor: COLOR_NAME.GREEN,
            logLevel: LOG_LEVEL.INFO,
            name: 'timerStart',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.play,
                    style: {
                        color: COLOR_NAME.GREEN
                    }
                },
                label: {
                    enabled: true,
                    value: 'start',
                    style: {
                        color: COLOR_NAME.GREEN
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
        'timerStop': {
            boxColor: COLOR_NAME.RED,
            logLevel: LOG_LEVEL.INFO,
            name: 'timerStop',
            parts: {
                timestamp: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                prefix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                },
                symbol: {
                    enabled: true,
                    value: figures.square,
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                label: {
                    enabled: true,
                    value: 'stop',
                    style: {
                        color: COLOR_NAME.RED
                    }
                },
                text: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.WHITE
                    }
                },
                suffix: {
                    enabled: true,
                    style: {
                        color: COLOR_NAME.GREY
                    }
                }
            }
        },
    },
    scope: ''
}