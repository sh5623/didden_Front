import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Image, StyleSheet, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function ImagePickerComponent() {
  const [avatar, setAvatar] = useState('');

  const addImage = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel) {
        setAvatar(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Image source={{uri: avatar}} style={styles.avatar} accessibilityLabel="Select Image" />
      <Button title="Add an Image" onPress={() => this.addImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 400,
  },
});

export default ImagePickerComponent;
