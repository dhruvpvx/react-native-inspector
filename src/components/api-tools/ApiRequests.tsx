import React from 'react';
import { FlatList } from 'react-native';
import { useDebugger } from '../../context';
import { ApiRequestCell } from '../cells';

const ApiRequests = () => {
  const { requests } = useDebugger();

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ApiRequestCell request={item} />}
    />
  );
};

export default ApiRequests;
