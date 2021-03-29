import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import appsFlyer from 'react-native-appsflyer';
import {getBundleId, getUniqueId} from "react-native-device-info";
//@ts-ignore
import RNInstallReferrer from 'react-native-install-referrer';
import {api} from "../utils";

export const getTarget = async () => {
  let is_first_launch = await AsyncStorage.getItem("is_first_launch");
  if (!is_first_launch) {
    await AsyncStorage.setItem("is_first_launch", JSON.stringify(true));
    appsFlyer.onInstallConversionData(async (res) => {
        console.log('onInstallConversionData ', res);
        let target = res?.data || {};
        if (Platform.OS === 'android') {
          let referrer = await RNInstallReferrer.getReferrer();
          referrer = referrer?.installReferrer;
          if (referrer === 'utm_source=(not%20set)&utm_medium=(not%20set)' || referrer === 'utm_source=google-play&utm_medium=organic') referrer = null;
          if (referrer) target = {...target, referrer}
        }
        console.log('Target ', target);
        await installTarget(target);
      }
    );

    await appsFlyer.initSdk({
      appId: "1534535211",
      devKey: "QT2RaeNKmHjwwY4w6Wkpc7",
      isDebug: false,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
    });
  }
};

const installTarget = async (target: any) => {
  // if(target === 'utm_source=(not%20set)&utm_medium=(not%20set)' || target === 'utm_source=google-play&utm_medium=organic' ) target = null;
  if (target) await AsyncStorage.setItem("target", JSON.stringify(target));
  const device_id = getUniqueId();
  const bundle_id = getBundleId();
  const platform = Platform.OS;
  let initialURL = null;
  if (platform === 'ios') initialURL = await Linking.getInitialURL() || null;
  await api('/install', {target, device_id, bundle_id, platform, initialURL}, 'POST');
};

