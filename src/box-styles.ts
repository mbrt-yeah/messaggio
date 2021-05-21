import {
    BoxStyle
} from './box-style';

/**
 * Holds a list of various box-styles which are indexed by their name
 */
export const BOX_STYLES: { [key: string]: BoxStyle } = {
    'singleLine': {
        "topLeft": "┌",
        "topRight": "┐",
        "bottomRight": "┘",
        "bottomLeft": "└",
        "vertical": "│",
        "horizontal": "─"
    },
    "doubleLine": {
        "topLeft": "╔",
        "topRight": "╗",
        "bottomRight": "╝",
        "bottomLeft": "╚",
        "vertical": "║",
        "horizontal": "═"
    },
    "roundedLine": {
        "topLeft": "╭",
        "topRight": "╮",
        "bottomRight": "╯",
        "bottomLeft": "╰",
        "vertical": "│",
        "horizontal": "─"
    },
    "boldLine": {
        "topLeft": "┏",
        "topRight": "┓",
        "bottomRight": "┛",
        "bottomLeft": "┗",
        "vertical": "┃",
        "horizontal": "━"
    },
    "singleDoubleLine": {
        "topLeft": "╓",
        "topRight": "╖",
        "bottomRight": "╜",
        "bottomLeft": "╙",
        "vertical": "║",
        "horizontal": "─"
    },
    "doubleSingleLine": {
        "topLeft": "╒",
        "topRight": "╕",
        "bottomRight": "╛",
        "bottomLeft": "╘",
        "vertical": "│",
        "horizontal": "═"
    },
    "classic": {
        "topLeft": "+",
        "topRight": "+",
        "bottomRight": "+",
        "bottomLeft": "+",
        "vertical": "|",
        "horizontal": "-"
    }
}