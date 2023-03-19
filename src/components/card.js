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
import BadgeComponent from './badge';

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
                <View style={styles.cardLeft}>
                  <Image
                    source={{uri: image.firstImage}}
                    style={styles.image}
                    resizeMode="cover"
                    key={image.contentId}
                  />
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.area}>
                    {image.areaName} {image.sigunuName}
                  </Text>
                  <Text style={styles.imageTitle}>{image.title}</Text>
                  <View style={styles.badgeArea}>
                    <BadgeComponent
                      style={styles.badge}
                      color={'#f07e06'}
                      backgroundColor={'#ffff7c'}
                      contain={image.highCodeName.split('_')[0]}
                      key={image.highCodeName}
                    />
                    <BadgeComponent
                      style={styles.badge}
                      color={'#006600'}
                      backgroundColor={'#6cc570'}
                      contain={image.middleCodeName}
                      key={image.middleCodeName}
                    />
                  </View>
                </View>
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
    flexDirection: 'row',
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
  cardLeft: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    maxWidth: 150,
    maxHeight: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  cardRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',

    marginLeft: 15,
  },
  area: {
    marginTop: 20,
    color: 'grey',
    fontSize: 12,
  },
  imageTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  badgeArea: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 15,
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
