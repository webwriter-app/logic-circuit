/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import { CONS, GATES, block, center, click, contextMenu, fire, onWire, scene, data, drag, freeBlock, frame, loaded, mount, node, nodes, port, select, setup, snippet, teardown, transactions, until, wires } from "./helpers";

mocha.setup(getMochaConfig());

const modes = [{ mode: "read", edit: false }, { mode: "edit", edit: true }];
const same = (a: unknown, b: unknown, message: string) => assert.deepEqual(a, b, message);

for (const { mode, edit } of modes) describe(`<webwriter-logic-circuit> ${mode} mode`, function () {
  this.timeout(20000);
  beforeEach(setup);
  afterEach(teardown);

  it("loads the circuit from the data block, which stays as authored", async function () {
    const w = await mount(snippet(), edit);
    const before = block(w).textContent;
    await loaded(w);
    await frame(); await frame();
    assert.equal(block(w).textContent, before, "the block was rewritten while loading");
    same(nodes(w).map(n => n.dataset.wwKey), ["xorGate0", "andGate1", "inputGate2", "inputGate3", "splitterGate4", "splitterGate5", "outputGate6", "outputGate7"], "nodes");
    same(wires(w).map(p => `${p.getAttribute("from")}>${p.getAttribute("to")}`).slice(0, 2), ["inputGate2:Out>splitterGate4:In1", "inputGate3:Out>splitterGate5:In1"], "wires");
    same([node(w, "xorGate0").getAttribute("x"), node(w, "xorGate0").getAttribute("y")], ["1970", "1226"], "position of a gate");
  });

  it("reads a connection written the other way round", async function () {
    const w = await mount(freeBlock(["0|INPUT|10px|10px", "1|NOT|100px|10px"], ["notGate1In1|inputGate0Out"]), edit);
    await loaded(w, 2, 1);
    same([wires(w)[0].getAttribute("from"), wires(w)[0].getAttribute("to")], ["inputGate0:Out", "notGate1:In1"], "from output to input");
  });

  it("runs a switched input through the circuit, one gate per tick", async function () {
    const w = await mount(snippet(`simulationdelay="20"`), edit);
    await loaded(w);
    const output = () => node(w, "outputGate6").querySelector(".gatepointer")!.textContent!.trim();
    assert.equal(output(), "false", "starts off");
    node(w, "inputGate2").querySelector<HTMLElement>("button.gatepointer")!.click();
    node(w, "inputGate3").querySelector<HTMLElement>("button.gatepointer")!.click();
    node(w, "inputGate3").querySelector<HTMLElement>("button.gatepointer")!.click();
    await until(() => output() === "true", "XOR output true");
    assert.isTrue(node(w, "outputGate6").querySelector(".gate")!.classList.contains("gateTrue"), "output gate lit");
    assert.isTrue(wires(w).some(p => p.getAttribute("from") === "xorGate0:Out" && p.classList.contains("live")), "wire from the XOR is live");
    assert.equal(node(w, "outputGate7").querySelector(".gatepointer")!.textContent!.trim(), "false", "AND stays off");
    const checkbox = w.shadowRoot!.querySelector("#simCheckbox") as any;
    checkbox.checked = false;
    checkbox.dispatchEvent(new CustomEvent("sl-change", { bubbles: true, composed: true }));
    await until(() => output() === "false" && !wires(w).some(p => p.classList.contains("live")), "reset while the simulation is off");
  });

  it("writes a gate dropped from the sidebar to the block and removes it from the menu", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const log = transactions(w);
    const root = w.shadowRoot!;
    const source = root.querySelector('.sidebar-item[aria-label="NOT"]')!;
    const area = root.querySelector(".workspace")!.getBoundingClientRect();
    await drag(source, center(source), { clientX: area.left + 300, clientY: area.top + 400 });
    await until(() => data(w).gates.length === 9, "block has 9 gates");
    const added = data(w).gates[8];
    assert.match(added, /^8\|NOT\|/, "new entry");
    same(data(w).connections, CONS, "connections untouched");
    assert.isTrue(log.includes("start") && log.includes("end"), "the drop was one undo step: " + log);
    await until(() => nodes(w).length === 9, "node added");
    contextMenu(w, center(node(w, "notGate8")));
    await until(() => root.querySelector("sl-menu"), "menu open");
    [...root.querySelectorAll<HTMLElement>("sl-menu-item")].at(-1)!.click();
    await until(() => data(w).gates.length === 8, "block back to 8 gates");
    same(data(w).gates, GATES, "gates after delete");
  });

  it("stops a drop at the gate limit and shows it in the counter", async function () {
    const w = await mount(freeBlock([], [], 'notgateallowed="1"'), edit);
    await frame();
    const root = w.shadowRoot!;
    const source = root.querySelector('.sidebar-item[aria-label="NOT"]')!;
    assert.equal(source.querySelector(".sidebar-counter")!.textContent!.trim(), "0/1", "counter before");
    const area = root.querySelector(".workspace")!.getBoundingClientRect();
    for (const dy of [100, 200]) await drag(source, center(source), { clientX: area.left + 300, clientY: area.top + dy });
    await until(() => data(w).gates.length >= 1, "first gate");
    await frame(); await frame();
    assert.equal(data(w).gates.length, 1, "the second NOT was refused");
    assert.equal(source.querySelector(".sidebar-counter")!.textContent!.trim(), "1/1", "counter after");
  });

  it("moves a gate by a drag and writes its position as one undo step", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const log = transactions(w);
    const gate = node(w, "xorGate0");
    const from = center(gate);
    await drag(gate, from, { clientX: from.clientX + 60, clientY: from.clientY + 40 });
    await until(() => data(w).gates[0] !== GATES[0], "position written");
    same(data(w).gates[0].split("|"), ["0", "XOR", "2030px", "1266px"], "moved by the drag");
    same(data(w).gates.slice(1), GATES.slice(1), "other gates untouched");
    same(data(w).connections, CONS, "connections untouched");
    assert.isTrue(log.includes("start") && log.includes("end"), "one transaction: " + log);
  });

  it("connects an output to an input by a drag and gives a taken port no second wire", async function () {
    const w = await mount(freeBlock(["0|INPUT|1600px|1100px", "1|NOT|1800px|1100px", "2|OUTPUT|2000px|1100px"]), edit);
    await loaded(w, 3, 0);
    const log = transactions(w);
    await drag(port(w, "inputGate0", "Out"), center(port(w, "inputGate0", "Out")), center(port(w, "notGate1", "In1")));
    await until(() => data(w).connections.length === 1, "connected");
    same(data(w).connections, ["inputGate0Out|notGate1In1"], "entry");
    assert.isTrue(log.includes("start") && log.includes("end"), "one transaction: " + log);
    await loaded(w, 3, 1);
    assert.equal(port(w, "inputGate0", "Out").getAttribute("data-ww-capacity"), "1", "a port takes one wire");
    await drag(port(w, "inputGate0", "Out"), center(port(w, "inputGate0", "Out")), center(port(w, "outputGate2", "In1")));
    assert.equal(data(w).connections.length, 1, "a taken output starts no second wire");
    await drag(port(w, "notGate1", "Out"), center(port(w, "notGate1", "Out")), center(port(w, "notGate1", "In1")));
    assert.equal(data(w).connections.length, 1, "no wire within a gate");
    await drag(port(w, "notGate1", "Out"), center(port(w, "notGate1", "Out")), center(port(w, "outputGate2", "In1")));
    await until(() => data(w).connections.length === 2, "second wire");
    assert.equal(data(w).connections[1], "notGate1Out|outputGate2In1", "second entry");
  });

  it("removes a selected wire with Delete and takes a gate's wires with the gate", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    select(w, "inputGate2Out|splitterGate4In1");
    await until(() => wires(w)[0].hasAttribute("selected"), "wire selected");
    node(w, "inputGate2").focus();
    node(w, "inputGate2").dispatchEvent(new KeyboardEvent("keydown", { key: "Delete", bubbles: true, composed: true, cancelable: true }));
    await until(() => data(w).connections.length === 7, "wire removed");
    same(data(w).connections, CONS.slice(1), "only that wire");
    same(data(w).gates, GATES, "gates stay");
    select(w, "splitterGate4");
    await w.updateComplete;
    w.deleteSelection();
    await until(() => data(w).gates.length === 7, "gate removed");
    same(data(w).connections, CONS.slice(1).filter(c => !c.includes("splitterGate4")), "its wires went with it");
  });

  it("starts at the corner of the board where circuits start", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    const box = node(w, "xorGate0").getBoundingClientRect();
    assert.approximately(box.left - area.left, 1970 - 1500, 2, "x of the first gate in the window");
    assert.approximately(box.top - area.top, 1226 - 1000, 2, "y of the first gate in the window");
  });

  it("zooms with the plain wheel about the pointer", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const gate = node(w, "xorGate0");
    const before = gate.getBoundingClientRect();
    const at = center(gate);
    scene(w).dispatchEvent(new WheelEvent("wheel", { bubbles: true, composed: true, cancelable: true, deltaY: -200, ...at }));
    await until(() => gate.getBoundingClientRect().width > before.width * 1.05, "zoomed in");
    const after = center(gate);
    assert.approximately(after.clientX, at.clientX, 3, "the point under the pointer stays");
  });

  it("fits the gates and not the whole board", async function () {
    const w = await mount(freeBlock(["0|INPUT|1500px|1000px", "1|OUTPUT|2400px|1500px"]), edit);
    await loaded(w, 2, 0);
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    w.shadowRoot!.querySelector<HTMLElement>('[data-ww-viewport-action="fit"]')!.click();
    await until(() => node(w, "outputGate1").getBoundingClientRect().width < 59, "zoomed out to the gates");
    for (const key of ["inputGate0", "outputGate1"]) {
      const r = node(w, key).getBoundingClientRect();
      assert.isTrue(r.left >= area.left - 1 && r.right <= area.right + 1 && r.top >= area.top - 1 && r.bottom <= area.bottom + 1, `${key} is in the window`);
    }
    assert.isAbove(node(w, "outputGate1").getBoundingClientRect().width, 60 * 0.4, "not the scale of the whole board");
  });

  it("draws wires that go around a gate in the way", async function () {
    const w = await mount(freeBlock(["0|INPUT|1600px|1100px", "1|NOT|1700px|1100px", "2|OUTPUT|1900px|1100px"], ["inputGate0Out|outputGate2In1"]), edit);
    await loaded(w, 3, 1);
    await frame(); await frame();
    const { points } = scene(w).drawingOf(wires(w)[0]) as { points: { x: number; y: number }[] };
    assert.isTrue(points.slice(1).every((p, i) => p.x === points[i].x || p.y === points[i].y), "horizontal and vertical segments only");
    const box = { x: 1700, y: 1100, width: node(w, "notGate1").offsetWidth, height: node(w, "notGate1").offsetHeight };
    const crosses = points.slice(1).some((p, i) => Math.max(p.x, points[i].x) > box.x && Math.min(p.x, points[i].x) < box.x + box.width && Math.max(p.y, points[i].y) > box.y && Math.min(p.y, points[i].y) < box.y + box.height);
    assert.isFalse(crosses, "the wire does not cross the NOT gate");
  });

  it("follows a gate with its wires while the gate is dragged", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const gate = node(w, "outputGate6");
    const from = center(gate);
    const wire = () => (scene(w).drawingOf(wires(w).find(p => p.getAttribute("to") === "outputGate6:In1")!) as { points: { x: number; y: number }[] }).points.at(-1)!;
    const end = wire();
    fire(gate, "pointerdown", from);
    fire(gate, "pointermove", { clientX: from.clientX + 8, clientY: from.clientY + 8 });
    await frame(); await frame();
    fire(gate, "pointermove", { clientX: from.clientX + 60, clientY: from.clientY + 40 });
    await until(() => wire().x !== end.x, "the wire end moved before the drop");
    fire(gate, "pointerup", { clientX: from.clientX + 60, clientY: from.clientY + 40 });
    await frame(); await frame();
  });

  it("connects two ports by a click on each", async function () {
    const w = await mount(freeBlock(["0|INPUT|1600px|1100px", "1|NOT|1800px|1100px"]), edit);
    await loaded(w, 2, 0);
    await click(port(w, "inputGate0", "Out"));
    await click(port(w, "notGate1", "In1"));
    await until(() => data(w).connections.length === 1, "connected by two clicks");
    same(data(w).connections, ["inputGate0Out|notGate1In1"], "entry");
  });

  it("removes a wire by the context menu on it", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const log = transactions(w);
    contextMenu(w, onWire(w, "inputGate2:Out"));
    await until(() => data(w).connections.length === 7, "wire removed");
    same(data(w).connections, CONS.slice(1), "only that wire");
    await until(() => log.includes("end"), "the undo step ends");
    assert.deepEqual(log, ["start", "end"], "one undo step");
  });

  it("removes a wire by a long press where the browser reports it as a context menu", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    await frame(); await frame();
    contextMenu(w, onWire(w, "inputGate2:Out"), "touch");
    await until(() => data(w).connections.length === 7, "wire removed");
    assert.notInclude(data(w).connections, CONS[0], "the pressed wire is gone");
  });

  it("deletes the gates that are dropped on the trash, with their wires", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const gate = node(w, "splitterGate4");
    const trash = w.shadowRoot!.querySelector(".trashCanIcon")!;
    const from = center(gate);
    fire(gate, "pointerdown", from);
    fire(gate, "pointermove", { clientX: from.clientX + 8, clientY: from.clientY + 8 });
    await frame(); await frame();
    fire(gate, "pointermove", center(trash));
    await until(() => trash.classList.contains("trashCanIconDragOver"), "trash lit while a gate is over it");
    fire(gate, "pointerup", center(trash));
    await until(() => data(w).gates.length === 7, "gate removed");
    assert.isFalse(trash.classList.contains("trashCanIconDragOver"), "trash dark again");
    same(data(w).connections, CONS.filter(c => !c.includes("splitterGate4")), "its wires went with it");
  });

  it("places a dropped gate under the pointer in board coordinates", async function () {
    const w = await mount(freeBlock([]), edit);
    await frame();
    const source = w.shadowRoot!.querySelector('.sidebar-item[aria-label="AND"]')!;
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    const grab = center(source);
    const box = source.getBoundingClientRect();
    await drag(source, grab, { clientX: area.left + 300, clientY: area.top + 200 });
    await until(() => data(w).gates.length === 1, "gate added");
    const [, , left, top] = data(w).gates[0].split("|");
    assert.approximately(parseFloat(left), 1500 + 300 - (grab.clientX - box.left), 3, "x");
    assert.approximately(parseFloat(top), 1000 + 200 - (grab.clientY - box.top), 3, "y");
  });

  it("pans the view while a gate from the sidebar is held at the edge of the board", async function () {
    const w = await mount(freeBlock(["0|INPUT|1700px|1100px"]), edit);
    await loaded(w, 1, 0);
    const source = w.shadowRoot!.querySelector('.sidebar-item[aria-label="NOT"]')!;
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    const start = center(source);
    const edge = { clientX: area.right - 6, clientY: area.top + area.height / 2 };
    const left = node(w, "inputGate0").getBoundingClientRect().left;
    fire(source, "pointerdown", start);
    fire(source, "pointermove", { clientX: start.clientX + 8, clientY: start.clientY + 8 });
    await frame(); await frame();
    fire(source, "pointermove", edge);
    await until(() => node(w, "inputGate0").getBoundingClientRect().left < left - 40, "the view moved toward the edge");
    fire(source, "pointerup", { clientX: area.left + 100, clientY: edge.clientY });
    await frame(); await frame();
  });

  it("adds a gate from the sidebar with the keyboard", async function () {
    const w = await mount(freeBlock([]), edit);
    await frame();
    const source = w.shadowRoot!.querySelector<HTMLElement>('.sidebar-item[aria-label="OR"]')!;
    source.focus();
    const press = async (key: string) => { (w.shadowRoot!.activeElement ?? source).dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, composed: true, cancelable: true })); await frame(); await frame(); };
    await press(" ");
    await press("ArrowRight");
    await press("Enter");
    await until(() => data(w).gates.length === 1, "gate added");
    assert.match(data(w).gates[0], /^0\|OR\|/, "the gate");
  });

  it("shows truth tables in the gates when the switch is on", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const sw = w.shadowRoot!.querySelector("#switch") as any;
    sw.checked = true;
    sw.dispatchEvent(new CustomEvent("sl-change", { bubbles: true, composed: true }));
    await until(() => node(w, "xorGate0").querySelector(".flippedGate table"), "table in the XOR");
    assert.isNull(node(w, "inputGate2").querySelector(".flippedGate"), "input gates have none");
  });

  it("reads an outside change of the block", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    block(w).textContent = JSON.stringify({ gates: GATES.slice(0, 2), connections: [] });
    await until(() => nodes(w).length === 2 && wires(w).length === 0, "outside change read");
  });

  it("keeps an unknown key of the block through a write", async function () {
    const w = await mount(`<webwriter-logic-circuit><script type="application/json" slot="data">{"gates":[],"connections":[],"note":"keep"}</script></webwriter-logic-circuit>`, edit);
    await frame();
    const source = w.shadowRoot!.querySelector('.sidebar-item[aria-label="INPUT"]')!;
    const area = w.shadowRoot!.querySelector(".workspace")!.getBoundingClientRect();
    await drag(source, center(source), { clientX: area.left + 200, clientY: area.top + 200 });
    await until(() => data(w).gates.length === 1, "written");
    assert.equal(data(w).note, "keep", "unknown key");
  });
});

mocha.run();
