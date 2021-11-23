import React, {Component} from 'react';
import {View, StyleSheet, Button, ScrollView} from 'react-native';
import NumList from './numlist';

class Generator extends Component {
  state = {
    random: [],
  };

  onAddRandomNum = async () => {
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
      <View style={styles.generator}>
        <Button
          title="Add Number"
          onPress={() => {
            this.onAddRandomNum();
          }}
        />
        <ScrollView style={{width: '100%'}} bounces={true}>
          <NumList nums={this.state.random} delete={this.onNumDelete} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  generator: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default Generator;
