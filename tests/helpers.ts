import "../src/widgets/webwriter-logic-circuit";
import type { WebwriterLogicCircuit } from "../src/widgets/webwriter-logic-circuit";

export type Widget = WebwriterLogicCircuit & Record<string, any>;
type Pos = { clientX: number; clientY: number };

export const GATES = ["0|XOR|1970px|1226px", "1|AND|1969px|1309px", "2|INPUT|1601px|1117px", "3|INPUT|1610px|1206px", "4|SPLITTER|1716px|1125px", "5|SPLITTER|1720px|1207px", "6|OUTPUT|2058px|1225px", "7|OUTPUT|2063px|1309px"];
export const CONS = ["inputGate2Out|splitterGate4In1", "inputGate3Out|splitterGate5In1", "splitterGate4Out3|andGate1In1", "splitterGate4Out2|xorGate0In1", "splitterGate5Out2|xorGate0In2", "splitterGate5Out3|andGate1In2", "xorGate0Out|outputGate6In1", "andGate1Out|outputGate7In1"];

export const snippet = (attrs = "") => `<webwriter-logic-circuit ${attrs}><script type="application/json" slot="data">${JSON.stringify({ gates: GATES, connections: CONS })}</script></webwriter-logic-circuit>`;
export const freeBlock = (gates: string[], connections: string[] = [], attrs = "") => `<webwriter-logic-circuit simulationdelay="20" ${attrs}><script type="application/json" slot="data">${JSON.stringify({ gates, connections })}</script></webwriter-logic-circuit>`;

export const frame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
export async function until(fn: () => unknown, what: string) {
  for (let i = 0; i < 600; i++) { if (await fn()) return; await frame(); }
  throw new Error("timeout: " + what);
}

let host: HTMLDivElement | undefined;
const proto = Element.prototype as any;
const pointerCapture = { set: proto.setPointerCapture, release: proto.releasePointerCapture, has: proto.hasPointerCapture };

/** Call in `beforeEach`: synthetic pointer ids are not active pointers, so capture is stubbed. */
export function setup() {
  proto.setPointerCapture = () => {};
  proto.releasePointerCapture = () => {};
  proto.hasPointerCapture = () => false;
  host = document.createElement("div");
  host.style.width = "900px";
  document.body.append(host);
}
export function teardown() {
  host?.remove();
  host = undefined;
  document.designMode = "off";
  proto.setPointerCapture = pointerCapture.set;
  proto.releasePointerCapture = pointerCapture.release;
  proto.hasPointerCapture = pointerCapture.has;
}
export const mountHost = () => host!;

export async function mount(html: string, edit: boolean) {
  host!.innerHTML = html;
  const widget = host!.firstElementChild as Widget;
  if (edit) { widget.setAttribute("contenteditable", ""); document.designMode = "on"; } else document.designMode = "off";
  await widget.updateComplete;
  return widget;
}

export const block = (w: Widget) => w.querySelector(':scope > script[type="application/json"][slot="data"]') as HTMLScriptElement;
export const data = (w: Widget) => JSON.parse(block(w).textContent!);
export const center = (el: Element): Pos => { const r = el.getBoundingClientRect(); return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }; };
export const fire = (el: Element, type: string, pos: Pos) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, composed: true, cancelable: true, pointerId: 11, button: 0, isPrimary: true, pointerType: "mouse", ...pos }));

export const nodes = (w: Widget) => [...w.shadowRoot!.querySelectorAll<HTMLElement>("ww-node")];
export const wires = (w: Widget) => [...w.shadowRoot!.querySelectorAll<SVGElement>("ww-path")];
export const node = (w: Widget, key: string) => w.shadowRoot!.querySelector(`ww-node[data-ww-key="${key}"]`) as HTMLElement;
export const port = (w: Widget, key: string, name: string) => node(w, key).querySelector(`[data-ww-port="${name}"]`) as HTMLElement;

/** The first view is placed after the first render: wait until a gate is in the window. */
export async function loaded(w: Widget, gates = 8, lines = 8) {
  await until(() => nodes(w).length === gates && wires(w).length === lines, `${gates} gates and ${lines} wires`);
  await until(() => {
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    const r = nodes(w)[0]?.getBoundingClientRect();
    return !r || (r.left >= area.left && r.left < area.right);
  }, "view placed");
}
export function transactions(w: Widget) {
  const log: string[] = [];
  w.addEventListener("ww-transactionstart", () => log.push("start"));
  w.addEventListener("ww-transactionend", () => log.push("end"));
  return log;
}
/** A pointer drag from one point to another, as a reader makes it. */
export async function drag(target: Element, from: Pos, to: Pos) {
  fire(target, "pointerdown", from);
  fire(target, "pointermove", { clientX: from.clientX + 8, clientY: from.clientY + 8 });
  await frame(); await frame();
  fire(target, "pointermove", to);
  await frame(); await frame();
  fire(target, "pointerup", to);
  await frame(); await frame();
}
export const select = (w: Widget, ...keys: string[]) => w.shadowRoot!.querySelector("ww-scene")!.dispatchEvent(new CustomEvent("ww-select", { detail: { keys, items: [] }, bubbles: true, composed: true, cancelable: true }));
/** A click as a reader makes it: press and release at the same place. */
export async function click(target: Element, at: Pos = center(target)) {
  fire(target, "pointerdown", at);
  fire(target, "pointerup", at);
  await frame(); await frame();
}
export const scene = (w: Widget) => w.shadowRoot!.querySelector("ww-scene") as HTMLElement & Record<string, any>;
/** A point just beside the start of a wire, outside its gate, where the wire is drawn, in client coordinates. */
export function onWire(w: Widget, from: string): Pos {
  const at = scene(w).portPosition(from);
  const client = scene(w).toClient(at.x + 20, at.y);
  return { clientX: client.x, clientY: client.y };
}
/** What the pointer really hits at a client point, through every shadow root. */
function under(at: Pos): Element {
  let element = document.elementFromPoint(at.clientX, at.clientY)!;
  for (;;) {
    const inner = element.shadowRoot?.elementFromPoint(at.clientX, at.clientY);
    if (!inner || inner === element) return element;
    element = inner;
  }
}
/** A context menu at a client point, sent to the element that is there. */
export function contextMenu(w: Widget, at: Pos, pointerType = "mouse") {
  scene(w).render?.();
  return under(at).dispatchEvent(new PointerEvent("contextmenu", { bubbles: true, composed: true, cancelable: true, button: 2, pointerType, ...at }));
}
