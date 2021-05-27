import React, { useRef, useEffect } from "react";
import { View, TextInput, Animated, Easing } from "react-native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedCountup({
  value = 0, // Countup value
  duration = 1000, // Animation duration
  delay = 0, // Delay to start animation
  symbol = "", // units: deg, km/hr, etc.
  customStyle = {},
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();

  const countupAnimation = (toValue) => {
    return Animated.timing(animatedValue, {
      delay,
      toValue,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    countupAnimation(value);
    animatedValue.addListener((val) => {
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(val.value)}${symbol}`
        });
      }
    }, [value]);

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [value]);

  return (
    <View>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={`0${symbol}`}
        style={customStyle}
      />
    </View>
  );
}

export default AnimatedCountup;
