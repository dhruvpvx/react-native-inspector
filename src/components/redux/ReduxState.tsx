import React from 'react';
import { ScrollView } from 'react-native';
import { connect, type ConnectedProps } from 'react-redux';
import { DataTransformer } from '../common';

type RootState = {
  [key: string]: any;
};

type ReduxStateProps = {
  state: RootState | null;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({ state });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const ReduxState: React.FC<Props> = ({ state }) => {
  return (
    <ScrollView>
      <DataTransformer value={state || {}} />
    </ScrollView>
  );
};

export default connector(ReduxState);
