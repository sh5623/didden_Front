import React, {useRef} from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement, incrementByAmount, setByAmount, selectCount} from '../store/counterReducer';

function Increase() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const inputNums = useRef();

  const onChangeCount = event => {
    let newText = '';
    let numbers = '0123456789';

    if (event === '') {
      dispatch(setByAmount(0));
      inputNums.current.setNativeProps({text: ''});
      return;
    }

    if (Number(event) > 100) {
      alert('100을 넘을 수 없습니다.');
      return;
    }

    for (let i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText = newText + event[i];
      } else {
        alert('please enter numbers only');
        //inputNums.current.setNativeProps({text: ''});
        return;
      }
    }

    dispatch(setByAmount(Number(newText)));
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="increment"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <Button
        title="decrement"
        onPress={() => {
          dispatch(decrement());
        }}
      />
      <Button
        title="increment5"
        onPress={() => {
          dispatch(incrementByAmount(5));
        }}
      />
      <TextInput
        value={count.toString()}
        keyboardType="number-pad"
        onChangeText={onChangeCount}
        style={styles.input}
        ref={inputNums}
      />
      <Text style={{fontSize: 25, marginTop: 20}}>Count is {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 230,
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default Increase;
