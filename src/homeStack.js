import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './home';
import Modal from './modal';
import Generator from './generator';
import GeneratorTour from './generatorTour';
import Picker from './picker';
import Input from './input';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="modal" component={Modal} />
      <Stack.Screen name="generator" component={Generator} />
      <Stack.Screen name="generatorTour" component={GeneratorTour} />
      <Stack.Screen name="picker" component={Picker} />
      <Stack.Screen name="input" component={Input} />
    </Stack.Navigator>
  );
}

export default HomeStack;
