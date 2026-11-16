import type { Gate, Wire } from "./circuit";
import { evaluate, inputCount } from "./gates";

/** The signals at ports (`node:port`). A port that has no entry has no signal yet. */
export type Signals = ReadonlyMap<string, boolean>;

/** The signals when the simulation starts: only the input gates have one. */
export function start(gates: Gate[], on: ReadonlySet<string>): Signals {
    return new Map(gates.filter((gate) => gate.type === "INPUT").map((gate) => [`${gate.key}:Out`, on.has(gate.key)]));
}

/**
 * One tick: every wire carries the signal at its output to its input, and
 * every gate that got a signal computes its outputs. A signal travels one gate per tick.
 */
export function step(gates: Gate[], wires: Wire[], on: ReadonlySet<string>, previous: Signals): Signals {
    const next = new Map(start(gates, on));
    for (const wire of wires) {
        const signal = previous.get(wire.from);
        if (signal !== undefined) next.set(wire.to, signal);
    }
    for (const gate of gates) {
        if (gate.type === "INPUT") continue;
        const a = next.get(`${gate.key}:In1`);
        const b = next.get(`${gate.key}:In2`);
        if (a === undefined && b === undefined) continue;
        const out = evaluate(gate.type, !!a, inputCount(gate.type) > 1 && !!b);
        if (gate.type === "SPLITTER") next.set(`${gate.key}:Out2`, out).set(`${gate.key}:Out3`, out);
        else if (gate.type !== "OUTPUT") next.set(`${gate.key}:Out`, out);
    }
    return next;
}

/** Whether two states are the same, which ends a simulation. */
export function same(a: Signals, b: Signals) {
    return a.size === b.size && [...a].every(([port, signal]) => b.get(port) === signal);
}
