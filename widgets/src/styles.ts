import { css } from 'lit';

export const Styles = css`
    :host {
        display: block;
        font-family: Arial, sans-serif;
    }

    .allowSimButton {
        top: 10px;
        left: 100px;
        position: absolute;
        z-index: 10;
    }

    :host(:not([contenteditable='true']):not([contenteditable=''])) .optionsMenu {
        display: none;
    }
    .author-only {
        display: block;
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

    .sidebar-counter {
        font-size: 70%;
    }

    .sidebar-item-label {
        font-size: 100%;
        margin-left: 10px;
        margin-right: 10px;
    }

    .simulateCheckbox {
        top: 10px;
        left: 10px;
        position: absolute;
        z-index: 10;
    }

    .flipSwitch {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    }

    .container {
        display: flex;
        height: max-content;
        border-width: 2px;
        border-style: solid;
        border-radius: 5px;
        border-color: #6a6a6a;
    }

    .workspaceContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .workspaceArea {
        position: absolute;
        border: 1px solid black;
        width: 3000px;
        height: 2000px;
        background: #ffffff;
    }

    .trashCanIcon {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: black;
        background: #ffffff;
        border: 1px solid lightgray;
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        z-index: 30;
        transition: background 0.2s;
    }
    .trashCanIconDragOver {
        background: #de2b2b;
        color: white;
    }

    .infoButton {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: black;
        background: #ffffff;
        border: 1px solid lightgray;
        font-size: 80%;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        gap: 5px;
        z-index: 30;
        transition: background 0.2s;
        cursor: pointer;
    }

    .instructions {
        position: absolute;
        bottom: 50px;
        left: 10px;
        color: black;
        background: #ffffff;
        border: 1px solid lightgray;
        font-size: 80%;
        padding: 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 4px;
        z-index: 30;
        transition: background 0.2s;
        display: none;
    }

    .instruction {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px;
    }

    .svgArea {
        position: absolute;
        overflow: auto;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: default;
    }

    .svgLine {
        stroke: #303030;
        fill: none;
        stroke-width: 2;
        transition: stroke-width 0.1s;
    }

    .svgLine:hover {
        stroke-width: 4;
    }

    .svgLineTrue {
        stroke: green;
    }

    .gate {
        border: 1px groove #000;
        border-top: none;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        line-height: 20%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }
    .gateDisabled {
        border: 1px groove #da0d0d;
        border-top: none;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        line-height: 20%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }
    .gateTrue {
        background: lightgreen;
    }

    .gate:focus {
        outline: none;
    }
    .gate:active {
        outline: none;
    }

    .gatepointer {
        cursor: pointer;
        align-items: center;
        position: relative;
        text-align: center;
        top: -50%;
        font-size: 80%;
    }

    .in-out {
        border: 1px solid #000;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        text-align: center;
        display: table;
        line-height: 10%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }

    .textClass {
        font-family: Arial;
        font-size: 500%;
    }
    .gateText {
        font-family: Arial;
        font-size: 65%;
        text-align: center;
        position: absolute;
        top: -13px;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
    }

    .svgTest {
        background-color: lightgreen;
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
        table-layout: fixed;
        width: 100%;
        height: 100%;
    }

    td.highlight {
        background-color: #8da7fc;
    }

    th,
    td {
        background-color: #f2f2f2;
        color: black;
        text-align: center;
    }

    .vertical-line {
        border-radius: 0px;
        border-left: 0.5px solid black;
        background-color: white;
        padding: 0px;
        margin: 0px;
        width: 0px;
    }

    hr {
        margin: 0;
        border: none;
        border-left: 1px solid black;
    }

    th {
        background-color: #b4b4b4;
    }

    sl-menu {
        position: fixed;
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

    .contextMenuGates {
        z-index: 30;
    }

    .connector {
        display: block;
        width: 25px;
        height: 25px;
        cursor: pointer;
        z-index: 5;
        text-align: left;
        line-height: 13px;
    }
    .dot{
        height: 7.5px;
        width: 7.5px;
        background-color: #000000;
        border-radius: 50%;
        display: inline-block;

    }
    .dotTrue {
        height: 7.5px;
        width: 7.5px;
        background-color: green;
        border-radius: 50%;
        display: inline-block;
    }

    .dotError {
        height: 7.5px;
        width: 7.5px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }

    .optionsMenu {
        position: relative;
        display: flex;
        flex-direction: column;
        line-height: 0%;
        font-size: 80%;
    }

    .optionsCheckbox {
        padding-left: 2px;
        padding-right: 2px;
    }

    .optionsItem {
        position: relative;
        display: flex;
        align-items: center;
        padding: 2px;
        margin: 2px;
    }

    sl-input {
        width: 70px;
    }
`;
