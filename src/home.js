import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Header from '../src/header';

function Home({navigation}) {
  const [appName, setAppName] = useState('.didden');

  return (
    <View style={styles.home}>
      <Header name={appName} />
      <Button
        title="Go Generator"
        onPress={() => {
          navigation.navigate('generator');
        }}
      />
      <Button
        title="Go GeneratorTour"
        onPress={() => {
          navigation.navigate('generatorTour');
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
