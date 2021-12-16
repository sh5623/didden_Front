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
import {setTokenAcc, setTokenRef, setLoginId} from './store/tokenReducer';
import axios from 'axios';

function Login() {
  const [inputLoginId, setInputLoginId] = useState('');
  const [inputLoginPwd, setInputLoginPwd] = useState('');
  const [activityLoading, setActivityLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  onChangeLoginId = event => {
    setInputLoginId(event);
  };
  onChangeLoginPwd = event => {
    setInputLoginPwd(event);
  };

  onLogin = async () => {
    if (inputLoginId === '') {
      Alert.alert('didden', 'ID를 입력해 주세요!');
      return;
    }
    if (inputLoginPwd === '') {
      Alert.alert('didden', 'Password를 입력해 주세요!');
      return;
    }

    setActivityLoading(true);

    await axios
      .post(`http://146.56.155.91:8080/user/login`, {
        userId: inputLoginId,
        userPassword: inputLoginPwd,
      })
      .then(res => {
        setActivityLoading(false);
        if (res.data.result === true) {
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + res.data.token_acc;
          dispatch(setLoginId(inputLoginId));
          dispatch(setTokenAcc(res.data.token_acc));
          dispatch(setTokenRef(res.data.token_ref));
          setTimeout(() => {
            navigation.navigate('home');
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
          value={inputLoginId}
          style={styles.input}
          onChangeText={this.onChangeLoginId}
          autoCapitalize={'none'}
          placeholder={'ID'}
          autoFocus={true}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <TextInput
          value={inputLoginPwd}
          style={styles.input}
          onChangeText={this.onChangeLoginPwd}
          autoCapitalize={'none'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
      </View>

      <View>
        <ActivityIndicator
          style={styles.loading}
          animating={activityLoading}
          size="large"
          color="purple"
        />
      </View>

      <Button title="Login" onPress={this.onLogin} />
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
