import { html, css } from 'lit';
import { LitElementWw } from '@webwriter/lit';
import { customElement, query } from 'lit/decorators.js';
import { property, state } from 'lit/decorators.js';
import ConnectorElement from '../connector';
import LukaswwLogicgates from '../../webwriter-logic-circuit';
import { getMouseCoordinates, updateLineColor } from '../helper/line-helper';
import { transferOutputToNextGate } from '../helper/gate-helper';

import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import SlPopup from '@shoelace-style/shoelace/dist/components/popup/popup.component.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { Styles } from '../styles';
import LogicCircuit from '../../webwriter-logic-circuit';

/**
 * Represents a generic gate in the logic circuit.
 *
 * This class serves as a base for specific gate types (e.g., AND, OR, NOT) and provides common functionality
 * for all gates in the logic circuit.
 *
 * @extends LitElementWw
 */
export default class Gate extends LitElementWw {
    static movedGate;
    static x;
    static y;

    /** Reference to the LogicCircuit instance associated with this gate. */
    widget: LogicCircuit;

    /**
     * Returns an object mapping scoped elements used within this component.
     *
     * @returns {{ [key: string]: any }} Scoped elements.
     */
    public static get scopedElements() {
        return {
            'sl-tooltip': SlTooltip,
            'sl-button': SlButton,
            'sl-popup': SlPopup,
            'sl-icon': SlIcon,
            'sl-menu': SlMenu,
            'sl-menu-item': SlMenuItem,
        };
    }

    static styles = Styles;

    /** Input value for connector 1. */
    @property({ type: Boolean }) accessor input1: boolean = null;

    /** Input value for connector 2. */
    @property({ type: Boolean }) accessor input2: boolean = null;

    /** Output value of the gate. */
    @property({ type: Boolean }) accessor output: boolean = null;

    /** Second output value of the gate (if applicable). */
    @property({ type: Boolean }) accessor output2: boolean = null;

    /** Type of the gate (e.g., AND, OR). */
    @property({ type: String }) accessor gatetype: string = null;

    /** Indicates if the gate can be moved by user interaction. */
    @property({ type: Boolean }) accessor movable: boolean = false;

    /** Unique identifier for the gate instance. */ 
    @property({ type: String }) accessor id: string = null;

    /** Connector element for input 1. */ 
    @property({ type: Object }) accessor conIn1: ConnectorElement = null;

    /** Connector element for input 2. */ 
    @property({ type: Object }) accessor conIn2: ConnectorElement = null;

    /** Connector element for output 1. */ 
    @property({ type: Object }) accessor conOut: Object = null;

    /** Connector element for output 2 (if applicable). */ 
    @property({ type: Object }) accessor conOut2: Object = null;

    /** Indicates whether to show the truth table representation of this gate. */ 
    @property({ type: Boolean }) accessor showTruthTable: boolean = false;

    // Querying context menu element
    @query('#contextMenu') accessor contextMenu: SlMenu;


    /**
     * Creates an instance of the Gate class.
     *
     * Initializes event listeners for drag and context menu interactions.
     */
    constructor() {
        super();
        this.addEventListener('dragstart', this.handleDragStart);
        this.addEventListener('dragend', this.handleDragEnd);
        this.addEventListener('contextmenu', this.handleContextMenu);

        this.input1 = null;
        this.input2 = null;
        this.output = false;
        this.output2 = false;
        this.movable = false;
        this.showTruthTable = false;
    }

    /**
     * Called after the element is first updated. Sets up connectors based on gate types.
     *
     * @param {Map<string | number, any>} changedProperties - A map of properties that have changed since last update.
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

        let slot;
        if (this.shadowRoot) {
            let slot;
            switch (this.gatetype) {
                case 'INPUT':
                    slot = this.shadowRoot.querySelector('slot[name="con3"]');
                    this.createConnectors(slot, 3);
                    break;
                case 'OUTPUT':
                    slot = this.shadowRoot.querySelector('slot[name="con1"]');
                    this.createConnectors(slot, 0);
                    break;
                case 'NOT':
                    slot = this.shadowRoot.querySelector('slot[name="con1"]');
                    this.createConnectors(slot, 0);
                    slot = this.shadowRoot.querySelector('slot[name="con3"]');
                    this.createConnectors(slot, 3);
                    break;
                case 'SPLITTER':
                    slot = this.shadowRoot.querySelector('slot[name="con1"]');
                    this.createConnectors(slot, 0);
                    slot = this.shadowRoot.querySelector('slot[name="con3"]');
                    this.createConnectors(slot, 4);
                    slot = this.shadowRoot.querySelector('slot[name="con4"]');
                    this.createConnectors(slot, 5);
                    break;
                default:
                    for (let i = 1; i <= 3; i++) {
                        slot = this.shadowRoot.querySelector('slot[name="con' + i + '"]');
                        this.createConnectors(slot, i);
                    }
            }
        }
    }
    /**
     * Called when the element's properties have been updated. Handles updates to outputs and connector colors.
     *
     * @param {Map<string | number, any>} changedProperties - A map of properties that have changed since last update.
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        const widget = this.widget
        if (this.movable === true) {
            if (this.gatetype === 'INPUT' && changedProperties.has('input1')) {
                this.calculateOutput();
                this.updateConnectorColor();
                setTimeout(() => {
                    transferOutputToNextGate(this.widget, this);
                }, widget.simulationDelay)
            }

            if (widget.simulate === true) {
                if (this.gatetype === 'OUTPUT' && changedProperties.has('input1')) {
                    this.calculateOutput();
                    this.updateConnectorColor();
                } else if (changedProperties.has('input1') || changedProperties.has('input2')) {
                    this.calculateOutput();
                    setTimeout(() => {
                        transferOutputToNextGate(this.widget, this);
                    }, widget.simulationDelay)
                    this.updateConnectorColor();
                }
            }
            if (changedProperties.has('showTruthTable')) {
                if (this.showTruthTable) {
                    this.renderTruthTable();
                }
            }
            updateLineColor(widget);
        }
    }

    /**
     * Handles drag start events to initiate dragging behavior.
     *
     * @param {DragEvent} event - The drag event triggered by starting a drag action.
     */
    handleDragStart(event) {
        Gate.movedGate = event.target;
        Gate.x = event.clientX;
        Gate.y = event.clientY;
        const tooltip = this.shadowRoot.querySelector('.tooltip') as SlTooltip;
        if (tooltip) {
            if (tooltip.open) {
                event.preventDefault();
                tooltip.hide();
            }
        }
        event.dataTransfer.setData('type', this.gatetype);
        const offsetX = event.clientX - this.getBoundingClientRect().left;
        const offsetY = event.clientY - this.getBoundingClientRect().top;
        event.dataTransfer.setData('offsetX', offsetX);
        event.dataTransfer.setData('offsetY', offsetY);
        event.dataTransfer.setData('movable', this.movable);

        event.dataTransfer.setData('id', this.id);

        this.hideContextMenu();
        if (this.movable) {
            this.style.opacity = '0.001';
        }
    }

    /**
     * Handles drag end events to finalize dragging behavior.
     *
     * @param {DragEvent} event - The drag event triggered by ending a drag action.
     */
    handleDragEnd(event) {
        event.preventDefault();
        if (this.movable) {
            this.style.opacity = '';
        }
    }

    /**
     * Handles context menu events to show or hide context menu options related to gates.
     *
     * @param {MouseEvent} event - The mouse event triggered by right-clicking on a gate element.
     */
    handleContextMenu(event) {
        event.preventDefault();
        if (this.movable) {
            if (this.contextMenu.style.display === 'none') {
                this.showContextMenu(event);
            } else {
                this.hideContextMenu();
            }
        }
    }

    /**
     * Calculates the output of the gate based on its inputs. This method should be implemented by derived classes. 
     */
    calculateOutput() {}

    /**
     * Toggles the value of input1 when called. Used for user interaction with input gates.	
     */
    changeInput1() {
        this.input1 = !this.input1;
    }

    /**
     * Toggles the value of input2 when called. Used for user interaction with input gates.	
     */
    changeInput2() {
        this.input2 = !this.input2;
    }

    /**
     * Displays context menu at mouse position when invoked while hiding other menus before displaying current one.
     * @param {*} Event – Mouse Event Triggered During Right Click Action.                                                                                                                                                                                                      
     */    
    showContextMenu(event) {
        const gateElements = this.widget.getGateElements();
        gateElements.forEach((gate) => {
            gate.hideContextMenu();
        });

        if (this.contextMenu) {
            if (this.movable === true) {
                const zoom = this.widget.zoom;

                const gateX = this.getBoundingClientRect().x;
                const gateY = this.getBoundingClientRect().y;

                const svgCanvas = this.widget.wsDrag;

                const offsetX = getMouseCoordinates(svgCanvas, event.clientX, event.clientY, zoom).x;
                const offsetY = getMouseCoordinates(svgCanvas, event.clientX, event.clientY, zoom).y;

                this.style.zIndex = '30';
                this.contextMenu.style.display = 'block';
                this.contextMenu.style.left = `${offsetX}px`;
                this.contextMenu.style.top = `${offsetY}px`;
                this.contextMenu.style.transform = `scale(${1 / zoom})`;
            }
        }
    }

    /**    
     * Hides currently displayed context menu.    
     */  
    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.style.display = 'none';
            this.style.zIndex = '10';
        }
    }

    /**    
     * Deletes current gate instance along with connected lines associated with it.    
     */   
    deleteGate() {
        const workspace = document.querySelector('webwriter-logic-circuit') as LukaswwLogicgates;
        const gateElements = workspace.getGateElements();
        const lineElements = workspace.getLineElements();

        if (workspace.isDrawingLine) {
            workspace.isDrawingLine = false;
            workspace.svgPathToMouse.setAttribute('d', '');
            workspace.startConnector = null;
        }

        gateElements.forEach((gate, index) => {
            if (this === gate) {
                // Update inputs of the lines that are connected with the outputs of this gate
                this.output = false;
                this.output2 = false
                transferOutputToNextGate(this.widget, this)
                
                this.remove();
                gateElements.splice(index, 1);
            }
        });

        const pathsToDelete = lineElements?.filter(
            (line) =>
                line.start === this.conIn1 ||
                line.start === this.conIn2 ||
                line.start === this.conOut ||
                line.start === this.conOut2 ||
                line.end === this.conIn1 ||
                line.end === this.conIn2 ||
                line.end === this.conOut ||
                line.end === this.conOut2
        );

        let lineElementsUpdated = [];
        workspace.lineElements.forEach((line) => {
            if (pathsToDelete.includes(line)) {
                line.lineSVG.remove();

                let consArr: string[] = this.widget.reflectCons.split(",")
                let index: number = -1
                for(let i = 0; i<consArr.length; i++){
                    if(consArr[i].includes(line.start.id) && consArr[i].includes(line.end.id)){
                        index = i
                    }
                };
                consArr.splice(index,1)
                this.widget.reflectCons = consArr.toString()
            } else {
                lineElementsUpdated.push(line);
            }

        });
        workspace.lineElements = lineElementsUpdated;

        let consArr: string[] = this.widget.reflectGates.split(",")
        let index: number = -1
        for(let i = 0; i<consArr.length; i++){
            if(Number.parseInt(consArr[i][0]) === Number.parseInt(this.id.match(/^([a-zA-Z]+)(\d+)$/)[2])){
                index = i
            }
        };
        consArr.splice(index,1)
        this.widget.reflectGates = consArr.toString()

        this.hideContextMenu();
    }

    /**    
     * Creates connector elements based on specified parameters and attaches them to relevant slots within rendered HTML structure.     
     */ 
    createConnectors(slot, n) {
        if (this.movable) {
            const connector = document.createElement('connector-element') as ConnectorElement;
            this.widget.shadowRoot.appendChild(connector);
            connector.style.position = 'absolute';
            connector.widget = this.widget

            switch (n) {
                case 0:
                    connector.id = this.id + 'In1';
                    connector.type = 'input';
                    connector.style.left = '-7%';
                    connector.style.top = '44%';
                    this.conIn1 = connector;
                    break;
                case 1:
                    connector.id = this.id + 'In1';
                    connector.type = 'input';
                    connector.style.left = '-7%';
                    connector.style.top = '25%';
                    this.conIn1 = connector;
                    break;
                case 2:
                    connector.id = this.id + 'In2';
                    connector.type = 'input';
                    connector.style.left = '-7%';
                    connector.style.top = '63%';
                    this.conIn2 = connector;
                    break;
                case 3:
                    connector.id = this.id + 'Out';
                    connector.type = 'output';
                    connector.style.left = '94%';
                    connector.style.top = '44%';
                    this.conOut = connector;
                    break;
                case 4:
                    connector.id = this.id + 'Out2';
                    connector.type = 'output';
                    connector.style.left = '94%';
                    connector.style.top = '23%';
                    this.conOut = connector;
                    break;
                case 5:
                    connector.id = this.id + 'Out3';
                    connector.type = 'output';
                    connector.style.left = '94%';
                    connector.style.top = '64%';
                    this.conOut2 = connector;
            }
            slot.appendChild(connector);
        }
    }

    /**    
     * Updates color states of connectors associated with inputs/outputs depending upon their logical states during simulation phase.     
     */  
    updateConnectorColor() {
        let connectorDot;
        let con;
        const slotIn1 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con1']");
        const slotIn2 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con2']");
        const slotOut = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con3']");
        const slotOut2 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con4']");

        if (this.gatetype === 'INPUT') {
            if (this.output === true) {
                this.shadowRoot.querySelector('.gate').classList.add('gateTrue');
            } else {
                this.shadowRoot.querySelector('.gate').classList.remove('gateTrue');
            }
        }
        if (this.widget.simulate === true) {
            if (this.gatetype == 'OUTPUT') {
                if (this.input1 === true) {
                    this.shadowRoot.querySelector('.gate').classList.add('gateTrue');
                    this.requestUpdate();
                } else {
                    this.shadowRoot.querySelector('.gate').classList.remove('gateTrue');
                }
            }
            if (slotOut) {
                connectorDot = slotOut.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
                con = slotOut.querySelector('connector-element');
                if (connectorDot && this.output === true) {
                    connectorDot.classList.add('dotTrue');
                    con.value = true;
                } else if (connectorDot) {
                    connectorDot.classList.remove('dotTrue');
                    con.value = false;
                }
            }
            if (slotOut2) {
                connectorDot = slotOut2.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
                con = slotOut2.querySelector('connector-element');
                if (connectorDot && this.output === true) {
                    connectorDot.classList.add('dotTrue');
                    con.value = true;
                } else if (connectorDot) {
                    connectorDot.classList.remove('dotTrue');
                    con.value = false;
                }
            }
            if (slotIn1) {
                connectorDot = slotIn1.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
                con = slotIn1.querySelector('connector-element');
                if (connectorDot && this.input1 === true) {
                    connectorDot.classList.add('dotTrue');
                    con.value = true;
                } else if (connectorDot) {
                    connectorDot.classList.remove('dotTrue');
                    con.value = false;
                }
            }
            if (slotIn2) {
                connectorDot = slotIn2.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
                con = slotIn2.querySelector('connector-element');
                if (connectorDot && this.input2 === true) {
                    connectorDot.classList.add('dotTrue');
                    con.value = true;
                } else if (connectorDot) {
                    connectorDot.classList.remove('dotTrue');
                    con.value = false;
                }
            }
        }
    }

    /**    
     * Resets color states back down removing active visual indicators previously set.     
     */  
    resetConnectorColor() {
        let connector;
        let con;
        const slotIn1 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con1']");
        const slotIn2 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con2']");
        const slotOut = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con3']");
        const slotOut2 = this.shadowRoot.querySelector('.gate').querySelector("slot[name='con4']");

        if (this.gatetype === 'OUTPUT') {
            this.shadowRoot.querySelector('.gate').classList.remove('gateTrue');
        }
        if (slotOut) {
            connector = slotOut.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
            con = slotOut.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('dotTrue');
                connector.classList.remove('dotError');
                con.value = false;
            }
        }
        if (slotOut2) {
            connector = slotOut2.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
            con = slotOut2.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('dotTrue');
                connector.classList.remove('dotError');
                con.value = false;
            }
        }
        if (slotIn1) {
            connector = slotIn1.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
            con = slotIn1.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('dotTrue');
                connector.classList.remove('dotError');
                con.value = false;
            }
        }
        if (slotIn2) {
            connector = slotIn2.querySelector('connector-element').shadowRoot.querySelector('.connector').children[0];
            con = slotIn2.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('dotTrue');
                connector.classList.remove('dotError');
                con.value = false;
            }
        }
    }

    /**     
     * Generates HTML representation of truth table corresponding to specific logic operation performed by derived classes.      
     */  
    truthTableHTML() {}

    /**     
     * Flips visibility state regarding whether truth table should be shown or hidden according to toggle action made via UI checkbox.      
     */  
    flipGate() {
        if ((this.shadowRoot.getElementById('flipCheckbox') as SlMenuItem).checked) {
            this.showTruthTable = false;
        } else {
            this.showTruthTable = true;
        }
        this.hideContextMenu();
    }

    /**
     * Renders truth table display within component layout whenever called upon during simulation phases, highlighting relevant rows accordingly.
     */ 
    renderTruthTable() {
        const truthTable = this.truthTableHTML();
        const rows = this.shadowRoot.querySelectorAll('tr');
        rows.forEach((row) => {
            row.querySelectorAll('td').forEach((td) => {
                td.classList.remove('highlight');
            });
        });

        const widget = this.widget
        const highlightedRow = (Number(this.input1) << 1) | Number(this.input2);
        if (widget.simulate === true) {
            if (rows[highlightedRow]) {
                let row = rows[highlightedRow] as HTMLTableRowElement;
                row.querySelectorAll('td').forEach((td) => {
                    td.classList.add('highlight');
                });
                if (this.gatetype === 'SPLITTER') {
                    row = rows[highlightedRow + 1] as HTMLTableRowElement;
                }
                row.querySelectorAll('td').forEach((td) => {
                    td.classList.add('highlight');
                });
            }
        }

        return html` <div class="flippedGate">${truthTable}</div> `;
    }
}
