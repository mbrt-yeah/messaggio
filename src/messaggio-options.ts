import { MessaggioMessageDefinition } from './messaggio-message-definition';
import { MessaggioMessageFormat } from './messaggio-message-format';

/**
 * The options with which a new Messaggio instance can be instantiated
 */
export type MessaggioOptions = {
    /**
     * A flag which enables/disables the horizontal alignment of long messages
     */
    alignLongLinesHorizontally?: boolean;
    
    /**
     * The format in which the messages should be displayed
     */
    messageFormat?: MessaggioMessageFormat
    
    /**
     * A list of message types
     */
    messageTypes?: { [key: string]: MessaggioMessageDefinition },
    
    /**
     * The scope of the new Messaggio instance
     */
    scope?: string
}