/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import { loaded, mount, mountHost, node, setup, snippet, teardown, until } from "./helpers";

mocha.setup(getMochaConfig());

const modes = [{ mode: "read", edit: false }, { mode: "edit", edit: true }];

for (const { mode, edit } of modes) describe(`<webwriter-logic-circuit> ${mode} mode`, function () {
  this.timeout(20000);
  beforeEach(setup);
  afterEach(teardown);

  it("reads settings from the existing lowercase attributes", async function () {
    const w = await mount(snippet(`simulationdelay="120" notgateallowed="0" splitterallowed="3" allowsimulation="0"`), edit);
    assert.deepEqual([w.simulationDelay, w.notGateAllowed, w.splitterAllowed, w.allowSimulation, w.andGateAllowed], [120, 0, 3, 0, -1], "values");
    const root = w.shadowRoot!;
    await w.updateComplete;
    assert.equal(getComputedStyle(root.querySelector('.sidebar-item[aria-label="NOT"]')!).display, "none", "NOT gate is hidden by notgateallowed=0");
    assert.notEqual(getComputedStyle(root.querySelector('.sidebar-item[aria-label="AND"]')!).display, "none", "AND gate still shown");
    assert.equal(getComputedStyle(root.querySelector("#simCheckbox")!).display, "none", "simulate checkbox hidden by allowsimulation=0");
  });

  it("reflects a setting written from the editor as the same attribute", async function () {
    const w = await mount(snippet(), edit);
    assert.deepEqual(["simulationdelay", "allowsimulation", "norgateallowed"].map(a => w.hasAttribute(a)), [false, false, false], "defaults are not written");
    w.setAttribute("norgateallowed", "0"); await w.updateComplete;
    assert.equal(w.norGateAllowed, 0, "attribute read");
    w.orGateAllowed = 2; await w.updateComplete;
    assert.equal(w.getAttribute("orgateallowed"), "2", "property written as attribute");
    w.orGateAllowed = -1; await w.updateComplete;
    assert.isFalse(w.hasAttribute("orgateallowed"), "default removes the attribute");
    w.notGateAllowed = -5;
    assert.equal(w.notGateAllowed, -1, "clamped to the minimum");
  });

  it("names the old attributes and the limits in the editor options", async function () {
    const w = await mount(snippet(), edit);
    const o = w.options as any;
    assert.deepEqual(Object.keys(o), ["allowSimulation", "simulationDelay", "notGateAllowed", "andGateAllowed", "orGateAllowed", "nandGateAllowed", "norGateAllowed", "xnorGateAllowed", "xorGateAllowed", "splitterAllowed"], "names");
    assert.deepEqual([o.notGateAllowed.attribute, o.simulationDelay.attribute, o.simulationDelay.unit, o.notGateAllowed.min, o.allowSimulation.max], ["notgateallowed", "simulationdelay", "ms", -1, 1], "fields");
    assert.equal(o.notGateAllowed.label._, "NOT gate limit", "label");
  });

  it("translates the widget, its gates and the drawer labels on a language change", async function () {
    const w = await mount(snippet(), edit);
    await loaded(w);
    const root = w.shadowRoot!;
    assert.include(root.querySelector("#simCheckbox")!.textContent, "Simulate", "english first");
    let optionsChanged = 0; w.addEventListener("optionschange", () => optionsChanged++);
    w.setAttribute("lang", "de");
    await until(() => root.querySelector("#simCheckbox")!.textContent!.includes("Simulieren"), "widget text in German");
    await until(() => (w.options as any).notGateAllowed.label._ === "Limit für NICHT-Gatter", "drawer label in German");
    assert.isAbove(optionsChanged, 0, "optionschange was sent");
    node(w, "xorGate0").dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, composed: true, cancelable: true, clientX: 50, clientY: 50 }));
    await until(() => root.querySelector("sl-menu")?.textContent?.includes("Löschen"), "gate menu in German");
    assert.isTrue(!w.hasAttribute("lang") || w.getAttribute("lang") === "de", "lang stays as authored");
    w.setAttribute("lang", "xx-unknown");
    await until(() => root.querySelector("#simCheckbox")!.textContent!.includes("Simulate"), "unknown language falls back to English");
  });

  it("does not write an inherited language to the widget", async function () {
    mountHost().setAttribute("lang", "fr");
    const w = await mount(snippet(), edit);
    assert.equal(w.lang, "fr", "inherits fr");
    assert.isFalse(w.hasAttribute("lang"), "no lang attribute written");
  });
});

mocha.run();
