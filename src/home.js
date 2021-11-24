import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import Header from '../src/header';

function Home({navigation}) {
  const [appName, setAppName] = useState('.didden');
  const [myTextInput, setMyTextInput] = useState('');
  const [alphabet, setAlphabet] = useState([]);

  onChangeInput = event => {
    setMyTextInput(event);
  };

  onAddTextInput = () => {
    if (myTextInput === '') {
      Alert.alert('didden', '내용을 입력해 주세요!');
      return;
    }

    setMyTextInput('');
    setAlphabet(current => [...alphabet, myTextInput]);
  };

  return (
    <View style={styles.home}>
      <Header name={appName} />
      <Button
        title="Go Generator"
        onPress={() => {
          navigation.navigate('generator');
        }}
      />
      <Button
        title="Go GeneratorTour"
        onPress={() => {
          navigation.navigate('generatorTour');
        }}
      />
      <Button
        title="Go Modal"
        onPress={() => {
          navigation.navigate('modal', {
            appName: appName,
          });
        }}
      />
      <Button
        title="Go Picker"
        onPress={() => {
          navigation.navigate('picker', {
            value: 50,
            country: 'korea',
          });
        }}
      />

      <ScrollView style={{width: '100%', maxHeight: 300}}>
        <TextInput
          value={myTextInput}
          style={styles.input}
          onChangeText={this.onChangeInput}
          autoCapitalize={'none'}
        />
        <Button title="Add Text Input" onPress={this.onAddTextInput} />
        <ScrollView style={{width: '100%'}}>
          {alphabet.map((word, index) => (
            <Text style={styles.mainText} key={index}>
              {word}
            </Text>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    alignItems: 'center',
  },
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

export default Home;
