import 'react-native-gesture-handler';
import React from 'react';
import {Alert, TouchableWithoutFeedback, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Generator from './src/generator';
import GeneratorTour from './src/generatorTour';
import Picker from './src/picker';
import Modal from './src/modal';
import Input from './src/input';
import Home from './src/home';
import SideDrawer from './src/side_drawer';
import LogoComponent from './src/logo';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
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
        <Stack.Screen name="input" component={Input} />
        <Stack.Screen name="logoComponent" component={LogoComponent} />
      </Stack.Navigator> */}
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
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
                style={{width: 25, height: 25, marginRight: 10}}
                source={require('./image/info.png')}
              />
            </TouchableWithoutFeedback>
          ),
          drawerType: 'front',
          drawerPosition: 'left',
          drawerStyle: {
            width: 200,
          },
          drawerActiveBackgroundColor: 'lavender',
          drawerActiveTintColor: 'purple',
        }}
        drawerContent={props => <SideDrawer property={props} />}>
        <Drawer.Screen
          name="home"
          component={Home}
          options={{
            drawerIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('./image/home.png')}
              />
            ),
            title: '',
          }}
        />
        <Drawer.Screen name="modal" component={Modal} />
        <Drawer.Screen name="generator" component={Generator} />
        <Drawer.Screen name="generatorTour" component={GeneratorTour} />
        <Drawer.Screen name="picker" component={Picker} />
        <Drawer.Screen name="input" component={Input} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
