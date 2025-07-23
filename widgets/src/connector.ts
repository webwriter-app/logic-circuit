import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createLine } from './helper/line-helper.js';
import { Styles } from './styles.js';
import LogicCircuit from '../webwriter-logic-circuit.js';
import { localized, msg } from "@lit/localize";

@localized()
export default class ConnectorElement extends LitElement {
    static styles = Styles;

    widget: LogicCircuit

    @state() accessor id = '';
    @state() accessor type = '';
    @state() accessor x = 0;
    @state() accessor y = 0;
    @state() accessor value = null;

    constructor() {
        super();
        this.addEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown(event) {
        event.preventDefault();
        const clickedElement = event.target;

        const widget = this.widget

        for (const line of widget.lineElements) {
            if (clickedElement === line.start || clickedElement === line.end) {
                widget.startConnector = null;
                widget.endConnector = null;
                widget.isDrawingLine = false;
                widget.svgPathToMouse.setAttribute('d', '');

                console.error(msg('Only one connection allowed'));

                return;
            }
        }

        if (widget.startConnector === null) {
            widget.startConnector = clickedElement;
            widget.isDrawingLine = true;
        } else if (widget.endConnector === null) {
            widget.endConnector = clickedElement;

            if (
                widget.startConnector.type !== widget.endConnector.type &&
                widget.startConnector.parentNode.parentNode !== widget.endConnector.parentNode.parentNode
            ) {
                createLine(widget, widget.startConnector, widget.endConnector);
            } else {
                console.error(msg('Connectors are from the same type'));
            }
            widget.startConnector = null;
            widget.endConnector = null;
            widget.isDrawingLine = false;
            widget.svgPathToMouse.setAttribute('d', '');
        }
    }

    render() {
        return html` <div class="connector" id="${this.id}">
            <span class="dot"></span>
        </div> `;
    }
}
