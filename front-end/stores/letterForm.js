import { observable, action } from 'mobx';
import {
  getProfiles as getProfilesService,
  getAanhefs as getAanhefsService,
  getGroetOpties as getGroetOptiesService
} from '../services/application';

class LetterFormStore {
  @observable contacts = [];
  @observable aanhefs = [];
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

  @action getAanhefs = (callback = () => {}) => {
    getAanhefsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.aanhefs = response.body.data;
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
