import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {StackScreenProps} from "@react-navigation/stack";
import Profile from "../components/Profile";

interface Props extends StackScreenProps<any> {
}

class ProfileScreen extends PureComponent<Props> {
  render(){
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileScreen;