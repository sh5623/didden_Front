import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTokenAcc, setTokenRef, setLoginId} from './store/tokenReducer';
import axios from 'axios';

function Signup() {
    const [inputCreateEmail, setInputCreateEmail] = useState('');
    const [inputAuthNum, setInputCreateAuthNum] =  useState('');
    const [inputCreatePwd, setInputCreatePwd] = useState('');
    const [inputCreatePwdConfrim, setInputCreatePwdConfrim] = useState('');
    const [inputCreateName, setInputCreateName] = useState('');
    const [inputBirthday, setInputBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [inputCreatePhoneNumber, setInputCreatePhoneNumber] = useState('');
    const [activityLoading, setActivityLoading] = useState(false);
    const [authYn, setAuthYn] = useState('N');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    onChangeCreateEmail = event => {
        setInputCreateEmail(event);
    };
    onChangeCreateAuthNum = event => {
        setInputCreateAuthNum(event);
    };
    onChangeCreatePwd = event => {
        setInputCreatePwd(event);
    };
    onChangeCreatePwdConfirm = event => {
        setInputCreatePwdConfrim(event);
    };
    onChangeCreateName = event => {
        setInputCreateName(event);
    };
    onChangeBirthday = event => {
        const value = event.replace(/\D+/g, "");
        const birthdayLength = 8;

        let result = "";

        for(let i = 0; i < value.length && i < birthdayLength; i ++) {
            if(i == 4) {
                result += "-";
            } else if(i == 6) {
                result += "-";
            }
            result += value[i];
        }

        setInputBirthday(result);
    };
    
    onChangeCreatePhoneNumber = event => {
        setInputCreatePhoneNumber(event);
    };

    // 회원가입
    onJoinMember = async () => {
        if(inputCreateEmail === '') {
            Alert.alert('didden', '이메일 주소를 입력해 주세요!');
            return;
        }
        if(inputCreatePwd === '') {
            Alert.alert('didden', '패스워드를 입력해 주세요!');
            return;
        }
        if(inputCreatePwdConfrim === '') {
            Alert.alert('didden', '패스워드확인을 입력해 주세요!');
            return;
        }
        if(inputCreatePwd !== inputCreatePwdConfrim) {
            Alert.alert('didden', '패스워드가 같은지 확인해 주세요!');
        }
        if(gender === '') {
            Alert.alert('didden', '성별을 선택해주세요.');
            return;
        }

        setActivityLoading(true);

        await axios
        .post(`http://146.56.155.91:8080/user`, {
            userEmail: inputCreateEmail,
            userPassword: inputCreatePwd,
            userNickname: inputCreateName,
            userBirthday: inputBirthday.replace('-', ''),
            userGender: gender,
            userPhoneNumber: inputCreatePhoneNumber,
            userPrivacyConsent: 'AGREED',
            userLoginType: 'default'
        })
        .then(res => {
            if(res.data.status === 'CREATED') {
                setTimeout(() => {
                    Alert.alert('didden', res.data.message);
                    navigation.navigate('home');
                }, 500);
            }
        })
        .catch(error => {
            setActivityLoading(false);
            alert(error.message);
        });
    };

    // 이메일 중복체크
    onEmailCheck = async () => {
        if(inputCreateEmail === '') {
            Alert.alert('didden', '이메일 주소를 입력해 주세요!');
            return;
        }
        await axios
        .get(`http://146.56.155.91:8080/user/email-check`, {
            params: {userEmail:inputCreateEmail}
        })
        .then(res => {
            Alert.alert('didden',res.data.message);
        })
        .catch(error => {
            Alert.alert('didden',error.response.data.message);
        });
    };

    // 인증번호 발송
    onAuthNumSend = async () => {
        await axios
        .post(`http://146.56.155.91:8080/mail/send`, {    
            to : inputCreateEmail, 
            from : 'tnsqja012@test.com'
        })
        .then(res => {
            Alert.alert('didden',res.data.message);
            if(res.data.status === "OK") {
              setAuthYn('Y');
            }
        })
        .catch(error => {
            Alert.alert('didden',error.response.data.message);
        });
    }

    // 인증
    onAuth = async () => {
      await axios
      .post(`http://146.56.155.91:8080/mail/certification`, {
        userEmail : inputCreateEmail,
        code : inputAuthNum
      })
      .then(res => {
          Alert.alert('didden',res.data.message);
          if(res.data.status === "ACCEPTED") {
          }
      })
      .catch(error => {
          Alert.alert('didden',error.response.data.message);
      });
  }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <TextInput 
                    value={inputCreateEmail}
                    style={styles.inputCheck} 
                    onChangeText={onChangeCreateEmail}
                    label="이메일" 
                    name="email" 
                    placeholder="이메일"
                />
                <TouchableOpacity
                    style={styles.authButton}
                    onPress={onEmailCheck}>
                    <Text style={styles.submitButtonText}>중복체크</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <TextInput 
                    value={inputAuthNum}
                    style={styles.inputCheck} 
                    onChangeText={onChangeCreateAuthNum}
                    label="인증번호 입력" 
                    name="authNum" 
                    placeholder="인증번호 입력"
                />
                <TouchableOpacity
                    style={styles.authButton}
                    // onPress={onAuthNumSend}>
                    onPress={authYn == 'Y' ? onAuth : onAuthNumSend}>
                    <Text style={styles.submitButtonText}>{authYn == 'Y' ? '인증' : '인증번호 발송'}</Text>
                </TouchableOpacity>
            </View>
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
            <Text>영문,숫자,특수문자(~!@#$%^*) 조합 8~15 자리</Text>
            <View style={{paddingTop:30}}></View>
            <TextInput 
                value={inputCreateName}
                style={styles.input} 
                onChangeText={onChangeCreateName}
                label="이름" 
                name="name" 
                placeholder="이름"
            />
            <TextInput 
                value={inputBirthday}
                style={styles.input} 
                onChangeText={onChangeBirthday}
                label="생년월일" 
                name="birthday" 
                placeholder="생년월일"
            />
            <View style={styles.buttonContainHorizontal}>
                <TouchableOpacity
                    style={gender == 'MALE' ? styles.buttonSelect : styles.buttonNonSelect}
                    onPress={()=>setGender('MALE')}>
                    <Text style={gender == 'MALE' ? styles.buttonTextSelect : styles.buttonTextNonSelect}>{('남자')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={gender == 'FEMALE' ? styles.buttonSelect : styles.buttonNonSelect}
                    onPress={()=>setGender('FEMALE')}>
                    <Text style={gender == 'FEMALE' ? styles.buttonTextSelect : styles.buttonTextNonSelect}>{('여자')}</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
                value={inputCreatePhoneNumber}
                style={styles.input} 
                onChangeText={onChangeCreatePhoneNumber}
                label="전화번호" 
                name="phoneNumber" 
                placeholder="전화번호"
            />
            <View>
                <ActivityIndicator
                    style={styles.loading}
                    animating={activityLoading}
                    size="large"
                    color="#BFA0ED"
                />
            </View>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={onJoinMember}>
                <Text style={styles.submitButtonText}>가입하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        margin: 5
    },
    input: {
        paddingLeft: 10,
        margin: 5,
        width: '80%',
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1,
        borderRadius: 20,
    },
    inputCheck: {
        paddingLeft: 10,
        marginRight: 5,
        width: '55%',
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1,
        borderRadius: 20,
    },
    authButton: {
        backgroundColor: "#7a42f4",
        width: '25%',
        height: 40,
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#7a42f4",
        width: '50%',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
    },
    buttonContainHorizontal:{
        paddingLeft: 27,
        paddingRight: 27,
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row'
    },
    buttonNonSelect:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#7a42f4',
        marginLeft: 5,
    },
    buttonSelect :{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#7a42f4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        marginLeft: 5,
    },
    buttonTextSelect:{
        fontSize: 14,
        color: '#fafafa'
    },
    buttonTextNonSelect:{
        fontSize: 14,
        color: '#777'
    },
    loading: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
  });

export default Signup;