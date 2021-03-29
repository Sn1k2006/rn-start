import React, {PureComponent} from 'react';
import {Modal, StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import {observer} from "mobx-react";
import Icons from "./Icons";
import Styles from "../constants/Styles";
import Colors from "../constants/Colors";

interface Props {
  visible: boolean
}

@observer
class NoInternet extends PureComponent<Props> {
  render() {
    const {visible} = this.props;
    return (
      <Modal visible={visible} transparent>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={{marginBottom: 20}}>{Icons.no_inet()}</View>
            <Text style={[Styles.light, {textAlign: 'center'}]} uppercase>Нет подключения к интернету</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000090',
    justifyContent: "center",
  },
  content: {
    alignItems: 'center',
    padding: 16,
    justifyContent: "center",
    backgroundColor: Colors.second_bg
  }
});

export default NoInternet;