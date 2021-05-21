export class PerfTestResult {
    public messagesPerS: number;
    public timeTotalAvgInMs: number;
    public timeTotalAvgInS: number;
    public timeTotalInMs: number;
    public timeTotalInS: number;

    public constructor() {
        this.messagesPerS = 0;
        this.timeTotalAvgInMs = 0;
        this.timeTotalAvgInS = 0;
        this.timeTotalInMs = 0;
        this.timeTotalInS = 0;
    }
}