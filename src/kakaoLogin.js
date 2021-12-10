import React, {useState} from 'react';
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  setKakaoTokenAcc,
  setKakaoTokenRef,
  setKakaoUserEmail,
} from './store/tokenReducer';

function KakaoLogin() {
  const dispatch = useDispatch();

  // 카카오 로그인 시작.
  kakaoLogin = () => {
    KakaoLogins.login()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
        dispatch(
          setKakaoTokenAcc(
            JSON.stringify(result.accessToken).replace(/\"/g, ''),
          ),
        );
        dispatch(
          setKakaoTokenRef(
            JSON.stringify(result.refreshToken).replace(/\"/g, ''),
          ),
        );

        KakaoLogins.getProfile().then(result => {
          dispatch(
            setKakaoUserEmail(JSON.stringify(result.email).replace(/\"/g, '')),
          );
        });
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 카카카오 로그아웃
  kakaoLogout = () => {
    KakaoLogins.logout()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 로그인 후 내 프로필 가져오기.
  getProfile = () => {
    KakaoLogins.getProfile()
      .then(result => {
        Alert.alert('didden', JSON.stringify(result));
      })
      .catch(error => {
        Alert.alert('didden', error.toString());
      });
  };

  // 액세스 토큰 조회
  getAccessToken = () => {
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
        <Image source={require('../image/kakao_login_small.png')} />
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
