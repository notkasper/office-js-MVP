import { observable, action } from "mobx";
import { getProfiles } from "../services/application";

class LetterFormStore {
  @observable contacts = [];

  @action getProfiles = (callback = () => {}) => {
    getProfiles((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.contacts = response.body;
      callback(error, response);
    });
  };

  @observable sendOptions = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "grape", text: "Grape" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
  ];

  @observable salutations = [
    { key: "mvr", text: "Geachte mevrouw" },
    { key: "dhr", text: "Geachte heer" },
    { key: "informal", text: "Beste" }
  ];

  @observable signatures = [
    { key: "mvr", text: "Mvr." },
    { key: "dhr", text: "Dhr." }
  ];

  @observable greetings = [
    { key: "mvg", text: "Met vriendelijke groet," },
    { key: "mvgn", text: "Met vriendelijke groeten," },
    { key: "informal", text: "Hartelijke groet, " },
    { key: "formal", text: "Hoogachtend, " }
  ];
}

const letterFormStore = new LetterFormStore();

export default letterFormStore;
