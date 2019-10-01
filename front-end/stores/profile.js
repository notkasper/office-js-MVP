import { observable, action } from "mobx";
import { createProfile, retrieveProfiles } from "../services/profile";

class ProfileStore {
  @observable profile_items = [];

  @action retrieveProfileList = callback => {
    retrieveProfiles((error, response) => {
      this.profile_items = response.body;
    });
  };

  @action sendDialogForm = (body, callback) => {
    this.profile_items.push(body);
    createProfile(body, callback);
  };
}

const profileStore = new ProfileStore();

export default profileStore;
