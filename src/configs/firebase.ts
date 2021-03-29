import AsyncStorage from '@react-native-community/async-storage';
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import analytics from "@react-native-firebase/analytics";
import {AppEventsLogger} from 'react-native-fbsdk';
import ReactNativeAppsFlyer from 'react-native-appsflyer';
import {YandexMetrica} from 'react-native-appmetrica-yandex';

export const firebaseInitialization = async () => {
  const fcm = await messaging().getToken() || '';
  await AsyncStorage.setItem('fcm', fcm);
  return fcm;
};

export const initNotification = async (handleClick: any) => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    messaging().getInitialNotification().then(handleClick);
    messaging().onNotificationOpenedApp(handleClick);
    messaging().onMessage(notificationLog);
    messaging().setBackgroundMessageHandler(notificationLog);
  } else {
    messaging().requestPermission().then(() => initNotification(handleClick));
  }
}

export async function logEvent(name = '', params = {}) {
  await analytics().logEvent(name, params);
}

export const notificationLog = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const data: { tasks?: string } | undefined = message.data;
  if (data?.tasks) {
    const tasks: any = JSON.parse(data.tasks);
    if (tasks.Facebook) {
      AppEventsLogger.logEvent(tasks.Facebook.name, tasks.Facebook.params);
    }
    if (tasks.AppsFlyer) {
      await ReactNativeAppsFlyer.logEvent(
        tasks.AppsFlyer.name,
        tasks.AppsFlyer.params,
      );
    }

    if (tasks.Firebase) {
      switch (tasks.Firebase.name) {
        case 'in_app_purchase':
          await analytics().logPurchase(tasks.Firebase.params || {});
          break;
        case 'sign_up':
          await analytics().logSignUp(tasks.Firebase.params || {});
          break;
        default:
          await analytics().logEvent(
            tasks.Firebase.name,
            tasks.Firebase.params || {},
          );
      }
    }

    if (tasks.AppMetrica) {
      YandexMetrica.reportEvent(tasks.AppMetrica.name, tasks.AppMetrica.params);
    }
  }
};
