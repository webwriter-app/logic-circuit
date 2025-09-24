import { html } from 'lit';
import Gate from './gate.js';
import { customElement } from 'lit/decorators.js';

/**
 * Output gate component for displaying circuit results.
 * 
 * @description Output gates display the final result of logic calculations.
 * They show the current logic value (true/false) flowing through the circuit.
 * Output gates are typically placed at the end of logic chains to observe results.
 * 
 * @example
 * ```html
 * <output-gate></output-gate>
 * ```
 */
export default class Output extends Gate {
    constructor() {
        super();
        this.gatetype = 'OUTPUT';
    }

    /**
     * Passes through the input value to the output.
     * @description For output gates, the output simply equals the input value.
     * The gate serves as a visual indicator of the circuit's final result.
     */
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
                <div class="gatepointer">${this.output}</div>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
    }
}
