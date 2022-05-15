import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TourList({tours}) {
  const navigation = useNavigation();
  return tours.map((tour, index) => (
    <TouchableOpacity
      style={styles.tourList}
      key={index}
      onPress={() => {
        navigation.navigate('generatorTourDetail', {
          contentId: tour.contentid,
          title: tour.title,
          area: tour.addr2,
          address: tour.addr1,
          img: tour.firstimage
        });
      }}>
      {/* <Text>{tour.title}</Text> */}
      <View style={styles.container}>
        <Image source={{uri: tour.firstimage}} style={styles.image} />
      </View>
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  // tourList: {
  //   backgroundColor: '#cecece',
  //   marginTop: 10,
  //   alignItems: 'center',
  //   padding: 5,
  //   width: '100%',
  // },
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    height: 160,
    width: 160,
    resizeMode: 'cover',
    // resizeMode: 'stretch',
    borderRadius: 20,
  }
});

export default TourList;