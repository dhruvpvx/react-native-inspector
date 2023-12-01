import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppImages, Fonts } from '../../resources';
import { useDebugger } from '../../context';

const DataTransformer = ({ value }: { value: DataCellData }) => {
  return (
    <>
      {value ? (
        Object.entries(value).map(([key, dataValue]) => {
          return <DataKeyValue key={key} dataKey={key} dataValue={dataValue} />;
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default DataTransformer;

const styles = StyleSheet.create({
  transformRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    paddingRight: 100,
  },
  nestedData: {
    paddingLeft: 20,
  },
});

const DataKeyValue = ({
  dataValue,
  dataKey,
}: {
  dataValue: DataCellData;
  dataKey: string;
}) => {
  const [visible, setVisible] = React.useState(false);
  const isExpandable =
    (Array.isArray(dataValue) && dataValue.length > 0) ||
    (typeof dataValue === 'object' &&
      dataValue !== null &&
      Object.keys(dataValue).length > 0);

  const { colors } = useDebugger();

  const renderValue = () => {
    if (Array.isArray(dataValue)) {
      return `[ ] (${dataValue.length})`;
    } else if (dataValue === null) {
      return 'null';
    } else if (typeof dataValue === 'object') {
      return '{ }';
    } else {
      return `${dataValue}`;
    }
  };

  const valueColor = () => {
    switch (typeof dataValue) {
      case 'number':
        return colors.RED_STROKE;
      case 'object':
        return colors.GREEN_BOLD;
      default:
        return colors.TEXT_BLACK;
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => setVisible((prev) => !prev)}
        disabled={!isExpandable}
        style={styles.transformRow}
      >
        {isExpandable && (
          <Image
            source={AppImages.arrowDown}
            style={{ transform: [{ rotate: visible ? '0deg' : '-90deg' }] }}
          />
        )}
        <Text style={Fonts.regular(10, 'royalblue')}>{dataKey + ': '}</Text>
        <Text style={{ color: valueColor() }}>{renderValue()}</Text>
      </Pressable>
      <View style={styles.nestedData}>
        {visible && <DataTransformer value={dataValue} />}
      </View>
    </View>
  );
};
