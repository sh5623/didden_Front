import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, TouchableWithoutFeedback, Image} from 'react-native';
import Home from './home';
import Modal from './modal';
import Generator from './generator';
import GeneratorTour from './generatorTour';
import Picker from './picker';
import Input from './input';
import ImageLoader from './imageLoader';
import ImagePicker from './imagePicker';
import Animation from './animation';
import Login from './login';
import LogoComponent from './logo';

const Stack = createNativeStackNavigator();

function HomeStack({setAppToken}) {
  const [tokenAcc, setTokenAcc] = useState('');
  const [tokenRef, setTokenRef] = useState('');
  const [userId, setUserId] = useState('');

  setToken = (tokenAcc, tokenRef, userId) => {
    setTokenAcc(tokenAcc);
    setTokenRef(tokenRef);
    setUserId(userId);

    setAppToken(tokenAcc, tokenRef, userId);
  };

  const homeNavigation = () => <Home setToken={setToken} />;

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        title: '',
        headerTitle: () => (
          <LogoComponent
            tokenAcc={tokenAcc}
            tokenRef={tokenRef}
            userId={userId}
          />
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
              Alert.alert('didden', 'Hi, we are didden!');
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
      <Stack.Screen name="picker" component={Picker} />
      <Stack.Screen name="input" component={Input} />
      <Stack.Screen name="imageLoader" component={ImageLoader} />
      <Stack.Screen name="imagePicker" component={ImagePicker} />
      <Stack.Screen name="animation" component={Animation} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}

export default HomeStack;
