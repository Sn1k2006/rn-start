import {NativeModules, Platform} from "react-native";
import {getBundleId, getUniqueId} from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";

export function getDeviceLocale() {
  let locale;
  if(Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    locale = NativeModules.I18nManager.localeIdentifier
  }
  return locale ? locale.split('_')[0] : 'ru';
}

export const getRegisterDeviceInfo = async () => {
  const bundle_id = getBundleId();
  const device_id = getUniqueId();
  const platform = Platform.OS;
  const async_storage = await AsyncStorage.multiGet(['fcm', 'target', 'ln']);
  const fcm = async_storage[0][1];
  const target = async_storage[1][1];
  const lang = async_storage[2][1];
  return {bundle_id, device_id, fcm, target, lang, platform}
};

