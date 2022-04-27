import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, Animated} from 'react-native';

function AnimationComponent() {
  const [lavenderSquare, setLavenderSquare] = useState(new Animated.Value(1));
  const [redSquare, setRedSquare] = useState(new Animated.Value(1));
  const [greenSquare, setGreenSquare] = useState(new Animated.ValueXY(0, 0));
  const [blueSquare, setBlueSquare] = useState(new Animated.ValueXY(0, 0));

  const runAnimation = () => {
    Animated.sequence([
      Animated.timing(lavenderSquare, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(redSquare, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.spring(greenSquare, {
          toValue: {x: 200, y: 0},
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.spring(blueSquare, {
          toValue: {x: 200, y: 400},
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const resetAnimation = () => {
    lavenderSquare.setValue(1);
    redSquare.setValue(1);
    greenSquare.setValue({x: 0, y: 0});
    blueSquare.setValue({x: 0, y: 0});
  };

  //   useEffect(() => {
  //     Animated.timing(mySquare, {
  //       toValue: {x: 50, y: 300},
  //       duration: 2000,
  //       delay: 1500,
  //       easing: Easing.elastic(3),
  //       useNativeDriver: false,
  //     }).start();
  //   }, []);

  return (
    <View>
      <Animated.View
        style={{
          opacity: lavenderSquare,
          transform: [
            {
              translateX: lavenderSquare.interpolate({
                inputRange: [0, 0.5, 1], // inputRange는 useState와 runAnimation등에서 사용한 Animated property를 정의, 단 숫자가 낮은값 부터 작성 => 투명도 1->0 이지만 [0,1]
                outputRange: [300, 150, 0], // outputRange는 다른 Animated property를 정의, 단 inputRange에 해당하는 값과 매핑 => 투명도가 0일때 top의 값, 투명도가 1일떄 top의 값
              }),
            },
            {
              rotateX: lavenderSquare.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '180deg', '360deg'],
              }),
            },
          ],
        }}>
        <View style={styles.lavenderSquare}></View>
      </Animated.View>
      <Animated.View style={{opacity: redSquare}}>
        <View style={styles.redSquare}></View>
      </Animated.View>
      <Animated.View style={greenSquare.getLayout()}>
        <View style={styles.greenSquare}></View>
      </Animated.View>
      <Animated.View style={blueSquare.getLayout()}>
        <View style={styles.blueSquare}></View>
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: lavenderSquare.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [30, 20, 10],
          }),
          color: lavenderSquare.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['purple', 'lavender', 'white'],
          }),
        }}>
        <Text>Animation Effects</Text>
      </Animated.Text>

      <Button title="Animation Start" onPress={this.runAnimation} />
      <Button title="Animation Reset" onPress={this.resetAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  lavenderSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'lavender',
  },
  redSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  greenSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  blueSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default AnimationComponent;
