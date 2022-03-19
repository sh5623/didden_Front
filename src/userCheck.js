import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import {
  selectKakaoUserEmail,
  selectLoginId,
  selectNaverUserEmail,
} from './store/tokenReducer';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import axios from 'axios';

function UserCheck() {
  const loginId = useSelector(selectLoginId);
  const kakaoUserEmail = useSelector(selectKakaoUserEmail);
  const naverUserEmail = useSelector(selectNaverUserEmail);
  const [userCheckId, setUserCheckId] = useState('');
  const [userCheckPw, setUserCheckPw] = useState('');

  const [myPageLoginId, setMyPageLoginId] = useState('');

  const navigation = useNavigation();

  onChangeUserCheckId = event => {
    setUserCheckId(event);
  };

  onChangeUserCheckPw = event => {
    setUserCheckPw(event);
  };

  const myPageCheckId = () => {
    if (loginId) {
      setMyPageLoginId(loginId);
      setUserCheckId(loginId);
    } else if (kakaoUserEmail) {
      setMyPageLoginId(kakaoUserEmail);
      setUserCheckId(kakaoUserEmail);
    } else if (naverUserEmail) {
      setMyPageLoginId(naverUserEmail);
      setUserCheckId(naverUserEmail);
    }
  };

  onLogin = async () => {
    await axios
      .post('http://146.56.155.91:8080/user', {
        userId: userCheckId,
        userPassword: userCheckPw,
      })
      .then(response => {
        if (response.data === undefined) {
          Alert.alert(
            'didden',
            '데이터 정보를 불러오는중 오류가 발생했습니다.',
          );
          return;
        } else {
          if (response.data.result) {
            navigation.navigate('signUp');
          } else {
            alert('실패하였습니다.');
          }
        }
      })
      .catch(error => {
        Alert.alert('didden', `Fail : ${error.message}`);
      })
      .finally(() => {});
  };

  useEffect(() => {
    myPageCheckId();
  }, []);

  return (
    <ContainerView>
      <ContainerIdView>
        <IdText>ID</IdText>
        <IdText>{myPageLoginId}</IdText>
      </ContainerIdView>
      <ContainerPwView>
        <PwText>PASSWORD</PwText>
        <PwInput
          value={userCheckPw}
          onChangeText={this.onChangeUserCheckPw}
          autoCapitalize={'none'}
          placeholder={'PASSWORD'}
          autoFocus={true}
          secureTextEntry={true}
        />
      </ContainerPwView>
      <Button backgroudColor="white" onPress={this.onLogin}>
        <Text>로그인</Text>
      </Button>
    </ContainerView>
  );
}
///// 전체 틀
const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;
//// ID
const ContainerIdView = styled.View`
  flex-direction: row;
  width: 100%;
`;
const IdText = styled.Text`
  width: 30%;
  padding-right: 5px;
  text-align: right;
`;
const IdInput = styled.TextInput`
  border-radius: 5px;
  border: 1px solid black;
  padding-left: 5px;
  width: 50%;
`;
//// PW
const ContainerPwView = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 5px;
`;
const PwText = styled.Text`
  width: 30%;
  padding-right: 5px;

  text-align: right;
`;
const PwInput = styled.TextInput`
  border-radius: 5px;
  border: 1px solid black;
  padding-left: 5px;
  width: 50%;
`;
//// 버튼
const Button = styled.TouchableOpacity`
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: ${props =>
    props.backgroudColor ? props.backgroudColor : 'yellow'};
`;

// const HoverButton = styled(Button)`
//   &:hover {
//     background-color: red;
//   }
// `;

// const colorChange = keyframes`
//   from {
//       background-color: red;
//   }

//   to {
//       background-color: yellow;
//   }
// `;

const ColorChange = styled.Button``;

export default UserCheck;
