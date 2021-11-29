import React from 'react';
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
import LogoComponent from './logo';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        title: '',
        headerTitle: () => <LogoComponent />,
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
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="modal" component={Modal} />
      <Stack.Screen name="generator" component={Generator} />
      <Stack.Screen name="generatorTour" component={GeneratorTour} />
      <Stack.Screen name="picker" component={Picker} />
      <Stack.Screen name="input" component={Input} />
      <Stack.Screen name="imageLoader" component={ImageLoader} />
      <Stack.Screen name="imagePicker" component={ImagePicker} />
      <Stack.Screen name="animation" component={Animation} />
    </Stack.Navigator>
  );
}

export default HomeStack;
