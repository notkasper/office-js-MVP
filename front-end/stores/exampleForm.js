import { observable, action } from "mobx";

class ExampleFormStore {
  @observable counter = 0;

  @action incrementCounter = () => (this.counter += 1);
}

const exampleFormStore = new ExampleFormStore();

export default exampleFormStore;