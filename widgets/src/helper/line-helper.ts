export function getConnectorCoordinates(svgCanvas, connector, zoom) {
    const connectorRect = connector?.getBoundingClientRect();
    const offsetX = connector?.getBoundingClientRect().width / 2;
    const offsetY = connector?.getBoundingClientRect().height / 2;
    const x = (connectorRect?.left - svgCanvas?.getBoundingClientRect()?.left + offsetX - (9*zoom)) / zoom;
    const y = (connectorRect?.top - svgCanvas?.getBoundingClientRect()?.top + offsetY - (9*zoom)) / zoom;
    return { x, y };
}

export function getMouseCoordinates(svgCanvas, mouseX, mouseY, zoom) {
    const workspaceX = svgCanvas.getBoundingClientRect().left;
    const workspaceY = svgCanvas.getBoundingClientRect().top;
    const relativeX = mouseX - workspaceX;
    const relativeY = mouseY - workspaceY;
    const scaledRelativeX = relativeX / zoom;
    const scaledRelativeY = relativeY / zoom;
    return { x: scaledRelativeX, y: scaledRelativeY };
}

export function getConnectorCoordinatesGhost(svgCanvas, connector) {
    const connectorRect = connector?.getBoundingClientRect();
    const offsetX = connector?.getBoundingClientRect().width / 2;
    const offsetY = connector?.getBoundingClientRect().height / 2;
    const x = connectorRect?.left - svgCanvas?.getBoundingClientRect()?.left + offsetX - 9;
    const y = connectorRect?.top - svgCanvas?.getBoundingClientRect()?.top + offsetY - 9;
    return { x, y };
}

export function calculatePath(svgCanvas, startCon, endCon, zoom, offsetStartX?, offsetStartY?, offsetEndX?, offsetEndY?) {
    let startConnector;
    let endConnector;

    if (startCon.type === 'input' && endCon.type === 'output') {
        startConnector = endCon;
        endConnector = startCon;
    } else if (startCon.type === 'output' && endCon.type === 'input') {
        startConnector = startCon;
        endConnector = endCon;
    } else {
        return;
    }

    const points = [];
    const padding = 15;
    const offsetX = 5;

    const start = {
        x: getConnectorCoordinates(svgCanvas, startConnector, zoom).x + (offsetStartX ?? 0),
        y: getConnectorCoordinates(svgCanvas, startConnector, zoom).y + (offsetStartY ?? 0),
        type: startConnector?.id?.substring(startConnector.id.length - 3),
    };

    const end = {
        x: getConnectorCoordinates(svgCanvas, endConnector, zoom).x + (offsetEndX ?? 0),
        y: getConnectorCoordinates(svgCanvas, endConnector, zoom).y + (offsetEndY ?? 0),
        type: endConnector?.id?.substring(endConnector.id.length - 3),
    };

    points.push({ x: start.x, y: start.y });

    const isAbove = end.y < start.y;
    const isLeft = end.x < start.x + offsetX + padding;

    if (isLeft) {
        if (start.type === 'Out' || start.type === 'ut2' || start.type === 'ut3') {
            points.push({ x: start.x + padding, y: start.y });
            if (end.type === 'In1' || end.type === 'In2') {
                points.push({ x: start.x + padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: end.y });
            }
        }
    } else {
        if (start.type === 'Out' || start.type === 'ut2' || start.type === 'ut3') {
            if (isAbove) {
                points.push({ x: start.x + padding - offsetX, y: start.y });
                if (end.type === 'In1') {
                    points.pop();
                    points.push({ x: (start.x + end.x) / 2 - offsetX, y: start.y });
                    points.push({ x: (start.x + end.x) / 2 - offsetX, y: end.y });
                } else if (end.type === 'In2') {
                    points.pop();
                    points.push({ x: (start.x + end.x) / 2 + offsetX, y: start.y });
                    points.push({ x: (start.x + end.x) / 2 + offsetX, y: end.y });
                }
            } else {
                points.push({ x: start.x + padding + offsetX, y: start.y });
                if (end.type === 'In1') {
                    points.pop();
                    points.push({ x: (start.x + end.x) / 2 + offsetX, y: start.y });
                    points.push({ x: (start.x + end.x) / 2 + offsetX, y: end.y });
                } else if (end.type === 'In2') {
                    points.pop();
                    points.push({ x: (start.x + end.x) / 2 - offsetX, y: start.y });
                    points.push({ x: (start.x + end.x) / 2 - offsetX, y: end.y });
                }
            }
        }
    }
    points.push({ x: end.x, y: end.y });

    return points;
}

export function calculatePathToMouse(svgCanvas, connector, zoom, mouseX, mouseY, x1 = -9, y1 = -9, x2 = -9, y2 = -9){
    let start;
    let end;
    if (connector.type === 'input') {
        start = {
            x: mouseX,
            y: mouseY,
            type: 'Out',
        };
        end = {
            x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
            y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
            type: connector?.id?.substring(connector.id.length - 3),
        };
    } else if (connector.type === 'output') {
        start = {
            x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
            y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
            type: connector?.id?.substring(connector.id.length - 3),
        };
        end = {
            x: mouseX,
            y: mouseY,
            type: 'In1',
        };
    } else {
        return;
    }

    const points = [];
    const padding = 15;

    points.push({ x: start.x, y: start.y });

    const isLeft = end.x < start.x;

    if (start.type === 'Out' || start.type === 'ut2' || start.type === 'ut3') {
        points.push({ x: start.x + padding, y: start.y});

        if (end.type === 'In1' || end.type === 'In2') {
            if (start.y === end.y && isLeft) {
                points.push({ x: start.x + padding, y: start.y + padding });
                points.push({ x: end.x - padding, y: start.y + padding });
                points.push({ x: end.x - padding, y: end.y });
            } else if (isLeft) {
                points.push({ x: start.x + padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: end.y });
            } else {
                points.pop();
                points.push({ x: (start.x + end.x) / 2, y: start.y });
                points.push({ x: (start.x + end.x) / 2, y: end.y });
            }
        }
    }

    points.push({ x: end.x, y: end.y });

    return points;
}

export function updateLines(widget, movedGate) {
    const moveLines = [];

    widget.lineElements.forEach((lineObject) => {
        const startConnector = lineObject.start;
        const endConnector = lineObject.end;

        if (
            startConnector.id === movedGate.conIn1?.id ||
            startConnector.id === movedGate.conIn2?.id ||
            startConnector.id === movedGate.conOut?.id ||
            startConnector.id === movedGate.conOut2?.id ||
            endConnector.id === movedGate.conIn1?.id ||
            endConnector.id === movedGate.conIn2?.id ||
            endConnector.id === movedGate.conOut?.id ||
            endConnector.id === movedGate.conOut2?.id
        ) {
            moveLines.push(lineObject);
        }
    });

    moveLines.forEach((line) => {
        const startConnector = line.start;
        const endConnector = line.end;
        const svgPath = line.lineSVG;

        const points = calculatePath(widget.svgCanvas, startConnector, endConnector, widget.zoom);

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }

        svgPath.setAttribute('d', path);
    });
}

export function createLine(widget, startCon, endCon) {
    let startConnector;
    let endConnector;
    if (startCon.type === 'input' && endCon.type === 'output') {
        startConnector = endCon;
        endConnector = startCon;
    } else if (startCon.type === 'output' && endCon.type === 'input') {
        startConnector = startCon;
        endConnector = endCon;
    } else {
        return;
    }

    const points = calculatePath(widget.svgCanvas, startCon, endCon, widget.zoom);

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
    }

    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', path);
    svgPath.setAttribute('id', 'line' + widget.lineID);
    svgPath.classList.add('svgLine');

    widget.lineID++;

    const lineObject = {
        start: startConnector,
        end: endConnector,
        lineSVG: svgPath,
    };

    widget.lineElements = [...widget.lineElements, lineObject];

    svgPath.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const deletePathID = svgPath.getAttribute('id');

        widget.lineElements.forEach((line, index) => {
            if (line.lineSVG.id === deletePathID) {
                const deletePath = svgPath;
                deletePath.remove();
                widget.lineElements.splice(index, 1);

                // Remove the connection from the widget state
                let consArr: string[] = widget.reflectCons.split(",")
                let reflectIndex: number = -1
                for(let i = 0; i<consArr.length; i++){
                    if(consArr[i].includes(line.start.id) && consArr[i].includes(line.end.id)){
                        reflectIndex = i
                    }
                };
                consArr.splice(reflectIndex,1)
                widget.reflectCons = consArr.toString()
            }
        });
    });

    widget.svgCanvas.appendChild(svgPath);
    console.log(widget.lineElements)

    let entry: string = startCon.id+"|"+endCon.id
    console.log(entry)

    if(!widget.reflectCons.includes(entry)){
        widget.reflectCons+= widget.reflectCons != "" ? "," : ""
        widget.reflectCons+= entry
    } 
}

export function updateLineColor(widget) {
    const lineElements = widget.getLineElements();
    let svgPath;
    lineElements.forEach((line) => {
        svgPath = line.lineSVG;
        if (line.start.value === true || line.end.value === true) {
            svgPath.classList.add('svgLineTrue');
        } else {
            svgPath.classList.remove('svgLineTrue');
        }
    });
}

export function resetLines(widget) {
    widget.lineElements.forEach((line) => {
        line.lineSVG.classList.remove('svgLineTrue');
    });
}
