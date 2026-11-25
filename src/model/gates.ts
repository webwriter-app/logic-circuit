export const GATE_TYPES = ["NOT", "AND", "OR", "NAND", "NOR", "XNOR", "XOR", "SPLITTER", "INPUT", "OUTPUT"] as const;
export type GateType = (typeof GATE_TYPES)[number];

/** The gates whose number can be limited, with the setting that holds the limit. */
export const LIMIT_SETTING = {
    NOT: "notGateAllowed",
    AND: "andGateAllowed",
    OR: "orGateAllowed",
    NAND: "nandGateAllowed",
    NOR: "norGateAllowed",
    XNOR: "xnorGateAllowed",
    XOR: "xorGateAllowed",
} as const;
export type LimitedType = keyof typeof LIMIT_SETTING;

/** A connection point. `x` and `y` are its centre in pixels from the top-left corner of the gate's box. */
export type PortSpec = { name: string; kind: "in" | "out"; x: number; y: number };

const IN1 = { name: "In1", kind: "in", x: 0.25, y: 16.25 } as const;
const IN2 = { name: "In2", kind: "in", x: 0.25, y: 35.25 } as const;
const SINGLE_IN = { name: "In1", kind: "in", x: 0.25, y: 25.75 } as const;
const OUT = { name: "Out", kind: "out", x: 50.75, y: 25.75 } as const;

export const PORTS: Record<GateType, readonly PortSpec[]> = {
    NOT: [SINGLE_IN, OUT],
    AND: [IN1, IN2, OUT],
    OR: [IN1, IN2, OUT],
    NAND: [IN1, IN2, OUT],
    NOR: [IN1, IN2, OUT],
    XNOR: [IN1, IN2, OUT],
    XOR: [IN1, IN2, OUT],
    SPLITTER: [SINGLE_IN, { name: "Out2", kind: "out", x: 50.75, y: 15.25 }, { name: "Out3", kind: "out", x: 50.75, y: 35.75 }],
    INPUT: [OUT],
    OUTPUT: [SINGLE_IN],
};

/** How many inputs a gate reads. */
export const inputCount = (type: GateType) => PORTS[type].filter((port) => port.kind === "in").length;

/** The output of a gate for its inputs. */
export function evaluate(type: GateType, a: boolean, b: boolean): boolean {
    switch (type) {
        case "NOT": return !a;
        case "AND": return a && b;
        case "OR": return a || b;
        case "NAND": return !(a && b);
        case "NOR": return !(a || b);
        case "XNOR": return a === b;
        case "XOR": return a !== b;
        default: return a;
    }
}

/** The rows of a gate's truth table: its inputs, then its output. */
export function truthRows(type: GateType): boolean[][] {
    if (inputCount(type) === 1) return [false, true].map((a) => [a, evaluate(type, a, false)]);
    return [false, true].flatMap((a) => [false, true].map((b) => [a, b, evaluate(type, a, b)]));
}

/** The index of the truth table row that the inputs select. */
export const truthRowIndex = (type: GateType, a: boolean, b: boolean) => (inputCount(type) === 1 ? Number(a) : (Number(a) << 1) | Number(b));

/** Whether a gate has a truth table to show. */
export const hasTruthTable = (type: GateType) => type !== "INPUT" && type !== "OUTPUT";
