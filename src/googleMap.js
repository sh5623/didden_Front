import React, {useState, useEffect} from 'react';
import {View, Text, Platform, Alert, TextInput} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

requestPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
  } catch (e) {
    Alert.alert('오류', e);
  }
};

const googleMapRef = React.createRef();

function GoogleMapComponents() {
  const [location, setLocation] = useState();

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos.coords);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, []);

  if (!location) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        style={{flex: 1}}
        placeholder="Search"
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        onPress={(data, details = null) => {
          //console.log(data, details);
          //console.log(JSON.stringify(details.geometry.location));

          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });

          googleMapRef.current.animateToRegion({
            latitude: Number(JSON.stringify(details.geometry.location.lat)),
            longitude: Number(JSON.stringify(details.geometry.location.lng)),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }}
        onFail={error => {
          console.log(error);
        }}
        query={{
          key: 'AIzaSyDIgasSZJpe10_wtTT5vnsekA_sNfCvADs',
          language: 'kr',
        }}
      />
      <MapView
        style={{flex: 1}}
        ref={googleMapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={`${location.latitude}`}
          description="didden place example"
        />
      </MapView>
    </View>
  );
}

export default GoogleMapComponents;
