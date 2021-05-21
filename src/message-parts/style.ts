import { COLOR_NAME } from '../color-name';

/**
 * This class represents the style of a messagio message part
 */
export class Style {
    /**
     * The text color of the message part
     */
    public color: COLOR_NAME;

    /**
     * Creates an instance of Style.
     * 
     * @param color - The text color of the message part
     */
    public constructor(color: COLOR_NAME) {
        this.color = color;
    }

    /**
     * Creates a new instance of Style
     * 
     * @param data - All instance data
     * @returns A new instance of Style 
     */
    public static createOne(data: any): Style {
        if (!data) {
            return new Style(COLOR_NAME.WHITE);
        }

        const color = data.color || COLOR_NAME.WHITE;

        return new Style(color);
    }
}