import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

function TourList({tours, view}) {
  return tours.map((tour, index) => (
    <TouchableOpacity
      style={styles.tourList}
      key={index}
      onPress={() => view(tour)}>
      <Text>{tour.정보명}</Text>
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  tourList: {
    backgroundColor: '#cecece',
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default TourList;
