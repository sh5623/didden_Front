import React, {useState} from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNaverTokenAcc,
  setNaverTokenRef,
  setNaverUserEmail,
  selectNaverTokenAcc,
} from './store/tokenReducer';
import {
  NaverLogin,
  getProfile as NaverProfile,
} from '@react-native-seoul/naver-login';

function NaverLoginComponents() {
  const dispatch = useDispatch();

  const iosKeys = {
    kConsumerKey: '7wEVAYsChBxD4sQAPzzJ',
    kConsumerSecret: 'LXVTpar6AQ',
    kServiceAppName: 'didden',
    kServiceAppUrlScheme: 'diddenNaverLogin', // only for iOS
  };

  const androidKeys = {
    kConsumerKey: '7wEVAYsChBxD4sQAPzzJ',
    kConsumerSecret: 'LXVTpar6AQ',
    kServiceAppName: 'didden',
  };

  const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;
  const naverAccessToken = useSelector(selectNaverTokenAcc);

  naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);

        dispatch(setNaverTokenAcc(token.accessToken));
        dispatch(setNaverTokenRef(token.refreshToken));

        getNaverProfile();

        Alert.alert('로그인 성공', JSON.stringify(token));
      });
    });
  };

  getNaverProfile = async () => {
    const profileResult = await NaverProfile(naverAccessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }

    dispatch(
      setNaverUserEmail(
        JSON.stringify(profileResult.response.email).replace(/\"/g, ''),
      ),
    );
    Alert.alert('profileResult', JSON.stringify(profileResult));
  };

  naverLogout = () => {
    const logoutResult = NaverLogin.logout();
    Alert.alert('로그아웃', '성공적으로 로그아웃 되었습니다.');

    dispatch(setNaverTokenAcc(''));
    dispatch(setNaverTokenRef(''));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => naverLogin(initials)}>
        <Image
          style={styles.loginImage}
          source={require('../image/btnG_small.png')}
        />
      </TouchableOpacity>
      <Button title="NaverLogout" onPress={naverLogout} />
      <Button title="NaverProfile" onPress={getNaverProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImage: {
    width: 80,
    height: 40,
  },
});

export default NaverLoginComponents;
