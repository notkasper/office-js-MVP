import { observable, action } from "mobx";
import {
  putProfile as putProfileService,
  deleteProfile as deleteProfileService,
  updateProfile as updateProfileService
} from "../services/application";

class ProfileFormStore {
  @action putProfile = (profileData, callback = () => {}) => {
    putProfileService(profileData, (error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      callback(error, response);
    });
  };

  @action updateProfile = (id, profileData, callback = () => {}) => {
    updateProfileService(id, profileData, (error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
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
