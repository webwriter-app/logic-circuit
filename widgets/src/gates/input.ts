import { html } from 'lit';
import Gate from './gate.js';
import { customElement } from 'lit/decorators.js';

/**
 * Input gate component for providing logic values to the circuit.
 * 
 * @description Input gates are the source of logic values in a circuit. Users can click
 * the gate to toggle between true (1) and false (0) states. During simulation, input
 * gates propagate their values to connected gates.
 * 
 * @example
 * ```html
 * <input-gate></input-gate>
 * ```
 */
export default class Input extends Gate {
    constructor() {
        super();
        this.gatetype = 'INPUT';
        this.output = false;
    }

    /**
     * Toggles the input value between true and false.
     * @description Called when user clicks on the input gate to change its value.
     */
    changeInput() {
        this.output = !this.output;
    }

    /**
     * Calculates the output based on the input value.
     * @description For input gates, the output equals the manually set input value.
     */
    calculateOutput() {
        this.output = this.input1;
    }

    render() {
        return html`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                <p class="gateText">Input</p>
                <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg"></svg>
                <slot name="con3"></slot>
                <div class="gatepointer" @click=${this.changeInput1}>${this.output}</div>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
    }
}
