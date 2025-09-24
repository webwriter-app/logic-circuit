/**
 * Gets the coordinates of a connector relative to the SVG canvas.
 *
 * @param {HTMLElement} svgCanvas - The SVG canvas element.
 * @param {HTMLElement} connector - The connector element to get coordinates for.
 * @param {number} zoom - The current zoom level.
 * 
 * @returns {{ x: number, y: number }} - The coordinates of the connector.
 */
export function getConnectorCoordinates(svgCanvas, connector, zoom) {
    const connectorRect = connector?.getBoundingClientRect();
    const offsetX = connector?.getBoundingClientRect().width / 2;
    const offsetY = connector?.getBoundingClientRect().height / 2;
    const x =
        (connectorRect?.left -
            svgCanvas?.getBoundingClientRect()?.left +
            offsetX -
            9 * zoom) /
        zoom;
    const y =
        (connectorRect?.top -
            svgCanvas?.getBoundingClientRect()?.top +
            offsetY -
            9 * zoom) /
        zoom;
    return { x, y };
}

/**
 * Gets mouse coordinates relative to the SVG canvas.
 *
 * @param {HTMLElement} svgCanvas - The SVG canvas element.
 * @param {number} mouseX - The X coordinate of the mouse event.
 * @param {number} mouseY - The Y coordinate of the mouse event.
 * @param {number} zoom - The current zoom level.
 * 
 * @returns {{ x: number, y: number }} - The scaled coordinates of the mouse relative to the canvas.
 */
export function getMouseCoordinates(svgCanvas, mouseX, mouseY, zoom) {
    const workspaceX = svgCanvas.getBoundingClientRect().left;
    const workspaceY = svgCanvas.getBoundingClientRect().top;
    const relativeX = mouseX - workspaceX;
    const relativeY = mouseY - workspaceY;
    const scaledRelativeX = relativeX / zoom;
    const scaledRelativeY = relativeY / zoom;
    return { x: scaledRelativeX, y: scaledRelativeY };
}

/**
 * Gets ghost coordinates for a connector without applying scaling or offsets from the SVG canvas.
 *
 * @param {HTMLElement} svgCanvas - The SVG canvas element.
 * @param {HTMLElement} connector - The connector element to get ghost coordinates for.
 * @returns {{ x: number, y: number }} - The ghost coordinates of the connector without scaling.
 */
export function getConnectorCoordinatesGhost(svgCanvas, connector) {
    const connectorRect = connector?.getBoundingClientRect();
    const offsetX = connector?.getBoundingClientRect().width / 2;
    const offsetY = connector?.getBoundingClientRect().height / 2;
    const x =
        connectorRect?.left -
        svgCanvas?.getBoundingClientRect()?.left +
        offsetX -
        9;
    const y =
        connectorRect?.top -
        svgCanvas?.getBoundingClientRect()?.top +
        offsetY -
        9;
    return { x, y };
}

/**
 * Calculates path points between two connectors based on their types and positions in an SVG canvas context.
 *
 * @param {HTMLElement} svgCanvas - The SVG canvas element used for calculations.
 * @param {*} startCon - Starting connection object containing type and ID information.
 * @param {*} endCon - Ending connection object containing type and ID information.
 * @param {number} zoom - Current zoom level affecting path calculations.
 * @param {number} [offsetStartX] - Optional horizontal offset for starting point adjustment.
 * @param {number} [offsetStartY] - Optional vertical offset for starting point adjustment.
 * @param {number} [offsetEndX] - Optional horizontal offset for ending point adjustment.
 * @param {number} [offsetEndY] – Optional vertical offset for ending point adjustment.
 *
 * @returns {{x: number, y: number}[]} Array of points representing the calculated path from start to end connectors.
 */
export function calculatePath(
    svgCanvas,
    startCon,
    endCon,
    zoom,
    offsetStartX?,
    offsetStartY?,
    offsetEndX?,
    offsetEndY?
) {
    let startConnector;
    let endConnector;

    if (startCon.type === "input" && endCon.type === "output") {
        startConnector = endCon;
        endConnector = startCon;
    } else if (startCon.type === "output" && endCon.type === "input") {
        startConnector = startCon;
        endConnector = endCon;
    } else {
        return;
    }

    const points = [];
    const padding = 15;
    const offsetX = 5;

    const start = {
        x:
            getConnectorCoordinates(svgCanvas, startConnector, zoom).x +
            (offsetStartX ?? 0),
        y:
            getConnectorCoordinates(svgCanvas, startConnector, zoom).y +
            (offsetStartY ?? 0),
        type: startConnector?.id?.substring(startConnector.id.length - 3),
    };

    const end = {
        x:
            getConnectorCoordinates(svgCanvas, endConnector, zoom).x +
            (offsetEndX ?? 0),
        y:
            getConnectorCoordinates(svgCanvas, endConnector, zoom).y +
            (offsetEndY ?? 0),
        type: endConnector?.id?.substring(endConnector.id.length - 3),
    };

    points.push({ x: start.x, y: start.y });

    const isAbove = end.y < start.y;
    const isLeft = end.x < start.x + offsetX + padding;

    if (isLeft) {
        if (
            start.type === "Out" ||
            start.type === "ut2" ||
            start.type === "ut3"
        ) {
            points.push({ x: start.x + padding, y: start.y });
            if (end.type === "In1" || end.type === "In2") {
                points.push({ x: start.x + padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: (start.y + end.y) / 2 });
                points.push({ x: end.x - padding, y: end.y });
            }
        }
    } else {
        if (
            start.type === "Out" ||
            start.type === "ut2" ||
            start.type === "ut3"
        ) {
            if (isAbove) {
                points.push({ x: start.x + padding - offsetX, y: start.y });
                if (end.type === "In1") {
                    points.pop();
                    points.push({
                        x: (start.x + end.x) / 2 - offsetX,
                        y: start.y,
                    });
                    points.push({
                        x: (start.x + end.x) / 2 - offsetX,
                        y: end.y,
                    });
                } else if (end.type === "In2") {
                    points.pop();
                    points.push({
                        x: (start.x + end.x) / 2 + offsetX,
                        y: start.y,
                    });
                    points.push({
                        x: (start.x + end.x) / 2 + offsetX,
                        y: end.y,
                    });
                }
            } else {
                points.push({ x: start.x + padding + offsetX, y: start.y });
                if (end.type === "In1") {
                    points.pop();
                    points.push({
                        x: (start.x + end.x) / 2 + offsetX,
                        y: start.y,
                    });
                    points.push({
                        x: (start.x + end.x) / 2 + offsetX,
                        y: end.y,
                    });
                } else if (end.type === "In2") {
                    points.pop();
                    points.push({
                        x: (start.x + end.x) / 2 - offsetX,
                        y: start.y,
                    });
                    points.push({
                        x: (start.x + end.x) / 2 - offsetX,
                        y: end.y,
                    });
                }
            }
        }
    }
    points.push({ x: end.x, y: end.y });

    return points;
}

/**
 * Calculates path points from a given input/output connection to the current mouse position in an SVG context.
 *
 * This is useful when drawing lines that follow user interactions like drawing connections following the cursor.
 *
 * @param {HTMLElement} svgCanvas – The SVG canvas element used for calculations.
 * @param {*} connector – The connection object representing either input or output being interacted with.
 * @param {number} zoom – Current zoom level affecting path calculations.
 * @param {number} mouseX – The X-coordinate of the current mouse position.
 * @param {number} mouseY – The Y-coordinate of the current mouse position.
 *
 *
 * @returns {{x:number,y:number }[]} Array of points representing calculated path towards/from cursor position.
 */
export function calculatePathToMouse(
    svgCanvas,
    connector,
    zoom,
    mouseX,
    mouseY,
    x1 = -9,
    y1 = -9,
    x2 = -9,
    y2 = -9
) {
    let start;
    let end;
    if (connector.type === "input") {
        start = {
            x: mouseX,
            y: mouseY,
            type: "Out",
        };
        end = {
            x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
            y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
            type: connector?.id?.substring(connector.id.length - 3),
        };
    } else if (connector.type === "output") {
        start = {
            x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
            y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
            type: connector?.id?.substring(connector.id.length - 3),
        };
        end = {
            x: mouseX,
            y: mouseY,
            type: "In1",
        };
    } else {
        return;
    }

    const points = [];
    const padding = 15;

    points.push({ x: start.x, y: start.y });

    const isLeft = end.x < start.x;

    if (start.type === "Out" || start.type === "ut2" || start.type === "ut3") {
        points.push({ x: start.x + padding, y: start.y });

        if (end.type === "In1" || end.type === "In2") {
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

/**
 * Updates all lines connected to a moved gate by recalculating their paths based on new positions after movement events occur within widget context.
 *
 * This is crucial in maintaining visual accuracy when components are dragged around within an interface involving connections/lines between them.
 *
 * @param {*} widget – Reference object containing state about line elements associated with this widget instance.
 * @param {*} movedGate – Reference object indicating which gate has just been moved.
 */
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

        const points = calculatePath(
            widget.svgCanvas,
            startConnector,
            endConnector,
            widget.zoom
        );

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }

        svgPath.setAttribute("d", path);
    });
}

/**
 * Creates a new line connecting two specified connectors while ensuring appropriate handling based on their types.
 *
 * This handles adding/removing lines visually as well as updating internal state management reflecting these changes accordingly.
 *
 * @param {*} widget - Reference object containing state about line elements associated with this widget instance.
 * @param {*} startCon - Starting connection object containing type/id info needed during creation process.
 * @param {*} endCon - Ending connection object containing type/id info needed during creation process.
 */
export function createLine(widget, startCon, endCon) {
    let startConnector;
    let endConnector;
    if (startCon.type === "input" && endCon.type === "output") {
        startConnector = endCon;
        endConnector = startCon;
    } else if (startCon.type === "output" && endCon.type === "input") {
        startConnector = startCon;
        endConnector = endCon;
    } else {
        return;
    }

    const points = calculatePath(
        widget.svgCanvas,
        startCon,
        endCon,
        widget.zoom
    );

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
    }

    const svgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    svgPath.setAttribute("d", path);
    svgPath.setAttribute("id", "line" + widget.lineID);
    svgPath.classList.add("svgLine");

    widget.lineID++;

    const lineObject = {
        start: startConnector,
        end: endConnector,
        lineSVG: svgPath,
    };

    widget.lineElements = [...widget.lineElements, lineObject];

    svgPath.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const deletePathID = svgPath.getAttribute("id");

        widget.lineElements.forEach((line, index) => {
            if (line.lineSVG.id === deletePathID) {
                const deletePath = svgPath;
                deletePath.remove();
                widget.lineElements.splice(index, 1);

                // Remove the connection from the widget state
                let consArr: string[] = widget.reflectCons.split(",");
                let reflectIndex: number = -1;
                for (let i = 0; i < consArr.length; i++) {
                    if (
                        consArr[i].includes(line.start.id) &&
                        consArr[i].includes(line.end.id)
                    ) {
                        reflectIndex = i;
                    }
                }
                consArr.splice(reflectIndex, 1);
                widget.reflectCons = consArr.toString();
            }
        });

        widget.simulateCircuit();
    });

    widget.svgCanvas.appendChild(svgPath);
    console.log(widget.lineElements);

    let entry: string = startCon.id + "|" + endCon.id;
    console.log(entry);

    if (!widget.reflectCons.includes(entry)) {
        widget.reflectCons += widget.reflectCons != "" ? "," : "";
        widget.reflectCons += entry;
    }
}

/**
 * Updates the colors/styles applied across existing lines according to boolean values held within their respective starting/ending connections.
 *
 * This allows dynamic visual feedback based upon logical states represented by connected components.
 *
 * @param {*} widget - Reference object containing state about line elements associated with this widget instance.
 */
export function updateLineColor(widget) {
    const lineElements = widget.getLineElements();
    let svgPath;
    lineElements.forEach((line) => {
        svgPath = line.lineSVG;
        if (line.start.value === true || line.end.value === true) {
            svgPath.classList.add("svgLineTrue");
        } else {
            svgPath.classList.remove("svgLineTrue");
        }
    });
}

/**
 * Resets styles/colors applied across all existing lines, removing any active visual indicators previously set.
 *
 * Useful when needing to clear/reset visuals after certain operations/events occur throughout the application lifecycle.
 *
 * @param {*} widget - Reference object containing state about line elements associated with this widget instance.
 */
export function resetLines(widget) {
    widget.lineElements.forEach((line) => {
        line.lineSVG.classList.remove("svgLineTrue");
    });
}
