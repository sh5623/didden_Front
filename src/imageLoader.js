import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
//import GridImageView from 'react-native-grid-image-viewer';

function ImageLoader() {
  const [imageList, setImageList] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    setActivityLoading(true);
    axios
      .get('http://146.56.174.150:8080/tour/api/image')
      .then(response => {
        setImageList(response.data.body.items.item);
        setActivityLoading(false);
      })
      .catch(error => {
        Alert.alert('didden', `이미지 로드에 실패했습니다. ${error.message}`);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {!activityLoading ? (
          imageList.map(image => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert(
                  'didden',
                  `Fild Id : ${image.galContentId}, File Name : ${image.galTitle}`,
                );
              }}
              key={image.galContentId}>
              <Image
                source={{uri: image.galWebImageUrl}}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
          ))
        ) : (
          // <GridImageView
          //   data={imageList.map(image => {
          //     return image.fileUrl;
          //   })}
          // />
          <View>
            <ActivityIndicator
              style={styles.loading}
              animating={activityLoading}
              size="large"
              color="purple"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 195,
    height: 190,
    borderColor: 'white',
    borderWidth: 1,
  },
  loading: {
    position: 'absolute',
    left: 200,
    right: 0,
    bottom: 0,
    top: 300,
  },
});

export default ImageLoader;
