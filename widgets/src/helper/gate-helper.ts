import LogicCircuit from '../../webwriter-logic-circuit';
import ConnectorElement from '../connector';
import { updateLines } from '../helper/line-helper';

/**
 * Adds a gate to the circuit workspace based on the specified event or loaded data.
 *
 * @param {*} widget - The widget instance representing the current circuit workspace.
 * @param {*} event - The drag-and-drop event containing data about the gate being added.
 * @param {string[]} [load] - Optional array containing loaded gate type and position data.
 */
export function addGate(widget: any, event: any, load?: string[]) {
    const gateType = load != undefined ? load[0] : event.dataTransfer.getData('type');
    let newGate;

    if (gateType !== 'INPUT' && gateType !== 'OUTPUT' && gateType !== 'SPLITTER') {
        if (!checkIfGateAllowed(widget, gateType)) {
            return;
        }
    }
    switch (gateType) {
        case 'NOT':
            newGate = widget.shadowRoot.createElement('not-gate');
            newGate.id = 'notGate' + widget.gateID;
            break;
        case 'AND':
            newGate = widget.shadowRoot.createElement('and-gate');
            newGate.id = 'andGate' + widget.gateID;
            break;
        case 'OR':
            newGate = widget.shadowRoot.createElement('or-gate');
            newGate.id = 'orGate' + widget.gateID;
            break;
        case 'NAND':
            newGate = widget.shadowRoot.createElement('nand-gate');
            newGate.id = 'nandGate' + widget.gateID;
            break;
        case 'NOR':
            newGate = widget.shadowRoot.createElement('nor-gate');
            newGate.id = 'norGate' + widget.gateID;
            break;
        case 'XNOR':
            newGate = widget.shadowRoot.createElement('xnor-gate');
            newGate.id = 'xnorGate' + widget.gateID;
            break;
        case 'XOR':
            newGate = widget.shadowRoot.createElement('xor-gate');
            newGate.id = 'xorGate' + widget.gateID;
            break;
        case 'INPUT':
            newGate = widget.shadowRoot.createElement('input-gate');
            newGate.id = 'inputGate' + widget.gateID;
            newGate.input1 = false;
            break;
        case 'OUTPUT':
            newGate = widget.shadowRoot.createElement('output-gate');
            newGate.id = 'outputGate' + widget.gateID;
            break;
        case 'SPLITTER':
            newGate = widget.shadowRoot.createElement('splitter-gate');
            newGate.id = 'splitterGate' + widget.gateID;
            break;
    }

    newGate.style.position = 'absolute';

    if(load == undefined){
        var grabPosX = parseFloat(event.dataTransfer.getData('offsetX'));
        var grabPosY = parseFloat(event.dataTransfer.getData('offsetY'));

        var mouseX = event.clientX;
        var mouseY = event.clientY;
    }

    const offsetX = widget.wsDrag.getBoundingClientRect().left;

    const workspaceX = widget.wsDrag.getBoundingClientRect().left;
    const workspaceY = widget.wsDrag.getBoundingClientRect().top;

    const relativeX = mouseX - workspaceX;
    const relativeY = mouseY - workspaceY;

    const scaledRelativeX = relativeX / widget.zoom;
    const scaledRelativeY = relativeY / widget.zoom;

    newGate.style.left = load != undefined ? load[1] : scaledRelativeX - grabPosX + 'px';
    newGate.style.top = load != undefined ? load[2] : scaledRelativeY - grabPosY + 'px';

    widget.gateID++;

    newGate.movable = true;
    newGate.widget = widget

    widget.wsDrag.appendChild(newGate);
    widget.gateElements = [...widget.gateElements, newGate];
    if(load == undefined){
        widget.reflectGates+= widget.reflectGates != "" ? "," : ""
        widget.reflectGates+=  (widget.gateID-1)+"|"+gateType+"|"+newGate.style.left+"|"+newGate.style.top
    }

}

/**
 * Moves an existing gate within the circuit workspace based on drag-and-drop events.
 *
 * @param {*} widget - The current circuit workspace instance.
 * @param {*} event - The drag-and-drop event containing information about the movement.
 */
export function moveGate(widget, event) {
    const id = event.dataTransfer.getData('id');

    const draggedGate = widget.gateElements.find((gate) => gate.id === id);

    const grabPosX = parseFloat(event.dataTransfer.getData('offsetX')) / widget.zoom;
    const grabPosY = parseFloat(event.dataTransfer.getData('offsetY')) / widget.zoom;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const workspaceX = widget.wsDrag.getBoundingClientRect().left;
    const workspaceY = widget.wsDrag.getBoundingClientRect().top;

    const relativeX = mouseX - workspaceX;
    const relativeY = mouseY - workspaceY;

    const scaledRelativeX = relativeX / widget.zoom;
    const scaledRelativeY = relativeY / widget.zoom;

    draggedGate.style.left = scaledRelativeX - grabPosX + 'px';
    draggedGate.style.top = scaledRelativeY - grabPosY + 'px';

    updateLines(widget, draggedGate);

    let gatesArr = widget.reflectGates.split(",")
    for(let i = 0; i<gatesArr.length; i++){
        if(Number.parseInt(gatesArr[i][0]) === Number.parseInt(id.match(/^([a-zA-Z]+)(\d+)$/)[2])){
            let arr: string[] = gatesArr[i].split("|")
            arr[2] = draggedGate.style.left
            arr[3] = draggedGate.style.top
            gatesArr[i] = arr.toString().replaceAll(",","|")
        }
    };
    widget.reflectGates = gatesArr.toString()
}

/**
 * Transfers output values from one gate to connected subsequent gates in the circuit.
 *
 * This method updates inputs of next gates based on outputs of specified source gate connections.
 *
 * @param {*} widget - The current circuit workspace instance containing line elements and gates.
 * @param {*} gate - The source gate whose output needs to be transferred to connected gates.
 */
export function transferOutputToNextGate(widget: any, gate: any) {

    const nextLineArray = widget.lineElements.filter(
        (lineObject) =>
            lineObject.start.id === (gate.conOut as ConnectorElement)?.id ||
            lineObject.end.id === (gate.conOut as ConnectorElement)?.id ||
            lineObject.start.id === (gate.conOut2 as ConnectorElement)?.id ||
            lineObject.end.id === (gate.conOut2 as ConnectorElement)?.id
    );

    nextLineArray?.forEach((nextLine) => {
        let nextConnector;
        if (nextLine) {
            if (
                nextLine?.start.id === (gate.conOut as ConnectorElement)?.id ||
                nextLine?.start.id === (gate.conOut2 as ConnectorElement)?.id
            ) {
                nextConnector = nextLine.end;
            } else if (
                nextLine?.end.id === (gate.conOut as ConnectorElement)?.id ||
                nextLine?.end.id === (gate.conOut2 as ConnectorElement)?.id
            ) {
                nextConnector = nextLine.start;
            }
        }

        if (nextConnector) {
            const nextGate = widget.gateElements.find(
                (gate) => gate.conIn1?.id === nextConnector.id || gate.conIn2?.id === nextConnector.id
            );

            if (nextGate.conIn1.id === nextConnector.id) {
                nextGate.input1 = gate.output;
            } else if (nextGate.conIn2.id === nextConnector.id) {
                nextGate.input2 = gate.output;
            }
        }
    });
}

/**
 * Checks whether adding a specific type of gate is allowed based on the limits in the circuit configuration.
 *
 * @param {*} widget - The current circuit workspace instance holding configurations for allowed gates.
 * @param {*} gateType - Type of the gate being checked against allowance rules defined in configurations. 
 *
 * @returns {boolean} Returns true if adding this type of Gate is allowed, otherwise returns false .
 */
export function checkIfGateAllowed(widget: any, gateType: any) {
    const gatesOfSameType = widget.gateElements.filter((gate) => gate.gatetype === gateType);
    switch (gateType) {
        case 'NOT':
            if (widget.notGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.notGateAllowed) {
                return true;
            }
            break;
        case 'AND':
            if (widget.andGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.andGateAllowed) {
                return true;
            }
            break;
        case 'OR':
            if (widget.orGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.orGateAllowed) {
                return true;
            }
            break;
        case 'NAND':
            if (widget.nandGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.nandGateAllowed) {
                return true;
            }
            break;
        case 'NOR':
            if (widget.norGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.norGateAllowed) {
                return true;
            }
            break;
        case 'XNOR':
            if (widget.xnorGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.xnorGateAllowed) {
                return true;
            }
            break;
        case 'XOR':
            if (widget.xorGateAllowed < 0) {
                return true;
            }
            if (gatesOfSameType.length < widget.xorGateAllowed) {
                return true;
            }
            break;
        default:
            break;
    }
    return false;
}

/**
 * Counts how many instances of each type of Gate currently exist within this Circuit Workspace.
 *
 * It also provides feedback regarding how many more instances can be added according limits set up earlier. 
 *
 * @param {*} Widget –The Current Circuit Workspace Instance Holding All Gates Information.                                                                                                                                                                                                                                                                                                      
 * @param {string} GATETYPE –The Specific Type Of Gate Being Counted For Allowance Feedback.
 *           
 * @returns {(string|null)} A formatted string indicating count/allowed limit or null when no limit exists.         
 */
export function gateCounter(widget, gateType) {
    const gatesOfSameType = widget.gateElements.filter((gate) => gate.gatetype === gateType);
    switch (gateType) {
        case 'NOT':
            if (widget.notGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.notGateAllowed;
            break;
        case 'AND':
            if (widget.andGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.andGateAllowed;
            break;
        case 'OR':
            if (widget.orGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.orGateAllowed;
            break;
        case 'NAND':
            if (widget.nandGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.nandGateAllowed;
            break;
        case 'NOR':
            if (widget.norGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.norGateAllowed;
            break;
        case 'XNOR':
            if (widget.xnorGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.xnorGateAllowed;
            break;
        case 'XOR':
            if (widget.xorGateAllowed === -1) {
                return;
            }
            return gatesOfSameType.length + '/' + widget.xorGateAllowed;
            break;
        default:
            break;
    }
}

/**
 * Determines whether dropped items are over the trash icon area while dragging them around within this interface.
 *
 * This helps manage deletion actions when users try to remove components by dropping them into designated areas like trash cans.
 *
 * @param {*} widget - The current circuit workspace instance holding all components information.
 * @param {Event} event - Mouse event triggered during the dragging process providing coordinates needed for checking overlap with trash area.
 * 
 * @returns {boolean} True if currently dropped over the trash icon area, false otherwise.
 */
export function isDropOverTrashIcon(widget: any, event: any) {
    const trashCanRect = widget.workspaceContainer.querySelector('.trashCanIcon').getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    return (
        mouseX >= trashCanRect.left &&
        mouseX <= trashCanRect.right &&
        mouseY >= trashCanRect.top &&
        mouseY <= trashCanRect.bottom
    );
}

/**
 * Resets all non-input gates in the circuit by clearing their outputs and inputs,
 * and also resets visual indicators related to their state.
 *
 * @param {*} widget - The current circuit workspace instance holding all gates information.
 */
export function resetGates(widget) {
    widget.gateElements.forEach((gate) => {
        if (gate.gatetype !== 'INPUT') {
            gate.output = undefined;
            gate.output2 = undefined;
            gate.input1 = undefined;
            gate.input2 = undefined;
        }
        if (gate.gatetype === 'OUTPUT') {
            gate.input1 = false;
            gate.output = false;
        }

        gate.resetConnectorColor();
        gate.classList.remove('gateTrue');
    });
}
