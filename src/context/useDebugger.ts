import { useContext } from 'react';
import DebuggerContext from './DebuggerContext';

const useDebugger = () => {
  const context = useContext(DebuggerContext);
  if (context === undefined) {
    throw new Error('useDebugger must be used within a DebuggerProvider');
  }
  return context;
};

export default useDebugger;
