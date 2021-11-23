import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Generator from './src/generator';
import GeneratorTour from './src/generatorTour';
import Picker from './src/picker';
import Modal from './src/modal';
import Home from './src/home';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="modal" component={Modal} />
          <Stack.Screen name="generator" component={Generator} />
          <Stack.Screen name="generatorTour" component={GeneratorTour} />
          <Stack.Screen name="picker" component={Picker} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
