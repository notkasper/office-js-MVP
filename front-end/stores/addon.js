import { observable, action } from "mobx";
import { testApi as testApiService } from "../services/application";
import { signIn as signInService } from "../services/application";

class Store {
  @observable counter = 0;

  @action incrementCounter = () => (this.counter += 1);

  @action testApi = callback => {
    testApiService(callback);
  };
}

const store = new Store();

export default store;
