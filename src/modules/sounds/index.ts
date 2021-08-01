import sounds from "./sounds";

export default class SoundsManager {
  constructor() {
    window.methods.sounds = new sounds();
  }
}
