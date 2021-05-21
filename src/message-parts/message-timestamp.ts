import * as c from 'ansi-colors';
import * as stringWidth from 'string-width';

import { Style } from './style';
import { SerializableInterface } from './serializable-interface';

/**
 * This class represents the timestamp of a messaggio message
 */
export class MessageTimestamp implements SerializableInterface {
    /**
     * A flag indicating if the timestamp is enabled and thus should be displayed
     */
    public enabled: boolean;

    /**
     * The value of the timestamp
     */
    public value: Date;

    /**
     * The style of the timestamp
     */
    public style: Style;

    /**
     * The visual width of the timestamp
     */
    public visualWidth: number;

    /**
     * The serialized version of the timestamp value
     */
    private valueStringyfied: string;

    /**
     * Creates a new instance of MessageTimestamp
     * 
     * @param value The value of the timestamp
     * @param style The style of the timestamp
     * @param [enabled] A flag indicating if the message text is enabled and thus should be displayed (default: true)
     */
    public constructor(value: Date, style: Style, enabled: boolean = true) {
        this.value = value;
        this.style = style;
        this.enabled = enabled;

        this.valueStringyfied = c[this.style.color](`[${this.formatValue()}]`);
        this.visualWidth = stringWidth(this.valueStringyfied);
    }

    /**
     * Serializes the MessageTimestamp instance a string
     * 
     * @returns The serialized MessageTimestamp instance
     */
    public toString(): string {
        return this.valueStringyfied;
    }

    /**
     * Tranforms the value of the MessageTimestamp instance in human-readable format
     * 
     * @returns value - The value of the MessageTimestamp instance in human-readable format
     */
    private formatValue(): string {
        const datePortion = [
            this.value.getFullYear(),
            this.value.getMonth(),
            this.value.getDate()
        ];

        const timePortion = [
            this.value.getHours(),
            this.value.getMinutes(),
            this.value.getSeconds()
        ];

        return `${datePortion.join('-')} ${timePortion.join(':')}`;
    }

    /**
     * Creates a new instance of MessageTimestamp
     * 
     * @param data - All instance data
     * @returns A new instance of MessageTimestamp
     */
    public static createOne(data: any) {
        const date = new Date();
        const style = Style.createOne(data.style);
        return new MessageTimestamp(date, style, data.enabled);
    }
}