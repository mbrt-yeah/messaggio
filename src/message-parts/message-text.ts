import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { AbstractText } from './abstract-text';
import { Style } from './style';

/**
 * This class represents the text of a messaggio message
 */
export class MessageText extends AbstractText {

    /**
     * Creates a new instance of MessageText
     * 
     * @param value - The textual value of the message text
     * @param style - The style of the message text
     * @param enabled - A flag indicating if the message text is enabled and thus should be displayed
     */
    public constructor(value: string, style: Style, enabled: boolean) {
        let valueVW = 0;

        if (value) {
            valueVW = stringWidth(value);
        }

        super(value, style, enabled, valueVW);
    }

    /**
     * Serializes the MessageText instance a string
     * 
     * @returns The serialized MessageText instance
     */
    public toString(): string {
        return c[this.style.color](this.value);
    }

    /**
     * Creates a new instance of MessageText
     * 
     * @param data - All instance data
     * @returns A new instance of MessageText
     */
    public static createOne(data: any): MessageText {
        const style = Style.createOne(data.style);
        return new MessageText(data.value, style, data.enabled);
    }
}