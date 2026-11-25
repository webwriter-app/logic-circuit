import { css } from 'lit';
import '@shoelace-style/shoelace/dist/themes/light.css';

export const Styles = css`
    :host {
        display: block;
        box-sizing: border-box;
        min-width: 300px;
        max-width: 2100px;
        color: var(--ww-text-color, inherit);
        font-family: var(--ww-font-family, Arial, sans-serif);
    }

    .frame {
        container-type: inline-size;
    }

    .container {
        display: flex;
        height: max-content;
        border: 2px solid #6a6a6a;
        border-radius: 5px;
    }

    .print-note {
        display: none;
        margin: 0;
        padding: 1em;
        border: 1px solid currentColor;
    }

    .sidebar {
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 4px;
        height: max-content;
        z-index: 2;
    }

    .sidebar-item {
        display: flex;
    }

    .sidebar-item:focus-visible,
    button:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
    }

    .sidebar-item .gate {
        cursor: grab;
        touch-action: none;
    }

    .sidebar-counter {
        font-size: 70%;
    }

    .workspace {
        flex: 1;
        min-width: 0;
        min-height: 360px;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .workspace:has([data-ww-drop-over]) {
        box-shadow: inset 0 0 0 3px var(--ww-theme-accent-1, #5176e8);
    }

    ww-scene {
        position: absolute;
        inset: 0;
    }

    ww-shape.board {
        fill: var(--circuit-background, #ffffff);
        stroke: #000000;
        stroke-width: 1px;
    }

    ww-path {
        stroke: #303030;
        stroke-width: 2px;
    }

    ww-path.live {
        stroke: green;
    }

    ww-path:state(hover) {
        stroke-width: 4px;
    }

    ww-path[selected] {
        stroke-dasharray: 6px, 3px;
    }

    /* Wide: Simulate at the left, the switch at the right and the zoom controls below it. */
    .toolbar {
        position: absolute;
        inset: 10px 10px auto;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: start;
        row-gap: 15px;
        pointer-events: none;
    }

    .toolbar > * {
        pointer-events: auto;
    }

    .flipSwitch {
        grid-column: 2;
    }

    .viewControls {
        grid-column: 2;
        justify-self: end;
    }

    .trashCanIcon,
    .infoButton,
    .instructions {
        position: absolute;
        color: black;
        background: #ffffff;
        border: 1px solid lightgray;
        border-radius: 4px;
        z-index: 30;
        transition: background 0.2s;
    }

    .trashCanIcon {
        bottom: 10px;
        right: 10px;
        width: 70px;
        height: 70px;
        font-size: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 0;
    }

    .trashCanIconDragOver {
        background: #de2b2b;
        color: white;
    }

    .infoButton {
        bottom: 10px;
        left: 10px;
        font-size: 80%;
        padding: 5px 10px;
        min-height: 30px;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        font-family: inherit;
    }

    .instructions {
        bottom: 50px;
        left: 10px;
        font-size: 80%;
        padding: 10px;
        display: none;
        flex-direction: column;
        max-width: min(500px, calc(100% - 20px));
        box-sizing: border-box;
    }

    .instructions.open {
        display: flex;
    }

    .instruction {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px;
    }

    .instructionIcon {
        flex-shrink: 0;
        font-size: 16px;
    }

    ww-node {
        font-family: Arial, sans-serif;
    }

    .gate {
        border: 1px groove #000;
        border-top: none;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        margin: 4px;
        line-height: 20%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
    }

    .gate > img {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .gateTrue {
        background: lightgreen;
    }

    .gatepointer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 80%;
        font-family: inherit;
        line-height: 1;
        color: black;
        background: none;
        border: none;
        padding: 6px 8px;
        cursor: pointer;
    }

    div.gatepointer {
        cursor: default;
    }

    .gateText {
        font-size: 65%;
        position: absolute;
        top: -13px;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
    }

    .port {
        position: absolute;
        width: 18px;
        height: 18px;
        margin: -9px;
        display: grid;
        place-items: center;
        cursor: pointer;
        touch-action: none;
    }

    .port::after {
        content: "";
        width: 7.5px;
        height: 7.5px;
        border-radius: 50%;
        background: #000;
        transition: transform 100ms ease, box-shadow 100ms ease;
    }

    .port.live::after {
        background: green;
    }

    .port[data-ww-port-candidate]::after {
        transform: scale(1.6);
    }

    .port[data-ww-port-over]::after {
        transform: scale(1.6);
        box-shadow: 0 0 0 4px rgb(46 139 87 / 25%);
    }

    .port:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
    }

    table {
        padding: 2px;
        padding-top: 5px;
        font-size: 100%;
        width: 100%;
        table-layout: fixed;
        border-radius: 2px;
    }

    .flippedGate {
        margin-top: 2px;
        font-size: 38%;
        width: 100%;
        height: 100%;
    }

    th,
    td {
        background-color: #f2f2f2;
        color: black;
        text-align: center;
    }

    th {
        background-color: #b4b4b4;
    }

    td.highlight {
        --highlight: color-mix(in srgb, var(--ww-theme-accent-1) 45%, white);
        background-color: var(--highlight, #8da7fc);
    }

    .vertical-line {
        border-radius: 0px;
        border-left: 0.5px solid black;
        background-color: white;
        padding: 0px;
        margin: 0px;
        width: 0px;
    }

    sl-menu {
        position: fixed;
        z-index: 40;
    }

    sl-tooltip {
        z-index: 10;
        box-shadow: none;
        --max-width: 200px;
    }

    .tooltipcontent {
        color: black;
    }

    .tooltip-button {
        position: absolute;
        top: -7px;
        left: 30px;
        z-index: 13;
        background-color: transparent;
    }

    @media (pointer: coarse) {
        .port {
            width: 24px;
            height: 24px;
            margin: -12px;
        }
    }

    /* A narrow widget puts the gate palette above the board. */
    @container (max-width: 520px) {
        .container {
            flex-direction: column;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px 12px;
        }

        .simulateCheckbox {
            margin-right: auto;
        }

        .viewControls {
            margin-left: auto;
        }

        .sidebar {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px 12px;
            border-width: 0 0 1px;
        }
    }

    @media print {
        :host {
            max-width: none;
        }

        .sidebar,
        .toolbar,
        .trashCanIcon,
        .infoButton,
        .instructions {
            display: none;
        }

        .container {
            break-inside: avoid;
            border-color: currentColor;
        }

        .workspace {
            min-height: 440px;
        }

        .empty .container {
            display: none;
        }

        .empty .print-note {
            display: block;
        }
    }
`;
