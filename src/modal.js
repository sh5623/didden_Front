import React, {Component, version} from 'react';
import {
  View,
  Button,
  Modal,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Flower from '../image/LDW_0695.jpg';

class ModalComponent extends Component {
  state = {
    modal: false,
  };

  handleModal = () => {
    this.setState({modal: this.state.modal ? false : true});
  };

  render() {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Button title="Open Modal" onPress={this.handleModal} />
        <Modal visible={this.state.modal} animationType="slide">
          <View style={{marginTop: 60}}>
            <TouchableWithoutFeedback
              onPress={() => {
                alert('Click Event!');
              }}>
              <Image
                source={Flower}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </View>

          <Button title="Go Back" onPress={this.handleModal} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
  },
});

export default ModalComponent;
