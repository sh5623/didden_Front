import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {Text, Alert, View, Button, TouchableOpacity, Modal, Pressable, Image} from 'react-native';
import axios from 'axios';

function Announcement() {
  const [arr, setArr] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [annoTitle, setAnnoTitle] = useState();
  const [annoContent, setAnnoContent] = useState();

  async function findAll() {
    await axios
      .get('http://146.56.155.91:8080/anno', {})
      .then(res => {
        if (res.status.toString() === '200') {
          setArr(res.data);
          // Alert.alert('success', res.status.toString());
        } else {
          Alert.alert('error', res.status.toString());
        }
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  useEffect(() => {
    findAll();
  }, []);

  return (
    <View>
      {/* Modal 구현 */}
      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'}}>
          <View style={{
            flex: 0.5,
            borderRadius : 5,
            borderColor : '#cccccc',
            borderWidth : 1,
            backgroundColor : '#ffffff',
            padding: 5,
          }}>
            <Text>{annoTitle}</Text>
            <Text>{annoContent}</Text>
            {/* Modal 다이얼로그 숨기기 */}
            <Button title='닫기' onPress={() => setModalVisible(false)}/>
          </View>
        </View>
      </Modal>

      <Collapse onToggle={()=>setToggle(prev => !prev)}>
        <CollapseHeader>
          <HeaderView>
            <DropButtonText>업데이트&공지</DropButtonText>
            {!toggle ? <Image source={{uri:'http://146.56.155.91:8080/img/icon/icon_35.png'}} style={{width:35, height:35}}/> : <Image source={{uri:'http://146.56.155.91:8080/img/icon/icon_36.png'}} style={{width:35, height:35}}/>}
            {/* <ToggleButton>{!toggle ? "+" : "-"}</ToggleButton> */}
          </HeaderView>
        </CollapseHeader>
        <CollapseBody>
          {arr.map((item, index) => (
            <Pressable
            onPress={() => {
              setModalVisible(true),
              setAnnoTitle(item.annoTitle);
              setAnnoContent(item.annoContent);
            }}>
            <ContentView>
              <TitleText>
                {/* {item.annoId} {item.annoTitle} {item.annoContent} */}
                {item.annoTitle}
              </TitleText>
            </ContentView>
            </Pressable>
          ))}
        </CollapseBody>
      </Collapse>
    </View>
  );
}

const HeaderView = styled.View`
  background-color: #E6E6E6;
  width: 100%;
  padding: 20px;
  padding-left: 30px;
  border: 1px solid lightgray;
  display: flex;
`;
const ContentView = styled.View`
  width: 100%;
  padding-top: 20px;
  padding-left: 40px;
`;
const DropButtonText = styled.Text`
  font-size: 20px;
`;
const ToggleButton = styled.Text`
  top: 10px;
  right: 25px;
  font-size: 30px;
  position: absolute;
`;
const TitleText = styled.Text`
  font-size: 18px;
`;

export default Announcement;
