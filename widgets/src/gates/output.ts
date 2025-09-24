import { html } from 'lit';
import Gate from './gate.js';
import { localized, msg } from "@lit/localize";

/**
 * Represents an Output gate in the logic circuit.
 *
 * This gate represents the output of a logic circuit, displaying the result based on its input.
 *
 * @extends Gate
 */
@localized()
export default class Output extends Gate {
    constructor() {
        super();
        this.gatetype = 'OUTPUT';
    }

    calculateOutput() {
        this.output = this.input1;
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                <p class="gateText">Output</p>
                <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg"></svg>
                <slot name="con1"></slot>
                <div class="gatepointer">${this.output ? "true" : "false"}</div>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item @click="${() => this.deleteGate()}">${msg("Delete")}</sl-menu-item>
            </sl-menu>
        `;
    }
}
