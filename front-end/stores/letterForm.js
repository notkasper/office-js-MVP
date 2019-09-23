import { observable, action } from "mobx";
import {} from "../services/exampleForm";

class LetterFormStore {
  @observable sendOptions = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "grape", text: "Grape" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
  ];

  @observable contacts = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "grape", text: "Grape" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
  ];

  @observable salutations = [
    { key: "mvr", text: "Mvr." },
    { key: "dhr", text: "Dhr." },
  ];

  @observable signatures = [
    { key: "mvr", text: "Mvr." },
    { key: "dhr", text: "Dhr." },
  ];

  @observable greetings = [
    { key: "mvg", text: "Met vriendelijke groet" },
  ];
}

const letterFormStore = new LetterFormStore();

export default letterFormStore;
