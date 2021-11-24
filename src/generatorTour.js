import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import TourList from './tourlist';
import axios from 'axios';

function GeneratorTour({navigation}) {
  const [tours, setTours] = useState([]);
  const [tourNum, setTourNum] = useState(0);
  const [activityLoading, setActivityLoading] = useState(false);

  onAddTours = async () => {
    setActivityLoading(true);
    await axios
      .get('http://146.56.174.150:8080/user/test')
      .then(response => {
        if (tourNum > 9) {
          Alert.alert('didden', '모든 Tour 정보를 갖고 왔습니다.');
          return;
        } else {
          setTours(current => [...tours, response.data.data[tourNum]]);
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

  onDetailView = tourDetail => {
    // navigation.setOptions({
    //   title: tourDetail.정보명,
    //   headerStyle: {
    //     backgroundColor: 'lavender',
    //   },
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //     color: 'purple',
    //   },
    // });

    Alert.alert(
      `didden`,
      `지역 : ${tourDetail.지역}
    주소 : ${tourDetail.주소}
    문의및안내 : ${tourDetail.문의및안내}
    대분류 : ${tourDetail.대분류}
    중분류 : ${tourDetail.중분류}
    소분류 : ${tourDetail.소분류}`,
    );
  };

  return (
    <View style={styles.generatorTour}>
      <Button
        title="Add Tours"
        onPress={() => {
          this.onAddTours();
        }}
      />
      <View style={{zIndex: 1}}>
        <ActivityIndicator
          style={styles.loading}
          animating={activityLoading}
          size="large"
          color="purple"
        />
      </View>
      <ScrollView style={{width: '100%'}}>
        <TourList tours={tours} view={this.onDetailView} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
