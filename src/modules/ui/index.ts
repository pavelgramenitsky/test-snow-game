import Forms from "./Forms";

export default class UI {
  
  constructor() {
    window.methods.forms = new Forms();
    window.app.stage.addChild(window.methods.forms);
  }
}
