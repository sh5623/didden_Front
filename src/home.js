import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTokenAcc} from './store/tokenReducer';
import Header from '../src/header';

function Home() {
  const tokenAcc = useSelector(selectTokenAcc);
  const navigation = useNavigation();
  const [appName, setAppName] = useState('.didden');

  return (
    <View style={styles.home}>
      <Header name={appName} tokenAcc={tokenAcc} />
      <Button
        title="Go Login"
        onPress={() => {
          navigation.navigate('login');
        }}
      />
      <Button
        title="Go SignUp"
        onPress={() => {
          navigation.navigate('signUp');
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
      <Button
        title="Go Animation"
        onPress={() => {
          navigation.navigate('animation');
        }}
      />
      <Button
        title="Go Increase"
        onPress={() => {
          navigation.navigate('increase');
        }}
      />
      <Button
        title="Kakao Login"
        onPress={() => {
          navigation.navigate('kakaoLogin');
        }}
      />
      <Button
        title="Naver Login"
        onPress={() => {
          navigation.navigate('naverLogin');
        }}
      />
      <Button
        title="Google Maps"
        onPress={() => {
          navigation.navigate('googleMap');
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
