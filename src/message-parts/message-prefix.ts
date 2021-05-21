import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { AbstractText } from './abstract-text';
import { Style } from './style';

/**
 * This class represents the prefix of a messaggio message
 */
export class MessagePrefix extends AbstractText {

    /**
     * Creates a new instance of MessagePrefix
     * 
     * @param value - The textual value of the message prefix
     * @param style - The style of the message prefix
     * @param enabled - A flag indicating if the message prefix is enabled and thus should be displayed
     */
    public constructor(value: string, style: Style, enabled: boolean) {
        const finalValue = (value) ? `[${value}]` : '';
        const finalValueVW = stringWidth(finalValue);
        super(finalValue, style, enabled, finalValueVW);
    }

    /**
     * Serializes the MessagePrefix instance to a string
     * 
     * @returns The serialized MessagePrefix instance
     */
    public toString(): string {
        return c[this.style.color](this.value);
    }

    /**
     * Creates a new instance of MessagePrefix
     * 
     * @param data - All instance data
     * @param [scope] - The scope of the Messaggio instance (default = '')
     * @returns A new instance of MessagePrefix
     */
    public static createOne(data: any, scope: string = ''): MessagePrefix {
        const style = Style.createOne(data.style);
        const value = (data.value) ? data.value : scope;
        return new MessagePrefix(value, style, data.enabled);
    }
}