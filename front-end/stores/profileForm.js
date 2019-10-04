import { observable, action } from "mobx";
import { putProfile as putProfileService } from "../services/profileForm";

class ProfileFormStore {
  @observable profiles = [];

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
