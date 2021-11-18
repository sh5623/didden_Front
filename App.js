import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropsChild from './propsChild';
import Header from './src/header';
import Generator from './src/generator';
import NumList from './src/numlist';
import axios from 'axios';

class App extends Component {
  state = {
    sampleText: 'This is didden',
    sampleBoolean: false,
    sampleNum: 1,
    appName: 'didden',
    random: [],
  };

  inputText = () =>
    this.state.sampleBoolean ? (
      <Text>sampleBoolean is True!</Text>
    ) : (
      <Text>sampleBoolean is False!</Text>
    );

  changeState = () => {
    if (!this.state.sampleBoolean) {
      this.setState({
        sampleText: 'We are didden..!',
        sampleBoolean: true,
      });
    } else {
      this.setState({
        sampleText: 'This is didden!',
        sampleBoolean: false,
      });
    }
  };

  onAdd = () => {
    this.setState(current => ({sampleNum: current.sampleNum + 1}));
  };

  onAddRandomNum = async () => {
    // Get Random Num API
    /* await axios
      .get('https://csrng.net/csrng/csrng.php?min=1&max=100')
      .then(response => {
        if (response.data[0].random) {
          this.setState(current => ({
            random: [...current.random, response.data[0].random],
          }));
        }
      })
      .catch(error => {
        alert(`Fail : ${error.message}`);
      }); */

    const randomNum = Math.floor(Math.random() * 100) + 1;
    this.setState(current => ({
      random: [...current.random, randomNum],
    }));
  };

  onNumDelete = position => {
    const newArray = this.state.random.filter((num, index) => {
      return position != index;
    });

    this.setState({random: newArray});
  };

  render() {
    return (
      <View style={styles.background}>
        <Header name={this.state.appName} />
        <View style={styles.subView}>
          <Text onPress={this.changeState}>{this.state.sampleText}</Text>
          {this.inputText()}
          <Text onPress={this.onAdd}>{this.state.sampleNum}</Text>
          <PropsChild
            sampleText={this.state.sampleText}
            changeState={this.changeState}
          />
        </View>
        <Generator add={this.onAddRandomNum} />
        <NumList nums={this.state.random} delete={this.onNumDelete} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  subView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
