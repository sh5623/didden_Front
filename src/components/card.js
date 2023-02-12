import React, {useEffect, useState} from 'react';
import {TourApi} from '../service/api/didden/TourApi';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

function CardComponent() {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTourList();
  }, []);

  const getTourList = async () => {
    setIsLoading(false);
    const {
      data: {data},
    } = await TourApi.getTourList('', '', '', '');
    if (data) {
      setImageList(data);
      setIsLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}>
        {isLoading ? (
          imageList.map(image => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert('didden', `contentId : ${image.contentId}, title : ${image.title}`);
              }}
              key={image.galContentId}>
              <View style={styles.card}>
                <Image source={{uri: image.firstImage}} style={styles.image} resizeMode="cover" key={image.contentId} />
                <Text style={styles.imageTitle}>{image.title}</Text>
                <Text style={styles.badge}>{image.highCodeName}</Text>
                <Text style={styles.badge}>{image.middleCodeName}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <View>
            <ActivityIndicator style={styles.loading} animating={isLoading} size="large" color="purple" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edebeb',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    height: 180,
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#edebeb',
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 20,
  },
  imageTitle: {
    position: 'relative',
    left: 200,
    top: -145,
  },
  loading: {
    position: 'absolute',
    left: 200,
    right: 0,
    bottom: 0,
    top: 300,
  },
});

export default CardComponent;
