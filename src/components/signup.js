import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import axios from 'axios';

function Signup() {
  const [inputCreateId, setInputCreateId] = useState('');
  const [inputCreatePwd, setInputCreatePwd] = useState('');
  const [inputCreatePwdConfrim, setInputCreatePwdConfrim] = useState('');
  const [activityLoading, setActivityLoading] = useState(false);
  const navigation = useNavigation();

  const onChangeCreateId = event => {
    setInputCreateId(event);
  };
  const onChangeCreatePwd = event => {
    setInputCreatePwd(event);
  };
  const onChangeCreatePwdConfirm = event => {
    setInputCreatePwdConfrim(event);
  };

  const onJoinMember = async () => {
    if (inputCreateId === '') {
      Alert.alert('didden', '이메일 주소를 입력해 주세요!');
      return;
    }
    if (inputCreatePwd === '') {
      Alert.alert('didden', '패스워드를 입력해 주세요!');
      return;
    }
    if (inputCreatePwdConfrim === '') {
      Alert.alert('didden', '패스워드확인을 입력해 주세요!');
      return;
    }
    if (inputCreatePwd !== inputCreatePwdConfrim) {
      Alert.alert('didden', '패스워드가 같은지 확인해 주세요!');
    }

    setActivityLoading(true);

    await axios
      .put(`http://146.56.155.91:8080/user/insert`, {
        userId: inputCreateId,
        userName: '',
        userPassword: inputCreatePwd,
        userNickname: '',
        userBirthday: '',
        userGender: '',
        userEmail: '',
        userPhoneNumber: '',
        userCreateDate: '',
        userUpdateDate: '',
        userPrivacyConsent: 'Y',
        userSocialLoginType: '',
        userRefreshToken: '',
      })
      .then(res => {
        if (res.data.result === true) {
          setTimeout(() => {
            navigation.navigate('home');
            Alert.alert('didden', '회원가입이 완료되었습니다.');
          }, 500);
        } else {
          Alert.alert('didden', res.data.error);
        }
      })
      .catch(error => {
        setActivityLoading(false);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={inputCreateId}
          style={styles.input}
          onChangeText={onChangeCreateId}
          label="이메일"
          name="email"
          placeholder="이메일"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={inputCreatePwd}
          style={styles.input}
          onChangeText={onChangeCreatePwd}
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          secureTextEntry={true}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={inputCreatePwdConfrim}
          style={styles.input}
          onChangeText={onChangeCreatePwdConfirm}
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          secureTextEntry={true}
        />
      </View>

      <View>
        <ActivityIndicator
          style={styles.loading}
          animating={activityLoading}
          size="large"
          color="#BFA0ED"
        />
      </View>

      <Button title="회원가입" onPress={onJoinMember} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingLeft: 10,
  },
  loading: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default Signup;
