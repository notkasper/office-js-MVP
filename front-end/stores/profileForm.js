import { observable, action } from "mobx";
import {
  putProfile as putProfileService,
  deleteProfile as deleteProfileService
} from "../services/application";

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

  @action deleteProfile = (id, callback) => {
    deleteProfileService(id, (error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      callback(error, response);
    });
  };
}

const profileFormStore = new ProfileFormStore();

export default profileFormStore;
