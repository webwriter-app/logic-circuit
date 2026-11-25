import { GATE_TYPES, PORTS, type GateType } from "./gates";

/** A gate of the circuit. `id` and `type` make the node key. */
export type Gate = { id: number; type: GateType; x: number; y: number; key: string };
/** A wire from an output port to an input port, both as `node:port`. */
export type Wire = { from: string; to: string; key: string };

/** The key of a gate, which is also the start of its connector names in the data block. */
const nodeKey = (type: GateType, id: number) => `${type.toLowerCase()}Gate${id}`;

const CONNECTOR = /^([a-z]+Gate\d+)(In[12]|Out[23]?)$/;
const split = (entries: string[]) => entries.filter(Boolean).map((entry) => entry.split("|"));
const px = (value: number) => `${Math.round(value * 100) / 100}px`;

/** Reads the `id|TYPE|left|top` entries of the data block. Entries that are not gates are skipped. */
export function parseGates(entries: string[]): Gate[] {
    const gates: Gate[] = [];
    for (const [id, type, left, top] of split(entries)) {
        if (!GATE_TYPES.includes(type as GateType) || !Number.isInteger(Number(id))) continue;
        gates.push({ id: Number(id), type: type as GateType, x: parseFloat(left) || 0, y: parseFloat(top) || 0, key: nodeKey(type as GateType, Number(id)) });
    }
    return gates;
}

const portOf = (connector: string): string | null => {
    const match = CONNECTOR.exec(connector);
    return match ? `${match[1]}:${match[2]}` : null;
};

/**
 * Reads the `startId|endId` entries. Either end may come first. A wire that
 * does not lead from an output to an input of the gates is skipped.
 */
export function parseWires(entries: string[], gates: Gate[]): Wire[] {
    const kinds = new Map<string, string>(gates.flatMap((gate) => PORTS[gate.type].map((port) => [`${gate.key}:${port.name}`, port.kind] as [string, string])));
    const wires: Wire[] = [];
    for (const [first, second] of split(entries)) {
        const [a, b] = [portOf(first ?? ""), portOf(second ?? "")];
        if (!a || !b || kinds.get(a) === kinds.get(b)) continue;
        const [from, to] = kinds.get(a) === "out" ? [a, b] : [b, a];
        if (kinds.has(from) && kinds.has(to)) wires.push({ from, to, key: wireEntry(from, to) });
    }
    return wires;
}

/** The entry of a wire in the data block: `outputId|inputId`. */
export const wireEntry = (from: string, to: string) => `${from.replace(":", "")}|${to.replace(":", "")}`;

const gateEntry = (gate: Pick<Gate, "id" | "type" | "x" | "y">) => `${gate.id}|${gate.type}|${px(gate.x)}|${px(gate.y)}`;

/** The entries with a new gate at a position, and the new gate. */
export function addGate(entries: string[], type: GateType, x: number, y: number) {
    const id = Math.max(-1, ...parseGates(entries).map((gate) => gate.id)) + 1;
    return { entries: [...entries.filter(Boolean), gateEntry({ id, type, x, y })], key: nodeKey(type, id) };
}

/** The entries with the gates at their new positions. Other entries stay as they are. */
export function moveGates(entries: string[], moved: ReadonlyMap<string, { x: number; y: number }>) {
    return entries.map((entry) => {
        const [gate] = parseGates([entry]);
        const to = gate && moved.get(gate.key);
        return to ? gateEntry({ ...gate, ...to }) : entry;
    });
}

/** The gate and wire entries without the removed gates and wires, and without the wires of the removed gates. */
export function remove(gates: string[], wires: string[], keys: ReadonlySet<string>) {
    return {
        gates: gates.filter((entry) => !keys.has(parseGates([entry])[0]?.key)),
        wires: wires.filter((entry) => {
            const ends = entry.split("|");
            return !keys.has(entry) && !keys.has(ends.slice().reverse().join("|")) && !ends.some((end) => keys.has(CONNECTOR.exec(end)?.[1] ?? ""));
        }),
    };
}

/** Whether a wire may join two ports: an output and an input of two gates, neither of them in use. */
export function canConnect(wires: Wire[], a: string, b: string) {
    const used = new Set(wires.flatMap((wire) => [wire.from, wire.to]));
    const [gateA, portA] = a.split(":");
    const [gateB, portB] = b.split(":");
    return gateA !== gateB && portA.startsWith("In") !== portB.startsWith("In") && !used.has(a) && !used.has(b);
}
