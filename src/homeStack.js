import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, TouchableWithoutFeedback, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {
  selectTokenAcc,
  selectTokenRef,
  selectKakaoUserEmail,
} from './store/tokenReducer';
import Home from './home';
import Modal from './modal';
import Generator from './generator';
import GeneratorTour from './generatorTour';
import GeneratorTourDetail from './generatorTourDetail';
import Picker from './picker';
import Input from './input';
import ImageLoader from './imageLoader';
import ImagePicker from './imagePicker';
import Animation from './animation';
import Increase from './increase';
import Signup from './signup';
import Login from './login';
import LogoComponent from './logo';
import KakaoLogin from './kakaoLogin';
import NaverLogin from './naverLogin';
import GoogleMap from './googleMap';

const Stack = createNativeStackNavigator();

function HomeStack() {
  const tokenAcc = useSelector(selectTokenAcc);
  const tokenRef = useSelector(selectTokenRef);
  const userEmail = useSelector(selectKakaoUserEmail);

  const homeNavigation = () => <Home />;

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        title: '',
        headerTitle: () => (
          <LogoComponent tokenAcc={tokenAcc} tokenRef={tokenRef} />
        ),
        headerStyle: {
          backgroundColor: 'lavender',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'purple',
        },
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert('didden', `Hi! ${userEmail}`);
            }}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../image/info.png')}
            />
          </TouchableWithoutFeedback>
        ),
      }}>
      <Stack.Screen name="home" component={homeNavigation} />
      <Stack.Screen name="modal" component={Modal} />
      <Stack.Screen name="generator" component={Generator} />
      <Stack.Screen name="generatorTour" component={GeneratorTour} />
      <Stack.Screen name="generatorTourDetail" component={GeneratorTourDetail} />
      <Stack.Screen name="picker" component={Picker} />
      <Stack.Screen name="input" component={Input} />
      <Stack.Screen name="imageLoader" component={ImageLoader} />
      <Stack.Screen name="imagePicker" component={ImagePicker} />
      <Stack.Screen name="animation" component={Animation} />
      <Stack.Screen name="signUp" component={Signup} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="increase" component={Increase} />
      <Stack.Screen name="kakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="naverLogin" component={NaverLogin} />
      <Stack.Screen name="googleMap" component={GoogleMap} />
    </Stack.Navigator>
  );
}

export default HomeStack;
