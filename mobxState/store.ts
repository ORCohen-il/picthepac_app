import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  makeAutoObservable,
  autorun,
  runInAction,
  configure
} from "mobx";
import React from "react";
import { ToastAndroid } from "react-native";
import globals from "../globals/globals";
import { LoginUser } from "../models/LoginUser";
import { order_Model } from "../models/orderModal";
import { order_EmissaryModel } from "../models/order_emissaryModel";

class Store {
  @observable
  order: order_Model = new order_Model();
  orders: order_Model[] = [];
  openOrdersEmissary: order_EmissaryModel[] = [];
  login_user: LoginUser = {};
  name: String = "";

  source = axios.CancelToken.source();


  constructor() {
    makeAutoObservable(this, {});
    autorun(() => {
      // this.getOrders();
    });
    runInAction(() => {
      // this.onDelivery()
    });
    configure({
      enforceActions: "never"
    });
  }

  /** { req {}, res {data of openOrders} } **/
  async openOrders() {
    return new Promise(async (resolve, reject) => {
      this.login_user.token = await AsyncStorage.getItem("@token");
      await axios
        .get(`${globals.urls.deliveries}/open`, {
          params: { token: this.login_user.token }
        })
        .then((res) => {
          if (res.data) {
            this.orders = res.data;
            resolve(true);
          } else {
            this.orders = [];
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getOpenEmissary() {
    return new Promise(async (resolve, reject) => {
      this.login_user.token = await AsyncStorage.getItem("@token");
      await axios
        .get(`${globals.urls.deliveries}/openEmissary`, {
          params: { token: this.login_user.token, aid: this.login_user.aid }
        })
        .then((res) => {
          if (res.data) {
            this.openOrdersEmissary = res.data;
            // console.log(this.openOrdersEmissary);
            resolve(true);
          } else {
            this.openOrdersEmissary = [];
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async Login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      let params = { email: username, password: password };
      await axios
        .post(`${globals.urls.login}`, params, { timeout: 10000 })
        .then(async (res) => {
          if (res.data.loginSuccess) {
            this.login_user = res.data;
            await AsyncStorage.setItem("@token", this.login_user.token);
            await store.openOrders();
            await store.getOpenEmissary();
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          return;
        });
    });
  }
}

const store = new Store();

export default store;
