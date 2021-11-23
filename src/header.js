import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const Header = props => (
  <TouchableOpacity
    style={styles.background}
    onPress={() => Alert.alert('didden', 'Hi, We are didden!')}>
    <View>
      <Text style={styles.textStyle}>{props.name}</Text>
    </View>
  </TouchableOpacity>
);

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
