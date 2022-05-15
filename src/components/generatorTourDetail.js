import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, ActivityIndicator, ScrollView, Alert, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {selectTokenAcc} from './store/tokenReducer';
import TourList from './tourlist';
import axios from 'axios';

function GeneratorTourDetail() {
  const route = useRoute();
  const [title, setTitle] = useState(route.params.title);
  const [area, setArea] = useState(route.params.area);
  const [address, setAddress] = useState(route.params.address);
  const [qna, setQna] = useState(route.params.qna);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>지역:{area}</Text>
      <Text>주소:{address}</Text>
      <Text>문의 및 안내:{qna}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default GeneratorTourDetail;
