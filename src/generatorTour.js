import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import TourList from './tourlist';
import axios from 'axios';

class GeneratorTour extends Component {
  state = {
    tours: [],
    tourNum: 0,
    activityLoading: false,
  };

  onAddTours = async () => {
    this.setState({activityLoading: true});
    await axios
      .get('http://146.56.174.150:8080/user/test')
      .then(response => {
        if (this.state.tourNum > 9) {
          alert(`모든 Tour 정보를 갖고 왔습니다.`);
          return;
        } else {
          this.setState(current => ({
            tours: [...current.tours, response.data.data[this.state.tourNum]],
            tourNum: current.tourNum + 1,
          }));
        }
      })
      .catch(error => {
        alert(`Fail : ${error.message}`);
      })
      .finally(() => {
        this.setState({activityLoading: false});
      });
  };

  onDetailView = tourDetail => {
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

  render() {
    return (
      <View style={styles.generatorTour}>
        <ActivityIndicator
          style={styles.loading}
          animating={this.state.activityLoading}
          size="large"
          color="purple"
        />

        <Button
          title="Add Tours"
          onPress={() => {
            this.onAddTours();
          }}
        />
        <ScrollView style={{width: '100%', maxHeight: 300}}>
          <TourList tours={this.state.tours} view={this.onDetailView} />
        </ScrollView>
      </View>
    );
  }
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
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GeneratorTour;
