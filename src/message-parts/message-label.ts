import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { AbstractText } from './abstract-text';
import { Style } from './style';

/**
 * This class represents the label of a messaggio message
 */
export class MessageLabel extends AbstractText {

    /**
     * Creates a new instance of MessageLabel
     * 
     * @param value - The textual value of the message label
     * @param style - The style of the message label
     * @param enabled - A flag indicating if the message label is enabled and thus should be displayed
     */
    public constructor(value: string, style: Style, enabled: boolean) {
        let valueVW = 0;

        if (value) {
            valueVW = stringWidth(value);
        }

        super(value, style, enabled, valueVW);
    }

    /**
     * Serializes the MessageLabel instance a string
     * 
     * @returns The serialized MessageLabel instance
     */
    public toString(): string {
        return c[this.style.color](this.value);
    }

    /**
     * Creates a new instance of MessageLabel
     * 
     * @param data - All instance data
     * @returns A new instance of MessageLabel
     */
    public static createOne(data: any): MessageLabel {
        const style = Style.createOne(data.style);
        return new MessageLabel(data.value, style, data.enabled);
    }
}