import { html, nothing, type PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { LitElementWw, computed, signal } from '@webwriter/lit';
import { Settings } from '@webwriter/lit/settings';
import { localizer } from '@webwriter/lit/localize';
import { jsonData } from '@webwriter/lit/data';
import { Shortcuts } from '@webwriter/lit/shortcuts';
import { SceneController } from '@webwriter/lit/scene';
import { Viewport } from '@webwriter/lit/viewport';
import { Drag, type DragCommitDetail } from '@webwriter/lit/drag';
import { transaction } from '@webwriter/widget/transaction';
import { Scene, sceneElements, webglAvailable, type ConnectDetail, type ContextDetail, type MoveDetail, type MovingDetail, type SelectDetail } from '@webwriter/widget/scene';
import { PixiScene } from '@webwriter/widget/scene/pixi';
import { customElement, state } from 'lit/decorators.js';
import type { MsgFn } from '@lit/localize';

import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
import SlPopup from '@shoelace-style/shoelace/dist/components/popup/popup.component.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.component.js';
import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js';
import add from '@tabler/icons/outline/circle-plus.svg';
import connect from '@tabler/icons/outline/plug-connected.svg';
import info from '@tabler/icons/outline/info-circle.svg';
import remove from '@tabler/icons/outline/circle-x.svg';
import trash from '@tabler/icons/outline/trash.svg';

import { Styles } from '../components/styles';
import { gateBox, truthTableWithHeader } from '../components/gate-view';
import { addGate, canConnect, moveGates, parseGates, parseWires, remove as removeEntries, wireEntry, type Gate } from '../model/circuit';
import { GATE_TYPES, LIMIT_SETTING, PORTS, hasTruthTable, truthRowIndex, type GateType, type LimitedType } from '../model/gates';
import { same, start, step, type Signals } from '../model/simulation';
import { circuitToSvg, outputValues, ports, readCircuit, tableToCsv, truthTable } from '../model/exchange';
import { sourceLocale, targetLocales } from '../../localization/generated/locale-codes';

/** The workspace is larger than the window that shows it. */
const BOARD = { x: 0, y: 0, width: 3000, height: 2000 };
/** The corner of the board that a circuit opens at. */
const HOME = { x: 1500, y: 1000 };
/** The size of a gate with its margin. */
const GATE = { width: 60, height: 59 };
/** How many ticks one change may run, which ends a circuit that never settles. */
const MAX_TICKS = 200;

/** What a drawer label reads from the widget: its catalog. */
type Texts = { msg: MsgFn };

/**
 * @summary Logic circuit simulator widget for composing and simulating digital circuits with logic gates.
 *
 * @tag webwriter-logic-circuit
 *
 * @cssprop --circuit-background - Background color of the workspace
 * @cssprop --ww-text-color - Text color, from the document theme
 * @cssprop --ww-font-family - Font, from the document theme
 * @cssprop --ww-theme-accent-1 - Highlight of the drop target and of the truth table row in use
 * @csspart board - The workspace the gates sit on
 * @csspart gate - Styles individual gate components on the board
 * @csspart line - Styles the connecting lines between gates
 *
 * @signal outputs - The values (0 or 1) at the output gates in reading order (top to bottom, then left to right), as a series. Every output reads 0 while the simulation is off.
 * @signal truth - The truth table of the circuit as a table with the columns In1.., Out1.. (inputs and outputs in reading order). It is empty for a circuit without inputs or outputs or with more than 8 inputs. A circuit with a loop gives the state it settles in from all inputs off.
 *
 * Conversions: `table` (truth table, both gates in reading order), `text/csv` (the truth table), `image/svg+xml` (the circuit with rectangular IEC symbols; inputs show their switch state) and `.json` (the data block `{gates, connections}`, which can be imported again). The truth table, CSV and SVG drop gate limits and settings; only the JSON file carries the full circuit. Importing a JSON file replaces the circuit.
 *
 * @slot data - Direct application/json block storing gates and connections.
 *
 * @attr {number} simulation-delay - Delay (in ms) between simulation ticks
 * @attr {number} allow-simulation - Whether simulation is enabled (1 = enabled, 0 = disabled)
 * @attr {number} not-gate-allowed - Whether NOT gates are allowed (-1 = unlimited, 0+ = limited)
 * @attr {number} and-gate-allowed - Whether AND gates are allowed
 * @attr {number} or-gate-allowed - Whether OR gates are allowed
 * @attr {number} nand-gate-allowed - Whether NAND gates are allowed
 * @attr {number} nor-gate-allowed - Whether NOR gates are allowed
 * @attr {number} xor-gate-allowed - Whether XOR gates are allowed
 * @attr {number} xnor-gate-allowed - Whether XNOR gates are allowed
 * @attr {number} splitter-allowed - Whether splitters are allowed
 */
@customElement('webwriter-logic-circuit')
export class WebwriterLogicCircuit extends Settings(LitElementWw, {
    allowSimulation: { group: "simulation", type: Number, default: 1, min: 0, max: 1, step: 1, attribute: "allowsimulation", label: (widget: Texts) => ({ _: widget.msg("Allow simulation") }) },
    simulationDelay: { group: "simulation", type: Number, default: 500, min: 0, unit: "ms", attribute: "simulationdelay", label: (widget: Texts) => ({ _: widget.msg("Simulation delay") }) },
    notGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "notgateallowed", label: (widget: Texts) => ({ _: widget.msg("NOT gate limit") }) },
    andGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "andgateallowed", label: (widget: Texts) => ({ _: widget.msg("AND gate limit") }) },
    orGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "orgateallowed", label: (widget: Texts) => ({ _: widget.msg("OR gate limit") }) },
    nandGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "nandgateallowed", label: (widget: Texts) => ({ _: widget.msg("NAND gate limit") }) },
    norGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "norgateallowed", label: (widget: Texts) => ({ _: widget.msg("NOR gate limit") }) },
    xnorGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "xnorgateallowed", label: (widget: Texts) => ({ _: widget.msg("XNOR gate limit") }) },
    xorGateAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "xorgateallowed", label: (widget: Texts) => ({ _: widget.msg("XOR gate limit") }) },
    splitterAllowed: { group: "limits", type: Number, default: -1, min: -1, step: 1, attribute: "splitterallowed", label: (widget: Texts) => ({ _: widget.msg("Splitter limit") }) },
}) {
    static shadowRootOptions = {
        ...LitElementWw.shadowRootOptions,
        delegatesFocus: true,
    };

    static styles = Styles;

    /** The scene draws with WebGL where the browser has it and with SVG elsewhere. */
    static scopedElements: Record<string, CustomElementConstructor> = {
        ...sceneElements,
        'ww-scene': webglAvailable() ? PixiScene : Scene,
        'sl-button': SlButton,
        'sl-icon': SlIcon,
        'sl-tooltip': SlTooltip,
        'sl-popup': SlPopup,
        'sl-switch': SlSwitch,
        'sl-menu': SlMenu,
        'sl-menu-item': SlMenuItem,
        'sl-checkbox': SlCheckbox,
    };

    static optionGroups = {
        simulation: { label: (widget: Texts) => widget.msg("Simulation") },
        limits: { label: (widget: Texts) => widget.msg("Gate limits"), collapsible: true, collapsed: true, advanced: true },
    };

    static convertTo = { table: 'toTable', 'text/csv': 'exportCsv', 'image/svg+xml': 'exportSvg', '.json': 'exportJson' };
    static convertFrom = { '.json': 'importJson' };

    static actions = {
        clearCircuit: {
            label: (widget: Texts) => widget.msg("Clear circuit"),
            intent: 'danger' as const,
            confirm: (widget: Texts) => widget.msg("Remove all gates and connections?"),
        },
        deleteSelection: { label: (widget: Texts) => widget.msg("Delete"), shortcut: ["Delete", "Backspace"], hidden: true },
    };

    /** i18n handler for the widget. */
    public localize = localizer(this, {
        sourceLocale,
        targetLocales,
        drawer: true,
        load: (locale) => import(`../../localization/generated/${locale}.ts`),
    });
    readonly msg = this.localize.msg;

    /** The JSON data block: `{gates: string[], connections: string[]}`. A gate is `id|TYPE|left|top`, a connection `outputId|inputId`. */
    #data = jsonData(this, { defaults: { gates: [] as string[], connections: [] as string[] } });
    #viewport = new Viewport(this, {
        bounds: () => BOARD,
        can: () => !this.#scene.marquee,
        // A circuit opens at the corner of the board where circuits start.
        start: { x: -HOME.x, y: -HOME.y, scale: 1 },
        fit: { padding: 20, maxScale: 1, follow: 'none', target: () => this.#gatesBox() },
    });
    #scene = new SceneController(this, { viewport: this.#viewport.core });
    #drag = new Drag(this, { viewport: this.#viewport.core });
    #shortcuts = new Shortcuts(this);

    /** The keys of the selected gates and wires. */
    @state() accessor selection: ReadonlySet<string> = new Set();
    /** The signals at the ports while the circuit simulates. */
    @state() accessor levels: Signals = new Map();
    /** The input gates that are switched on. */
    @state() accessor on: ReadonlySet<string> = new Set();
    /** The gates that show their truth table. */
    @state() accessor tables: ReadonlySet<string> = new Set();
    @state() accessor simulate = true;
    @state() accessor allTables = false;
    @state() accessor instructionsOpen = false;
    @state() accessor menu: { gate: Gate; x: number; y: number } | null = null;
    @state() accessor overTrash = false;

    #outputs = signal<number[]>([]);
    #structureVersion = signal(0);
    /** What other widgets read: see `@signal` in the class description. */
    readonly signals = {
        outputs: computed(() => this.#outputs.get()),
        truth: computed(() => {
            this.#structureVersion.get();
            return truthTable(this.#circuit.gates, this.#circuit.wires) ?? { columns: [], rows: [] };
        }),
    };

    #parsed: { source: object; gates: Gate[]; wires: ReturnType<typeof parseWires> } | null = null;
    #structure = '';
    #order = '';
    #timer: ReturnType<typeof setTimeout> | undefined;
    #ticks = 0;
    #abort: AbortController | null = null;

    /** The gates and wires of the data block, read again when the block changes. */
    get #circuit() {
        const source = this.#data.get();
        if (this.#parsed?.source !== source) {
            const gates = parseGates(source.gates);
            this.#parsed = { source, gates, wires: parseWires(source.connections, gates) };
        }
        return this.#parsed;
    }

    connectedCallback() {
        super.connectedCallback();
        this.#abort = new AbortController();
        const { signal } = this.#abort;
        document.addEventListener('pointerdown', this.#outside, { capture: true, signal });
        this.addEventListener('keydown', (event) => event.key === 'Escape' && (this.menu = null), { signal });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#abort?.abort();
        clearTimeout(this.#timer);
        this.#structure = '';
        this.#order = '';
    }

    willUpdate(changed: PropertyValues<this>) {
        super.willUpdate(changed);
        const { gates, wires } = this.#circuit;
        const structure = gates.map((gate) => gate.key).join() + '|' + wires.map((wire) => wire.key).join();
        if (structure !== this.#structure) {
            this.#structure = structure;
            this.#structureVersion.set(this.#structureVersion.get() + 1);
            this.#restart();
        }
        const { inputs, outputs } = ports(gates);
        const order = inputs.map((gate) => gate.key).join() + '|' + outputs.map((gate) => gate.key).join();
        if (order !== this.#order) {
            this.#order = order;
            this.#structureVersion.set(this.#structureVersion.get() + 1);
        }
    }

    updated(changed: PropertyValues<this>) {
        super.updated(changed);
        const next = outputValues(ports(this.#circuit.gates).outputs, this.simulate ? this.levels : new Map());
        const current = this.#outputs.get();
        if (next.length !== current.length || next.some((value, index) => value !== current[index])) this.#outputs.set(next);
    }

    /** Widget action: removes every gate and wire. */
    clearCircuit() {
        const { gates, connections } = this.#data.get();
        if (!gates.length && !connections.length) return false;
        this.#write(() => {
            this.#data.set({ gates: [], connections: [] });
            this.selection = new Set();
            this.on = new Set();
            this.tables = new Set();
            this.menu = null;
        });
    }

    /** @internal Conversion to a native table: the truth table. */
    toTable() {
        const table = truthTable(this.#circuit.gates, this.#circuit.wires);
        if (!table) return null;
        const doc = this.ownerDocument;
        const element = doc.createElement('table');
        const row = (cells: (string | number | null)[], tag: 'th' | 'td') => {
            const tr = doc.createElement('tr');
            for (const cell of cells) tr.append(Object.assign(doc.createElement(tag), { textContent: String(cell ?? '') }));
            return tr;
        };
        const head = doc.createElement('thead');
        const body = doc.createElement('tbody');
        head.append(row(table.columns, 'th'));
        body.append(...table.rows.map((cells) => row(cells, 'td')));
        element.append(head, body);
        return element;
    }

    /** @internal Export of the truth table as CSV. */
    exportCsv() {
        const table = truthTable(this.#circuit.gates, this.#circuit.wires);
        return table ? new File([tableToCsv(table)], 'truth-table.csv', { type: 'text/csv' }) : null;
    }

    /** @internal Export of the circuit drawing as SVG. */
    exportSvg() {
        const { gates, wires } = this.#circuit;
        return gates.length ? new File([circuitToSvg(gates, wires, this.on)], 'logic-circuit.svg', { type: 'image/svg+xml' }) : null;
    }

    /** @internal Export of the data block as JSON. */
    exportJson() {
        const { gates, connections } = this.#data.get();
        return new File([JSON.stringify({ gates, connections }, null, 2)], 'logic-circuit.json', { type: 'application/json' });
    }

    /** @internal Reads and checks a JSON circuit, and returns the function that replaces the circuit with it. */
    async importJson(file: File) {
        let circuit: ReturnType<typeof readCircuit>;
        try {
            circuit = readCircuit(await file.text());
        } catch (error) {
            throw new Error((error as Error).message === 'json' ? this.msg("The file is not valid JSON.") : this.msg("The file does not contain a logic circuit."));
        }
        return () => {
            this.#data.set(circuit);
            this.selection = new Set();
            this.on = new Set();
            this.tables = new Set();
            this.menu = null;
        };
    }

    /** Widget action and key: removes the selected gates and wires. */
    deleteSelection() {
        if (this.selection.size === 0) return false;
        this.#remove(this.selection);
    }

    // The simulation: a signal travels one gate per delay.

    #restart() {
        clearTimeout(this.#timer);
        this.#ticks = 0;
        if (!this.simulate) {
            this.levels = new Map();
            return;
        }
        this.levels = start(this.#circuit.gates, this.on);
        this.#schedule();
    }

    #schedule() {
        clearTimeout(this.#timer);
        this.#timer = setTimeout(() => {
            const next = step(this.#circuit.gates, this.#circuit.wires, this.on, this.levels);
            if (same(next, this.levels) || ++this.#ticks > MAX_TICKS) return;
            this.levels = next;
            this.#schedule();
        }, this.simulationDelay);
    }

    #toggleInput(key: string) {
        const on = new Set(this.on);
        if (!on.delete(key)) on.add(key);
        this.on = on;
        if (!this.simulate) return;
        this.levels = new Map(this.levels).set(`${key}:Out`, on.has(key));
        this.#ticks = 0;
        this.#schedule();
    }

    // Changes of the circuit, each one undo step.

    #write(change: () => void) {
        transaction(this, async () => {
            change();
            await this.updateComplete;
        });
    }

    #remove(keys: ReadonlySet<string>) {
        const { gates, connections } = this.#data.get();
        const left = removeEntries(gates, connections, keys);
        this.#write(() => {
            this.#data.set({ gates: left.gates, connections: left.wires });
            this.selection = new Set([...this.selection].filter((key) => !keys.has(key)));
            this.menu = null;
        });
    }

    #allowed(type: GateType) {
        if (!(type in LIMIT_SETTING)) return true;
        const limit = this[LIMIT_SETTING[type as LimitedType]];
        return limit < 0 || this.#circuit.gates.filter((gate) => gate.type === type).length < limit;
    }

    #add(type: GateType, x: number, y: number) {
        if (!this.#allowed(type)) return;
        const added = addGate(this.#data.get().gates, type, x, y);
        this.#write(() => {
            this.#data.set({ gates: added.entries });
            if (this.allTables && hasTruthTable(type)) this.tables = new Set([...this.tables, added.key]);
        });
    }

    #setTables(keys: Iterable<string>) {
        this.tables = new Set(keys);
    }

    #flipTable(key: string) {
        this.#setTables(this.tables.has(key) ? [...this.tables].filter((other) => other !== key) : [...this.tables, key]);
        this.menu = null;
    }

    #flipAllTables(event: Event) {
        this.allTables = (event.target as SlSwitch).checked;
        this.#setTables(this.allTables ? this.#circuit.gates.filter((gate) => hasTruthTable(gate.type)).map((gate) => gate.key) : []);
    }

    // What the reader does in the scene.

    #select(event: CustomEvent<SelectDetail>) {
        if (!event.defaultPrevented) this.selection = new Set(event.detail.keys);
    }

    #inTrash(pointer: { clientX: number; clientY: number } | null) {
        if (!pointer) return false;
        const trash = this.renderRoot.querySelector('.trashCanIcon')!.getBoundingClientRect();
        return pointer.clientX >= trash.left && pointer.clientX <= trash.right && pointer.clientY >= trash.top && pointer.clientY <= trash.bottom;
    }

    #moving(event: CustomEvent<MovingDetail>) {
        this.overTrash = event.detail.state === 'move' && this.#inTrash(event.detail.pointer);
    }

    #move(event: CustomEvent<MoveDetail>) {
        const moved = new Map(event.detail.items.map((item) => [item.key, { x: item.x, y: item.y }]));
        if (this.#inTrash(event.detail.pointer)) this.#remove(new Set(moved.keys()));
        else this.#data.set({ gates: moveGates(this.#data.get().gates, moved) });
        this.overTrash = false;
    }

    #connect(event: CustomEvent<ConnectDetail>) {
        const [from, to] = event.detail.from.split(':')[1].startsWith('In') ? [event.detail.to, event.detail.from] : [event.detail.from, event.detail.to];
        if (!canConnect(this.#circuit.wires, from, to)) return event.preventDefault();
        this.#data.set({ connections: [...this.#data.get().connections, wireEntry(from, to)] });
    }

    /** A wire is removed by the context menu or a long press, a gate opens its menu. */
    #context(event: CustomEvent<ContextDetail>) {
        const { kind, key, point } = event.detail;
        if (kind === 'path') {
            event.preventDefault();
            this.#remove(new Set([key]));
        } else if (kind === 'node') {
            const gate = this.#circuit.gates.find((other) => other.key === key);
            if (!gate) return;
            event.preventDefault();
            this.menu = { gate, x: point.clientX, y: point.clientY };
            this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('sl-menu-item')?.focus());
        }
    }

    /** A click outside closes the gate menu and the open truth table of the sidebar. */
    #outside = (event: PointerEvent) => {
        const path = event.composedPath();
        if (this.menu && !path.some((element) => element instanceof Element && element.localName === 'sl-menu')) this.menu = null;
        for (const tooltip of this.renderRoot.querySelectorAll<SlTooltip>('.sidebar sl-tooltip')) if (tooltip.open && !path.includes(tooltip)) tooltip.hide();
    };

    // The view and the sidebar.

    /** What the fit button shows: the gates, or the corner where circuits start. */
    #gatesBox() {
        const { gates } = this.#circuit;
        if (!gates.length) return { x: HOME.x + 20, y: HOME.y + 20, width: this.#viewport.width - 40, height: this.#viewport.height - 40 };
        const left = Math.min(...gates.map((gate) => gate.x));
        const top = Math.min(...gates.map((gate) => gate.y));
        return { x: left, y: top, width: Math.max(...gates.map((gate) => gate.x)) + GATE.width - left, height: Math.max(...gates.map((gate) => gate.y)) + GATE.height - top };
    }

    /** A gate from the sidebar was dropped on the board. */
    #drop(event: CustomEvent<DragCommitDetail>) {
        const { key, x, y } = event.detail;
        if (x === null || y === null) return;
        this.#add(key as GateType, x, y);
    }

    #sidebarItem(type: GateType) {
        const limit = type in LIMIT_SETTING ? this[LIMIT_SETTING[type as LimitedType]] : -1;
        const count = this.#circuit.gates.filter((gate) => gate.type === type).length;
        const tooltip = hasTruthTable(type)
            ? html`<sl-tooltip class="tooltip" placement="right" trigger="click">
                    <div class="tooltipcontent" slot="content">${truthTableWithHeader(type)}</div>
                    <sl-button class="tooltip-button" variant="text" size="small">i</sl-button>
                </sl-tooltip>`
            : nothing;
        return html`
            <div class="sidebar-item" style=${limit === 0 ? 'display: none;' : ''} tabindex="0" aria-label=${type}
                data-ww-drag="gate" data-ww-drag-effect="copy" data-ww-key=${type} data-ww-label=${type}>
                ${gateBox(type, {}, tooltip)}
                <p class="sidebar-counter">${limit === -1 ? nothing : `${count}/${limit}`}</p>
            </div>`;
    }

    #gateNode(gate: Gate) {
        const { key, type } = gate;
        const at = (name: string) => this.levels.get(`${key}:${name}`);
        const driven = at('In1') !== undefined || at('In2') !== undefined;
        const value = type === 'INPUT' ? this.on.has(key) : at('In1') === true && this.simulate;
        const row = this.simulate && driven ? truthRowIndex(type, !!at('In1'), !!at('In2')) : -1;
        const signals = new Map(PORTS[type].map((port) => [port.name, this.simulate && at(port.name) === true]));
        return html`
            <ww-node data-ww-key=${key} x=${gate.x} y=${gate.y} selectable movable ?selected=${this.selection.has(key)}>
                ${gateBox(type, { value, table: this.tables.has(key), row, signals, onToggle: () => this.#toggleInput(key) })}
            </ww-node>`;
    }

    #menu() {
        if (!this.menu) return nothing;
        const { gate, x, y } = this.menu;
        return html`
            <sl-menu style="left: ${x}px; top: ${y}px">
                ${hasTruthTable(gate.type) ? html`<sl-menu-item type="checkbox" ?checked=${this.tables.has(gate.key)} @click=${() => this.#flipTable(gate.key)}>
                    ${gate.type === 'XOR' ? this.msg("Show truth table") : this.msg("Show Truthtable")}</sl-menu-item>` : nothing}
                <sl-menu-item @click=${() => this.#remove(new Set([gate.key]))}>${this.msg("Delete")}</sl-menu-item>
            </sl-menu>`;
    }

    render() {
        const { gates, wires } = this.#circuit;
        return html`
            <div class=${gates.length ? 'frame' : 'frame empty'}>
            <div class="container">
                <div class="sidebar">${GATE_TYPES.map((type) => this.#sidebarItem(type))}</div>

                <div class="workspace">
                    <ww-scene select="multiple" connect-click data-ww-viewport="canvas" data-ww-viewport-wheel="zoom" data-ww-viewport-zoom="0.5 2.5"
                        data-ww-drop="gate" data-ww-drop-position="point" data-ww-drop-space="world" aria-label="Circuit"
                        @ww-select=${this.#select} @ww-moving=${this.#moving} @ww-move=${this.#move} @ww-connect=${this.#connect} @ww-context=${this.#context} @ww-dragcommit=${this.#drop}>
                        <ww-shape class="board" part="board" kind="rect" width=${BOARD.width} height=${BOARD.height}></ww-shape>
                        ${wires.map((wire) => html`
                            <ww-path part="line" data-ww-key=${wire.key} from=${wire.from} to=${wire.to} route="orthogonal" selectable
                                class=${this.simulate && this.levels.get(wire.from) === true ? 'live' : ''} ?selected=${this.selection.has(wire.key)}></ww-path>`)}
                        ${repeat(gates, (gate) => gate.key, (gate) => this.#gateNode(gate))}
                    </ww-scene>

                    <div class="toolbar">
                        <sl-checkbox id="simCheckbox" class="simulateCheckbox" style=${this.allowSimulation === 1 ? '' : 'display: none;'} ?checked=${this.simulate}
                            @sl-change=${(event: Event) => { this.simulate = (event.target as SlCheckbox).checked; this.#restart(); }}>${this.msg("Simulate")}</sl-checkbox>
                        <sl-switch class="flipSwitch" id="switch" @sl-change=${this.#flipAllTables}>${this.msg("Show all truth tables")}</sl-switch>
                        <span class="viewControls" data-ww-viewport-controls></span>
                    </div>

                    <button type="button" class=${this.overTrash ? 'trashCanIcon trashCanIconDragOver' : 'trashCanIcon'} title=${this.msg("Drag items here to delete them")} aria-label=${this.msg("Delete")} @click=${this.deleteSelection}>
                        <sl-icon src=${trash}></sl-icon>
                    </button>

                    <div id="instructions" class=${this.instructionsOpen ? 'instructions open' : 'instructions'}>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${add}></sl-icon>${this.msg("Drag and drop elements from the left sidebar to add them.")}</div>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${connect}></sl-icon>${this.msg("Drag from a connection endpoint to another connection endpoint to add a connection.")}</div>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${remove}></sl-icon>${this.msg("Select a connection and press Delete to remove it.")}</div>
                    </div>
                    <button type="button" class="infoButton" aria-expanded=${this.instructionsOpen ? 'true' : 'false'} aria-controls="instructions" @click=${() => (this.instructionsOpen = !this.instructionsOpen)}><sl-icon class="instructionIcon" src=${info}></sl-icon>${this.msg("Instructions")}</button>
                </div>
            </div>
            <p class="print-note">${this.msg("Empty logic circuit")}</p>
            </div>

            ${this.#menu()}
        `;
    }
}
