# Logic,Circuit (`@webwriter/logic-circuit@1.2.0`)
[License: MIT](LICENSE) | Version: 1.2.0

Create and simulate circuits with logic gates (AND, OR, XOR, etc.).

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Halfadder | @webwriter/logic-circuit/snippets/halfadder.html |
| RS FlipFlop | @webwriter/logic-circuit/snippets/RS-FlipFlop.html |



## `LogicCircuit` (`<webwriter-logic-circuit>`)


### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/logic-circuit/widgets/webwriter-logic-circuit.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/logic-circuit/widgets/webwriter-logic-circuit.js"></script>
<webwriter-logic-circuit></webwriter-logic-circuit>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/logic-circuit
```

```html
<link href="@webwriter/logic-circuit/widgets/webwriter-logic-circuit.css" rel="stylesheet">
<script type="module" src="@webwriter/logic-circuit/widgets/webwriter-logic-circuit.js"></script>
<webwriter-logic-circuit></webwriter-logic-circuit>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `LogicCircuit.shadowRootOptions` | `object` | - | `{ ...LitElementWw.shadowRootOptions, delegatesFocus: true, }` | ✗ |
| `localize` | - | i18n handler for the widget. | `LOCALIZE` | ✗ |
| `LogicCircuit.scopedElements` | - | Registers scoped custom elements used within the logic circuit widget. | - | ✗ |
| `lineElements` (`lineElements`) | `array` | The list of all current wire (line) elements. | `[]` | ✗ |
| `gateElements` (`gateElements`) | `array` | The list of all current gate elements. | `[]` | ✗ |
| `reflectGates` (`reflectGates`) | `String` | Stringified representation of gate state, synced via attribute. | `""` | ✓ |
| `reflectCons` (`reflectCons`) | `String` | Stringified representation of connector state, synced via attribute. | `""` | ✓ |
| `gateID` (`gateID`) | `number` | Internal gate ID counter for uniquely identifying gates. | `0` | ✗ |
| `lineID` (`lineID`) | `number` | Internal line ID counter for uniquely identifying wires. | `0` | ✗ |
| `zoom` (`zoom`) | `number` | Current zoom level of the circuit canvas. | `1` | ✗ |
| `dragStartX` (`dragStartX`) | `number` | X coordinate where the drag operation started. | `0` | ✗ |
| `dragStartY` (`dragStartY`) | `number` | Y coordinate where the drag operation started. | `0` | ✗ |
| `simulate` (`simulate`) | `boolean` | Whether the simulation is running. | `true` | ✗ |
| `simulationDelay` (`simulationDelay`) | `number` | Delay in milliseconds between simulation steps. | `500` | ✓ |
| `allowSimulation` (`allowSimulation`) | `number` | Whether simulation is allowed (1 = allowed, 0 = disallowed). | `1` | ✓ |
| `notGateAllowed` (`notGateAllowed`) | `number` | Limit or enable state for NOT gates (-1 = unlimited, 0+ = limited). | `-1` | ✓ |
| `andGateAllowed` (`andGateAllowed`) | `number` | Limit or enable state for AND gates. | `-1` | ✓ |
| `orGateAllowed` (`orGateAllowed`) | `number` | Limit or enable state for OR gates. | `-1` | ✓ |
| `nandGateAllowed` (`nandGateAllowed`) | `number` | Limit or enable state for NAND gates. | `-1` | ✓ |
| `norGateAllowed` (`norGateAllowed`) | `number` | Limit or enable state for NOR gates. | `-1` | ✓ |
| `xnorGateAllowed` (`xnorGateAllowed`) | `number` | Limit or enable state for XNOR gates. | `-1` | ✓ |
| `xorGateAllowed` (`xorGateAllowed`) | `number` | Limit or enable state for XOR gates. | `-1` | ✓ |
| `splitterAllowed` (`splitterAllowed`) | `number` | Limit or enable state for splitter gates. | `-1` | ✓ |
| `isDragging` (`isDragging`) | `boolean` | Whether the user is currently dragging the canvas or an element. | `false` | ✗ |
| `isDrawingLine` | `boolean` | Whether a connection line is currently being drawn. | `false` | ✗ |
| `startConnector` | `ConnectorElement` | Reference to the starting connector for a wire being drawn. | `null` | ✗ |
| `endConnector` | `ConnectorElement` | Reference to the ending connector for a wire being drawn. | `null` | ✗ |
| `svgCanvas` | - | Reference to the SVG canvas element. | - | ✗ |
| `workspaceContainer` | - | Reference to the overall workspace container. | - | ✗ |
| `wsDrag` | - | Reference to the draggable inner workspace. | - | ✗ |
| `simCheckbox` | - | Reference to the simulation checkbox toggle. | - | ✗ |
| `instructionsContainer` | - | Reference to the instructions container. | - | ✗ |
| `getGateElements` | - | Get the current list of gate elements. | - | ✗ |
| `getLineElements` | - | Get the current list of line elements. | - | ✗ |
| `svgPathToMouse` | `SVGPathElement \| null` | The temporary path element used when drawing a wire to follow the mouse. | `null` | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Methods
| Name | Description | Parameters |
| :--: | :---------: | :-------: |
| `toggleInstructions` | Toggles the visibility of the instructions container in the UI. | -
| `handleAllowSimulation` | Toggles simulation mode on or off.<br>Resets the circuit and updates the simulation checkbox and internal flag. | -
| `handleFlipAllGates` | Enables or disables the "truth table" display on all gates,<br>depending on the state of the main switch. | -
| `handleMouseDown` | Handles mouse down interactions on the workspace.<br>- Starts dragging the canvas if the background is clicked.<br>- Cancels in-progress line drawing.<br>- Hides any open gate context menus. | `event: MouseEvent`
| `handleMouseMove` | Handles mouse move events during dragging or line drawing.<br>Updates canvas position or live line path accordingly. | `event: MouseEvent`
| `transformWorkspace` | Applies the current workspace offset and zoom transform to the container. | -
| `handleMouseUp` | Stops dragging behavior. | -
| `handleWheel` | Handles zooming the workspace with the mouse wheel.<br>Clamps zoom between 0.5 and 2.5, and recalculates boundaries. | `event: WheelEvent`
| `handleDragLeave` | Handles mouse leaving the workspace area while dragging.<br>Updates line positions to initial position. | `event: MouseEvent`
| `handleContextMenu` | Prevents the default browser context menu. | `event: MouseEvent`
| `handleDragOver` | Called when a gate is dragged over the workspace.<br>- Moves any connected lines dynamically.<br>- Highlights the trash can icon if hovering over it. | `event: DragEvent`
| `handleDrop` | Handles a drop event on the workspace.<br>- Adds new gates or moves existing ones.<br>- Deletes gates if dropped over the trash icon. | `event: DragEvent`
| `handleDropTrashCan` | Deletes a gate when it is dropped over the trash can. | `event: DragEvent`
| `handleInputChange` | Parses a numeric input field and sets the corresponding property.<br>Defaults to -1 if the value is invalid. | `event: InputEvent`, `propertyName: string`
| `simulateCircuit` | Starts circuit simulation.<br>Calculates outputs from all input gates and propagates through the circuit.<br>Stops simulation if the checkbox is unchecked. | -
| `resetCircuit` | Resets all gates and lines in the circuit to their initial state. | -
| `calculateBoundaries` | Ensures the workspace stays within bounds during dragging or zooming.<br>Clamps `workspaceOffsetX` and `workspaceOffsetY` based on viewport and canvas size. | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Slots
| Name | Description | Content Type |
| :--: | :---------: | :----------: |
| *(default)* | The default slot (currently unused in this widget) | - |

*[Slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) define how the content of the widget is rendered.*

## Custom CSS properties
| Name | Description |
| :--: | :---------: |
| --circuit-background | Background color of the workspace |

*[Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties) offer defined customization of the widget's style.*

## CSS parts
| Name | Description |
| :--: | :---------: |
| gate | Styles individual gate components |
| line | Styles the connecting lines between gates |

*[CSS parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) allow freely styling internals of the widget with CSS.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public events.*


---
*Generated with @webwriter/build@1.8.1*