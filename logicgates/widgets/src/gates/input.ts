import { html } from 'lit';
import Gate from './gate.js';
import { customElement } from 'lit/decorators.js';

@customElement('input-gate')
export default class Input extends Gate {
    constructor() {
        super();
        this.gatetype = 'INPUT';
        this.output = false;
    }

    changeInput() {
        this.output = !this.output;
    }

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
