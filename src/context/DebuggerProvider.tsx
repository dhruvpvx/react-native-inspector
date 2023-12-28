import React, { type PropsWithChildren, useMemo } from 'react';
import DebuggerContext, { Colors } from './DebuggerContext';
import { useRequests } from '../hooks';
import Tools from '../tools';

interface Props {
  colors?: Record<string, string>;
  state?: Record<string, any>;
}

const DebuggerProvider = ({
  colors,
  children,
  state,
}: PropsWithChildren<Props>) => {
  const requests = useRequests();

  const tools = useMemo(() => {
    const allTools = [
      {
        title: 'Redux Store',
        key: 'redux-store',
        component: Tools.ReduxState,
        provider: state,
      },
    ] as const;
    return [
      {
        title: 'Api Requests',
        key: 'api-requests' as const,
        component: Tools.ApiRequests,
      },
      ...allTools.filter((tool) => !!tool.provider),
    ];
  }, [state]);

  return (
    <DebuggerContext.Provider
      value={{ colors: { ...Colors, ...colors }, requests, state, tools }}
    >
      {children}
    </DebuggerContext.Provider>
  );
};

export default DebuggerProvider;
