import React from 'react';
import { ScrollView } from 'react-native';
import { DataTransformer } from '../common';
import { useDebugger } from '../../context';

const ReduxState = () => {
  const { state } = useDebugger();
  return (
    <ScrollView>
      <DataTransformer value={state || {}} />
    </ScrollView>
  );
};

export default ReduxState;
