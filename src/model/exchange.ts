import { parseGates, parseWires, type Gate, type Wire } from "./circuit";
import { PORTS } from "./gates";
import { same, start, step, type Signals } from "./simulation";

/** A table of values, the shape widgets share. */
export type Table = { columns: string[]; rows: (string | number | null)[][] };

/** The truth table has 2^n rows; a circuit with more inputs than this has none. */
export const MAX_TABLE_INPUTS = 8;
const SETTLE_TICKS = 100;

/** Reading order on the board: top to bottom, then left to right. */
const byPosition = (a: Gate, b: Gate) => a.y - b.y || a.x - b.x || a.id - b.id;

/** The input and output gates in reading order. */
export function ports(gates: Gate[]) {
    return {
        inputs: gates.filter((gate) => gate.type === "INPUT").sort(byPosition),
        outputs: gates.filter((gate) => gate.type === "OUTPUT").sort(byPosition),
    };
}

/** The value at the input of each output gate once the signals have settled. */
export const outputValues = (outputs: Gate[], signals: Signals) => outputs.map((gate) => Number(signals.get(`${gate.key}:In1`) === true));

/** The signals after the circuit has settled for a set of switched-on inputs, or after it stops changing. */
export function settle(gates: Gate[], wires: Wire[], on: ReadonlySet<string>): Signals {
    let signals = start(gates, on);
    for (let tick = 0; tick < SETTLE_TICKS; tick++) {
        const next = step(gates, wires, on, signals);
        if (same(next, signals)) return next;
        signals = next;
    }
    return signals;
}

/**
 * The truth table of the circuit: one column per input and output gate
 * (In1.., Out1.. in reading order), one row per combination of inputs.
 * Returns null without inputs, without outputs or with too many inputs.
 * A circuit with a loop gives the state it settles in from all inputs off.
 */
export function truthTable(gates: Gate[], wires: Wire[]): Table | null {
    const { inputs, outputs } = ports(gates);
    if (!inputs.length || !outputs.length || inputs.length > MAX_TABLE_INPUTS) return null;
    const rows: number[][] = [];
    for (let row = 0; row < 1 << inputs.length; row++) {
        const bits = inputs.map((_, index) => (row >> (inputs.length - 1 - index)) & 1);
        const on = new Set(inputs.filter((_, index) => bits[index]).map((gate) => gate.key));
        rows.push([...bits, ...outputValues(outputs, settle(gates, wires, on))]);
    }
    return { columns: [...inputs.map((_, index) => `In${index + 1}`), ...outputs.map((_, index) => `Out${index + 1}`)], rows };
}

const quote = (cell: string | number | null) => (/[",\n\r]/.test(String(cell ?? "")) ? `"${String(cell).replaceAll('"', '""')}"` : String(cell ?? ""));

export const tableToCsv = (table: Table) => [table.columns, ...table.rows].map((row) => row.map(quote).join(",")).join("\r\n") + "\r\n";

/** The circuit of a JSON file `{gates, connections}`, the format of the data block. Throws a plain error name for invalid input. */
export function readCircuit(text: string): { gates: string[]; connections: string[] } {
    let value: unknown;
    try { value = JSON.parse(text); } catch { throw new SyntaxError("json"); }
    const { gates, connections } = (value ?? {}) as Record<string, unknown>;
    const strings = (list: unknown): list is string[] => Array.isArray(list) && list.every((entry) => typeof entry === "string");
    if (!strings(gates) || !strings(connections)) throw new TypeError("shape");
    const entries = gates.filter(Boolean);
    const parsed = parseGates(entries);
    if (parsed.length !== entries.length || new Set(parsed.map((gate) => gate.key)).size !== parsed.length) throw new TypeError("gates");
    const links = connections.filter(Boolean);
    if (parseWires(links, parsed).length !== links.length) throw new TypeError("connections");
    return { gates: entries, connections: links };
}

const BOX = 51;
const SYMBOL: Record<string, { label: string; inverted?: boolean }> = {
    NOT: { label: "1", inverted: true }, AND: { label: "&" }, OR: { label: "≥1" }, NAND: { label: "&", inverted: true },
    NOR: { label: "≥1", inverted: true }, XOR: { label: "=1" }, XNOR: { label: "=1", inverted: true }, SPLITTER: { label: "×2" },
};
const escape = (text: string) => text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]!);

/** The circuit drawn with rectangular (IEC) gate symbols. Inputs show whether they are switched on. */
export function circuitToSvg(gates: Gate[], wires: Wire[], on: ReadonlySet<string>): string {
    const at = new Map<string, { x: number; y: number }>();
    for (const gate of gates) for (const port of PORTS[gate.type]) at.set(`${gate.key}:${port.name}`, { x: gate.x + port.x, y: gate.y + port.y });
    const left = Math.min(...gates.map((gate) => gate.x)) - 20;
    const top = Math.min(...gates.map((gate) => gate.y)) - 20;
    const width = Math.max(...gates.map((gate) => gate.x)) + BOX + 20 - left;
    const height = Math.max(...gates.map((gate) => gate.y)) + BOX + 20 - top;
    const lines = wires.flatMap((wire) => {
        const [a, b] = [at.get(wire.from), at.get(wire.to)];
        if (!a || !b) return [];
        const middle = (a.x + b.x) / 2;
        return [`<polyline points="${a.x},${a.y} ${middle},${a.y} ${middle},${b.y} ${b.x},${b.y}" fill="none"/>`];
    });
    const shapes = gates.map((gate) => {
        const symbol = SYMBOL[gate.type];
        const text = (label: string) => `<text x="${gate.x + (gate.type === "INPUT" ? 8 + (BOX - 8) / 2 : BOX / 2)}" y="${gate.y + BOX / 2 + 5}" text-anchor="middle" stroke="none" fill="#222" font-family="sans-serif" font-size="15">${escape(label)}</text>`;
        if (!symbol) {
            const label = gate.type === "INPUT" ? String(Number(on.has(gate.key))) : "";
            const x = gate.type === "INPUT" ? gate.x + 8 : gate.x;
            return `<rect x="${x}" y="${gate.y + 13}" width="${BOX - 8}" height="25" rx="12" fill="#fff"/>${label ? text(label) : ""}`;
        }
        const bubble = symbol.inverted ? `<circle cx="${gate.x + BOX - 3}" cy="${gate.y + 25.75}" r="3" fill="#fff"/>` : "";
        return `<rect x="${gate.x + 3}" y="${gate.y + 3}" width="${BOX - 6}" height="${BOX - 6}" fill="#fff"/>${text(symbol.label)}${bubble}`;
    });
    const box = [left, top, width, height].map((value) => Math.round(value)).join(" ");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" width="${Math.round(width)}" height="${Math.round(height)}">`
        + `<rect x="${Math.round(left)}" y="${Math.round(top)}" width="${Math.round(width)}" height="${Math.round(height)}" fill="#fff"/>`
        + `<g stroke="#222" stroke-width="1.5">${lines.join("")}${shapes.join("")}</g></svg>`;
}
