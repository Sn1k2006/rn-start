import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from "mobx-react";
import Home from "../components/Home";

interface Props extends StackScreenProps<any> {
}

@observer
class HomeScreen extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>


        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;