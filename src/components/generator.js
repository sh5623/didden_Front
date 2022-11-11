import React, {useState} from 'react';
import {View, StyleSheet, Button, ScrollView} from 'react-native';
import NumList from './numlist';

function Generator() {
  const [random, setRandom] = useState([]);

  const onAddRandomNum = async () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setRandom(current => [...random, randomNum]);
  };

  const onNumDelete = position => {
    const newArray = random.filter((num, index) => {
      return position !== index;
    });

    setRandom(newArray);
  };

  return (
    <View style={styles.generator}>
      <Button
        title="Add Number"
        onPress={() => {
          onAddRandomNum();
        }}
      />
      <ScrollView style={{width: '100%'}} bounces={true}>
        <NumList nums={random} deleteFn={onNumDelete} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  generator: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default Generator;
