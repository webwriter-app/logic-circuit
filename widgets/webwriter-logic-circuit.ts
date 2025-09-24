import { html } from 'lit';
import { LitElementWw } from '@webwriter/lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import NOTGate from './src/gates/not-gate.js';
import ANDGate from './src/gates/and-gate.js';
import Input from './src/gates/input.js';
import NANDGate from './src/gates/nand-gate.js';
import NORGate from './src/gates/nor-gate.js';
import ORGate from './src/gates/or-gate.js';
import Output from './src/gates/output.js';
import XNORGate from './src/gates/xnor-gate.js';
import XORGate from './src/gates/xor-gate.js';
import Splitter from './src/gates/splitter.js';
import Gate from './src/gates/gate.js';

import ConnectorElement from './src/connector.js';
import { getConnectorCoordinates, getMouseCoordinates, calculatePathToMouse } from './src/helper/line-helper.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import SlButtonGroup from '@shoelace-style/shoelace/dist/components/button-group/button-group.component.js';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js';
import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';
import SlPopup from '@shoelace-style/shoelace/dist/components/popup/popup.component.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.component.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { Styles } from './src/styles.js';
import { add, connect, info, remove, trash } from './src/assets/icons.js';

import { calculatePath, updateLines, resetLines, createLine} from './src/helper/line-helper.js';
import { addGate, moveGate, transferOutputToNextGate } from './src/helper/gate-helper.js';
import { gateCounter, isDropOverTrashIcon, resetGates } from './src/helper/gate-helper.js';
import LOCALIZE from "../localization/generated";
import { localized, msg } from "@lit/localize";

const workspaceWidth: number = 3000;
const workspaceHeight: number = 2000;

let workspaceOffsetX: number = -workspaceWidth / 2;
let workspaceOffsetY: number = -workspaceHeight / 2;

/**
 * @summary Logic circuit simulator widget for composing and simulating digital circuits with logic gates.
 *
 * @tag webwriter-logic-circuit
 *
 * @cssprop --circuit-background - Background color of the workspace
 * @csspart gate - Styles individual gate components
 * @csspart line - Styles the connecting lines between gates
 *
 * @slot - The default slot (currently unused in this widget)
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
 * @attr {string} reflect-gates - Stringified representation of gates (for syncing or reflecting state)
 * @attr {string} reflect-cons - Stringified representation of connections (for syncing or reflecting state)
 */
@customElement('webwriter-logic-circuit')
@localized()
export default class LogicCircuit extends LitElementWw {
    static shadowRootOptions = {
        ...LitElementWw.shadowRootOptions,
        delegatesFocus: true,
    };

    /** i18n handler for the widget. */
    public localize = LOCALIZE;

    /** Styles for the widget. */
    static styles = Styles;

    /** Registers scoped custom elements used within the logic circuit widget. */
    public static get scopedElements() {
        return {
            'not-gate': NOTGate,
            'and-gate': ANDGate,
            'input-gate': Input,
            'nand-gate': NANDGate,
            'nor-gate': NORGate,
            'or-gate': ORGate,
            'output-gate': Output,
            'xnor-gate': XNORGate,
            'xor-gate': XORGate,
            'splitter-gate': Splitter,
            'connector-element': ConnectorElement,
            'sl-button': SlButton,
            'sl-button-group': SlButtonGroup,
            'sl-icon-button': SlIconButton,
            'sl-icon': SlIcon,
            'sl-tooltip': SlTooltip,
            'sl-popup': SlPopup,
            'sl-switch': SlSwitch,
            'sl-menu': SlMenu,
            'sl-menu-item': SlMenuItem,
            'sl-checkbox': SlCheckbox,
            'sl-input': SlInput,
        };
    }

    /** The list of all current wire (line) elements. */
    @property({ type: Array }) accessor lineElements = [];

    /** The list of all current gate elements. */
    @property({ type: Array }) accessor gateElements = [];

    /** Stringified representation of gate state, synced via attribute. */
    @property({ type: String, reflect: true }) accessor reflectGates: String = "";

    /** Stringified representation of connector state, synced via attribute. */
    @property({ type: String, reflect: true }) accessor reflectCons: String = "";

    /** Internal gate ID counter for uniquely identifying gates. */
    @property({ type: Number }) accessor gateID: number = 0;

    /** Internal line ID counter for uniquely identifying wires. */
    @property({ type: Number }) accessor lineID: number = 0;

    /** Current zoom level of the circuit canvas. */
    @property({ type: Number }) accessor zoom: number = 1;

    /** X coordinate where the drag operation started. */
    @property({ type: Number }) accessor dragStartX: number = 0;

    /** Y coordinate where the drag operation started. */
    @property({ type: Number }) accessor dragStartY: number = 0;

    /** Whether the simulation is running. */
    @property({ type: Boolean }) accessor simulate: boolean = true;

    /** Delay in milliseconds between simulation steps. */
    @property({ type: Number, attribute: true, reflect: true }) accessor simulationDelay: number = 500;

    /** Whether simulation is allowed (1 = allowed, 0 = disallowed). */
    @property({ type: Number, attribute: true, reflect: true }) accessor allowSimulation: number = 1;

    /** Limit or enable state for NOT gates (-1 = unlimited, 0+ = limited). */
    @property({ type: Number, attribute: true, reflect: true }) accessor notGateAllowed: number = -1;

    /** Limit or enable state for AND gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor andGateAllowed: number = -1;

    /** Limit or enable state for OR gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor orGateAllowed: number = -1;

    /** Limit or enable state for NAND gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor nandGateAllowed: number = -1;

    /** Limit or enable state for NOR gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor norGateAllowed: number = -1;

    /** Limit or enable state for XNOR gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor xnorGateAllowed: number = -1;

    /** Limit or enable state for XOR gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor xorGateAllowed: number = -1;

    /** Limit or enable state for splitter gates. */
    @property({ type: Number, attribute: true, reflect: true }) accessor splitterAllowed: number = -1;

    /** Whether the user is currently dragging the canvas or an element. */
    @property({ type: Boolean }) accessor isDragging: boolean = false;

    /** Whether a connection line is currently being drawn. */
    @state() accessor isDrawingLine: boolean = false;

    /** Reference to the starting connector for a wire being drawn. */
    @state() accessor startConnector: ConnectorElement = null;

    /** Reference to the ending connector for a wire being drawn. */
    @state() accessor endConnector: ConnectorElement = null;

    /** Reference to the SVG canvas element. */
    @query('#svgCanvas') accessor svgCanvas;

    /** Reference to the overall workspace container. */
    @query('#workspace') accessor workspaceContainer;

    /** Reference to the draggable inner workspace. */
    @query('#workspaceDraggable') accessor wsDrag;

    /** Reference to the simulation checkbox toggle. */
    @query('#simCheckbox') accessor simCheckbox;

    /** Reference to the instructions container. */
    @query('#instructions') accessor instructionsContainer;

    /** Get the current list of gate elements. */
    public getGateElements = () => this.gateElements;

    /** Get the current list of line elements. */
    public getLineElements = () => this.lineElements;

    /** The temporary path element used when drawing a wire to follow the mouse. */
    svgPathToMouse: SVGPathElement | null = null;

    render() {
        return html`
            <div class="container">
                <div class="sidebar">
                    <div style=${this.notGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <not-gate></not-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'NOT')}</p>
                    </div>

                    <div style=${this.andGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <and-gate></and-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'AND')}</p>
                    </div>

                    <div style=${this.orGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <or-gate></or-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'OR')}</p>
                    </div>

                    <div style=${this.nandGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <nand-gate></nand-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'NAND')}</p>
                    </div>

                    <div style=${this.norGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <nor-gate></nor-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'NOR')}</p>
                    </div>

                    <div style=${this.xnorGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <xnor-gate></xnor-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'XNOR')}</p>
                    </div>

                    <div style=${this.xorGateAllowed === 0 ? 'display: none;' : ''} class="sidebar-item">
                        <xor-gate></xor-gate>
                        <p class="sidebar-counter">${gateCounter(this, 'XOR')}</p>
                    </div>

                    <splitter-gate></splitter-gate>
                    <input-gate></input-gate>
                    <output-gate></output-gate>
                </div>

                <div class="workspaceContainer" id="workspace">
                    <sl-checkbox id="simCheckbox" class="simulateCheckbox" @sl-change=${() => this.simulateCircuit()} checked
                        >${msg("Simulate")}</sl-checkbox
                    >

                    <sl-switch class="flipSwitch" id="switch" @sl-change=${() => this.handleFlipAllGates()}
                        >${msg("Show all Truthtables")}</sl-switch
                    >

                    <div class="trashCanIcon" style="font-size: 35px;" title="${msg("Drag items here to delete them")}">${trash}</div>
                    
                    <div id="instructions" class="instructions">
                        <div class="instruction">
                        ${add}${msg("Drag and drop elements from the left sidebar to add them.")}
                        </div>
                        <div class="instruction">
                        ${connect}${msg("Left click a connection endpoint to start a connection and then click another connection endpoint to add it.")}
                        </div>
                        <div class="instruction">
                        ${remove}${msg("Right click on a connection to remove it.")}
                        </div>
                    </div>

                    <div class="infoButton" @click=${() => this.toggleInstructions()}>${info}${msg("Instructions")}</div>

                    <div class="workspaceArea" id="workspaceDraggable">
                        <svg class="svgArea" id="svgCanvas"></svg>
                    </div>
                </div>
            </div>

            <div part="options" class="optionsMenu">
                <p>Simulation:</p>
                <div class="optionsItem">
                    <sl-checkbox class="optionsCheckbox" @sl-change=${() => this.handleAllowSimulation()} checked
                        >${msg("Allow Simulation")}</sl-checkbox
                    >
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'simulationDelay')}
                        .value=${this.simulationDelay}
                        min="0"
                    ></sl-input>
                    <p>${msg("Delay (in ms)")}</p>
                </div>
                <p></p>
                <p>${msg("Limit max. number of Gates:")}</p>

                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'notGateAllowed')}
                        .value=${this.notGateAllowed >= 0 ? this.notGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>NOT-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'andGateAllowed')}
                        .value=${this.andGateAllowed >= 0 ? this.andGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>AND-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'orGateAllowed')}
                        .value=${this.orGateAllowed >= 0 ? this.orGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>OR-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'nandGateAllowed')}
                        .value=${this.nandGateAllowed >= 0 ? this.nandGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>NAND-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'norGateAllowed')}
                        .value=${this.norGateAllowed >= 0 ? this.norGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>NOR-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'xnorGateAllowed')}
                        .value=${this.xnorGateAllowed >= 0 ? this.xnorGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>XNOR-${msg("Gates")}</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'xorGateAllowed')}
                        .value=${this.xorGateAllowed >= 0 ? this.xorGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>XOR-${msg("Gates")}</p>
                </div>
            </div>
        `;
    }

    /**
     * Called when the component is updated.
     * Handles toggling the visibility of the simulation checkbox based on `allowSimulation`.
     *
     * @param {Map<string, unknown>} changedProperties - A map of changed properties and their previous values
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('allowSimulation')) {
            if (this.allowSimulation === 1) {
                this.simCheckbox.style.display = 'block';
            } else {
                this.simCheckbox.style.display = 'none';
            }
        }
    }

    /**
     * Lifecycle method called when the element is added to the DOM.
     * Registers a context menu event listener.
     */
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('contextmenu', this.handleContextMenu);
    }

    /**
     * Lifecycle method called when the element is removed from the DOM.
     * Cleans up mouse-related event listeners to avoid memory leaks.
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mousedown', this.handleMouseDown);
        this.removeEventListener('mousemove', this.handleMouseMove);
        this.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Toggles the visibility of the instructions container in the UI.
     */
    toggleInstructions() {
        if (this.instructionsContainer.style.display == "block") {
            this.instructionsContainer.style.display = 'none';
        } else {
            this.instructionsContainer.style.display = 'block';
        }
    }

    /**
     * Called once after the component’s initial render.
     * - Registers all workspace event listeners (drag, drop, mouse, wheel).
     * - Sets up the workspace size and initial transform.
     * - Adds an SVG path element for live line drawing.
     * - Reconstructs gates and connections from `reflectGates` and `reflectCons`, if provided.
     */
    firstUpdated() {
        this.workspaceContainer.addEventListener('drop', this.handleDrop.bind(this));
        this.workspaceContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        this.workspaceContainer.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.workspaceContainer.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.workspaceContainer.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.workspaceContainer.addEventListener('mouseout', this.handleMouseOut.bind(this));
        this.workspaceContainer.addEventListener('wheel', this.handleWheel.bind(this));

        this.wsDrag.style.width = workspaceWidth + 'px';
        this.wsDrag.style.height = workspaceHeight + 'px';
        this.wsDrag.style.transform = `translate(${workspaceOffsetX}px,${workspaceOffsetY}px) scale(${this.zoom})`;

        this.svgPathToMouse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.svgPathToMouse.setAttribute('d', '');
        this.svgPathToMouse.setAttribute('stroke', 'black');
        this.svgPathToMouse.setAttribute('fill', 'none');
        this.svgPathToMouse.setAttribute('stroke-width', '3');
        this.svgPathToMouse.setAttribute('id', 'lineToMouse');
        this.svgCanvas.appendChild(this.svgPathToMouse);

        if(this.reflectGates.length>0){
            this.reflectGates.split(",").forEach(gate=>{
                addGate(this, null, gate.split("|").splice(1))
            })
        }
        if(this.reflectCons.length>0){
            this.reflectCons.split(",").forEach(con=>{
                let startID: string = con.split("|")[0]
                let endID: string = con.split("|")[1]
                let start: any, end: any
                this.shadowRoot.querySelector(".workspaceArea").childNodes.forEach(node=>{
                    if(node.nodeName.includes("GATE")){
                        setTimeout(()=>{
                            const el = node as Element
                            if(startID.includes(el.shadowRoot.querySelector("div").id)){
                                let gate: any = el.shadowRoot.querySelector("div")
                                let connectorArr: any = gate.querySelectorAll("slot")
                                connectorArr.forEach(slot=>{
                                    if(slot.children[0].id === startID){
                                        start = (slot.childNodes as NodeList).item(0)
                                    }
                                })
                            }
                            if(endID.includes(el.shadowRoot.querySelector("div").id)){
                                let gate: any = el.shadowRoot.querySelector("div")
                                let connectorArr: any = gate.querySelectorAll("slot")
                                connectorArr.forEach(slot=>{
                                    if(slot.children[0].id === endID){
                                        end = (slot.childNodes as NodeList).item(0)
                                    }
                                })
                            }
                            createLine(this,start,end)
                        }, 1)
                    }
                })
            })
        }
    }

    /**
     * Toggles simulation mode on or off.
     * Resets the circuit and updates the simulation checkbox and internal flag.
     */
    handleAllowSimulation() {
        if (this.allowSimulation === 0) {
            this.resetCircuit();
            this.simCheckbox.checked = false;
            this.allowSimulation = 1;
        } else {
            this.simulate = false
            this.resetCircuit();
            this.allowSimulation = 0;
        }
    }

    /**
     * Enables or disables the "truth table" display on all gates,
     * depending on the state of the main switch.
     */
    handleFlipAllGates() {
        if ((this.shadowRoot.getElementById('switch') as SlSwitch).checked === false) {
            this.gateElements.forEach((gate) => {
                if (gate.gatetype !== 'INPUT' && gate.gatetype !== 'OUTPUT') {
                    gate.shadowRoot.getElementById('flipCheckbox').checked = false;
                    gate.showTruthTable = false;
                }
            });
        } else {
            this.gateElements.forEach((gate) => {
                if (gate.gatetype !== 'INPUT' && gate.gatetype !== 'OUTPUT') {
                    gate.shadowRoot.getElementById('flipCheckbox').checked = true;
                    gate.showTruthTable = true;
                }
            });
        }
    }

    /**
     * Handles mouse down interactions on the workspace.
     * - Starts dragging the canvas if the background is clicked.
     * - Cancels in-progress line drawing.
     * - Hides any open gate context menus.
     *
     * @param {MouseEvent} event
     */
    handleMouseDown(event) {
        if (event.target === this.svgCanvas) {
            this.isDragging = true;
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
            if (this.isDrawingLine) {
                this.isDrawingLine = false;
                this.startConnector = null;
                this.svgPathToMouse.setAttribute('d', '');
            }
            this.gateElements.forEach((gate) => {
                gate.hideContextMenu();
            });
        }
    }

    /**
     * Handles mouse move events during dragging or line drawing.
     * Updates canvas position or live line path accordingly.
     *
     * @param {MouseEvent} event
     */
    handleMouseMove(event) {
        if (this.isDragging) {
            const deltaX = event.clientX - this.dragStartX;
            const deltaY = event.clientY - this.dragStartY;

            workspaceOffsetX = workspaceOffsetX + deltaX;
            workspaceOffsetY = workspaceOffsetY + deltaY;

            this.calculateBoundaries();
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;

            this.transformWorkspace();
        }

        if (this.isDrawingLine) {
            const { x: startX, y: startY } = getConnectorCoordinates(this.svgCanvas, this.startConnector, this.zoom);
            const { x: endX, y: endY } = getMouseCoordinates(
                this.svgCanvas,
                event.clientX,
                event.clientY - 4,
                this.zoom
            );
            let path;

            if (this.startConnector.type === 'output') {
                path = `M ${startX} ${startY}`;
            } else {
                path = `M ${endX} ${endY}`;
            }
            const points = calculatePathToMouse(this.svgCanvas, this.startConnector, this.zoom, endX, endY);
            for (let i = 1; i < points.length; i++) {
                path += ` L ${points[i].x} ${points[i].y}`;
            }
            this.svgPathToMouse.setAttribute('d', path);
        }
    }

    /**
     * Applies the current workspace offset and zoom transform to the container.
     */
    transformWorkspace() {
        const workspace = this.wsDrag;
        workspace.style.transform = `translate(${workspaceOffsetX}px,${workspaceOffsetY}px) scale(${this.zoom})`;
    }

    /**
     * Stops dragging behavior.
     */
    handleMouseUp() {
        this.isDragging = false;
    }

    /**
     * Handles zooming the workspace with the mouse wheel.
     * Clamps zoom between 0.5 and 2.5, and recalculates boundaries.
     *
     * @param {WheelEvent} event
     */
    handleWheel(event) {
        event.preventDefault();

        this.gateElements.forEach((gate) => {
            gate.hideContextMenu();
        });

        const delta = event.deltaY;
        this.zoom -= delta * 0.001;

        this.zoom = Math.min(Math.max(this.zoom, 0.5), 2.5);
        this.transformWorkspace();
        this.calculateBoundaries();
        this.transformWorkspace();
    }

    /**
     * Handles mouse leaving the workspace area.
     * Updates line positions and cancels dragging.
     *
     * @param {MouseEvent} event
     */
    handleMouseOut(event) {
        updateLines(this, Gate.movedGate);
        this.isDragging = false;
    }

    /**
     * Prevents the default browser context menu.
     *
     * @param {MouseEvent} event
     */
    handleContextMenu(event) {
        event.preventDefault();
    }

    /**
     * Called when a gate is dragged over the workspace.
     * - Moves any connected lines dynamically.
     * - Highlights the trash can icon if hovering over it.
     *
     * @param {DragEvent} event
     */
    handleDragOver(event) {
        event.preventDefault();
        const draggedGate = Gate.movedGate;
        const mouseStartX = Gate.x;
        const mouseStartY = Gate.y;

        let deltaX = (event.clientX - mouseStartX) / this.zoom;
        let deltaY = (event.clientY - mouseStartY) / this.zoom;

        const moveLines = [];

        this.lineElements.forEach((lineObject) => {
            const startConnector = lineObject.start;
            const endConnector = lineObject.end;

            if (
                startConnector.id === draggedGate.conIn1?.id ||
                startConnector.id === draggedGate.conIn2?.id ||
                startConnector.id === draggedGate.conOut?.id ||
                startConnector.id === draggedGate.conOut2?.id ||
                endConnector.id === draggedGate.conIn1?.id ||
                endConnector.id === draggedGate.conIn2?.id ||
                endConnector.id === draggedGate.conOut?.id ||
                endConnector.id === draggedGate.conOut2?.id
            ) {
                moveLines.push(lineObject);
            }
        });

        moveLines.forEach((line) => {
            const startConnector = line.start;
            const endConnector = line.end;
            const svgPath = line.lineSVG;

            let points: { x: number; y: number }[];
            if (
                startConnector.id === draggedGate.conIn1?.id ||
                startConnector.id === draggedGate.conIn2?.id ||
                startConnector.id === draggedGate.conOut?.id ||
                startConnector.id === draggedGate.conOut2?.id
            ) {
                points = calculatePath(this.svgCanvas, startConnector, endConnector, this.zoom, deltaX, deltaY, 0, 0);
            } else {
                points = calculatePath(this.svgCanvas, startConnector, endConnector, this.zoom, 0, 0, deltaX, deltaY);
            }

            let path = `M ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                path += ` L ${points[i].x} ${points[i].y}`;
            }

            svgPath.setAttribute('d', path);
        });

        const isOverTrash = isDropOverTrashIcon(this, event);

        if (isOverTrash) {
            this.workspaceContainer.querySelector('.trashCanIcon').classList.add('trashCanIconDragOver');
        } else {
            this.workspaceContainer.querySelector('.trashCanIcon').classList.remove('trashCanIconDragOver');
        }
    }

    /**
     * Handles a drop event on the workspace.
     * - Adds new gates or moves existing ones.
     * - Deletes gates if dropped over the trash icon.
     *
     * @param {DragEvent} event
     */
    handleDrop(event) {
        event.preventDefault();
        const isOverTrash = isDropOverTrashIcon(this, event);

        if (event.dataTransfer.getData('movable') === 'false') {
            if (!isOverTrash) {
                addGate(this, event);
            }
        } else if (event.dataTransfer.getData('movable') === 'true') {
            const id = event.dataTransfer.getData('id');
            const gateToMove = this.gateElements.find((gate) => gate.id === id) as Gate;

            if (isOverTrash) {
                this.handleDropTrashCan(event);
            } else {
                moveGate(this, event);
            }
        }

        this.workspaceContainer.querySelector('.trashCanIcon').classList.remove('trashCanIconDragOver');
    }

    /**
     * Deletes a gate when it is dropped over the trash can.
     *
     * @param {DragEvent} event
     */
    handleDropTrashCan(event) {
        event.preventDefault();

        const id = event.dataTransfer.getData('id');
        const trashGate = this.gateElements.find((gate) => gate.id === id);
        trashGate.deleteGate();
    }

    /**
     * Parses a numeric input field and sets the corresponding property.
     * Defaults to -1 if the value is invalid.
     *
     * @param {InputEvent} event
     * @param {string} propertyName - The name of the property to update
     */
    handleInputChange(event, propertyName) {
        const inputValue = parseInt(event.target.value);

        if (isNaN(inputValue) || inputValue < 0 || event.target.value.trim() === '') {
            this[propertyName] = -1;
        } else {
            this[propertyName] = inputValue;
        }
    }

    /**
     * Starts circuit simulation.
     * Calculates outputs from all input gates and propagates through the circuit.
     * Stops simulation if the checkbox is unchecked.
     */
    simulateCircuit() {
        const simCheckbox = this.simCheckbox;
        if (simCheckbox.checked) {
            this.simulate = true;
            this.resetCircuit();
            const inputGates = this.gateElements?.filter((gate) => gate.gatetype === 'INPUT');
            inputGates.forEach((gate) => {
                gate.calculateOutput();
                gate.updateConnectorColor();
                setTimeout(() => {
                    transferOutputToNextGate(this, gate);
                }, this.simulationDelay)
            });
        } else {
            this.simulate = false;
            this.resetCircuit();
        }
    }

    /**
     * Resets all gates and lines in the circuit to their initial state.
     */
    resetCircuit() {
        resetGates(this);
        resetLines(this);
        this.requestUpdate();
    }
    
    /**
     * Ensures the workspace stays within bounds during dragging or zooming.
     * Clamps `workspaceOffsetX` and `workspaceOffsetY` based on viewport and canvas size.
     */
    calculateBoundaries() {
        if (workspaceOffsetX > (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 + 2) {
            workspaceOffsetX = (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 + 2;
        }
        if (workspaceOffsetY > (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 + 2) {
            workspaceOffsetY = (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 + 2;
        }
        if (
            workspaceOffsetX <
            -this.wsDrag.getBoundingClientRect().width +
                this.workspaceContainer.getBoundingClientRect().width +
                (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 -
                2
        ) {
            workspaceOffsetX =
                -this.wsDrag.getBoundingClientRect().width +
                this.workspaceContainer.getBoundingClientRect().width +
                (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 -
                2;
        }
        if (
            workspaceOffsetY <
            -this.wsDrag.getBoundingClientRect().height +
                this.workspaceContainer.getBoundingClientRect().height +
                (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 -
                2
        ) {
            workspaceOffsetY =
                -this.wsDrag.getBoundingClientRect().height +
                this.workspaceContainer.getBoundingClientRect().height +
                (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 -
                2;
        }
    }
}
