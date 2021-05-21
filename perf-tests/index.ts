import { execute as executeConsoleLogPerfTest } from './console-log.perf-test';
import { execute as executeMessaggioBoxPerfTest } from './messaggio-box.perf-test';
import { execute as executeMessaggioLinePerfTest } from './messaggio-line.perf-test';

const messagesTotal = 10000;

const consoleLogResult = executeConsoleLogPerfTest(messagesTotal);
const messaggioBoxResult = executeMessaggioBoxPerfTest(messagesTotal);
const messaggioLineResult = executeMessaggioLinePerfTest(messagesTotal);

console.log('\n');
console.log('#### console.log Performance Test Result ####');

console.log(`[${messagesTotal} Total Messages] Total time (ms) to stdout: ${consoleLogResult.timeTotalInMs}`);
console.log(`[${messagesTotal} Total Messages] Avg time (ms) to stdout per message: ${consoleLogResult.timeTotalAvgInMs}`);
console.log(`[${messagesTotal} Total Messages] Total time (s) to stdout: ${consoleLogResult.timeTotalInS}`);
console.log(`[${messagesTotal} Total Messages] Avg time (s) to stdout per message: ${consoleLogResult.timeTotalAvgInS}`);
console.log(`[${messagesTotal} Total Messages] # of messages per second to stdout: ${(consoleLogResult.messagesPerS)}`);



console.log('\n');
console.log('#### Messagio Box Performance Test Result ####');

console.log(`[${messagesTotal} Total Messages] Total time (ms) to stdout: ${messaggioBoxResult.timeTotalInMs}`);
console.log(`[${messagesTotal} Total Messages] Avg time (ms) to stdout per message: ${messaggioBoxResult.timeTotalAvgInMs}`);
console.log(`[${messagesTotal} Total Messages] Total time (s) to stdout: ${messaggioBoxResult.timeTotalInS}`);
console.log(`[${messagesTotal} Total Messages] Avg time (s) to stdout per message: ${messaggioBoxResult.timeTotalAvgInS}`);
console.log(`[${messagesTotal} Total Messages] # of messages per second to stdout: ${(messaggioBoxResult.messagesPerS)}`);



console.log('\n');
console.log('#### Messagio Line Performance Test Results ####');

console.log(`[${messagesTotal} Total Messages] Total time (ms) to stdout: ${messaggioLineResult.timeTotalInMs}`);
console.log(`[${messagesTotal} Total Messages] Avg time (ms) to stdout per message: ${messaggioLineResult.timeTotalAvgInMs}`);
console.log(`[${messagesTotal} Total Messages] Total time (s) to stdout: ${messaggioLineResult.timeTotalInS}`);
console.log(`[${messagesTotal} Total Messages] Avg time (s) to stdout per message: ${messaggioLineResult.timeTotalAvgInS}`);
console.log(`[${messagesTotal} Total Messages] # of messages per second to stdout: ${(messaggioLineResult.messagesPerS)}`);