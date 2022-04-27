import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {selectLoginId, selectKakaoUserEmail, selectNaverUserEmail} from './store/tokenReducer';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function MyPage() {
  const loginId = useSelector(selectLoginId);
  const kakaoUserEmail = useSelector(selectKakaoUserEmail);
  const naverUserEmail = useSelector(selectNaverUserEmail);

  const navigation = useNavigation();

  const [myPageLoginId, setMyPageLoginId] = useState('');
  const [scrapCount, setScrapCount] = useState(0);

  const myPageCheckId = () => {
    if (loginId) {
      setMyPageLoginId(loginId);
    } else if (kakaoUserEmail) {
      setMyPageLoginId(kakaoUserEmail);
    } else if (naverUserEmail) {
      setMyPageLoginId(naverUserEmail);
    }
  };

  useEffect(() => {
    myPageCheckId();
  }, []);

  return (
    <View style={styles.myPageMainContainer}>
      <View style={styles.myPageMainProfile}>
        <Text style={styles.myPageMainProfileImage}>이미지 아이콘</Text>
        <Text style={styles.myPageMainProfileText}>{myPageLoginId}</Text>
      </View>

      <View style={styles.myPageMainInfo}>
        <View>
          <TouchableOpacity style={styles.myPageMainInfoText}>
            <Text>누적스크랩 {scrapCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.myPageMainList}>
        <TouchableOpacity
          style={styles.myPageMainListText}
          onPress={() => {
            navigation.navigate('userCheck');
          }}>
          <Text>회원정보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myPageMainListText}>
          <Text>설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myPageMainListText}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myPageMainListText}>
          <Text>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myPageMainListText}>
          <Text>앱 버전 정보 1.1 ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myPageMainContainer: {
    flex: 1,
    marginTop: 10,
    padding: 5,
    maring: 5,
    width: '100%',
  },
  ////////////////////// 이미지 아이콘, 관리자
  myPageMainProfile: {
    // flex: 0.5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    height: 100,
  },
  myPageMainProfileImage: {
    // flex: 0.5,
  },
  myPageMainProfileText: {},
  ////////////////////// 여행횟수, 누적스크랩
  myPageMainInfo: {
    // flex: 0.2,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    marginTop: 20,
    marginLeft: 80,
    marginRight: 80,
    // alignItems: 'center',
  },
  myPageMainInfoText: {
    height: 50,
  },
  ////////////////////// 마이페이지 목록
  myPageMainList: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
    // backgroundColor: 'green',
  },
  myPageMainListText: {
    flex: 0.1,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  myPageMainListButton: {
    flex: 0.1,
    color: 'red',
    alignItems: 'flex-end',
    textAlign: 'left',
  },
});

export default MyPage;
