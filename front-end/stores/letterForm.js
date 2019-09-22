import { observable, action } from "mobx";
import {} from "../services/exampleForm";

class LetterFormStore {
  @observable test = 1;
}

const letterFormStore = new LetterFormStore();

export default letterFormStore;
