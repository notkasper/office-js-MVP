import { observable, action } from 'mobx';
import { getProfiles as getProfilesService, getAanheffen as getAanheffenService } from '../services/application';

class LetterFormStore {
  @observable contacts = [];
  @observable aanheffen = [];

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

  @observable greetings = [
    { key: 'mvg', text: 'Met vriendelijke groet' },
    { key: 'mvgn', text: 'Met vriendelijke groeten' },
    { key: 'informal', text: 'Hartelijke groet' },
    { key: 'formal', text: 'Hoogachtend' }
  ];
}

const letterFormStore = new LetterFormStore();

export default letterFormStore;
