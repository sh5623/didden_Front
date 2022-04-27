import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function UserCheck() {
  const [userCheckId, setUserCheckId] = useState('');
  const [userCheckPw, setUserCheckPw] = useState('');

  const onChangeUserCheckId = event => {
    setUserCheckId(event);
  };

  const onChangeUserCheckPw = event => {
    setUserCheckPw(event);
  };

  return (
    <View style={styles.userCheckContainer}>
      <View style={styles.userCheckInputBox}>
        <Text style={styles.userCheckTextBox}>ID</Text>
        <TextInput
          style={styles.userCheckIdInput}
          value={userCheckId}
          onChangeText={this.onChangeUserCheckId}
          autoCapitalize={'none'}
          placeholder={'ID'}
          autoFocus={true}
        />
      </View>
      <View style={styles.userCheckInputBox}>
        <Text style={styles.userCheckTextBox}>PASSWORD</Text>
        <TextInput
          style={styles.userCheckPwInput}
          value={userCheckPw}
          onChangeText={this.onChangeUserCheckPw}
          autoCapitalize={'none'}
          placeholder={'PASSWORD'}
          autoFocus={true}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userCheckContainer: {
    flex: 1,
    marginTop: 10,
    padding: 5,
    maring: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCheckInputBox: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userCheckTextBox: {
    width: '25%',
    textAlign: 'right',
    paddingRight: 10,
  },

  userCheckIdInput: {
    width: '75%',
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  userCheckPwInput: {
    width: '75%',
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
});

export default UserCheck;
