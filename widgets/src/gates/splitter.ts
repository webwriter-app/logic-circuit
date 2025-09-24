import { html } from 'lit';
import Gate from './gate.js';

/**
 * Represents a Splitter in the logic circuit.
 *
 * This gate distributes a single input signal to two outputs.
 *
 * @extends Gate
 */
export default class Splitter extends Gate {
    constructor() {
        super();
        this.gatetype = 'SPLITTER';
        this.output2 = false;
    }

    calculateOutput() {
        this.output = this.input1;
        this.output2 = this.input1;
    }

    render() {
        const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();

        return html`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">Splitter</p>

                <slot name="con1"></slot>
                <slot name="con3"></slot>
                <slot name="con4"></slot>
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
                    <td rowspan="2">0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td rowspan="2">1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td class="vertical-line"></td>
                    <td>1</td>
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
                            <th>Input</th>
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

            <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#000000"
                    d="M 16 254 v 18 h 199 v 110 h 240 v -18 h -222 v -210 h 222 v -18 h -240 V 254 L 16 254 Z"
                />
            </svg>
        `;
    }
}
