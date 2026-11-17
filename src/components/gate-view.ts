import { html, nothing, type TemplateResult } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { PORTS, inputCount, truthRows, type GateType } from "../model/gates";
import not from "../assets/gate-not.svg";
import and from "../assets/gate-and.svg";
import or from "../assets/gate-or.svg";
import nand from "../assets/gate-nand.svg";
import nor from "../assets/gate-nor.svg";
import xor from "../assets/gate-xor.svg";
import xnor from "../assets/gate-xnor.svg";
import splitter from "../assets/gate-splitter.svg";

const SYMBOLS: Partial<Record<GateType, string>> = { NOT: not, AND: and, OR: or, NAND: nand, NOR: nor, XOR: xor, XNOR: xnor, SPLITTER: splitter };
const LABELS: Record<GateType, string> = { NOT: "NOT", AND: "AND", OR: "OR", NAND: "NAND", NOR: "NOR", XNOR: "XNOR", XOR: "XOR", SPLITTER: "Splitter", INPUT: "Input", OUTPUT: "Output" };

/** What a gate shows of the circuit. */
type GateState = {
    /** The value shown by an input or output gate. */
    value?: boolean;
    /** Show the truth table instead of the symbol. */
    table?: boolean;
    /** The truth table row to highlight. */
    row?: number;
    /** The signals at the ports, by port name. */
    signals?: ReadonlyMap<string, boolean>;
    onToggle?: () => void;
};

/** The truth table of a gate. The splitter shows its single output twice. */
function truthTable(type: GateType, row = -1): TemplateResult {
    const cells = (values: boolean[], index: number) => values.map((value) => html`<td class=${classMap({ highlight: row === index })}>${Number(value)}</td>`);
    const rows = truthRows(type);
    if (type === "SPLITTER") {
        return html`<table>${rows.map(([a, out], index) => html`
            <tr><td rowspan="2" class=${classMap({ highlight: row === index })}>${Number(a)}</td><td class="vertical-line"></td><td class=${classMap({ highlight: row === index })}>${Number(out)}</td></tr>
            <tr><td class="vertical-line"></td><td class=${classMap({ highlight: row === index })}>${Number(out)}</td></tr>`)}</table>`;
    }
    const inputs = inputCount(type);
    return html`<table>${rows.map((values, index) => html`<tr>${cells(values.slice(0, inputs), index)}<td class="vertical-line"></td>${cells(values.slice(inputs), index)}</tr>`)}</table>`;
}

/** The truth table with its header, as the tooltip of a gate in the sidebar shows it. */
export function truthTableWithHeader(type: GateType): TemplateResult {
    const heads = type === "SPLITTER" ? ["Input"] : inputCount(type) === 1 ? ["Input A"] : ["Input A", "Input B"];
    return html`
        <table><tr>${heads.map((head) => html`<th>${head}</th>`)}<td class="vertical-line"></td><th>Output</th></tr></table>
        ${truthTable(type)}`;
}

/**
 * The box of a gate: its symbol (or its truth table), its label and its ports.
 * The same box is shown in the sidebar, where it has no ports, and on the board.
 */
export function gateBox(type: GateType, state: GateState = {}, extra: TemplateResult | typeof nothing = nothing): TemplateResult {
    const { value, table, row, signals, onToggle } = state;
    const lit = (type === "INPUT" || type === "OUTPUT") && value === true;
    return html`
        <div class=${classMap({ gate: true, gateTrue: lit })}>
            ${table && SYMBOLS[type] ? html`<div class="flippedGate">${truthTable(type, row)}</div>` : SYMBOLS[type] ? html`<img src=${SYMBOLS[type]!} alt="" draggable="false" />` : nothing}
            <p class="gateText">${LABELS[type]}</p>
            ${type === "INPUT" ? html`<button class="gatepointer" @click=${onToggle}>${String(value ?? false)}</button>` : type === "OUTPUT" ? html`<div class="gatepointer">${String(value ?? false)}</div>` : nothing}
            ${signals ? PORTS[type].map((port) => html`
                <span class=${classMap({ port: true, live: signals.get(port.name) === true })} style="left: ${port.x}px; top: ${port.y}px"
                    data-ww-port=${port.name} data-ww-side=${port.kind === "in" ? "left" : "right"}
                    data-ww-link=${port.kind} data-ww-accept=${port.kind === "in" ? "out" : "in"} data-ww-capacity="1"></span>`) : nothing}
            ${extra}
        </div>`;
}
