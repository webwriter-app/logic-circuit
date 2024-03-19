import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createLine } from './helper/line-helper.js';
import LukaswwLogicgates from '../lukasww-logicgates.js';
import { Styles } from './styles.js';

@customElement('connector-element')
export default class ConnectorElement extends LitElement {
    static styles = Styles;

    @state() id = '';
    @state() type = '';
    @state() x = 0;
    @state() y = 0;
    @state() value = null;

    constructor() {
        super();
        this.addEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown(event) {
        event.preventDefault();
        const clickedElement = event.target;

        const widget = document.querySelector('lukasww-logicgates') as LukaswwLogicgates;

        for (const line of widget.lineElements) {
            if (clickedElement === line.start || clickedElement === line.end) {
                widget.startConnector = null;
                widget.endConnector = null;
                widget.isDrawingLine = false;
                widget.svgPathToMouse.setAttribute('d', '');

                console.error('Only one connection allowed');

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
                console.error('Connector are from the same type');
            }
            widget.startConnector = null;
            widget.endConnector = null;
            widget.isDrawingLine = false;
            widget.svgPathToMouse.setAttribute('d', '');
        }
    }

    render() {
        return html` <div class="connector" id="${this.id}"></div> `;
    }
}