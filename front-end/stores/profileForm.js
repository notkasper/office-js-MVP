import { observable, action } from 'mobx';
import {
  createProfile as createProfileService,
  deleteProfile as deleteProfileService,
  updateProfile as updateProfileService,
  getEstablishments as getEstablishmentsService,
  getDepartments as getDepartmentsService,
  getWorkFunctions as getWorkFunctionsService
} from '../services/application';

class ProfileFormStore {
  @observable establishments = [];
  @observable departments = [];
  @observable workFunctions = [];

  @action getEstablishments = (callback = () => {}) => {
    getEstablishmentsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.establishments = response.body.data;
      callback(error, response);
    });
  };

  @action getWorkFunctions = (callback = () => {}) => {
    getWorkFunctionsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.workFunctions = response.body.data;
      callback(error, response);
    });
  };

  @action getDepartments = (callback = () => {}) => {
    getDepartmentsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.departments = response.body.data;
      callback(error, response);
    });
  };

  @action createProfile = (profileData, callback = () => {}) => {
    createProfileService(profileData, (error, response) => {
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
