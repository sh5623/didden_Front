import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
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

  const getImageApi = async () => {
    setActivityLoading(true);
    await axios
      .get(`http://146.56.155.91:8080/tour/api/info/image`)
      .then(response => {
        if (response.data === undefined) {
          Alert.alert('didden', '데이터를 불러오는중 오류가 발생했습니다.');
          return;
        } else {
          setImageList(response.data.body.items.item);
        }
      })
      .catch(error => {
        Alert.alert('didden', `이미지 로드에 실패했습니다. ${error.message}`);
      })
      .finally(() => {
        setActivityLoading(false);
      });
  };

  useEffect(() => {
    getImageApi();
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
                // Alert.alert(
                //   'didden',
                //   `Fild Id : ${image.galContentId}, File Name : ${image.galTitle}`,
                // );
                axios
                  .post(`http://146.56.155.91:8080/tour/api/info/detail`, {
                    contentId: '126508',
                    contentTypeId: '',
                  })
                  .then(response => {
                    console.warn(response);
                  })
                  .catch(error => {
                    Alert.alert('error', error.message);
                  });
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
