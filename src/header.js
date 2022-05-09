import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components/native';

function Header({tokenAcc}) {
  return (
    <TouchableOpacity style={styles.background} onPress={() => Alert.alert('didden', `${tokenAcc}`)}>
      <View>
        <LogoImage style={styles.logo} source={require('../image/didden-clear.png')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 50,
    padding: 5,
    width: '100%',
  },
});

const LogoImage = styled.Image`
  height: 20px;
  margin: 0;
  padding: 0;
`;

export default Header;
