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
 * A WebWriter widget for creating and simulating digital logic circuits.
 * 
 * @description This web component provides an interactive environment for building digital logic circuits
 * using drag-and-drop gates (AND, OR, NOT, XOR, etc.), connecting them with lines, and simulating their behavior.
 * It features a sidebar with available gates, a workspace for circuit construction, and simulation controls.
 * 
 * ## Circuit Serialization Format
 * 
 * The component uses two main attributes for persistence:
 * 
 * ### reflectGates Format
 * Gates are serialized as comma-separated entries: `"gateID|gateType|xPosition|yPosition,..."` 
 * 
 * **Gate Types (case-sensitive):**
 * - `"NOT"` - NOT gate (1 input, 1 output)
 * - `"AND"` - AND gate (2 inputs, 1 output) 
 * - `"OR"` - OR gate (2 inputs, 1 output)
 * - `"NAND"` - NAND gate (2 inputs, 1 output)
 * - `"NOR"` - NOR gate (2 inputs, 1 output)
 * - `"XOR"` - XOR gate (2 inputs, 1 output)
 * - `"XNOR"` - XNOR gate (2 inputs, 1 output)
 * - `"INPUT"` - Input source (0 inputs, 1 output)
 * - `"OUTPUT"` - Output display (1 input, 0 outputs)
 * - `"SPLITTER"` - Signal splitter (1 input, 2 outputs)
 * 
 * **Coordinates:** Pixel positions relative to workspace origin (top-left), including "px" suffix
 * 
 * **Example:** `"0|INPUT|50px|100px,1|AND|200px|100px,2|OUTPUT|350px|100px"`
 * 
 * ### reflectCons Format
 * Connections are serialized as comma-separated pairs: `"startConnectorID|endConnectorID,..."`
 * 
 * **Connector ID Structure:** `{gateType}Gate{gateID}{portType}{portNumber?}`
 * - `gateType`: Lowercase gate type (e.g., "input", "and", "output")
 * - `gateID`: Numeric gate identifier  
 * - `portType`: "In1", "In2", "Out", "Out2", "Out3"
 * 
 * **Port Mappings by Gate Type:**
 * - **INPUT:** `Out` (single output)
 * - **OUTPUT:** `In1` (single input)
 * - **NOT:** `In1` (input), `Out` (output)
 * - **AND/OR/NAND/NOR/XOR/XNOR:** `In1`, `In2` (inputs), `Out` (output)
 * - **SPLITTER:** `In1` (input), `Out2`, `Out3` (two outputs)
 * 
 * **Example:** `"inputGate0Out|andGate1In1,inputGate0Out|andGate1In2,andGate1Out|outputGate2In1"`
 * 
 * ## Workspace Coordinate System
 * - **Canvas Size:** 3000px wide × 2000px high (total workspace area)
 * - **Origin:** Top-left corner of the workspace (0,0)
 * - **Units:** Pixels (CSS pixels)
 * - **Initial View:** Viewport starts centered at (-1500px, -1000px), showing the middle of the canvas
 * 
 * ### Recommended Coordinate Ranges
 * **For gates to be immediately visible on load:**
 * - **X coordinates:** 1200px - 1800px (center area, horizontally)
 * - **Y coordinates:** 800px - 1200px (center area, vertically)
 * - **Example good position:** `1500px|1000px` (exact center of canvas)
 * 
 * **Full valid ranges:**
 * - **X coordinates:** 0px - 3000px (left edge to right edge)
 * - **Y coordinates:** 0px - 2000px (top edge to bottom edge)
 * 
 * **⚠️ Avoid very small coordinates (< 500px) as they will be outside the initial viewport!**
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <webwriter-logic-circuit></webwriter-logic-circuit>
 * 
 * <!-- Pre-loaded circuit with gates and connections (center positioned) -->
 * <webwriter-logic-circuit 
 *   reflectgates="0|INPUT|1300px|1000px,1|AND|1500px|1000px,2|OUTPUT|1700px|1000px"
 *   reflectcons="inputGate0Out|andGate1In1,andGate1Out|outputGate2In1"
 *   simulationdelay="1000">
 * </webwriter-logic-circuit>
 * 
 * <!-- With gate restrictions and simulation settings -->
 * <webwriter-logic-circuit 
 *   andgateallowed="5"
 *   orgateallowed="3"
 *   simulationdelay="500"
 *   allowsimulation="1">
 * </webwriter-logic-circuit>
 * 
 * <!-- Disabled simulation with specific gate limits -->
 * <webwriter-logic-circuit 
 *   allowsimulation="0"
 *   notgateallowed="2"
 *   andgateallowed="3"
 *   orgateallowed="0">
 * </webwriter-logic-circuit>
 * ```
 * 
 * ## AI Usage Examples
 * 
 * ### Simple AND Gate Circuit (well-positioned in viewport)
 * ```html
 * <webwriter-logic-circuit 
 *   reflectgates="0|INPUT|1300px|900px,1|INPUT|1300px|1100px,2|AND|1500px|1000px,3|OUTPUT|1700px|1000px"
 *   reflectcons="inputGate0Out|andGate2In1,inputGate1Out|andGate2In2,andGate2Out|outputGate3In1">
 * </webwriter-logic-circuit>
 * ```
 * 
 * ### Half Adder Circuit (centered for immediate visibility)
 * ```html
 * <webwriter-logic-circuit 
 *   reflectgates="0|INPUT|1300px|900px,1|INPUT|1300px|1100px,2|XOR|1500px|900px,3|AND|1500px|1100px,4|OUTPUT|1700px|900px,5|OUTPUT|1700px|1100px"
 *   reflectcons="inputGate0Out|xorGate2In1,inputGate1Out|xorGate2In2,inputGate0Out|andGate3In1,inputGate1Out|andGate3In2,xorGate2Out|outputGate4In1,andGate3Out|outputGate5In1">
 * </webwriter-logic-circuit>
 * ```
 * 
 * ## Input Gate Control
 * Input gates can be toggled by clicking them during simulation. Initial values are always `false` (logic 0).
 * To programmatically set input values, access the gate element and set its `input1` property:
 * ```javascript
 * const circuit = document.querySelector('webwriter-logic-circuit');
 * const inputGate = circuit.gateElements.find(gate => gate.gatetype === 'INPUT' && gate.id === 'inputGate0');
 * inputGate.input1 = true; // Set to logic 1
 * ```
 * 
 * ## Canvas Layout Tips
 * **Problem:** Gates with very small coordinates (e.g., 50px, 100px) appear outside the initial viewport
 * **Solution:** Use center-area coordinates for immediate visibility:
 * - **Good coordinates:** `1400px|950px`, `1600px|1050px` (always visible on load)
 * - **Avoid:** `50px|100px`, `200px|300px` (user must pan to find them)
 * - **Tip:** Start with center coordinates (~1500px, ~1000px) and spread out from there
 * 
 * ## Attribute Name Schema
 * - **Main data attributes:** Use camelCase without hyphens (e.g., `reflectgates`, `reflectcons`)
 * - **Configuration attributes:** Use lowercase without hyphens (e.g., `simulationdelay`, `allowsimulation`, `andgateallowed`)
 * - **Property names:** Use camelCase for JavaScript properties (e.g., `simulationDelay`, `andGateAllowed`)
 * - **Reflection:** All gate limits and simulation settings reflect to attributes automatically
 * 
 * ## Workspace Control
 * - **Pan:** Click and drag on empty workspace area
 * - **Zoom:** Mouse wheel (0.5x to 2.5x range)
 * - **Reset:** No automatic reset - use pan/zoom to navigate
 * - **Grid:** No visible grid - free positioning
 * 
 * ## Programming Interface
 * ```javascript
 * // Access the component
 * const circuit = document.querySelector('webwriter-logic-circuit');
 * 
 * // Get current circuit state
 * const gates = circuit.getGateElements();
 * const connections = circuit.getLineElements();
 * 
 * // Control simulation
 * circuit.simulate = true;  // Enable/disable simulation
 * circuit.simulationDelay = 1000;  // Set propagation delay
 * 
 * // Modify input values
 * const inputGates = gates.filter(g => g.gatetype === 'INPUT');
 * inputGates[0].input1 = true;  // Set input to logic 1
 * 
 * // Access serialized state
 * console.log(circuit.reflectGates);  // Current gate configuration
 * console.log(circuit.reflectCons);   // Current connections
 * ```
 * 
 * @fires circuit-changed - Dispatched when the circuit structure changes (gates added/removed/moved)
 * @fires simulation-state-changed - Dispatched when simulation is started/stopped
 * 
 * @slot - No slots available - content is generated programmatically
 * 
 * @cssprop --logic-circuit-background - Background color of the workspace (default: #f5f5f5)
 * @cssprop --logic-circuit-gate-color - Default color for logic gates (default: #ffffff)
 * @cssprop --logic-circuit-connection-color - Color for connections between gates (default: #000000)
 * 
 * @csspart workspace - The main workspace area where gates are placed
 * @csspart sidebar - The sidebar containing available gates
 * @csspart options - The options panel for controlling simulation and gate limits
 */
@customElement('webwriter-logic-circuit')
@localized()
export default class LogicCircuit extends LitElementWw {
    static shadowRootOptions = {
        ...LitElementWw.shadowRootOptions,
        delegatesFocus: true,
    };

    public localize = LOCALIZE;

    static styles = Styles;

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

    /**
     * Array of line connection objects in the circuit.
     * @description Stores all connections between gate connectors. Each line object contains start/end connectors and SVG path.
     * @internal - Not intended for direct manipulation by consumers
     */
    @property({ type: Array }) accessor lineElements = [];
    
    /**
     * Array of gate objects currently placed in the circuit.
     * @description Contains all logic gates (AND, OR, NOT, etc.) that have been added to the workspace.
     * @internal - Not intended for direct manipulation by consumers
     */
    @property({ type: Array }) accessor gateElements = [];
    
    /**
     * Serialized representation of gates for persistence and initialization.
     * 
     * @description Contains a comma-separated list of gate definitions for saving and restoring circuit state.
     * Each gate entry follows the format: `"gateID|gateType|xPosition|yPosition"`
     * 
     * **Format Details:**
     * - **gateID:** Numeric identifier (0, 1, 2, ...) - automatically assigned during creation
     * - **gateType:** Gate type string - must be one of: "NOT", "AND", "OR", "NAND", "NOR", "XOR", "XNOR", "INPUT", "OUTPUT", "SPLITTER"
     * - **xPosition:** X coordinate in pixels with "px" suffix (e.g., "150px")
     * - **yPosition:** Y coordinate in pixels with "px" suffix (e.g., "200px")
     * - **Separator:** Pipe character "|" between fields, comma "," between gates
     * 
     * **Coordinate System:**
     * - Origin: Top-left of 3000×2000px workspace
     * - Units: CSS pixels
     * - Valid range: 0-3000px (X), 0-2000px (Y)
     * 
     * @example "0|INPUT|100px|150px,1|AND|300px|200px,2|OUTPUT|500px|200px"
     * 
     * @attribute reflectgates
     */
    @property({type: String, reflect: true}) accessor reflectGates: String = ""
    
    /**
     * Serialized representation of connections for persistence and initialization.
     * 
     * @description Contains a comma-separated list of connection definitions linking gate ports.
     * Each connection entry follows the format: `"startConnectorID|endConnectorID"`
     * 
     * **Connector ID Structure:** `{gateType}Gate{gateID}{portType}`
     * - **gateType:** Lowercase gate type (input, and, or, nand, nor, xor, xnor, output, splitter, not)
     * - **gateID:** The numeric ID from reflectGates (0, 1, 2, ...)
     * - **portType:** Port identifier specific to gate type
     * 
     * **Port Types by Gate:**
     * - **INPUT gates:** `Out` (single output port)
     * - **OUTPUT gates:** `In1` (single input port)
     * - **NOT gates:** `In1` (input), `Out` (output)
     * - **2-input gates (AND/OR/NAND/NOR/XOR/XNOR):** `In1`, `In2` (inputs), `Out` (output)
     * - **SPLITTER gates:** `In1` (input), `Out2`, `Out3` (two separate outputs)
     * 
     * **Connection Rules:**
     * - Only output→input connections allowed
     * - Each input port accepts only one connection
     * - Output ports can connect to multiple inputs
     * - Separator: Pipe "|" between connector IDs, comma "," between connections
     * 
     * @example "inputGate0Out|andGate1In1,inputGate0Out|andGate1In2,andGate1Out|outputGate2In1"
     * 
     * @attribute reflectcons
     */
    @property({type: String, reflect: true}) accessor reflectCons: String = ""
    
    /**
     * Internal counter for generating unique gate IDs.
     * @internal - Managed automatically by the component
     */
    @property({ type: Number }) accessor gateID: number = 0;
    
    /**
     * Internal counter for generating unique line IDs.
     * @internal - Managed automatically by the component
     */
    @property({ type: Number }) accessor lineID: number = 0;
    
    /**
     * Current zoom level of the workspace.
     * @description Controls the scaling of the workspace. 1.0 = 100%, 2.0 = 200%, etc.
     * @default 1
     * @minimum 0.1
     * @maximum 5.0
     */
    @property({ type: Number }) accessor zoom: number = 1;
    
    /**
     * Starting X coordinate for drag operations.
     * @internal - Used for drag and drop calculations
     */
    @property({ type: Number }) accessor dragStartX: number = 0;
    
    /**
     * Starting Y coordinate for drag operations.
     * @internal - Used for drag and drop calculations
     */
    @property({ type: Number }) accessor dragStartY: number = 0;
    
    /**
     * Whether the circuit simulation is currently active.
     * @description When true, the circuit will automatically calculate and display logic values.
     * @default true
     */
    @property({ type: Boolean }) accessor simulate: boolean = true;

    /**
     * Delay in milliseconds between simulation steps.
     * @description Controls how fast the simulation propagates through the circuit.
     * Lower values = faster simulation, higher values = slower simulation for visualization.
     * @default 500
     * @minimum 0
     * @maximum 5000
     * @attribute simulationdelay
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor simulationDelay: number = 500;

    /**
     * Whether simulation controls are enabled.
     * @description Controls visibility and functionality of the simulation checkbox.
     * - **0:** Simulation disabled and hidden, circuit remains static
     * - **1:** Simulation enabled and visible, allows interactive logic calculation
     * 
     * When disabled, gates show no logic values and connections remain neutral.
     * When enabled, users can toggle input gates and see logic propagation through the circuit.
     * 
     * @default 1
     * @minimum 0
     * @maximum 1
     * @attribute allowsimulation
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor allowSimulation: number = 1;
    
    /**
     * Maximum number of NOT gates allowed in the circuit.
     * @description Constrains the number of NOT gates that can be placed in the workspace.
     * Useful for educational scenarios with specific requirements.
     * 
     * **Value Meanings:**
     * - **-1:** Unlimited gates allowed (default)
     * - **0:** No gates of this type allowed (hides from sidebar)
     * - **>0:** Specific maximum count (e.g., 3 allows up to 3 gates)
     * 
     * When limit is reached, drag-and-drop from sidebar is disabled for this gate type.
     * 
     * @default -1
     * @minimum -1
     * @attribute notgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor notGateAllowed: number = -1;
    
    /**
     * Maximum number of AND gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. AND gates perform logical conjunction (both inputs must be true).
     * @default -1
     * @minimum -1
     * @attribute andgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor andGateAllowed: number = -1;
    
    /**
     * Maximum number of OR gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. OR gates perform logical disjunction (at least one input must be true).
     * @default -1
     * @minimum -1
     * @attribute orgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor orGateAllowed: number = -1;
    
    /**
     * Maximum number of NAND gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. NAND gates are inverted AND gates (output true unless both inputs true).
     * @default -1
     * @minimum -1
     * @attribute nandgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor nandGateAllowed: number = -1;
    
    /**
     * Maximum number of NOR gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. NOR gates are inverted OR gates (output true only when both inputs false).
     * @default -1
     * @minimum -1
     * @attribute norgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor norGateAllowed: number = -1;
    
    /**
     * Maximum number of XNOR gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. XNOR gates output true when inputs are equal (both true or both false).
     * @default -1
     * @minimum -1
     * @attribute xnorgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor xnorGateAllowed: number = -1;
    
    /**
     * Maximum number of XOR gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. XOR gates output true when inputs differ (exclusive or).
     * @default -1
     * @minimum -1
     * @attribute xorgateallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor xorGateAllowed: number = -1;
    
    /**
     * Maximum number of splitter gates allowed in the circuit.
     * @description See notGateAllowed for detailed value meanings. Splitter gates duplicate input to two separate outputs.
     * @default -1
     * @minimum -1
     * @attribute splitterallowed
     */
    @property({ type: Number, attribute: true, reflect: true }) accessor splitterAllowed: number = -1;

    /**
     * Whether a drag operation is currently in progress.
     * @internal - Used for tracking drag state
     */
    @property({ type: Boolean }) accessor isDragging: boolean = false;
    
    /**
     * Whether a line drawing operation is currently in progress.
     * @internal - Used for tracking connection drawing state
     */
    @state() accessor isDrawingLine: boolean = false;
    
    /**
     * The connector element where line drawing started.
     * @internal - Used during connection creation
     */
    @state() accessor startConnector: ConnectorElement = null;
    
    /**
     * The connector element where line drawing will end.
     * @internal - Used during connection creation
     */
    @state() accessor endConnector: ConnectorElement = null;

    /**
     * Reference to the SVG canvas element for drawing connections.
     * @internal - DOM element reference
     */
    @query('#svgCanvas') accessor svgCanvas;
    
    /**
     * Reference to the main workspace container element.
     * @internal - DOM element reference
     */
    @query('#workspace') accessor workspaceContainer;
    
    /**
     * Reference to the draggable workspace area element.
     * @internal - DOM element reference
     */
    @query('#workspaceDraggable') accessor wsDrag;
    
    /**
     * Reference to the simulation checkbox element.
     * @internal - DOM element reference
     */
    @query('#simCheckbox') accessor simCheckbox;
    
    /**
     * Reference to the instructions container element.
     * @internal - DOM element reference
     */
    @query('#instructions') accessor instructionsContainer;
    
    /**
     * Public getter for accessing gate elements array.
     * @description Provides access to all gate objects currently placed in the circuit workspace.
     * Each gate object contains properties like `gatetype`, `input1`, `input2`, `output`, position, and connector references.
     * 
     * **Common Gate Properties:**
     * - `gatetype`: String - Gate type ("AND", "OR", "NOT", etc.)
     * - `id`: String - Unique identifier (e.g., "andGate1", "inputGate0")
     * - `input1`, `input2`: Boolean|null - Current input logic values
     * - `output`, `output2`: Boolean - Current output logic values
     * - `conIn1`, `conIn2`: ConnectorElement - Input connector references
     * - `conOut`, `conOut2`: ConnectorElement - Output connector references
     * - `style.left`, `style.top`: String - Position in pixels (e.g., "150px")
     * 
     * @returns Array of gate elements currently in the circuit
     * @example
     * ```javascript
     * const circuit = document.querySelector('webwriter-logic-circuit');
     * const gates = circuit.getGateElements();
     * const inputGates = gates.filter(gate => gate.gatetype === 'INPUT');
     * inputGates[0].input1 = true; // Set first input to logic 1
     * ```
     */
    public getGateElements = () => this.gateElements;
    
    /**
     * Public getter for accessing line elements array.
     * @description Provides access to all connection objects currently linking gates in the circuit.
     * Each line object contains start/end connector references and SVG path element.
     * 
     * **Line Object Properties:**
     * - `start`: ConnectorElement - Source connector (output)
     * - `end`: ConnectorElement - Target connector (input) 
     * - `lineSVG`: SVGPathElement - Visual representation
     * - `id`: String - Unique line identifier
     * 
     * @returns Array of line elements currently in the circuit
     * @example
     * ```javascript
     * const circuit = document.querySelector('webwriter-logic-circuit');
     * const connections = circuit.getLineElements();
     * connections.forEach(line => {
     *   console.log(`Connection from ${line.start.id} to ${line.end.id}`);
     * });
     * ```
     */
    public getLineElements = () => this.lineElements;

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

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('contextmenu', this.handleContextMenu);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mousedown', this.handleMouseDown);
        this.removeEventListener('mousemove', this.handleMouseMove);
        this.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Toggles the visibility of the instruction panel.
     * @description Shows or hides the help instructions that explain how to use the circuit builder.
     * The instructions explain drag-and-drop, connection creation, and connection removal.
     */
    toggleInstructions() {
        if (this.instructionsContainer.style.display == "none") {
            this.instructionsContainer.style.display = 'block';
        } else {
            this.instructionsContainer.style.display = 'none';
        }
    }

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
                            if(startID.includes(node.shadowRoot.querySelector("div").id)){
                                let gate: any = node.shadowRoot.querySelector("div")
                                let connectorArr: any = gate.querySelectorAll("slot")
                                connectorArr.forEach(slot=>{
                                    if(slot.children[0].id === startID){
                                        start = (slot.childNodes as NodeList).item(0)
                                    }
                                })
                            }
                            if(endID.includes(node.shadowRoot.querySelector("div").id)){
                                let gate: any = node.shadowRoot.querySelector("div")
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

    transformWorkspace() {
        const workspace = this.wsDrag;
        workspace.style.transform = `translate(${workspaceOffsetX}px,${workspaceOffsetY}px) scale(${this.zoom})`;
    }

    handleMouseUp() {
        this.isDragging = false;
    }

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

    handleMouseOut(event) {
        updateLines(this, Gate.movedGate);
        this.isDragging = false;
    }

    handleContextMenu(event) {
        event.preventDefault();
    }

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
     * Handles drop events when gates are dropped on the workspace or trash can.
     * @description Processes both adding new gates from the sidebar and moving existing gates.
     * Handles deletion when items are dropped on the trash can area.
     * 
     * **Processing Logic:**
     * 1. New gates (from sidebar): Creates new gate element and adds to workspace
     * 2. Existing gates (movable): Updates position or deletes if dropped in trash
     * 3. Updates reflectGates string for persistence
     * 4. Respects gate limits set by *GateAllowed properties
     * 
     * **Data Transfer Contents:**
     * - `type`: Gate type string (e.g., "AND", "OR")
     * - `movable`: "true" for existing gates, "false" for new gates
     * - `id`: Gate ID for existing gates
     * - `offsetX`, `offsetY`: Mouse grab position relative to gate
     * 
     * @param {DragEvent} event - The drop event containing drag data
     * @fires circuit-changed - Dispatched when the circuit structure changes
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
     * Handles deletion of gates when dropped on the trash can.
     * @description Finds and removes the gate that was dropped on the trash area.
     * @param {DragEvent} event - The drop event containing the gate ID to delete
     */
    handleDropTrashCan(event) {
        event.preventDefault();

        const id = event.dataTransfer.getData('id');
        const trashGate = this.gateElements.find((gate) => gate.id === id);
        trashGate.deleteGate();
    }

    /**
     * Handles changes to input fields in the options panel.
     * @description Updates component properties when users modify gate limits or simulation settings.
     * Validates input values and sets to -1 (unlimited) if invalid.
     * @param {Event} event - The input change event from the form element
     * @param {string} propertyName - The name of the property to update (e.g., 'andGateAllowed', 'simulationDelay')
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
     * Starts or stops circuit simulation based on the simulation checkbox state.
     * @description When simulation is enabled, calculates logic values starting from input gates 
     * and propagates them through the circuit with the configured delay. When disabled, 
     * resets all gates to their default state.
     * 
     * **Simulation Process:**
     * 1. Reset all gates to neutral state
     * 2. Find all INPUT gates in the circuit
     * 3. Calculate their output values (based on user toggling)
     * 4. Propagate signals through connected gates with simulationDelay
     * 5. Update visual indicators (connector colors, gate states)
     * 6. Continue until all outputs are calculated
     * 
     * **Visual Feedback:**
     * - True values: Highlighted connectors and gates
     * - False values: Normal appearance
     * - OUTPUT gates: Entire gate highlights when receiving true
     * 
     * @fires simulation-state-changed - Custom event dispatched when simulation state changes
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
     * Resets all gates and connections to their default non-simulated state.
     * @description Clears all logic values and visual indicators from gates and connections.
     * Used when simulation is disabled or before starting a new simulation cycle.
     */
    resetCircuit() {
        resetGates(this);
        resetLines(this);
        this.requestUpdate();
    }

    /**
     * Calculates and enforces workspace panning boundaries.
     * @description Prevents the user from panning the workspace beyond reasonable limits.
     * Ensures the workspace cannot be dragged completely out of view.
     * @internal - Called automatically during pan operations
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
