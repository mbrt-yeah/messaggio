import * as stringWidth from 'string-width';

import { LOG_LEVEL } from './log-level';

import { 
    MessageLabel,
    MessagePayload,
    MessagePrefix,
    MessageSuffix,
    MessageSymbol,
    MessageText,
    MessageTimestamp,
} from './message-parts';

import { MessageFormatterBox, MessageFormatterInterface, MessageFormatterLine } from './message-formatters';
import { MessaggioMessageDefinition } from './messaggio-message-definition';
import { MessaggioMessageFormat } from './messaggio-message-format';
import { MessaggioMessageParts } from './messaggio-message-parts';
import { COLOR_NAME } from './color-name';

/**
 * This class represents a Messaggio message
 */
export class MessaggioMessage {
    /**
     * Box color of messaggio message
     */
    public boxColor?: COLOR_NAME;

    /**
     * The format in which the messages should be displayed
     */
    public format: MessaggioMessageFormat;

    /**
     * The log level of the message
     */
    public logLevel: LOG_LEVEL;

    /**
     * The parts of which the message is composed of
     */
    public parts: MessaggioMessageParts;

    /**
     * The visual width (vw) of the longest message part
     */
    public readonly longestPartVW: number;

    /**
     * Creates an instance of MessaggioMessage
     * 
     * @param parts - The parts of which the message is composed of
     * @param logLevel - The log level of the message
     * @param [format] - The format in which the messages should be displayed (default: line)
     */
    public constructor(parts: MessaggioMessageParts, logLevel: LOG_LEVEL, format: MessaggioMessageFormat = 'line') {
        this.format = format;
        this.logLevel = logLevel;
        this.parts = parts;
        this.longestPartVW = 0; // this.determineVisualWidthOfLongestPart();
    }

    /**
     * Gets the payload of the message
     * 
     * @template T 
     * @returns The payload of the message
     */
    public getPayload<T>(): MessagePayload<T> {
        return this.parts.payload as MessagePayload<T>;
    } 

    /**
     * Sets the payload of the message
     * @template T 
     * @param payload - The payload of the message
     */
    public setPayload<T>(payload: MessagePayload<T>): void {
        this.parts.payload = payload;
    }

    /**
     * Serializes as message to a string
     * 
     * @param longestLabelVisualWidth - The visual width of the longest label of all message types registered with the Messaggio instance
     * @param terminalVisualWidth - The visual width of the terminal in which the message should be displayed
     * @param [alignLongLines] - A flag indicating if long lines should be aligned horizontally
     * @returns The serialized message
     */
    public toString(longestLabelVisualWidth: number, terminalVisualWidth: number, alignLongLines: boolean = true): string {
        let messageFormatter: MessageFormatterInterface;

        if (this.format === 'box') {
            messageFormatter = new MessageFormatterBox(this, terminalVisualWidth);
        } else {
            messageFormatter = new MessageFormatterLine(this, longestLabelVisualWidth, terminalVisualWidth, alignLongLines);
        }

        return messageFormatter.execute();
    }

    /**
     * Determines the visual width (vw) of the longest message part
     * 
     * @returns The visual width of longest message part
     */
    private determineVisualWidthOfLongestPart(): number {
        let vWFinal = 0;

        if (!this.parts) {
            return vWFinal;
        }

        const parts = Object.entries(this.parts);

        for (const [key, part] of parts) {
            if (!part || !part.value) {
                continue;
            }

            const vWCurrent = stringWidth(part.value);

            if (vWCurrent > vWFinal) {
                vWFinal = vWCurrent;
            }
        }

        return vWFinal;
    }

    /**
     * Creates a new instance of MessaggioMessage
     * 
     * @param data - All instance data conforming to the Messaggio message schema
     * @param [format] - The format in which the messages should be displayed (default: line)
     * @param [scope] - The scope of the Messaggio instance 
     * @returns A new instance of MessaggioMessage
     */
    public static createOne(
        data: MessaggioMessageDefinition, format: MessaggioMessageFormat = 'line', scope: string = ''): MessaggioMessage {
        const parts = {
            timestamp: MessageTimestamp.createOne(data.parts.timestamp),
            prefix: MessagePrefix.createOne(data.parts.prefix, scope),
            symbol: MessageSymbol.createOne(data.parts.symbol),
            label: MessageLabel.createOne(data.parts.label),
            text: MessageText.createOne(data.parts.text),
            suffix: MessageSuffix.createOne(data.parts.suffix)
        };

        const message = new MessaggioMessage(parts, data.logLevel, format);
        message.boxColor = data.boxColor;
        return message;
    }
}