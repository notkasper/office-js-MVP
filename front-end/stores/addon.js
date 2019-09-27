import { observable, action } from "mobx";
import { testApi as testApiService } from "../services/application";
import { oauth as oauthService } from "../services/application";

class Store {
  @observable counter = 0;

  @action incrementCounter = () => (this.counter += 1);

  @action testApi = callback => {
    testApiService(callback);
  };

  @action authorize = callback => {
    oauthService(callback);
  };
}

const store = new Store();

export default store;
