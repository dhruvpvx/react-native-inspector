import axios from 'axios';
import * as React from 'react';

import { DebuggerButton } from 'react-native-inspector';

export default function App() {
  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1');
  }, []);
  return <DebuggerButton />;
}
