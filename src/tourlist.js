import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TourList({tours}) {
  const navigation = useNavigation();
  return tours.map((tour, index) => (
    <TouchableOpacity
      style={styles.tourList}
      key={index}
      onPress={() => {
        navigation.navigate('generatorTourDetail', {
          title: tour.정보명,
          area: tour.지역,
          address: tour.주소,
          qna: tour.문의및안내,
        });
      }}>
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
