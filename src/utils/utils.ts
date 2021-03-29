import {Toast} from 'native-base';
import {Vibration, Linking} from 'react-native';
import {StackActions} from "@react-navigation/native";
import moment from "moment";

type TAlerts = 'danger' | 'success' | "warning"

export function clearStackAndRoute(navigation: any, route: string) {
  navigation.dispatch(StackActions.popToTop());
  navigation.navigate(route);
}

export function clearRouteParams(navigation: any) {
  const {params} = navigation.state;
  let result: any = {}
  if (params) Object.keys(params).map(key => result[key] = undefined)
  navigation.setParams(result)
}


export function toast(text: string = "", type: TAlerts = "danger") {
  Toast.show({
    text: text,
    type: type,
    position: "top",
    duration: 2500,
    textStyle: {fontSize: 14},
    style: {zIndex: 9999, top: 20},
  });
  if (type !== "danger") return;
  setTimeout(() => {
    Vibration.vibrate(100);
  }, 100)
}

export const getPassDate = (date: string, count?: boolean): string | number => {
  let startDay = moment(date).startOf('day');
  let startOfToday = moment().startOf('day');
  let diff = (startDay.diff(startOfToday, 'days'));
  if(count) return diff;
  const localDate = moment.utc(date).local();
  if (diff === 0) return 'Сегодня ' + localDate.format('HH:mm');
  else if (diff === -1) return 'Вчера ' + localDate.format('HH:mm');
  else return localDate.format('DD.MM.YYYY HH:mm');
};


export const linkToBrowser = (url: string) => {
  if(url) {
    Linking?.canOpenURL(url).then(supported => {
      if (supported) {
        Linking?.openURL(url);
      } else {
        toast('Некорректная ссылка');
      }
    });
  }
};

