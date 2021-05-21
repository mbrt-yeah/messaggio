import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { AbstractText } from './abstract-text';
import { Style } from './style';

/**
 * This class represents the symbol of a messaggio message
 */
export class MessageSymbol extends AbstractText {

    /**
     * Creates a new instance of MessageSymbol
     * 
     * @param value - The textual value of the message symbol
     * @param style - The style of the message symbol
     * @param enabled - A flag indicating if the message symbol is enabled and thus should be displayed
     */
    public constructor(value: string, style: Style, enabled: boolean) {
        let valueVW = 0;

        if (value) {
            valueVW = stringWidth(value);
        }

        super(value, style, enabled, valueVW);
    }

    /**
     * Serializes the MessageSymbol instance a string
     * 
     * @returns The serialized MessageSymbol instance
     */
    public toString(): string {
        return c[this.style.color](this.value);
    }

    /**
     * Creates a new instance of MessageSymbol
     * 
     * @param data - All instance data
     * @returns A new instance of MessageSymbol
     */
    public static createOne(data: any): MessageSymbol {
        const style = Style.createOne(data.style);
        return new MessageSymbol(data.value, style, data.enabled);
    }
}