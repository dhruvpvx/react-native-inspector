import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppModal } from '../modal';
import { Text } from 'react-native';
import { useDebugger } from '../../context';

interface Props {
  visible: boolean;
  close: () => void;
  tools: {
    title: string;
    key: string;
    component: React.FC;
  }[];
}

const DebuggerSheet = (props: Props) => {
  const [active, setActive] = React.useState(props.tools[0]?.key || '');
  const { colors } = useDebugger();
  return (
    <AppModal {...props} style={styles.modal} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          {props.tools.map((sheet) => (
            <Pressable
              key={sheet.key}
              style={styles.headingTab}
              onPress={() => setActive(sheet.key)}
            >
              <Text style={styles.heading}>{sheet.title}</Text>
              {sheet.key === active && (
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: colors.PRIMARY },
                  ]}
                />
              )}
            </Pressable>
          ))}
        </View>
        {props.tools.map((sheet) => {
          const selected = sheet.key === active;
          const Component = sheet.component;
          return selected && <Component key={sheet.key} />;
        })}
      </View>
    </AppModal>
  );
};

export default DebuggerSheet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  headingTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  indicator: {
    width: '40%',
    height: 2,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
});
