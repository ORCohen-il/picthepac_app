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
import globals from "../globals/globals";
import { order_Model } from "../models/orderModal";

class Store {
  @observable
  order: order_Model = new order_Model();
  orders: order_Model[] = [];

  constructor() {
    makeAutoObservable(this, {});
    autorun(() => {
      this.getOrders();
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
      // console.log(`token === ${sessionStorage.getItem('token')}`);
      await axios
        .get(globals.urls.deliveries, {
          params: { token: "K2v6JyyqjbaPKVoxsfWN64" }
        })
        .then((res) => {
          // if (res.data.loginSuccess == true) {
          if (res) {
            this.orders = res.data;
            resolve(res.data);
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
}

const store = new Store();

export default store;
