import React, {useState} from 'react';
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {View, Button, Alert, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setKakaoTokenAcc, setKakaoTokenRef, setKakaoUserEmail} from '../store/tokenReducer';
import axios from 'axios';

function KakaoLogin() {
  const dispatch = useDispatch();

  // 카카오 로그인 시작.
  const kakaoLogin = () => {
    KakaoLogins.login()
      .then(result => {
        let kakaoParam = {};
        Alert.alert('didden', JSON.stringify(result));
        dispatch(setKakaoTokenAcc(JSON.stringify(result.accessToken).replace(/\"/g, '')));
        dispatch(setKakaoTokenRef(JSON.stringify(result.refreshToken).replace(/\"/g, '')));

        const loginParam = result;

        KakaoLogins.getProfile().then(result => {
          dispatch(setKakaoUserEmail(JSON.stringify(result.email).replace(/\"/g, '')));

          kakaoParam = Object.assign(loginParam, result);

          // 소셜 로인 param 전달
          axios
            .post(`http://146.56.155.91:8080/user/api/social/login`, {
              loginParam: kakaoParam,
            })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error.message);
            });
        });
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 카카카오 로그아웃
  const kakaoLogout = () => {
    KakaoLogins.logout()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 로그인 후 내 프로필 가져오기.
  const getProfile = () => {
    KakaoLogins.getProfile()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 액세스 토큰 조회
  const getAccessToken = () => {
    KakaoLogins.getAccessToken()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={kakaoLogin}>
        <Image source={require('../../image/kakao_login_small.png')} />
      </TouchableOpacity>
      <Button title="Logout" onPress={kakaoLogout} />
      <Button title="KakaoProfile" onPress={getProfile} />
      <Button title="AccessToken" onPress={getAccessToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLogin;
