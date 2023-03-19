import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function BadgeComponent(props) {
  return (
    <View style={containerStyles(props.backgroundColor).container}>
      <Text style={textStyles(props.color).badge}>{props.contain}</Text>
    </View>
  );
}

const containerStyles = backgroundColor =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      width: 50,
      height: 20,
      maxWidth: 50,
      maxHeight: 20,
      marginRight: 5,

      backgroundColor: backgroundColor,
    },
  });

const textStyles = color =>
  StyleSheet.create({
    badge: {
      display: 'flex',
      textAlign: 'center',

      color: color,
    },
  });

export default BadgeComponent;
