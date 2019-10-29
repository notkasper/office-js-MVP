import { observable, action } from 'mobx';
import {
  getProfiles as getProfilesService,
  getAanheffen as getAanheffenService,
  getGroetOpties as getGroetOptiesService
} from '../services/application';

class LetterFormStore {
  @observable contacts = [];
  @observable aanheffen = [];
  @observable groetOpties = [];

  @action getProfiles = (callback = () => {}) => {
    getProfilesService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.contacts = response.body.data;
      callback(error, response);
    });
  };

  @action getAanheffen = (callback = () => {}) => {
    getAanheffenService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.aanheffen = response.body.data;
      callback(error, response);
    });
  };

  @action getGroetOpties = (callback = () => {}) => {
    getGroetOptiesService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.groetOpties = response.body.data;
      callback(error, response);
    });
  };
}

const letterFormStore = new LetterFormStore();

export default letterFormStore;
