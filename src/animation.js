import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Animated, Easing} from 'react-native';

function AnimationComponent() {
  const [mySquare, setMySquare] = useState(new Animated.Value(1));

  runAnimation = () => {
    Animated.timing(mySquare, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
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
          opacity: mySquare,
          transform: [
            {
              translateX: mySquare.interpolate({
                inputRange: [0, 0.5, 1], // inputRange는 useState와 runAnimation등에서 사용한 Animated property를 정의, 단 숫자가 낮은값 부터 작성 => 투명도 1->0 이지만 [0,1]
                outputRange: [300, 150, 0], // outputRange는 다른 Animated property를 정의, 단 inputRange에 해당하는 값과 매핑 => 투명도가 0일때 top의 값, 투명도가 1일떄 top의 값
              }),
            },
            {
              rotateX: mySquare.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '180deg', '360deg'],
              }),
            },
          ],
        }}>
        <View style={styles.square}></View>
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: mySquare.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [30, 20, 10],
          }),
          color: mySquare.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['purple', 'lavender', 'white'],
          }),
        }}>
        <Text>Animation Effects</Text>
      </Animated.Text>

      <Button title="Animation Start" onPress={this.runAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'lavender',
  },
});

export default AnimationComponent;
