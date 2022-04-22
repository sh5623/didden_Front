import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {useDispatch, useSelector} from 'react-redux';
import {setByAmount, selectCount} from '../store/counterReducer';

function PickerComponent() {
  const route = useRoute();
  const [country, setCountry] = useState(route.params.country);
  //const [value, setValue] = useState(route.params.value);
  const value = useSelector(selectCount);
  const dispatch = useDispatch();

  sliderValueChange = value => {
    //setValue(value);
    dispatch(setByAmount(value));
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{height: 40, width: 300}}
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={this.sliderValueChange}
        step={1}
      />
      <Text style={styles.input}>{value}</Text>

      <Picker
        style={{height: 50, width: 250}}
        selectedValue={country}
        onValueChange={(val, index) => setCountry(val)}>
        <Picker.Item label="Korea" value="korea" />
        <Picker.Item label="USA" value="usa" />
        <Picker.Item label="Canada" value="canada" />
        <Picker.Item label="China" value="china" />
        <Picker.Item label="Japan" value="japan" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    fontSize: 25,
  },
});

export default PickerComponent;
