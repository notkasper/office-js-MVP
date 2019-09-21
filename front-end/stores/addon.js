import { observable, action } from "mobx";
import { testApi as testApiService } from "../services/application";
import { signIn as signInService } from "../services/application";

class Store {
  @observable counter = 0;

  @action incrementCounter = () => (this.counter += 1);

  @action testApi = callback => {
    testApiService(callback);
  };

  @action signIn = (username, password, callback) => {
    signInService(username, password, (error, response) => {
      if (error) {
        console.error("An error has occurred:" + error);
      } else {
        localStorage.setItem("Token", "auth");
      }
      callback(error, response);
    });
  };
}

const store = new Store();

export default store;
