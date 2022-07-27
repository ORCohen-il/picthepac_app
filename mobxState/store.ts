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
import { order_Model } from "../models/orderModal";

class Store {
  @observable
  order: order_Model = new order_Model();
  orders: order_Model[] = [];
  openOrders: order_Model[] = [];
  token: String = "";
  name: String = "";

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

  async getOrders() {
    return new Promise(async (resolve, reject) => {
      this.token = await AsyncStorage.getItem("@token");

      await axios
        .get(globals.urls.deliveries, {
          params: { token: this.token }
        })
        .then((res) => {
          // console.log(res.data);
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
  async getOpenOrders() {
    return new Promise(async (resolve, reject) => {
      this.token = await AsyncStorage.getItem("@token");

      await axios
        .get(globals.urls.deliveries, {
          params: { token: this.token }
        })
        .then((res) => {
          // console.log(res.data);
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

  async Login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      let params = { email: username, password: password }
      await axios.post(`${globals.urls.login}`, params).then(async (res) => {
        if (res.data.loginSuccess) {
          await AsyncStorage.setItem('@token', res.data.token);
          await store.getOrders()
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch((err) => {
        reject(err)
        return;
      });


    });

  }


}

const store = new Store();

export default store;
