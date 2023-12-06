import React, { type PropsWithChildren, useMemo } from 'react';
import DebuggerContext, { Colors } from './DebuggerContext';
import { useRequests } from '../hooks';
import Tools from '../tools';

interface Props {
  colors?: Record<string, string>;
  axios?: any;
  state?: Record<string, any>;
}

const DebuggerProvider = ({
  colors,
  axios,
  children,
  state,
}: PropsWithChildren<Props>) => {
  const requests = useRequests(axios);

  const tools = useMemo(() => {
    const allTools = [
      {
        title: 'Api Requests',
        key: 'api-requests',
        component: Tools.ApiRequests,
        provider: axios,
      },
      {
        title: 'Redux Store',
        key: 'redux-store',
        component: Tools.ReduxState,
        provider: state,
      },
    ] as const;
    return allTools.filter((tool) => !!tool.provider);
  }, [axios, state]);

  return (
    <DebuggerContext.Provider
      value={{ colors: { ...Colors, ...colors }, requests, state, tools }}
    >
      {children}
    </DebuggerContext.Provider>
  );
};

export default DebuggerProvider;
