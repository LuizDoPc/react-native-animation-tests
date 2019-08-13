/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { View, Animated, Text } from "react-native";

const Box = ({ backgroundColor = "#3cae6f", scale = 1 }) => (
  <Animated.View
    style={[
      {
        width: 100,
        height: 100,
        backgroundColor,
        transform: [{ scale }]
      }
    ]}
  />
);

const usePulse = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2 }),
      Animated.timing(scale, { toValue: 0.8 })
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};

const App = ({ count }) => {
  const scale = usePulse();
  const scale2 = usePulse(750);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Box scale={scale2} backgroundColor="#1f9cb8" />
      <Text>{count}</Text>
      <Box scale={scale} />
    </View>
  );
};

export default class Wrapper extends React.Component {
  state = { count: 1 };

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        count: state.count + 1
      }));
    }, 500);
  }

  render() {
    return <App count={this.state.count} />;
  }
}
