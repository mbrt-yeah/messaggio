import { LOG_LEVEL } from './log-level';
import { COLOR_NAME } from './color-name';

/**
 * The schema of a Messaggio message
 */
export type MessaggioMessageDefinition = {
    boxColor?: COLOR_NAME,
    logLevel: LOG_LEVEL,
    name: string,
    parts: {
        timestamp: {
            enabled: boolean,
            style?: {
                color?: COLOR_NAME
            },
            value?: Date
        }
        prefix: {
            enabled: boolean,
            value?: string,
            style?: {
                color?: COLOR_NAME
            }
        },
        symbol: {
            enabled: boolean,
            value?: string,
            style?: {
                color?: COLOR_NAME
            } 
        },
        label: {
            enabled: boolean,
            value: string,
            style?: {
                color?: COLOR_NAME
            }
        },
        text: {
            enabled: boolean,
            value?: string,
            style?: {
                color?: COLOR_NAME
            }
        },
        suffix: {
            enabled: boolean,
            value?: string,
            style?: {
                color?: COLOR_NAME
            }
        }
    },
    requiresUserInput?: boolean
};