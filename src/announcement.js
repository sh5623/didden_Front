import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {Alert, Text} from 'react-native';
import axios from 'axios';

function Announcement() {
  const [arr, setArr] = useState([]);

  async function findAll() {
    await axios
      .get('http://localhost:8080/anno', {})
      .then(res => {
        if (res.status.toString() === '200') {
          console.log(res.data);
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
    <ContainerView>
      <Collapse>
        <CollapseHeader>
          <DropButton>
            <DropButtonText>위시리스트1</DropButtonText>
          </DropButton>
        </CollapseHeader>
        <CollapseBody>
          {arr.map((item, index) => (
            <Text>
              {item.annoId} {item.annoTitle} {item.annoContent}
            </Text>
          ))}
        </CollapseBody>
      </Collapse>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  align-items: flex-start;
  /* justify-content: center; */
  width: 100%;
  padding: 20px;
`;
const DropButton = styled.View`
  width: 100%;
  height: 50px;
  padding: 5px;
  margin: 1px;
  justify-content: center;
  border: 1px solid black;
`;

const DropButtonText = styled.Text`
  font-size: 20px;
`;

export default Announcement;
