import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

function Header({name, tokenAcc}) {
  return (
    <TouchableOpacity
      style={styles.background}
      onPress={() => Alert.alert('didden', `${tokenAcc}`)}>
      <View>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'lavender',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 50,
    padding: 5,
    width: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
