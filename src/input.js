import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class Input extends Component {
  state = {
    myTextInput: '',
  };

  onChangeInput = event => {
    this.setState({
      myTextInput: event,
    });
  };

  render() {
    return (
      <View style={styles.mainView}>
        <TextInput
          value={this.state.myTextInput}
          style={styles.input}
          onChangeText={this.onChangeInput}
          autoCapitalize={'none'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    marginTop: 20,
  },
});

export default Input;
