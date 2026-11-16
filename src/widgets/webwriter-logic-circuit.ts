import { html, nothing, type PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { LitElementWw } from '@webwriter/lit';
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
 * @csspart gate - Styles individual gate components
 * @csspart line - Styles the connecting lines between gates
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
    allowSimulation: { type: Number, default: 1, min: 0, max: 1, step: 1, attribute: "allowsimulation", label: (widget: Texts) => ({ _: widget.msg("Allow simulation") }) },
    simulationDelay: { type: Number, default: 500, min: 0, unit: "ms", attribute: "simulationdelay", label: (widget: Texts) => ({ _: widget.msg("Simulation delay") }) },
    notGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "notgateallowed", label: (widget: Texts) => ({ _: widget.msg("NOT gate limit") }) },
    andGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "andgateallowed", label: (widget: Texts) => ({ _: widget.msg("AND gate limit") }) },
    orGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "orgateallowed", label: (widget: Texts) => ({ _: widget.msg("OR gate limit") }) },
    nandGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "nandgateallowed", label: (widget: Texts) => ({ _: widget.msg("NAND gate limit") }) },
    norGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "norgateallowed", label: (widget: Texts) => ({ _: widget.msg("NOR gate limit") }) },
    xnorGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "xnorgateallowed", label: (widget: Texts) => ({ _: widget.msg("XNOR gate limit") }) },
    xorGateAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "xorgateallowed", label: (widget: Texts) => ({ _: widget.msg("XOR gate limit") }) },
    splitterAllowed: { type: Number, default: -1, min: -1, step: 1, attribute: "splitterallowed", label: (widget: Texts) => ({ _: widget.msg("Splitter limit") }) },
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

    static actions = {
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
    @state() accessor signals: Signals = new Map();
    /** The input gates that are switched on. */
    @state() accessor on: ReadonlySet<string> = new Set();
    /** The gates that show their truth table. */
    @state() accessor tables: ReadonlySet<string> = new Set();
    @state() accessor simulate = true;
    @state() accessor allTables = false;
    @state() accessor instructionsOpen = false;
    @state() accessor menu: { gate: Gate; x: number; y: number } | null = null;
    @state() accessor overTrash = false;

    #parsed: { source: object; gates: Gate[]; wires: ReturnType<typeof parseWires> } | null = null;
    #structure = '';
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
    }

    willUpdate(changed: PropertyValues<this>) {
        super.willUpdate(changed);
        const { gates, wires } = this.#circuit;
        const structure = gates.map((gate) => gate.key).join() + '|' + wires.map((wire) => wire.key).join();
        if (structure !== this.#structure) {
            this.#structure = structure;
            this.#restart();
        }
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
            this.signals = new Map();
            return;
        }
        this.signals = start(this.#circuit.gates, this.on);
        this.#schedule();
    }

    #schedule() {
        clearTimeout(this.#timer);
        this.#timer = setTimeout(() => {
            const next = step(this.#circuit.gates, this.#circuit.wires, this.on, this.signals);
            if (same(next, this.signals) || ++this.#ticks > MAX_TICKS) return;
            this.signals = next;
            this.#schedule();
        }, this.simulationDelay);
    }

    #toggleInput(key: string) {
        const on = new Set(this.on);
        if (!on.delete(key)) on.add(key);
        this.on = on;
        if (!this.simulate) return;
        this.signals = new Map(this.signals).set(`${key}:Out`, on.has(key));
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
        const at = (name: string) => this.signals.get(`${key}:${name}`);
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
            <div class="container">
                <div class="sidebar">${GATE_TYPES.map((type) => this.#sidebarItem(type))}</div>

                <div class="workspace">
                    <ww-scene select="multiple" connect-click data-ww-viewport="canvas" data-ww-viewport-wheel="zoom" data-ww-viewport-zoom="0.5 2.5"
                        data-ww-drop="gate" data-ww-drop-position="point" data-ww-drop-space="world" aria-label="Circuit"
                        @ww-select=${this.#select} @ww-moving=${this.#moving} @ww-move=${this.#move} @ww-connect=${this.#connect} @ww-context=${this.#context} @ww-dragcommit=${this.#drop}>
                        <ww-shape class="board" kind="rect" width=${BOARD.width} height=${BOARD.height}></ww-shape>
                        ${wires.map((wire) => html`
                            <ww-path data-ww-key=${wire.key} from=${wire.from} to=${wire.to} route="orthogonal" selectable
                                class=${this.simulate && this.signals.get(wire.from) === true ? 'live' : ''} ?selected=${this.selection.has(wire.key)}></ww-path>`)}
                        ${repeat(gates, (gate) => gate.key, (gate) => this.#gateNode(gate))}
                    </ww-scene>

                    <sl-checkbox id="simCheckbox" class="simulateCheckbox" style=${this.allowSimulation === 1 ? '' : 'display: none;'} ?checked=${this.simulate}
                        @sl-change=${(event: Event) => { this.simulate = (event.target as SlCheckbox).checked; this.#restart(); }}>${this.msg("Simulate")}</sl-checkbox>
                    <sl-switch class="flipSwitch" id="switch" @sl-change=${this.#flipAllTables}>${this.msg("Show all truth tables")}</sl-switch>
                    <span class="viewControls" data-ww-viewport-controls></span>

                    <div class=${this.overTrash ? 'trashCanIcon trashCanIconDragOver' : 'trashCanIcon'} title=${this.msg("Drag items here to delete them")} @click=${this.deleteSelection}>
                        <sl-icon src=${trash}></sl-icon>
                    </div>

                    <div class=${this.instructionsOpen ? 'instructions open' : 'instructions'}>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${add}></sl-icon>${this.msg("Drag and drop elements from the left sidebar to add them.")}</div>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${connect}></sl-icon>${this.msg("Drag from a connection endpoint to another connection endpoint to add a connection.")}</div>
                        <div class="instruction"><sl-icon class="instructionIcon" src=${remove}></sl-icon>${this.msg("Select a connection and press Delete to remove it.")}</div>
                    </div>
                    <div class="infoButton" @click=${() => (this.instructionsOpen = !this.instructionsOpen)}><sl-icon class="instructionIcon" src=${info}></sl-icon>${this.msg("Instructions")}</div>
                </div>
            </div>

            ${this.#menu()}
        `;
    }
}
