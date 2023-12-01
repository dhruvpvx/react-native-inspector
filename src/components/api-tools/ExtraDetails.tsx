import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDebugger } from '../../context';
import { DataTransformer } from '../common';

const ExtraDetails = ({ heading_cells, data_cells }: ExtraDetailsProps) => {
  const [visible, setVisible] = React.useState('');
  const { colors } = useDebugger();

  const header = () => {
    return (
      <View style={styles.row}>
        {Object.entries(heading_cells).map(([key, value]) => {
          return (
            <View key={key} style={styles.cell}>
              <Text style={styles.key}>{key}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const detailsButtons = () => {
    return data_cells.map(({ key, label }) => {
      const active = visible === key;
      const onPress = () => {
        setVisible((prev) => {
          if (prev === key) {
            return '';
          } else {
            return key;
          }
        });
      };

      return (
        <Pressable
          key={key}
          onPress={onPress}
          style={[
            styles.rowCell,
            { backgroundColor: active ? colors.PRIMARY : colors.GREY },
          ]}
        >
          <Text
            style={[
              styles.key,
              { color: active ? colors.WHITE : colors.TEXT_BLACK },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      );
    });
  };

  return (
    <View>
      {header()}
      <View style={styles.cellRow}>{detailsButtons()}</View>
      {data_cells.map(({ key, data }) => {
        if (key === visible) {
          return <DataTransformer key={key} value={data} />;
        } else {
          return null;
        }
      })}
    </View>
  );
};

export default ExtraDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cellRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    gap: 10,
  },
  cell: {
    flex: 1,
  },
  rowCell: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  key: {
    textAlign: 'center',
    fontSize: 10,
  },
  value: {
    textAlign: 'center',
    fontSize: 12,
  },
});
