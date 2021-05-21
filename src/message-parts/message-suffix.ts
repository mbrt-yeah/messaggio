import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { AbstractText } from './abstract-text';
import { Style } from './style';

/**
 * This class represents the suffix of a messaggio message
 */
export class MessageSuffix extends AbstractText {

    /**
     * Creates a new instance of MessageSuffix
     * 
     * @param value - The textual value of the message suffix
     * @param style - The style of the message suffix
     * @param enabled - A flag indicating if the message suffix is enabled and thus should be displayed
     */
    public constructor(value: string, style: Style, enabled: boolean) {
        let valueVW = 0;

        if (value) {
            valueVW = stringWidth(value);
        }

        super(value, style, enabled, valueVW);
    }

    /**
     * Serializes the MessageSuffix instance to a string
     * 
     * @returns The serialized MessageSuffix instance
     */
    public toString(): string {
        return c[this.style.color](this.value);
    }

    /**
     * Creates a new instance of MessageSuffix
     * 
     * @param data - All instance data
     * @returns A new instance of MessageSuffix
     */
    public static createOne(data: any): MessageSuffix {
        const style = Style.createOne(data.style);
        return new MessageSuffix(data.value, style, data.enabled);
    }
}