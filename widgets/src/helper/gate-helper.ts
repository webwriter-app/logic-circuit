import LogicCircuit from '../../webwriter-logic-circuit';
import ConnectorElement from '../connector';
import { updateLines } from '../helper/line-helper';

export function addGate(widget: any, event: any) {
    const gateType = event.dataTransfer.getData('type');
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

    const grabPosX = parseFloat(event.dataTransfer.getData('offsetX'));
    const grabPosY = parseFloat(event.dataTransfer.getData('offsetY'));

    const offsetX = widget.wsDrag.getBoundingClientRect().left;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const workspaceX = widget.wsDrag.getBoundingClientRect().left;
    const workspaceY = widget.wsDrag.getBoundingClientRect().top;

    const relativeX = mouseX - workspaceX;
    const relativeY = mouseY - workspaceY;

    const scaledRelativeX = relativeX / widget.zoom;
    const scaledRelativeY = relativeY / widget.zoom;

    newGate.style.left = scaledRelativeX - grabPosX + 'px';
    newGate.style.top = scaledRelativeY - grabPosY + 'px';

    widget.gateID++;

    newGate.movable = true;
    newGate.widget = widget

    widget.wsDrag.appendChild(newGate);
    widget.gateElements = [...widget.gateElements, newGate];
}

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
}

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
