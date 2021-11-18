import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const GeneratorTour = props => {
  return (
    <View style={styles.generatorTour}>
      <Button title="Add Tours" onPress={() => props.addTours()} />
    </View>
  );
};

const styles = StyleSheet.create({
  generatorTour: {
    backgroundColor: 'tomato',
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default GeneratorTour;
