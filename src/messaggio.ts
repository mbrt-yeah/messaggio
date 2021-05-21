import * as readline from 'readline';
import * as stringWidth from 'string-width';
import * as terminalSize from 'term-size';
import { Size } from 'term-size';

import { MessaggioOptions } from './messaggio-options';
import { messaggioOptionsDefault } from './messaggio-options-default';
import { MessagePayload } from './message-parts';
import { MessaggioMessage } from './messaggio-message';
import { MessaggioMessageDefinition } from './messaggio-message-definition';
import { MessaggioTimer } from './messaggio-timer';

/**
 * This class represents the API to the end user of Messaggio
 */
export class Messaggio {
    /**
     * The length of the longest label of all registred message types
     */
    private readonly longestLabelVW: number;

    /**
     * The options that have been passed to a Messaggio instance upon instantiation
     */
    private readonly options: MessaggioOptions;

    /**
     * A list of all currently running timers
     */
    private readonly timersRunning: Map<string, MessaggioTimer>;

    /**
     * The total number of timers currently running
     */
    private timersRunningTotal: number;

    /**
     * The dimensions of the terminal to which Messaggio outputs its messages 
     */
    private readonly terminalDimensions: Size;

    /**
     * Creates a new Messaggio instance
     * 
     * @param options Initialization Options
     * @returns A new Messaggio instance
     */
    public constructor(options: MessaggioOptions = {}) {
        const messageTypesFinal = Object.assign(messaggioOptionsDefault.messageTypes, options.messageTypes);

        const optionsFinal = Object.assign(messaggioOptionsDefault, options);
        optionsFinal.messageTypes = messageTypesFinal;

        this.options = messaggioOptionsDefault;
        this.longestLabelVW = this.determineVisualWidthOfLongestLabel();
        this.timersRunning = new Map<string, MessaggioTimer>();
        this.timersRunningTotal = 0;
        this.terminalDimensions = terminalSize();
    }

    /**
     * Displays a debug message
     * 
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public debug<T>(message: string, payload?: T): void {
        this.log<T>('debug', message, payload);
    }

    /**
     * Displays an error message
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public error<T>(message: string, payload?: T): void {
        this.log<T>('error', message, payload);
    }

    /**
     * Displays a fatal error message
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public fatal<T>(message: string, payload?: T): void {
        this.log<T>('fatal', message, payload);
    }

    /**
     * Displays an info message
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public info<T>(message: string, payload?: T): void {
        this.log<T>('info', message, payload);
    }

    /**
     * 
     * @param type - The type of the message
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public log<T>(type: string, message: string, payload?: T) {
        const messageDefinition = this.getMessageDefinitionByType(type);
        messageDefinition.parts.text.value = message;
        const messageInstance = MessaggioMessage.createOne(messageDefinition, this.options.messageFormat, this.options.scope);
        this.displayMessageInstance(messageInstance);
    }

    /**
     * Displays a success message
     * 
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public success<T>(message: string, payload?: T): void {
        this.log<T>('success', message, payload);
    }

    /**
     * Displays an warning message
     * 
     * @param message - The message text to display
     * @param payload - An optional payload
     */
    public warning<T>(message: string, payload?: T): void {
        this.log<T>('warning', message, payload);
    }

    /**
     * Displays a yes/no question to the user
     * 
     * @param message - The question text to display
     * @returns A promise with the answer to the yes/no question (true = yes and false = no)
     */
    public questionYesNo(question: string): Promise<boolean> {
        const messageDefinition = this.getMessageDefinitionByType('questionYesNo');
        messageDefinition.parts.text.value = question;

        const messageInstance = MessaggioMessage.createOne(messageDefinition, this.options.messageFormat, this.options.scope);
        const messageSerialized = messageInstance.toString(
            this.longestLabelVW, this.terminalDimensions.columns, this.options.alignLongLinesHorizontally);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve, reject) => {
            rl.question(messageSerialized, (answer: string) => {
                const answerNormalized = answer.toLowerCase();
                if (answerNormalized === 'y' || answerNormalized === 'yes') {
                    rl.close();
                    return resolve(true);
                }

                rl.close();
                resolve(false);
            });
        });
    }

    /**
     * Starts a timer
     * 
     * @param message - The message text to display
     * @param id - An optional timer-id
     */
    public startTimer(message: string, id?: string): string {
        if ( id && this.isTimerAlreadyRunning(id) ) {
            throw new Error(`A timer with the id of ${id} is already running.`);
        }

        if (!id) {
            id = `timer_${this.timersRunningTotal}`;
        }

        const timer = new MessaggioTimer(id, message);
        timer.start();

        this.timersRunning.set(timer.id, timer);
        this.timersRunningTotal += 1;

        const messageDefinition = this.getMessageDefinitionByType('timerStart');
        messageDefinition.parts.text.value = message;
        messageDefinition.parts.timestamp.value = timer.timeStart;

        const messageInstance = MessaggioMessage.createOne(messageDefinition, this.options.messageFormat, this.options.scope);

        this.displayMessageInstance(messageInstance);

        return timer.id;
    }

    /**
     * Stops a timer
     * 
     * @param id - The id of the timer
     */
    public stopTimer(id: string): void {
        if (!id) {
            throw new Error('Please provide an id of the timer you want to stop');
        }

        const timerRunning = this.timersRunning.get(id);

        if (!timerRunning) {
            throw new Error(`No timer with the id of ${id} found to stop.`);
        }

        const runningTime = timerRunning.stop();

        const messageDefinition = this.getMessageDefinitionByType('timerStop');
        messageDefinition.parts.text.value = timerRunning.message;
        messageDefinition.parts.suffix.value = `(${ runningTime.toPrecision(5) } s)`;

        const messageInstance = MessaggioMessage.createOne(messageDefinition, this.options.messageFormat, this.options.scope);

        this.timersRunning.delete(id);
        this.timersRunningTotal -= 1;

        this.displayMessageInstance(messageInstance);
    }

    /**
     * Determines the length of the longest label of all registred message types
     * 
     * @returns The length of the longest label
     */
    private determineVisualWidthOfLongestLabel(): number {
        let visualWidthFinal = 0;

        if (!this.options.messageTypes) {
            return visualWidthFinal;
        }

        const messageTypes = Object.entries(this.options.messageTypes);

        for (const [key, messageType] of messageTypes) {
            const visualWidthCurrent = stringWidth(messageType.parts.label.value);

            if (visualWidthCurrent > visualWidthFinal) {
                visualWidthFinal = visualWidthCurrent;
            }
        }

        return visualWidthFinal;
    }

    /**
     * Gets the message definition for a given message type
     * 
     * @param type - The type of the message
     * @returns The definition for the given message type
     */
    private getMessageDefinitionByType(type: string): MessaggioMessageDefinition {
        if (!this.options.messageTypes) {
            throw new Error(`No message type definitions`);
        }

        const messageDefinition = this.options.messageTypes[type];

        if (!messageDefinition) {
            throw new Error(`No message definition found for type ${type}`);
        }

        return messageDefinition;
    }

    /**
     * Checks if a timer is already running
     * 
     * @param id The id of the timer
     * @returns True if timer with id is running and false if otherwise.
     */
    private isTimerAlreadyRunning(id: string): boolean {
        return this.timersRunning.get(id) !== undefined;
    }

    /**
     * Displays an instantiated message to stdout
     * 
     * @param messageInstance - The instantiated message to display
     */
    private displayMessageInstance(messageInstance: MessaggioMessage): void {
        const messageInstanceSerialized = messageInstance.toString(
            this.longestLabelVW, this.terminalDimensions.columns, this.options.alignLongLinesHorizontally);
        process.stdout.write(messageInstanceSerialized + '\n');
    }
}