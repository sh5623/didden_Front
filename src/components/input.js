import React, {useState} from 'react';
import {ScrollView, TextInput, Button, Text, Alert, StyleSheet} from 'react-native';

function InputComponent() {
  const [myTextInput, setMyTextInput] = useState('');
  const [alphabet, setAlphabet] = useState([]);

  const nChangeInput = event => {
    setMyTextInput(event);
  };

  const onAddTextInput = () => {
    if (myTextInput === '') {
      Alert.alert('didden', '내용을 입력해 주세요!');
      return;
    }

    setMyTextInput('');
    setAlphabet(current => [...alphabet, myTextInput]);
  };

  return (
    <ScrollView style={{width: '100%', maxHeight: 300}}>
      <TextInput value={myTextInput} style={styles.input} onChangeText={this.onChangeInput} autoCapitalize={'none'} />
      <Button title="Add Text Input" onPress={this.onAddTextInput} />
      <ScrollView style={{width: '100%'}}>
        {alphabet.map((word, index) => (
          <Text style={styles.mainText} key={index}>
            {word}
          </Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'lavender',
    marginTop: 20,
  },
  mainText: {
    backgroundColor: 'lavender',
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default InputComponent;
