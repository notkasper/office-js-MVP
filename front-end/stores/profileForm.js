import { observable, action } from "mobx";
import { putProfile as putProfileService } from "../services/profileForm";

class ProfileFormStore {
  @observable counter = 0;
  @observable profiles = [];

  @action incrementCounter = () => (this.counter += 1);

  @action putProfile = (profile, callback = () => {}) => {
    this.profiles.push(profile);
    putProfileService(profile, (error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      console.log(`Put profile succes: ${response.body}`);
      callback(error, response)
    });
  };
}

const profileFormStore = new ProfileFormStore();

export default profileFormStore;
