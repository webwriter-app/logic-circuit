import { CONS, GATES } from "./helpers";

/** The half adder as a JSON file, the format of the data block. */
export const halfAdderJson = JSON.stringify({ gates: GATES, connections: CONS }, null, 2);

/** The truth table of the half adder as CSV: sum (XOR) and carry (AND). */
export const halfAdderCsv = "In1,In2,Out1,Out2\r\n0,0,0,0\r\n0,1,1,0\r\n1,0,1,0\r\n1,1,0,1\r\n";
