import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Button, StyleSheet} from 'react-native';
import Header from '../src/header';

function Home({setToken}) {
  const route = useRoute();
  const navigation = useNavigation();
  const [appName, setAppName] = useState('.didden');

  useEffect(() => {
    if (route.params) {
      setToken(
        route.params.token_acc,
        route.params.token_ref,
        route.params.userId,
      );
    }
  }, []);

  return (
    <View style={styles.home}>
      <Header
        name={appName}
        tokenAcc={route.params ? route.params.token_acc : ''}
      />
      <Button
        title="Go Login"
        onPress={() => {
          navigation.navigate('login');
        }}
      />
      <Button
        title="Go Generator"
        onPress={() => {
          navigation.navigate('generator');
        }}
      />
      <Button
        title="Go GeneratorTour"
        onPress={() => {
          navigation.navigate('generatorTour', {
            token_acc: route.params ? route.params.token_acc : '',
          });
        }}
      />
      <Button
        title="Go Modal"
        onPress={() => {
          navigation.navigate('modal', {
            appName: appName,
          });
        }}
      />
      <Button
        title="Go Picker"
        onPress={() => {
          navigation.navigate('picker', {
            value: 50,
            country: 'korea',
          });
        }}
      />
      <Button
        title="Go Input"
        onPress={() => {
          navigation.navigate('input');
        }}
      />
      <Button
        title="Go ImageLoader"
        onPress={() => {
          navigation.navigate('imageLoader');
        }}
      />
      <Button
        title="Go ImagePicker"
        onPress={() => {
          navigation.navigate('imagePicker');
        }}
      />
      <Button
        title="Go Animation"
        onPress={() => {
          navigation.navigate('animation');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Home;
