/**
 * This class represents the payload of a messaggio message
 */
export class MessagePayload<T> {
    /**
     * The value of the payload
     */
    public value: T;

    /**
     * Creates an instance of MessagePayload
     * 
     * @param value - The value of the payload
     */
    public constructor(value: T) {
        this.value = value;
    }
}