# Logic,Circuit (`@webwriter/logic-circuit@1.1.3`)
[License: MIT](LICENSE) | Version: 1.1.3

Create and simulate circuits with logic gates (AND, OR, XOR, etc.).

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Halfadder | @webwriter/logic-circuit/snippets/halfadder.html |
| RS FlipFlop | @webwriter/logic-circuit/snippets/RS-FlipFlop.html |



## `LogicCircuit` (`<webwriter-logic-circuit>`)
A WebWriter widget for creating and simulating digital logic circuits.

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
| `localize` | - | - | `LOCALIZE` | ✗ |
| `LogicCircuit.scopedElements` | - | - | - | ✗ |
| `zoom` (`zoom`) | `number` | Current zoom level of the workspace. | `1` | ✗ |
| `simulate` (`simulate`) | `boolean` | Whether the circuit simulation is currently active. | `true` | ✗ |
| `simulationDelay` (`simulationDelay`) | `number` | Delay in milliseconds between simulation steps. | `500` | ✓ |
| `allowSimulation` (`allowSimulation`) | `number` | Whether simulation controls are enabled. | `1` | ✓ |
| `notGateAllowed` (`notGateAllowed`) | `number` | Maximum number of NOT gates allowed in the circuit. | `-1` | ✓ |
| `andGateAllowed` (`andGateAllowed`) | `number` | Maximum number of AND gates allowed in the circuit. | `-1` | ✓ |
| `orGateAllowed` (`orGateAllowed`) | `number` | Maximum number of OR gates allowed in the circuit. | `-1` | ✓ |
| `nandGateAllowed` (`nandGateAllowed`) | `number` | Maximum number of NAND gates allowed in the circuit. | `-1` | ✓ |
| `norGateAllowed` (`norGateAllowed`) | `number` | Maximum number of NOR gates allowed in the circuit. | `-1` | ✓ |
| `xnorGateAllowed` (`xnorGateAllowed`) | `number` | Maximum number of XNOR gates allowed in the circuit. | `-1` | ✓ |
| `xorGateAllowed` (`xorGateAllowed`) | `number` | Maximum number of XOR gates allowed in the circuit. | `-1` | ✓ |
| `splitterAllowed` (`splitterAllowed`) | `number` | Maximum number of splitter gates allowed in the circuit. | `-1` | ✓ |
| `getGateElements` | - | Public getter for accessing gate elements array. | - | ✗ |
| `getLineElements` | - | Public getter for accessing line elements array. | - | ✗ |
| `svgPathToMouse` | `SVGPathElement \| null` | - | `null` | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Methods
| Name | Description | Parameters |
| :--: | :---------: | :-------: |
| `toggleInstructions` | Toggles the visibility of the instruction panel. | -
| `handleAllowSimulation` | - | -
| `handleFlipAllGates` | - | -
| `handleMouseDown` | - | `event`
| `handleMouseMove` | - | `event`
| `transformWorkspace` | - | -
| `handleMouseUp` | - | -
| `handleWheel` | - | `event`
| `handleMouseOut` | - | `event`
| `handleContextMenu` | - | `event`
| `handleDragOver` | - | `event`
| `handleDrop` | Handles drop events when gates are dropped on the workspace or trash can. | `event: DragEvent`
| `handleDropTrashCan` | Handles deletion of gates when dropped on the trash can. | `event: DragEvent`
| `handleInputChange` | Handles changes to input fields in the options panel. | `event: Event`, `propertyName: string`
| `simulateCircuit` | Starts or stops circuit simulation based on the simulation checkbox state. | -
| `resetCircuit` | Resets all gates and connections to their default non-simulated state. | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Slots
| Name | Description | Content Type |
| :--: | :---------: | :----------: |
| *(default)* | No slots available - content is generated programmatically | - |

*[Slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) define how the content of the widget is rendered.*

## Events
| Name | Description |
| :--: | :---------: |
| circuit-changed | Dispatched when the circuit structure changes |
| simulation-state-changed | Dispatched when simulation is started/stopped |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Custom CSS properties
| Name | Description |
| :--: | :---------: |
| --logic-circuit-background | Background color of the workspace (default: #f5f5f5) |
| --logic-circuit-gate-color | Default color for logic gates (default: #ffffff) |
| --logic-circuit-connection-color | Color for connections between gates (default: #000000) |

*[Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties) offer defined customization of the widget's style.*

## CSS parts
| Name | Description |
| :--: | :---------: |
| workspace | The main workspace area where gates are placed |
| sidebar | The sidebar containing available gates |
| options | The options panel for controlling simulation and gate limits |

*[CSS parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) allow freely styling internals of the widget with CSS.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*




---
*Generated with @webwriter/build@1.8.1*