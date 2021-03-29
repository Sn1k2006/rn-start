import {Platform} from 'react-native';
import {api, getRegisterDeviceInfo} from "../utils";
import {getBundleId} from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";
import {IUser} from "../interfaces/i_user";

type TSocial = (user: IUser) => Promise<IUser>

export const apiGetUser = async (): Promise<IUser> => {
  const bundle_id = getBundleId();
  try {
    const res =  await api('/users/get_user', {platform: Platform.OS, bundle_id}, 'GET');
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const apiSocialRegister:TSocial = async (user):Promise<IUser> => {
  try {
    const info = await getRegisterDeviceInfo();
    const res = await api('/users/social', {...user, ...info}, 'POST');
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (e) {
    throw e;
  }
};


export const apiUpdateUser = async <T>(user:T):Promise<IUser> => {
  try {
    const res = await api(`/users`, user, 'PUT');
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const apiLogout = async ():Promise<IUser> => {
  try {
    const bundle_id = getBundleId();
    const res = await api(`/users/logout`, {bundle_id}, 'POST');
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (e) {
    throw e;
  }
};

