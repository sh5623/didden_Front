import React, {useState} from 'react';
import {View, Button, StyleSheet, TextInput, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTokenAcc, setLoginId} from '../store/tokenReducer';
import {DiddenAxiosInstance} from '../service/api/axios-instance/DiddenAxiosInstance';
import {LoginApi} from '../service/api/didden/LoginApi';

function Login() {
  const [inputLoginId, setInputLoginId] = useState('');
  const [inputLoginPwd, setInputLoginPwd] = useState('');
  const [activityLoading, setActivityLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChangeLoginId = event => {
    setInputLoginId(event);
  };
  const onChangeLoginPwd = event => {
    setInputLoginPwd(event);
  };

  const onLogin = async () => {
    if (!inputLoginId) {
      Alert.alert('didden', 'ID를 입력해 주세요!');
      return;
    }
    if (!inputLoginPwd) {
      Alert.alert('didden', 'Password를 입력해 주세요!');
      return;
    }

    setActivityLoading(true);

    const data = await LoginApi.postRequestLogin(inputLoginId, inputLoginPwd);
    if (data.status === 200) {
      DiddenAxiosInstance.defaults.headers.common['Authorization'] = data.headers.authorization;
      dispatch(setLoginId(inputLoginId));
      dispatch(setTokenAcc(data.headers.authorization));

      setTimeout(() => {
        navigation.navigate('home');
      }, 500);
    } else {
      Alert.alert('didden', '오류가 발생했습니다. 잠시 후  다시 시도해 주세요.');
      setActivityLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={inputLoginId}
          style={styles.input}
          onChangeText={onChangeLoginId}
          autoCapitalize={'none'}
          placeholder={'ID'}
          autoFocus={true}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <TextInput
          value={inputLoginPwd}
          style={styles.input}
          onChangeText={onChangeLoginPwd}
          autoCapitalize={'none'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
      </View>

      <View>
        <ActivityIndicator style={styles.loading} animating={activityLoading} size="large" color="purple" />
      </View>

      <Button title="Login" onPress={onLogin} />
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
    width: 230,
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default Login;
