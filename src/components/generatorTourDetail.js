import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
  Image
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TourList from './tourlist';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';

function GeneratorTourDetail() {
    const route = useRoute();
    const [tourDetail, setTourDetail] = useState('');
    const [contentId, setContentId] =  useState(route.params.contentId);
    const [title, setTitle] = useState(route.params.title);
    const [area, setArea] = useState(route.params.area);
    const [address, setAddress] = useState(route.params.address);
    const [img, setImg] = useState(route.params.img);
    const [activityLoading, setActivityLoading] = useState(false);

    useEffect(() => {
        setActivityLoading(true);
        axios
            .post(`http://146.56.155.91:8080/tour/api/info/detailintro`, {
                contentTypeId: 12,
                contentId: contentId
            })
            .then(response => {
                if (response.data.response.body.items.item === undefined) {
                    Alert.alert(
                    'didden',
                    '데이터 정보를 불러오는중 오류가 발생했습니다.',
                    );
                    return;
                } else {
                    setTourDetail(current => response.data.response.body.items.item);
                }
            })
            .catch(error => {
                Alert.alert('didden', `Fail : ${error.message}`);
            })
            .finally(() => {
                setActivityLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{uri: img}} style={{width: 390, height: 260}} resizeMode='contain'/>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.contentArea}>
                <View style={styles.subArea}>
                    <Text style={styles.subText}>주소</Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>{address} {area}</Text>
                </View>
            </View>
            <View style={styles.contentArea}>
                <View style={styles.subArea}>
                    <Text style={styles.subText}>영업시간</Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>{tourDetail.usetime}</Text>
                </View>
            </View>
            <View style={styles.contentArea}>
                <View style={styles.subArea}>
                    <Text style={styles.subText}>연락처</Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>{tourDetail.infocenter}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    titleText: {
        padding: 10,
        margin: 10,
        fontSize: 25,
        fontWeight: "bold",
    },
    contentArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginLeft: 10,
        marginBottom: 5,
    },
    subArea: {
        flexDirection: 'row',
    },
    infoArea: {
        padding:5,
    },
    subText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    infoText: {
        fontSize: 16,
    }
});

export default GeneratorTourDetail;