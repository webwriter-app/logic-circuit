import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createLine } from './helper/line-helper.js';
import { Styles } from './styles.js';
import LogicCircuit from '../webwriter-logic-circuit.js';
import { localized, msg } from "@lit/localize";

/**
 * A connection point on logic gates for creating circuit connections.
 * 
 * @description ConnectorElement represents input/output connection points on logic gates.
 * Users can click these connectors to create connections between gates. The connector
 * displays the current logic value (true/false) through visual styling during simulation.
 * 
 * @internal - This component is used internally by gate components and not directly by consumers
 */
@localized()
export default class ConnectorElement extends LitElement {
    static styles = Styles;

    /**
     * Reference to the parent LogicCircuit widget.
     * @internal
     */
    widget: LogicCircuit

    /**
     * Unique identifier for this connector.
     * @description Used to track connections between gates.
     */
    @state() accessor id = '';
    
    /**
     * Type of connector - 'input' or 'output'.
     * @description Determines whether this connector accepts or provides logic values.
     */
    @state() accessor type = '';
    
    /**
     * X coordinate position of the connector.
     * @description Used for line drawing and positioning calculations.
     */
    @state() accessor x = 0;
    
    /**
     * Y coordinate position of the connector.
     * @description Used for line drawing and positioning calculations.
     */
    @state() accessor y = 0;
    
    /**
     * Current logic value of the connector.
     * @description null = no value, true/false = logic values during simulation.
     */
    @state() accessor value = null;

    constructor() {
        super();
        this.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Handles mouse down events to initiate connection creation.
     * @description When clicked, starts the process of creating a connection between this
     * connector and another connector that the user clicks next.
     * @param {MouseEvent} event - The mouse down event
     */
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
