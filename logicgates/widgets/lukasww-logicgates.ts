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
import Gate from './src/gates/gate';

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
import { Styles } from './src/styles';
import { trash } from './src/assets/icons.js';

import { calculatePath, updateLines, resetLines } from './src/helper/line-helper.js';
import { addGate, moveGate, transferOutputToNextGate } from './src/helper/gate-helper.js';
import { gateCounter, isDropOverTrashIcon, resetGates } from './src/helper/gate-helper.js';

const workspaceWidth: number = 3000;
const workspaceHeight: number = 2000;

let workspaceOffsetX: number = -workspaceWidth / 2;
let workspaceOffsetY: number = -workspaceHeight / 2;

@customElement('lukasww-logicgates')
export default class LukaswwLogicgates extends LitElementWw {
    static shadowRootOptions = {
        ...LitElementWw.shadowRootOptions,
        delegatesFocus: true,
    };

    static styles = Styles;

    public static get scopedElements() {
        return {
            'lukasww-logicgates': LukaswwLogicgates,
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

    @property({ type: Array }) lineElements = [];
    @property({ type: Array }) gateElements = [];
    @property({ type: Number }) gateID: number = 0;
    @property({ type: Number }) lineID: number = 0;
    @property({ type: Number }) zoom: number = 1;
    @property({ type: Number }) dragStartX: number = 0;
    @property({ type: Number }) dragStartY: number = 0;
    @property({ type: Boolean }) simulate: boolean = false;

    @property({ type: Number, attribute: true, reflect: true }) allowSimulation: number = 1;
    @property({ type: Number, attribute: true, reflect: true }) notGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) andGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) orGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) nandGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) norGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) xnorGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) xorGateAllowed: number = -1;
    @property({ type: Number, attribute: true, reflect: true }) splitterAllowed: number = -1;

    @property({ type: Boolean }) isDragging: boolean = false;
    @state() isDrawingLine: boolean = false;
    @state() startConnector: ConnectorElement = null;
    @state() endConnector: ConnectorElement = null;

    @query('#svgCanvas') svgCanvas;
    @query('#workspace') workspaceContainer;
    @query('#workspaceDraggable') wsDrag;
    @query('#simCheckbox') simCheckbox;
    public getGateElements = () => this.gateElements;
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
                    <sl-checkbox id="simCheckbox" class="simulateCheckbox" @sl-change=${() => this.simulateCircuit()}
                        >Simulate</sl-checkbox
                    >

                    <sl-switch class="flipSwitch" id="switch" @sl-change=${() => this.handleFlipAllGates()}
                        >Show all Truthtables</sl-switch
                    >

                    <div class="trashCanIcon" style="font-size: 35px;">${trash}</div>

                    <div class="workspaceArea" id="workspaceDraggable">
                        <svg class="svgArea" id="svgCanvas"></svg>
                    </div>
                </div>
            </div>

            <div part="options" class="optionsMenu">
                <sl-checkbox class="optionsCheckbox" @sl-change=${() => this.handleAllowSimulation()} checked
                    >Allow Simulation</sl-checkbox
                >
                <p></p>
                <p>Limit max. number of Gates:</p>

                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e) => this.handleInputChange(e, 'notGateAllowed')}
                        .value=${this.notGateAllowed >= 0 ? this.notGateAllowed : ''}
                        min="0"
                    ></sl-input>
                    <p>NOT-Gates</p>
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
                    <p>AND-Gates</p>
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
                    <p>OR-Gates</p>
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
                    <p>NAND-Gates</p>
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
                    <p>NOR-Gates</p>
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
                    <p>XNOR-Gates</p>
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
                    <p>XOR-Gates</p>
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
    }

    handleAllowSimulation() {
        if (this.allowSimulation === 0) {
            this.resetCircuit();
            this.simCheckbox.checked = false;
            this.allowSimulation = 1;
        } else {
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

    handleDropTrashCan(event) {
        event.preventDefault();

        const id = event.dataTransfer.getData('id');
        const trashGate = this.gateElements.find((gate) => gate.id === id);
        trashGate.deleteGate();
    }

    handleInputChange(event, propertyName) {
        const inputValue = parseInt(event.target.value);

        if (isNaN(inputValue) || inputValue < 0 || event.target.value.trim() === '') {
            this[propertyName] = -1;
        } else {
            this[propertyName] = inputValue;
        }
    }

    simulateCircuit() {
        const simCheckbox = this.simCheckbox;
        if (simCheckbox.checked) {
            this.simulate = true;
            this.resetCircuit();
            const inputGates = this.gateElements?.filter((gate) => gate.gatetype === 'INPUT');
            inputGates.forEach((gate) => {
                gate.calculateOutput();
                gate.updateConnectorColor();
                transferOutputToNextGate(gate);
            });
        } else {
            this.simulate = false;
            this.resetCircuit();
        }
    }

    resetCircuit() {
        resetGates(this);
        resetLines(this);
        this.requestUpdate();
    }

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
