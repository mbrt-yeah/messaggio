/**
 * This class represents the Messaggio timer and its API
 */
export class MessaggioTimer {
    /**
     * The id of the timer
     */
    public id: string;

    /**
     * The message text to display
     */
    public message: string;

    /**
     * Time start time of the timer
     */
    public timeStart?: Date;

    /**
     * Time end time of the timer
     */
    public timeEnd?: Date;

    /**
     * Creates an instance of MessaggioTimer
     * 
     * @param id - The id of the timer
     * @param message - The message text to display
     */
    public constructor(id: string, message: string) {
        this.id = id;
        this.message = message;
    }

    /**
     * Starts the timer
     */
    public start(): void {
        this.timeStart = new Date();
    }

    /**
     * Stops the timer
     * 
     * @returns The total running time of the timer in milliseconds
     */
    public stop(): number {
        this.timeEnd = new Date();
        return this.calculateTimeTotalInMs();
    }

    /**
     * Calculates the total running time of the timer in milliseconds
     * 
     * @returns The total running time of the timer in milliseconds
     */
    private calculateTimeTotalInMs(): number {
        if (!this.timeStart || !this.timeEnd) {
            return 0;
        }

        const diffInMs = this.timeEnd.getTime() - this.timeStart.getTime();
        return diffInMs / 1000;
    }
}