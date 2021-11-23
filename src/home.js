import 'react-native-gesture-handler';
import React, {Component} from 'react';
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

class Home extends Component {
  state = {
    appName: 'didden',
    myTextInput: '',
    alphabet: [],
  };

  onChangeInput = event => {
    this.setState({
      myTextInput: event,
    });
  };

  onAddTextInput = () => {
    if (this.state.myTextInput === '') {
      Alert.alert('didden', '내용을 입력해 주세요!');
      return;
    }
    this.setState(current => ({
      myTextInput: '',
      alphabet: [...current.alphabet, current.myTextInput],
    }));
  };

  render() {
    return (
      <View style={styles.home}>
        <Header name={this.state.appName} />
        <Button
          title="Go Generator"
          onPress={() => {
            this.props.navigation.navigate('generator');
          }}
        />
        <Button
          title="Go GeneratorTour"
          onPress={() => {
            this.props.navigation.navigate('generatorTour');
          }}
        />
        <Button
          title="Go Modal"
          onPress={() => {
            this.props.navigation.navigate('modal');
          }}
        />
        <Button
          title="Go Picker"
          onPress={() => {
            this.props.navigation.navigate('picker');
          }}
        />

        <ScrollView style={{width: '100%', maxHeight: 300}}>
          <TextInput
            value={this.state.myTextInput}
            style={styles.input}
            onChangeText={this.onChangeInput}
            autoCapitalize={'none'}
          />
          <Button title="Add Text Input" onPress={this.onAddTextInput} />
          <ScrollView style={{width: '100%'}}>
            {this.state.alphabet.map((word, index) => (
              <Text style={styles.mainText} key={index}>
                {word}
              </Text>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
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
