import { observable, action } from "mobx";
import { sendDialogForm as dialogFormService } from "../services/exampleForm";

class ExampleFormStore {
  @observable counter = 0;
  @observable profile_items = [];

  @action incrementCounter = () => (this.counter += 1);

  @action sendDialogForm = (body, callback) => {
    console.log("Incoming:", body);
    this.profile_items.push(body);
    dialogFormService(body, callback);
  };
}

const exampleFormStore = new ExampleFormStore();

export default exampleFormStore;
