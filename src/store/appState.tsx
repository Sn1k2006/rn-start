import {observable, action} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {YandexMetrica} from "react-native-appmetrica-yandex";
import moment from 'moment';

import {firebaseInitialization, googleInit, getTarget, facebookInit} from "../configs";
import {ELangs} from "../enums/e_app";
import {userState} from "./userState";

class AppState {
  private ping_interval: any;

  @observable connection: boolean = true;
  @observable ln: keyof typeof ELangs = 'ru';
  @observable is_auth: boolean = false;
  @observable ready: boolean = false;
  @observable showOnBoard: boolean = false;
  @observable preLogo: boolean = true;

  @action init = async () => {
    try {
      YandexMetrica.activateWithApiKey('e6332bd4-8b73-41cf-97b3-8ff52e9999fc');
      facebookInit();
      await getTarget();
      await googleInit();
      const fcm = await firebaseInitialization();
      await this.checkOnboard();
      await userState.getUser(fcm);
    } catch (e) {
    } finally {
      this.ping();
      this.ready = true;
    }
  };
  @action checkOnboard = async (close?: boolean) => {
    // await AsyncStorage.removeItem('onboard')
    if (close) return this.showOnBoard = false;
    const onboard = await AsyncStorage.getItem('onboard');
    if (!onboard) {
      this.preLogo = false;
      this.showOnBoard = true;
      await AsyncStorage.setItem('onboard', moment().format('YYYY-MM-DD HH:mm'));
    }
  }

  @action setConnection = (status: boolean): void => {
    this.connection = status;
  }

  @action ping = () => {
    this.ping_interval = setInterval(async () => {
      try {
      } catch (e) {
        if (e.code === 401) {
          this.is_auth = false;
          this.clearPing();
        }
      }
    }, 60000);
  };

  clearPing = () => {
    clearInterval(this.ping_interval);
  }

}

export const appState = new AppState();

