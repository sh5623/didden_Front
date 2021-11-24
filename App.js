import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Generator from './src/generator';
import GeneratorTour from './src/generatorTour';
import Picker from './src/picker';
import Modal from './src/modal';
import Home from './src/home';
import LogoComponent from './src/logo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          title: '.didden',
          headerTitle: () => <LogoComponent />,
          headerStyle: {
            backgroundColor: 'lavender',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'purple',
          },
          headerRight: () => (
            <Button
              title="Info"
              onPress={() => {
                alert('Hi, we are didden');
              }}
            />
          ),
        }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="modal" component={Modal} />
        <Stack.Screen name="generator" component={Generator} />
        <Stack.Screen name="generatorTour" component={GeneratorTour} />
        <Stack.Screen name="picker" component={Picker} />
        <Stack.Screen name="logoComponent" component={LogoComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
