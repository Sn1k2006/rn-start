import AsyncStorage from "@react-native-community/async-storage";
import {getDeviceLocale} from "./deviceUtils";

export const endpoint: string = "https://api.bethelp.site/api/v1";
export const HOST: string = endpoint.replace('/api/v1', '/');

type TMethods = 'POST' | 'GET' | "PUT" | 'DELETE'

export function api(method: string, args: any, type: TMethods = 'POST', silent: boolean = false, URL: string | null = null): any {

  return new Promise((resolve, reject) => {
    function processReject(error: any) {
      if (!silent) reject(error);
      else resolve(false);
      throw error;
    }

    AsyncStorage.multiGet(["token", 'ln']).then((keys) => {
      let token = keys[0][1];
      let lang = keys[1][1] || getDeviceLocale();
      let params = '';

      if (type === 'GET') {
        Object.keys(args).map(key => {
          if (Array.isArray(args[key])) {
            args[key] = args[key].join(',');
          }
          params += `&${key}=${args[key]}`
        });
        method += `?token=${token}&lang=${lang}${params}`;
      } else {
        method += `?token=${token}&lang=${lang}`
      }
      fetch(URL || (endpoint + method), {
        method: type,
        headers: {
          'Content-Type': 'application/json',
        },
        body: type !== 'GET' ? JSON.stringify(args) : null
      }).then(res => {
        console.log(type + ': ' + endpoint + method, args);
        res.json().then((data) => {
          console.log(data);
          if (data.hasOwnProperty('error')) processReject(data.error);
          else if (data) resolve(data);
          else processReject({message: 'Invalid Server Response', code: 2})
        }).catch((error) => {
          console.log(error);
          console.info('Error on request: ' + endpoint + method, args);
          processReject('Network Error');
          throw error;
        });
      }).catch((error) => {
        processReject(error);
      });
    });
  })
}
