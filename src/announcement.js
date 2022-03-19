import React from 'react';
import styled from 'styled-components/native';

function Announcement() {
  return (
    <ContainerView>
      <DropButton title="위시리스트1">
        <DropButtonText>위시리스트1</DropButtonText>
      </DropButton>
      <DropButton title="자주묻는질문">
        <DropButtonText>자주묻는질문</DropButtonText>
      </DropButton>
      <DropButton title="1:1문의">
        <DropButtonText>1:1문의</DropButtonText>
      </DropButton>
    </ContainerView>
  );
}
const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  padding: 20px;
`;
const DropButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 5px;
  margin: 1px;
  justify-content: center;
`;

const DropButtonText = styled.Text`
  font-size: 20px;
`;

export default Announcement;
