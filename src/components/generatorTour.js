import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, ActivityIndicator, ScrollView, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTokenAcc} from '../store/tokenReducer';
import TourList from './tourlist';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {current} from '@reduxjs/toolkit';

function GeneratorTour() {
  const reactNavigation = useNavigation();
  const [tours, setTours] = useState([]);
  const [tourNum, setTourNum] = useState(0);
  const [activityLoading, setActivityLoading] = useState(false);
  const tokenAcc = useSelector(selectTokenAcc);

  useEffect(() => {
    if (tokenAcc === '') {
      Alert.alert('didden', '로그인이 필요합니다!');
      reactNavigation.navigate('login');
      return;
    }
  }, []);

  onAddTours = async () => {
    setActivityLoading(true);
    await axios
      .post(`http://146.56.155.91:8080/tour/api/info/areabasedlist`, {
        contentTypeId: 12,
        cat1: 'A02',
        cat2: 'A0204',
        cat3: 'A02040600',
      })
      .then(response => {
        if (response.data.response.body.items.item === undefined) {
          Alert.alert('didden', '데이터 정보를 불러오는중 오류가 발생했습니다.');
          return;
        }
        if (tourNum > 100) {
          Alert.alert('didden', '모든 Tour 정보를 갖고 왔습니다.');
          return;
        } else {
          setTours(current => [...tours, response.data.response.body.items.item[tourNum]]);
          setTourNum(current => tourNum + 1);
        }
      })
      .catch(error => {
        Alert.alert('didden', `Fail : ${error.message}`);
      })
      .finally(() => {
        setActivityLoading(false);
      });
  };
  /* onAddTours = async () => {
    setActivityLoading(true);
      await axios
        .all([axios.get(`http://146.56.155.91:8080/tour/api/info`), axios.get(`http://146.56.155.91:8080/tour/api/info/image`)])
        .then(axios.spread((response1, response2) => {
          if (response1.data.data === undefined || response2.data === undefined) {
            Alert.alert(
              'didden',
              '데이터 정보를 불러오는중 오류가 발생했습니다.',
            );
            return;
          }
          if (tourNum > 9) {
            Alert.alert('didden', '모든 Tour 정보를 갖고 왔습니다.');
            return;
          } else {
            setTours(current => [...tours, response1.data.data[tourNum]]);
            setToursImg(current => [...toursImg, response2.data[tourNum]]);
            setTourNum(current => tourNum + 1);
            //alert(response1.data.data[tourNum].대분류);
          }
        })
      )
      .catch(error => {
        Alert.alert('didden', `Fail : ${error.message}`);
      })
      .finally(() => {
        setActivityLoading(false);
      });
  }; */

  /* onDetailView = tourDetail => {
    Alert.alert(
      `didden`,
      `지역 : ${tourDetail.지역}
    주소 : ${tourDetail.주소}
    문의및안내 : ${tourDetail.문의및안내}
    대분류 : ${tourDetail.대분류}
    중분류 : ${tourDetail.중분류}
    소분류 : ${tourDetail.소분류}`,
    );
  }; */

  return (
    <View style={styles.generatorTour}>
      <Button
        title="Add Tours"
        onPress={() => {
          this.onAddTours();
        }}
      />
      <View style={{zIndex: 1}}>
        <ActivityIndicator style={styles.loading} animating={activityLoading} size="large" color="purple" />
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.container}>
          <TourList tours={tours} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  generatorTour: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 250,
  },
});

export default GeneratorTour;
