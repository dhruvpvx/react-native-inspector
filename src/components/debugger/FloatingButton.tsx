import React from 'react';
import { Animated, PanResponder, type ViewProps } from 'react-native';
import { utility } from '../../helpers';

interface TranslatedValue extends Animated.Value {
  _value: number;
}
interface TranslateValue extends Animated.ValueXY {
  x: TranslatedValue;
  y: TranslatedValue;
}

const FloatingButton = (
  props: ViewProps & { onPress: () => void; disabled: boolean }
) => {
  const translate = React.useRef<TranslateValue>(
    new Animated.ValueXY({ x: 0, y: 0 }) as TranslateValue
  ).current;

  const viewRef = React.useRef(null);
  const start = React.useRef({ x: 0, y: 0 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !props.disabled,
    onStartShouldSetPanResponderCapture: () => !props.disabled, // Add this line
    onPanResponderGrant: () => {
      start.current = {
        x: translate.x._value,
        y: translate.y._value,
      };
      translate.setOffset({
        x: translate.x._value,
        y: translate.y._value,
      });
      translate.setValue({ x: 0, y: 0 }); // Add this line
    },
    onPanResponderMove: Animated.event(
      [null, { dx: translate.x, dy: translate.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e) => {
      translate.flattenOffset();
      const width = utility.deviceWidth;
      const height = utility.deviceHeight;
      const isLeft = e.nativeEvent.pageX < width / 2;
      const pageY = e.nativeEvent.pageY;
      const topThreshold = 100;
      const bottomThreshold = height - 100;
      let y = translate.y._value;

      if (pageY < topThreshold) {
        y = -(height - 250);
      } else if (pageY > bottomThreshold) {
        y = 0;
      }

      const x = isLeft ? -(width - 100) : 0;

      Animated.spring(translate, {
        toValue: { x, y },
        useNativeDriver: false,
      }).start();

      const isChanged = x !== start.current.x || y !== start.current.y;
      if (!isChanged) {
        props.onPress();
      }
    },
  });

  return (
    <Animated.View
      ref={viewRef}
      {...panResponder.panHandlers}
      style={[
        props.style,
        {
          transform: [{ translateX: translate.x }, { translateY: translate.y }],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

export default FloatingButton;
