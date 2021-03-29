import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
// import {NavigationStackProp} from "react-navigation";
import Spinner from "./Spinner";
import Styles from "../constants/Styles";
import Colors from "../constants/Colors";
import {userState} from "../store";

interface Props {
  error: any
  navigation: StackNavigationProp<any>;
}

const ErrorBoundary: FC<Props> = ({error, navigation}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (error?.code === 401) {
      handleLogout();
    } else {
      setLoading(false);
    }
  }, []);

  const handleBack = () => {
    navigation.replace('Home');
  }
  const handleLogout = async () => {
    await userState.getUser();
    handleBack();
  }

  return (
    <View style={styles.container}>
      {loading
        ?
        <Spinner/>
        :
        <View style={{alignItems: 'center', paddingTop: 40}}>
          <Text style={Styles.text}>{error?.message || 'Произошла ошибка'}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg
  },
});

export default ErrorBoundary;