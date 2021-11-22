import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PropsChild from './propsChild';
import Header from './src/header';
import Generator from './src/generator';
import GeneratorTour from './src/generatorTour';
import NumList from './src/numlist';
import TourList from './src/tourlist';
import Picker from './src/picker';
import Modal from './src/modal';
import axios from 'axios';

class App extends Component {
  state = {
    sampleText: 'This is didden',
    sampleBoolean: false,
    sampleNum: 1,
    appName: 'didden',
    random: [],
    tours: [],
    tourNum: 0,
    myTextInput: '',
    alphabet: [],
    activityLoading: false,
  };

  inputText = () =>
    this.state.sampleBoolean ? (
      <Text>sampleBoolean is True!</Text>
    ) : (
      <Text>sampleBoolean is False!</Text>
    );

  changeState = () => {
    if (!this.state.sampleBoolean) {
      this.setState({
        sampleText: 'We are didden..!',
        sampleBoolean: true,
      });
    } else {
      this.setState({
        sampleText: 'This is didden!',
        sampleBoolean: false,
      });
    }
  };

  onAdd = () => {
    this.setState(current => ({sampleNum: current.sampleNum + 1}));
  };

  onAddRandomNum = async () => {
    // Get Random Num API
    /* await axios
      .get('https://csrng.net/csrng/csrng.php?min=1&max=100')
      .then(response => {
        if (response.data[0].random) {
          this.setState(current => ({
            random: [...current.random, response.data[0].random],
          }));
        }
      })
      .catch(error => {
        alert(`Fail : ${error.message}`);
      }); */

    const randomNum = Math.floor(Math.random() * 100) + 1;
    this.setState(current => ({
      random: [...current.random, randomNum],
    }));
  };

  onNumDelete = position => {
    const newArray = this.state.random.filter((num, index) => {
      return position != index;
    });

    this.setState({random: newArray});
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

  onChangeInput = event => {
    this.setState({
      myTextInput: event,
    });
  };

  onAddTextInput = () => {
    if (this.state.myTextInput === '') {
      Alert.alert('didden', '내용을 입력해 주세요!');
      return;
    }
    this.setState(current => ({
      myTextInput: '',
      alphabet: [...current.alphabet, current.myTextInput],
    }));
  };

  render() {
    return (
      <View style={styles.background}>
        <Header name={this.state.appName} />
        <View style={styles.subView}>
          <Text onPress={this.changeState}>{this.state.sampleText}</Text>
          {this.inputText()}
          <Text onPress={this.onAdd}>{this.state.sampleNum}</Text>
          <PropsChild
            sampleText={this.state.sampleText}
            changeState={this.changeState}
          />
        </View>

        <ScrollView style={{width: '100%'}}>
          <Generator add={this.onAddRandomNum} />
          <ScrollView
            style={{width: '100%', maxHeight: 300}}
            //onMomentumScrollBegin={() => alert('begin')}
            //onMomentumScrollEnd={() => alert('end')}
            //onScroll={() => alert('scrolling')}
            /* onContentSizeChange={(width, height) =>
            alert(`width: ${width}, height: ${height}`)
          } */
            bounces={true}>
            <NumList nums={this.state.random} delete={this.onNumDelete} />
          </ScrollView>

          <GeneratorTour addTours={this.onAddTours} />
          <ScrollView style={{width: '100%', maxHeight: 300}}>
            <TourList tours={this.state.tours} view={this.onDetailView} />
          </ScrollView>

          <View>
            <ActivityIndicator
              style={styles.loading}
              animating={this.state.activityLoading}
              size="large"
              color="purple"
            />
          </View>

          <ScrollView style={{width: '100%', maxHeight: 300}}>
            <TextInput
              value={this.state.myTextInput}
              style={styles.input}
              onChangeText={this.onChangeInput}
              autoCapitalize={'none'}
            />
            <Button title="Add Text Input" onPress={this.onAddTextInput} />
            <ScrollView style={{width: '100%'}}>
              {this.state.alphabet.map((word, index) => (
                <Text style={styles.mainText} key={index}>
                  {word}
                </Text>
              ))}
            </ScrollView>
          </ScrollView>

          <Picker />

          <Modal />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'skyblue',
    marginTop: 20,
  },
  mainText: {
    backgroundColor: 'skyblue',
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

export default App;
