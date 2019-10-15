import { observable, action } from "mobx";

// Store can be used by addons and dialogs
class NotificationStore {
  @observable message = "";

  @action setMessage = (message) => {
    this.message = message;
    const time = 3000
    setTimeout(() => {
      this.message = "";
    }, time);
  };

}

const notificationStore = new NotificationStore();

export default notificationStore;
