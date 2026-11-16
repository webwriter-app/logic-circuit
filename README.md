# Logic Circuit (`@webwriter/logic-circuit@2.0.0`)
[License: MIT](LICENSE) | Version: 2.0.0

Create and simulate circuits with logic gates (AND, OR, XOR, etc.).

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Halfadder | `@webwriter/logic-circuit/snippets/halfadder.html` |
| RS FlipFlop | `@webwriter/logic-circuit/snippets/RS-FlipFlop.html` |



## `WebwriterLogicCircuit` (`<webwriter-logic-circuit>`)


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
| `WebwriterLogicCircuit.shadowRootOptions` | `object` | - | `{ ...LitElementWw.shadowRootOptions, delegatesFocus: true, }` | ✗ |
| `WebwriterLogicCircuit.scopedElements` | `Record<string, CustomElementConstructor>` | The scene draws with WebGL where the browser has it and with SVG elsewhere. | `{ ...sceneElements, 'ww-scene': webglAvailable() ? PixiScene : Scene, 'sl-button': SlButton, 'sl-icon': SlIcon, 'sl-tooltip': SlTooltip, 'sl-popup': SlPopup, 'sl-switch': SlSwitch, 'sl-menu': SlMenu, 'sl-menu-item': SlMenuItem, 'sl-checkbox': SlCheckbox, }` | ✗ |
| `WebwriterLogicCircuit.actions` | `object` | - | `{ deleteSelection: { label: (widget: Texts) => widget.msg("Delete"), shortcut: ["Delete", "Backspace"], hidden: true }, }` | ✗ |
| `localize` | - | i18n handler for the widget. | - | ✗ |
| `msg` | - | - | - | ✗ |
| `selection` | `ReadonlySet<string>` | The keys of the selected gates and wires. | `new Set()` | ✗ |
| `signals` | `Signals` | The signals at the ports while the circuit simulates. | `new Map()` | ✗ |
| `on` | `ReadonlySet<string>` | The input gates that are switched on. | `new Set()` | ✗ |
| `tables` | `ReadonlySet<string>` | The gates that show their truth table. | `new Set()` | ✗ |
| `simulate` | `boolean` | - | `true` | ✗ |
| `allTables` | `boolean` | - | `false` | ✗ |
| `instructionsOpen` | `boolean` | - | `false` | ✗ |
| `menu` | `{ gate: Gate; x: number; y: number } \| null` | - | `null` | ✗ |
| `carried` | `{ type: GateType; x: number; y: number; overWorkspace: boolean } \| null` | The gate that is dragged from the sidebar, under the pointer. | `null` | ✗ |
| `overTrash` | `boolean` | - | `false` | ✗ |
| `WebwriterLogicCircuit.settings` | - | - | `declarations` | ✗ |
| `settingsCore` | - | - | `new SettingsCore(this, { ...options, root: () => this.renderRoot, rendered: () => this.updateComplete })` | ✗ |
| `options` | - | - | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Methods
| Name | Description | Parameters |
| :--: | :---------: | :-------: |
| `deleteSelection` | Widget action and key: removes the selected gates and wires. | -
| `finalize` | - | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Slots
| Name | Description | Content Type |
| :--: | :---------: | :----------: |
| `data` | Direct application/json block storing gates and connections. | - |

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
*Generated with @webwriter/build@1.14.0*