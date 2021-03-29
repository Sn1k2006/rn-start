import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

interface Props {
}

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Profile')}><Text>Go to profile1111</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;