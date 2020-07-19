import { registerRootStore } from 'mobx-keystone';
import MenuModel from '../models/MenuModel';

const createStore = (): MenuModel => {
  const store = new MenuModel({
    speed: 50,
    elements: 15,
  });

  registerRootStore(store);
  return store;
};

export default createStore;
