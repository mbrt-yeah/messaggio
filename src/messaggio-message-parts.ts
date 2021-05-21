import { 
    MessageLabel,
    MessagePayload,
    MessagePrefix,
    MessageSuffix,
    MessageSymbol,
    MessageText,
    MessageTimestamp
} from './message-parts';

/**
 * The parts of a MessaggioMessage instance
 */
export type MessaggioMessageParts = {
    timestamp: MessageTimestamp,
    prefix: MessagePrefix,
    symbol: MessageSymbol,
    label: MessageLabel,
    text: MessageText,
    suffix: MessageSuffix,
    payload?: MessagePayload<any>
};