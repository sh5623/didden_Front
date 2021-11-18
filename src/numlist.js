import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const NumList = props => {
  return props.nums.map((num, index) => (
    <TouchableOpacity
      style={styles.numList}
      key={index}
      onPress={() => props.delete(index)}>
      <Text>{num}</Text>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  numList: {
    backgroundColor: '#cecece',
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default NumList;
