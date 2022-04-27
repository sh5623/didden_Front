import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

function NumList({nums, deleteFn}) {
  return nums.map((num, index) => (
    <TouchableOpacity style={styles.numList} key={index} onPress={() => deleteFn(index)}>
      <Text>{num}</Text>
    </TouchableOpacity>
  ));
}

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
