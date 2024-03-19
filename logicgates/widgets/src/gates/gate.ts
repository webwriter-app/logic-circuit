import { html, css } from 'lit';
import { LitElementWw } from '@webwriter/lit';
import { customElement, query } from 'lit/decorators.js';
import { property, state } from 'lit/decorators.js';
import ConnectorElement from '../connector';
import LukaswwLogicgates from '../../lukasww-logicgates';
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

export default class Gate extends LitElementWw {
    static movedGate;
    static x;
    static y;

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

    @property({ type: Boolean }) input1: boolean = null;
    @property({ type: Boolean }) input2: boolean = null;
    @property({ type: Boolean }) output: boolean = null;
    @property({ type: Boolean }) output2: boolean = null;
    @property({ type: String }) gatetype: string = null;
    @property({ type: Boolean }) movable: boolean = false;
    @property({ type: String }) id: string = null;
    @property({ type: Object }) conIn1: ConnectorElement = null;
    @property({ type: Object }) conIn2: ConnectorElement = null;
    @property({ type: Object }) conOut: Object = null;
    @property({ type: Object }) conOut2: Object = null;
    @property({ type: Boolean }) showTruthTable: boolean = false;

    @query('#contextMenu') contextMenu?: SlMenu;

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

    updated(changedProperties) {
        super.updated(changedProperties);
        const widget = document.querySelector('lukasww-logicgates') as LukaswwLogicgates;
        if (this.movable === true) {
            if (this.gatetype === 'INPUT' && changedProperties.has('input1')) {
                this.calculateOutput();
                this.updateConnectorColor();
                transferOutputToNextGate(this);
            }

            if (widget.simulate === true) {
                if (this.gatetype === 'OUTPUT' && changedProperties.has('input1')) {
                    this.calculateOutput();
                    this.updateConnectorColor();
                } else if (changedProperties.has('input1') || changedProperties.has('input2')) {
                    this.calculateOutput();
                    transferOutputToNextGate(this);
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

    handleDragEnd(event) {
        event.preventDefault();
        if (this.movable) {
            this.style.opacity = '';
        }
    }

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

    calculateOutput() {}

    changeInput1() {
        this.input1 = !this.input1;
    }

    changeInput2() {
        this.input2 = !this.input2;
    }

    showContextMenu(event) {
        const gateElements = (document.querySelector('lukasww-logicgates') as LukaswwLogicgates).getGateElements();
        gateElements.forEach((gate) => {
            gate.hideContextMenu();
        });

        if (this.contextMenu) {
            if (this.movable === true) {
                const zoom = (document.querySelector('lukasww-logicgates') as LukaswwLogicgates).zoom;

                const gateX = this.getBoundingClientRect().x;
                const gateY = this.getBoundingClientRect().y;

                const svgCanvas = (document.querySelector('lukasww-logicgates') as LukaswwLogicgates).wsDrag;

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

    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.style.display = 'none';
            this.style.zIndex = '10';
        }
    }

    deleteGate() {
        const workspace = document.querySelector('lukasww-logicgates') as LukaswwLogicgates;
        const gateElements = workspace.getGateElements();
        const lineElements = workspace.getLineElements();

        if (workspace.isDrawingLine) {
            workspace.isDrawingLine = false;
            workspace.svgPathToMouse.setAttribute('d', '');
            workspace.startConnector = null;
        }

        gateElements.forEach((gate, index) => {
            if (this === gate) {
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
            } else {
                lineElementsUpdated.push(line);
            }
        });
        workspace.lineElements = lineElementsUpdated;

        this.hideContextMenu();
    }

    createConnectors(slot, n) {
        if (this.movable) {
            const connector = document.createElement('connector-element') as ConnectorElement;
            connector.style.position = 'absolute';

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

    updateConnectorColor() {
        let connector;
        let con;
        const widget = document.querySelector('lukasww-logicgates') as LukaswwLogicgates;
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
        if (widget.simulate === true) {
            if (this.gatetype == 'OUTPUT') {
                if (this.input1 === true) {
                    this.shadowRoot.querySelector('.gate').classList.add('gateTrue');
                    this.requestUpdate();
                } else {
                    this.shadowRoot.querySelector('.gate').classList.remove('gateTrue');
                }
            }
            if (slotOut) {
                connector = slotOut.querySelector('connector-element').shadowRoot.querySelector('.connector');
                con = slotOut.querySelector('connector-element');
                if (connector && this.output === true) {
                    connector.classList.add('connectorTrue');
                    con.value = true;
                } else if (connector) {
                    connector.classList.remove('connectorTrue');
                    con.value = false;
                }
            }
            if (slotOut2) {
                connector = slotOut2.querySelector('connector-element').shadowRoot.querySelector('.connector');
                con = slotOut2.querySelector('connector-element');
                if (connector && this.output === true) {
                    connector.classList.add('connectorTrue');
                    con.value = true;
                } else if (connector) {
                    connector.classList.remove('connectorTrue');
                    con.value = false;
                }
            }
            if (slotIn1) {
                connector = slotIn1.querySelector('connector-element').shadowRoot.querySelector('.connector');
                con = slotIn1.querySelector('connector-element');
                if (connector && this.input1 === true) {
                    connector.classList.add('connectorTrue');
                    con.value = true;
                } else if (connector) {
                    connector.classList.remove('connectorTrue');
                    con.value = false;
                }
            }
            if (slotIn2) {
                connector = slotIn2.querySelector('connector-element').shadowRoot.querySelector('.connector');
                con = slotIn2.querySelector('connector-element');
                if (connector && this.input2 === true) {
                    connector.classList.add('connectorTrue');
                    con.value = true;
                } else if (connector) {
                    connector.classList.remove('connectorTrue');
                    con.value = false;
                }
            }
        }
    }
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
            connector = slotOut.querySelector('connector-element').shadowRoot.querySelector('.connector');
            con = slotOut.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('connectorTrue');
                connector.classList.remove('connectorError');
                con.value = false;
            }
        }
        if (slotOut2) {
            connector = slotOut2.querySelector('connector-element').shadowRoot.querySelector('.connector');
            con = slotOut2.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('connectorTrue');
                connector.classList.remove('connectorError');
                con.value = false;
            }
        }
        if (slotIn1) {
            connector = slotIn1.querySelector('connector-element').shadowRoot.querySelector('.connector');
            con = slotIn1.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('connectorTrue');
                connector.classList.remove('connectorError');
                con.value = false;
            }
        }
        if (slotIn2) {
            connector = slotIn2.querySelector('connector-element').shadowRoot.querySelector('.connector');
            con = slotIn2.querySelector('connector-element');
            if (connector) {
                connector.classList.remove('connectorTrue');
                connector.classList.remove('connectorError');
                con.value = false;
            }
        }
    }

    truthTableHTML() {}

    flipGate() {
        if ((this.shadowRoot.getElementById('flipCheckbox') as SlMenuItem).checked) {
            this.showTruthTable = false;
        } else {
            this.showTruthTable = true;
        }
        this.hideContextMenu();
    }

    renderTruthTable() {
        const truthTable = this.truthTableHTML();
        const rows = this.shadowRoot.querySelectorAll('tr');
        rows.forEach((row) => {
            row.querySelectorAll('td').forEach((td) => {
                td.classList.remove('highlight');
            });
        });

        const widget = document.querySelector('lukasww-logicgates') as LukaswwLogicgates;
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
