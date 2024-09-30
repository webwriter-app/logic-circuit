import { html } from 'lit';
import Gate from './gate.js';
import { customElement } from 'lit/decorators.js';
import LukaswwLogicgates from '../../webwriter-logic-circuit.js';

export default class NOTGate extends Gate {
    constructor() {
        super();
        this.gatetype = 'NOT';
    }

    calculateOutput() {
        this.output = !this.input1;
    }

    handleClick(event) {
        event.preventDefault();
    }

    render() {
        const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
        return html`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">NOT</p>

                <slot name="con1"></slot>
                <slot name="con3"></slot>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
    }

    truthTableHTML() {
        return html`
            <table>
                <tr>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
            </table>
        `;
    }

    renderSVG() {
        const truthTable = this.truthTableHTML();

        return html`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable
                    ? html``
                    : html`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M105,111.3 V 400.7 L 365.5,256 Z M 16,247 v 18 h 71 v -18 z m 400,-14 c -12.8,0 -23,10.2 -23,23 0,12.8 10.2,23 23,23 12.8,0 23,-10.2 23,-23 0,-12.8 -10.2,-23 -23,-23 z m 40,14 c 0.6,2.9 1,5.9 1,9 0,3.1 -0.4,6.1 -1,9 h 40 v -18 z"
                />
            </svg>
        `;
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
        const highlightedRow = this.input1 ? 1 : 0;
        if (widget.simulate === true) {
            if (rows[highlightedRow]) {
                const row = rows[highlightedRow] as HTMLTableRowElement;
                row.querySelectorAll('td').forEach((td) => {
                    td.classList.add('highlight');
                });
            }
        }

        return html` <div class="flippedGate">${truthTable}</div> `;
    }
}
