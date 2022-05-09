import 'react-native-gesture-handler';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectTokenAcc, selectTokenRef} from './src/store/tokenReducer';
import {Alert, TouchableWithoutFeedback, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './src/homeStack';
import MyPage from './src/myPage';
import Favorite from './src/favorite';
import SideDrawer from './src/side_drawer';
import LogoComponent from './src/logo';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = (focused, name) => {
  let iconImagePath;

  if (name === 'homeStack') {
    iconImagePath = require('./image/home.png');
  } else if (name === 'favorite') {
    iconImagePath = require('./image/heart.png');
  } else if (name === 'myPage') {
    iconImagePath = require('./image/user.png');
  }

  return <Image style={{width: 25, height: 25}} source={iconImagePath} />;
};

function App() {
  const tokenAcc = useSelector(selectTokenAcc);
  const tokenRef = useSelector(selectTokenRef);

  const homeStack = () => <HomeStack />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="homeStack"
        screenOptions={({route}) => ({
          title: '.didden',
          headerTitle: () => <LogoComponent tokenAcc={tokenAcc} tokenRef={tokenRef} />,
          headerStyle: {
            backgroundColor: '#7351F1',
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
              <Image style={{width: 25, height: 25, marginRight: 15}} source={require('./image/info.png')} />
            </TouchableWithoutFeedback>
          ),
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: '#7351F1',
          tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        })}>
        <Tab.Screen
          name="favorite"
          component={Favorite}
          options={{
            tabBarLabel: '좋아요',
          }}
        />
        <Tab.Screen
          name="homeStack"
          component={homeStack}
          options={{
            tabBarLabel: '홈',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="myPage"
          component={MyPage}
          options={{
            tabBarLabel: 'myPage',
          }}
        />
      </Tab.Navigator>

      {/* Stack Navigator Example */}
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
      </Stack.Navigator> */}

      {/* Drawer Navigator Example */}
      {/* <Drawer.Navigator
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
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
