import { Style } from './style';
import { SerializableInterface } from './serializable-interface';

/**
 * The abstract class represents a textual message part
 */
export abstract class AbstractText implements SerializableInterface {

    /**
     * A flag indicating if the message part is enabled and thus should be displayed
     */
    public enabled: boolean;

    /**
     * The textual value of the message part
     */
    public value: string;

    /**
     * The style of the message part
     */
    public style: Style;

    /**
     * The visual width of the message part
     */
    public visualWidth: number;

    /**
     * Creates an instance of the textual message part
     * 
     * @param [value] - The textual value of the message part
     * @param style - The style of the message part
     * @param [enabled] - A flag indicating if the message part is enabled and thus should be displayed
     * @param visualWidth - The visual width of the message part
     */
    public constructor(value: string = '', style: Style, enabled: boolean = true, visualWidth: number) {
        this.enabled = enabled;
        this.value = value;
        this.style = style;
        this.visualWidth = visualWidth;
    }

    /**
     * Serializes the AbstractText instance to string
     * 
     * @returns The serialized AbstractText instance
     */
    public abstract toString(): string;
}