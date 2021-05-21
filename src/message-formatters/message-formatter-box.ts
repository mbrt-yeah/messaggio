import * as c from 'ansi-colors';
import * as os from 'os';
import * as stringWidth from 'string-width';
import * as terminalSize from 'term-size';

import { BOX_STYLES } from '../box-styles';
import { UNICODE_CHARACTERS } from '../unicode-characters';

import { BoxStyle } from '../box-style';
import { MessageFormatterInterface } from './message-formatter-interface';
import { MessageSymbol, MessageLabel, MessageTimestamp, MessagePrefix } from '../message-parts';
import { MessaggioMessage } from '../messaggio-message';
import { MessaggioMessageParts } from '../messaggio-message-parts';
import { COLOR_NAME } from '../color-name';

export class MessageFormatterBox implements MessageFormatterInterface {
    private boxStyle: BoxStyle;
    private boxColor: COLOR_NAME;
    private message: MessaggioMessage;
    private terminalVW: number;
    private readonly paddings: { [key: string]: number };
    private readonly minBoxVW: number;

    public constructor(message: MessaggioMessage, terminalVW?: number) {
        this.boxStyle = BOX_STYLES.singleLine;
        this.boxColor = message.boxColor || COLOR_NAME.WHITE;
        this.message = message;
        this.terminalVW = (terminalVW) ? terminalVW : terminalSize().columns;
        this.paddings = {t: 1, l: 2, b: 1, r: 2 };
        this.minBoxVW = this.paddings.l + this.paddings.r + 2;
    }

    public execute(): string {
        let boxFinal = '';

        const boxHeaderRow = this.drawHeaderRow(this.message.parts);
        const boxHeaderRowVW = stringWidth(boxHeaderRow);
        const boxBodyRows = this.drawBodyRows(this.message.parts, boxHeaderRowVW);
        const boxFooterRows = this.drawFooterRow(this.message.parts, boxHeaderRowVW);

        boxFinal += boxHeaderRow;
        boxFinal += boxBodyRows;
        boxFinal += boxFooterRows;

        return boxFinal;
    }

    private drawHeaderRow(parts: MessaggioMessageParts): string {
        let title = '';

        if (parts.symbol.enabled && parts.symbol.value) {
            title += UNICODE_CHARACTERS.SPACE + parts.symbol.toString() + UNICODE_CHARACTERS.SPACE;
        }

        if (parts.label.enabled && parts.label.value) {
            title += UNICODE_CHARACTERS.SPACE + parts.label.toString() + UNICODE_CHARACTERS.SPACE;
        }

        const titleVW = stringWidth(title);

        let headerFinal = '';

        headerFinal += os.EOL;
        headerFinal += c[this.boxColor](this.boxStyle.topLeft);
        headerFinal += c[this.boxColor]( this.boxStyle.horizontal.repeat(this.paddings.l) );
        headerFinal += title;

        const remainingTerminalVW = this.calculateRemainingTerminalVWRight(titleVW + this.minBoxVW);

        if (remainingTerminalVW > 0) {
            headerFinal += c[this.boxColor]( this.boxStyle.horizontal.repeat(remainingTerminalVW) );
            headerFinal += c[this.boxColor]( this.boxStyle.horizontal.repeat(this.paddings.r) );
        }

        headerFinal += c[this.boxColor](this.boxStyle.topRight);
        headerFinal += os.EOL;

        return headerFinal;
    }

    private drawBodyRows(parts: MessaggioMessageParts, headerRowVW: number): string {
        let bodyFinal = '';

        bodyFinal += this.drawEmptyRow(headerRowVW).repeat(this.paddings.t)

        if (
            (parts.timestamp.enabled && parts.timestamp.visualWidth >0) ||
            (parts.prefix.enabled && parts.prefix.visualWidth > 0) 
        ) {
            bodyFinal += this.drawTimestampAndPrefixRow(parts);
        }

        if (
            (parts.text.enabled && parts.text.visualWidth > 0) ||
            (parts.suffix.enabled && parts.suffix.visualWidth > 0)
         ) {
            bodyFinal += this.drawEmptyRow(headerRowVW);
            bodyFinal += this.drawTextAndSuffixRow(parts);
        }

        bodyFinal += this.drawEmptyRow(headerRowVW).repeat(this.paddings.b)

        return bodyFinal;
    }

    private drawEmptyRow(headerRowVW: number): string {
        let emptyRowFinal = '';

        emptyRowFinal += c[this.boxColor](this.boxStyle.vertical);
        emptyRowFinal += UNICODE_CHARACTERS.SPACE.repeat(headerRowVW - 2);
        emptyRowFinal += c[this.boxColor](this.boxStyle.vertical);
        emptyRowFinal += os.EOL;

        return emptyRowFinal;
    }

    private drawTimestampAndPrefixRow(parts: MessaggioMessageParts): string {
        let timestamp = parts.timestamp.toString();
        let prefix = parts.prefix.toString();
        let timestampPrefixSeparator = '';

        if (prefix.length > 0) {
            timestampPrefixSeparator += UNICODE_CHARACTERS.SPACE + c.grey('»') + UNICODE_CHARACTERS.SPACE;
        }

        const rowContentsVW = parts.timestamp.visualWidth + stringWidth(timestampPrefixSeparator) + parts.prefix.visualWidth;

        let row = '';
        row += c[this.boxColor](this.boxStyle.vertical);
        row += UNICODE_CHARACTERS.SPACE.repeat(this.paddings.l);
        row += timestamp + timestampPrefixSeparator + prefix;

        const remainingTerminalVW = this.calculateRemainingTerminalVWRight(rowContentsVW + this.minBoxVW);

        if (remainingTerminalVW > 0) {
            row += UNICODE_CHARACTERS.SPACE.repeat(remainingTerminalVW);
            row += UNICODE_CHARACTERS.SPACE.repeat(this.paddings.r);
        }
        
        row += c[this.boxColor](this.boxStyle.vertical);
        row += os.EOL;

        return row;
    }

    private drawTextAndSuffixRow(parts: MessaggioMessageParts): string {
        let text = parts.text.toString();
        let suffix = parts.suffix.toString();
        let textSuffixSeparator = '';

        if (text.length > 0 && suffix.length > 0) {
            textSuffixSeparator += UNICODE_CHARACTERS.SPACE;
        }

        const rowContentsVW = parts.text.visualWidth + stringWidth(textSuffixSeparator) + parts.suffix.visualWidth;

        let row = '';
        row += c[this.boxColor](this.boxStyle.vertical);
        row += UNICODE_CHARACTERS.SPACE.repeat(this.paddings.l);
        row += text + textSuffixSeparator + suffix;

        const remainingTerminalVW = this.calculateRemainingTerminalVWRight(rowContentsVW + this.minBoxVW);

        if (remainingTerminalVW > 0) {
            row += UNICODE_CHARACTERS.SPACE.repeat(remainingTerminalVW);
            row += UNICODE_CHARACTERS.SPACE.repeat(this.paddings.r);
        }
        
        row += c[this.boxColor](this.boxStyle.vertical);
        row += os.EOL;

        return row;
    }

    private drawFooterRow(parts: MessaggioMessageParts, headerRowVW: number): string {
        let footerFinal = '';

        footerFinal += this.boxStyle.bottomLeft;
        footerFinal += this.boxStyle.horizontal.repeat(headerRowVW - 2);
        footerFinal += this.boxStyle.bottomRight;

        return c[this.boxColor](footerFinal);
    }

    private calculateRemainingTerminalVWRight(currentRowVW: number): number {
        return this.terminalVW - currentRowVW;
    }
}