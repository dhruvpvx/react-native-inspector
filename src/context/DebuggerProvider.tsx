import React, { type PropsWithChildren } from 'react';
import DebuggerContext, { Colors } from './DebuggerContext';
import { useRequests } from '../hooks';

interface Props {
  colors?: Record<string, string>;
  state?: Record<string, any>;
  tools: React.ComponentProps<
    typeof DebuggerContext.Provider
  >['value']['tools'];
}

const DebuggerProvider = ({
  colors,
  children,
  state,
  tools,
}: PropsWithChildren<Props>) => {
  const requests = useRequests();

  return (
    <DebuggerContext.Provider
      value={{ colors: { ...Colors, ...colors }, requests, state, tools }}
    >
      {children}
    </DebuggerContext.Provider>
  );
};

export default DebuggerProvider;
