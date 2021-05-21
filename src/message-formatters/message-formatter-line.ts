import * as c from 'ansi-colors';
import * as os from 'os';
import * as stringWidth from 'string-width';
import * as terminalSize from 'term-size';

import { UNICODE_CHARACTERS } from '../unicode-characters';

import { MessageFormatterInterface } from './message-formatter-interface';
import { MessaggioMessage } from '../messaggio-message';

export class MessageFormatterLine implements MessageFormatterInterface {
    private alignLongLinesFlag: boolean;
    private longestLabelVisualWidth: number;
    private message: MessaggioMessage;
    private terminalVisualWidth: number;

    public constructor(message: MessaggioMessage, longestLabelVisualWidth: number, terminalVisualWidth?: number, alignLongLinesFlag = true) {
        this.alignLongLinesFlag = alignLongLinesFlag;
        this.longestLabelVisualWidth = longestLabelVisualWidth;
        this.message = message;
        this.terminalVisualWidth = (terminalVisualWidth) ? terminalVisualWidth : terminalSize().columns;
    }

    public execute(): string {
        const parts = this.message.parts;

        const timestamp = parts.timestamp.toString() + UNICODE_CHARACTERS.SPACE;

        let prefix = '';
        let timestampPrefixSeparator = '';

        if (parts.prefix.visualWidth > 0) {
            prefix = parts.prefix.toString() + UNICODE_CHARACTERS.SPACE;
            timestampPrefixSeparator += c.grey('»') + UNICODE_CHARACTERS.SPACE;
        }

        const symbol = parts.symbol.toString() + UNICODE_CHARACTERS.SPACE;

        let label = parts.label.toString()
        label += UNICODE_CHARACTERS.SPACE.repeat(this.longestLabelVisualWidth - this.message.parts.label.visualWidth + 1);

        const text = parts.text.toString() + UNICODE_CHARACTERS.SPACE;
        const suffix = parts.suffix.toString();

        const preTextPart = timestamp + timestampPrefixSeparator + prefix + symbol + label;
        let textAndSuffixPart = text + suffix;

        if (!this.alignLongLinesFlag) {
            return preTextPart + textAndSuffixPart;
        }

        return this.alignLongLines(preTextPart, textAndSuffixPart);
    }

    private alignLongLines(preTextPart: string, textAndSuffixPart: string): string {
        const preTextPartVW = stringWidth(preTextPart);
        const textAndSuffixPartVW = stringWidth(textAndSuffixPart);

        const textAndSuffixPartAvailableVW = this.terminalVisualWidth - preTextPartVW;

        if (textAndSuffixPartAvailableVW < textAndSuffixPartVW) {
            const regex = new RegExp(`(.{${textAndSuffixPartAvailableVW}})`, 'g');
            textAndSuffixPart = textAndSuffixPart.replace(regex,`$1${os.EOL}${UNICODE_CHARACTERS.SPACE.repeat(preTextPartVW)}`);
        }

        return preTextPart + textAndSuffixPart;
    }
}