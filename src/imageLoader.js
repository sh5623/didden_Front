import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Text,
} from 'react-native';
import axios from 'axios';

function ImageLoader() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    axios
      .get('http://146.56.174.150:8080/file/list')
      .then(response => {
        setImageList(response.data.data);
      })
      .catch(error => {
        Alert.alert('didden', `이미지 로드에 실패했습니다. ${error.message}`);
      });
  }, []);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Text>test1</Text>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          Alert.alert('didden', `Click Event!`);
        }}>
        <Image source={imageSrc} style={styles.image} resizeMode="contain" />
      </TouchableWithoutFeedback> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
  },
});

export default ImageLoader;
