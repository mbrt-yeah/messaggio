import * as process from 'process';
import { Messagio } from '../src/messagio';

import { PerfTestResult } from './perf-test-result';

export const execute = function(messagesTotal: number): PerfTestResult {
    const messaggioBox = new Messagio({
        scope: 'mtfm-cli',
        messageFormat: 'box'
    });

    let timeTotalInNs: number = 0;

    let i = 0, j = 0;

    for (i; i < messagesTotal; i++) {
        const hrStart = process.hrtime();

        messaggioBox.info('A very very long test message.');

        const hrend = process.hrtime(hrStart);

        timeTotalInNs += hrend[1];
    }

    const result = new PerfTestResult();
    result.timeTotalInMs = timeTotalInNs / 1000000;
    result.timeTotalInS = result.timeTotalInMs / 1000;
    result.timeTotalAvgInMs = result.timeTotalInMs / messagesTotal;
    result.timeTotalAvgInS = result.timeTotalInS/ messagesTotal;
    result.messagesPerS = messagesTotal / result.timeTotalInS;
    return result;
}