import { observable, action } from "mobx";
import { putProfile as putProfileService } from "../services/profileForm";

class ProfileFormStore {
  @observable counter = 0;
  @observable profile_items = [];

  @action incrementCounter = () => (this.counter += 1);

  @action putProfile = (body, callback = () => {}) => {
    this.profile_items.push(body);
    putProfileService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      console.log(`Put profile succes: ${response.body}`);
    });
  };
}

const profileFormStore = new ProfileFormStore();

export default profileFormStore;
