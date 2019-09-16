import { observable, action } from "mobx";
import { sendDialogForm as dialogFormService } from "../services/exampleForm";

class ExampleFormStore {
  @observable counter = 0;

  @action incrementCounter = () => (this.counter += 1);

  @action sendDialogForm = (body, callback) => {
    dialogFormService(body, callback);
  };
}

const exampleFormStore = new ExampleFormStore();

export default exampleFormStore;
