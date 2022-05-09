import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTokenAcc} from './store/tokenReducer';
import Header from '../src/header';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';

function Home() {
  const tokenAcc = useSelector(selectTokenAcc);
  const navigation = useNavigation();
  const appName = '.didden';
  const [mainImages, setMainImages] = useState([]);
  const [loadingMainImages, setLoadingMainImage] = useState(false);

  useEffect(() => {
    getMainImage();
  }, []);

  const getMainImage = async () => {
    await axios
      .get(`http://146.56.155.91:8080/main/content/images`)
      .then(response => {
        if (response.data) {
          setMainImages(response.data);
          setLoadingMainImage(true);
        }
      })
      .catch(error => {
        Alert.alert('didden', `이미지 로드에 실패했습니다. ${error.message}`);
        setLoadingMainImage(false);
      });
  };

  return (
    <View style={styles.home}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          alignItems: 'center',
          height: 500,
        }}>
        <Header tokenAcc={tokenAcc} />

        {loadingMainImages ? (
          <SliderBox
            images={mainImages.map(mainImage => {
              return mainImage.contentUrl;
            })}
            autoplay={true} // 자동 슬라이드 넘김
            sliderBoxHeight={500}
            circleLoop={true} // 이미지 반복
            imageLoadingColor="purple" // 이미지 로딩 색상
            style={styles.image}
            autoplayInterval={1000 * 7} // 이미지 넘기는 속도
          />
        ) : (
          <View></View>
        )}
        <Button
          title="Go Components"
          onPress={() => {
            navigation.navigate('components');
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    display: 'flex',
    height: 2000,
  },
  image: {
    height: 500,
    borderColor: 'white',
    borderWidth: 1,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default Home;
