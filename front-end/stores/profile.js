import { observable, action } from "mobx";
import { createProfile as profileService } from "../services/profile";

class ProfileStore {
  @observable profile_items = [];

  @action sendDialogForm = (body, callback) => {
    this.profile_items.push(body);
    profileService(body, callback);
  };
}

const profileStore = new ProfileStore();

export default profileStore;
