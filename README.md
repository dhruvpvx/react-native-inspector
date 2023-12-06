# react-native-inspector

This is used to inspect api requests and redux state with in the device ui

## Installation

```sh
npm install react-native-inspector

yarn add react-native-inspector
```

## Usage

```js
import { DebuggerButton } from 'react-native-inspector';
import axios from 'axios'
// ...
// add this in root of your app with in the redux provider context
<DebuggerButton providers={{axios}} />;
```
### Props


| Name                       | Type                                                                                      | Description                            
| :------------------------- | :---------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `providers`                     | `{axios, state}`                                                                                     | **Required** axios to add interceper and root state of redux                                                                                                                                                                                              |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
