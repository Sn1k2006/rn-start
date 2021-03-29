import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNExitApp from 'react-native-exit-app';

export const checkInternet = (started: boolean, callback: any) => NetInfo.addEventListener(async state => {
  if (!state.isConnected && !started) {
    Alert.alert('Нет подключения к интернету', 'Попробуйте перезагрузить приложение',
      [{text: 'Выйти', onPress: () => RNExitApp.exitApp()}],
      {cancelable: false}
    );
    return null;
  }
  callback(started, state.isConnected);
  started = true;
});