import { observable, action } from "mobx";

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
    { key: "lettuce", text: "Lettuce" },
    { key: "jan koeken", text: "Jan Koeken" }
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
