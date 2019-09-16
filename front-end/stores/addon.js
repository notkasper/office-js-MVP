import { observable, action } from "mobx";
import { testApi as testApiService } from "../services/application";
import { signIn as signInService } from "../services/application";

class Store {
  @observable counter = 0;

  @observable route = "home";

  @observable setRoute = (route) => (this.route = route);

  @action incrementCounter = () => (this.counter += 1);

  @action testApi = callback => {
    testApiService(callback);
  };

  @action signIn = (username, password, callback) => {
    signInService(username, password, (error, response) => {
      Office.context.document.settings.set("token", response.body.token);
      Office.context.document.settings.saveAsync(() => {
        console.log(Office.context.document.settings.get("token"));
      });
      callback(error, response);
    });
  };
}

const store = new Store();

export default store;
