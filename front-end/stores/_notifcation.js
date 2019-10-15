import { observable, action } from "mobx";

// Store can be used by addons and dialogs
class NotificationStore {
  @observable message = "";
  @observable messageType = "";

  @action setMessage = (message, messageType = "info", time = 3000) => {
    this.message = message;
    this.messageType = messageType;
    setTimeout(() => {
      this.message = "";
      this.messageType = ""
    }, time);
  };

}

const notificationStore = new NotificationStore();

export default notificationStore;
