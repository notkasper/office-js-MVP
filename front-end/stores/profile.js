import { observable, action } from "mobx";
import {
  createProfile,
  retrieveProfiles,
  retrieveProfile,
  deleteProfile
} from "../services/profile";

class ProfileStore {
  @observable profile_items = [];
  @observable selected_profile_id = null;
  @observable formal_name = "";
  @observable informal_name = "";
  @observable phone_number = "";
  @observable mobile_number = "";
  @observable email = "";
  @observable work_function = "";
  @observable department = "";
  @observable establishment = "";
  @observable generate_outlook_signature = false;
  @observable extra_text = "";
  @observable whatsapp = "";
  @observable working_days = "";
  @observable opening_hours = "";

  @action retrieveProfileList = () => {
    retrieveProfiles((error, response) => {
      this.profile_items = response.body;
    });
  };

  @action retrieveProfile = (key, callback) => retrieveProfile(key, callback);

  @action sendDialogForm = (body, callback) => {
    createProfile(body, (error, response) => {
      const {
        header: { location }
      } = response;

      const id = location.substring(location.lastIndexOf("/") + 1);
      this.profile_items.push({ uuid: id, ...body });
    });
  };

  @action deleteProfile = () => {
    if (this.selected_profile_id) {
      deleteProfile(this.selected_profile_id, (error, response) => {
        this.retrieveProfileList();
      });
    }
  };
}

const profileStore = new ProfileStore();

export default profileStore;
