import React from 'react';

export const Colors = {
  PRIMARY: '#EA6F54',
  ERROR: '#D64525',
  SUCCESS: '#319E2E',
  GREY: '#E3E3E3',
  WHITE: '#FFFFFF',
  TEXT_BLACK: '#333333',
  RED_STROKE: '#D6492B',
  GREEN_BOLD: '#62A336',
};

type Debuggers = 'api-requests' | 'redux-store';
export interface DebuggerInterface {
  colors: typeof Colors | Record<string, string>;
  requests: ApiRequest[];
  state?: Record<string, any>;
  axios?: any;
  tools: {
    title: string;
    key: Debuggers;
    component: React.FC;
  }[];
}

const DebuggerContext = React.createContext<DebuggerInterface>({
  colors: Colors,
  requests: [],
  tools: [],
});

export default DebuggerContext;
