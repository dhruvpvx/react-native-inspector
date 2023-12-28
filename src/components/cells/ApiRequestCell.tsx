import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDebugger } from '../../context';
import { AppImages, Fonts } from '../../resources';
import ExtraDetails from '../api-tools/ExtraDetails';

const ApiRequestCell = ({ request }: ApiRequestProps) => {
  const [open, setOpen] = React.useState(false);
  const isSuccess = !!request.success;
  const { colors } = useDebugger();

  const renderChip = () => {
    const backgroundColor = isSuccess ? colors.SUCCESS : colors.ERROR;
    return (
      <View style={[styles.chip, { backgroundColor }]}>
        <Text style={Fonts.semiBold(10, 'white')}>
          {isSuccess ? 'success' : 'error'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)} style={styles.cell}>
        {renderChip()}
        <Text style={Fonts.regular(12)}>
          <Text style={Fonts.semiBold(12)}>
            {request.method?.toUpperCase()}
          </Text>{' '}
          {' ' + request.url}
        </Text>
        <View style={styles.toggle}>
          <Image
            source={AppImages.arrowDown}
            style={{ transform: [{ rotate: open ? '0deg' : '-90deg' }] }}
          />
        </View>
      </Pressable>
      {open && (
        <View>
          <Text numberOfLines={1} style={Fonts.regular(10, 'grey')}>
            {request.full_url}
          </Text>
          <ExtraDetails {...request} />
        </View>
      )}
    </View>
  );
};

export default ApiRequestCell;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  cell: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  chip: {
    paddingHorizontal: 3,
    borderRadius: 5,
    minWidth: 45,
    height: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  toggle: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});
