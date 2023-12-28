import React, { useMemo } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import DebuggerSheet from './DebuggerSheet';
import { DebuggerProvider, DebuggerContext } from '../../context';
import { AppImages } from '../../resources';
import Tools from '../../tools';
import FloatingButton from './FloatingButton';

type Providers = {
  state?: Record<string, any>;
};

const DebuggerButton = ({ providers = {} }: { providers?: Providers }) => {
  const [visible, setVisible] = React.useState(false);

  const tools = useMemo(() => {
    const allTools = [
      {
        title: 'Redux Store',
        key: 'redux-store',
        component: Tools.ReduxState,
        provider: providers.state,
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
  }, [providers]);

  return (
    <DebuggerProvider {...providers} tools={tools}>
      <DebuggerContext.Consumer>
        {(props) => (
          <FloatingButton
            onPress={() => setVisible(true)}
            disabled={visible}
            style={[styles.button, { backgroundColor: props.colors.PRIMARY }]}
          >
            <Image source={AppImages.debugIcon} style={styles.debugIcon} />
            <DebuggerSheet
              tools={props.tools}
              visible={visible}
              close={() => setVisible(false)}
            />
          </FloatingButton>
        )}
      </DebuggerContext.Consumer>
    </DebuggerProvider>
  );
};

export default DebuggerButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    borderRadius: 50,
    width: 50,
    aspectRatio: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  debugIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
