import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

interface Props {
}

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()}><Text>Go to Home</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Profile;