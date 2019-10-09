import { observable, action } from "mobx";
import {
  putProfile as putProfileService,
  deleteProfile as deleteProfileService,
  updateProfile as updateProfileService,
  getEstablishments as getEstablishmentsService
} from "../services/application";

class ProfileFormStore {
  @observable establishments = [];

  @action getEstablishments = (callback = () => {}) => {
    getEstablishmentsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.establishments = response.body;
      callback(error, response);
    });
  };

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
