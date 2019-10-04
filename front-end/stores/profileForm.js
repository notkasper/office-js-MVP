import { observable, action } from "mobx";
import { putProfile as putProfileService } from "../services/profileForm";

class ProfileFormStore {
  @observable profiles = [];

  @action putProfile = (profile, callback = () => {}) => {
    putProfileService(profile, (error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.profiles.push(profile);
      callback(error, response);
    });
  };
}

const profileFormStore = new ProfileFormStore();

export default profileFormStore;
