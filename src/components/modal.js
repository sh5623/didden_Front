import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Button,
  Modal,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Flower from '../../image/LDW_0695.jpg';

function ModalComponent() {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(modal ? false : true);
  };

  const route = useRoute();
  const appName = route.params ? route.params.appName : null;

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Button title="Open Modal" onPress={this.handleModal} />

      <Modal visible={modal} animationType="slide">
        <View style={{marginTop: 60}}>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert(appName, `${appName} - Click Event!`);
            }}>
            <Image source={Flower} style={styles.image} resizeMode="contain" />
            {/* <Image
                source={{uri: 'http://146.56.174.150:8080/img/image.jpg'}}
                style={styles.image}
                resizeMode="contain"
              /> */}
          </TouchableWithoutFeedback>
        </View>

        <Button title="Go Back" onPress={this.handleModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
  },
});

export default ModalComponent;
