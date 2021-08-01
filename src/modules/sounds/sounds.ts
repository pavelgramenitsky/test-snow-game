class Sounds {
  soundList = {};

  constructor() {
    const enableMusic = window.state.settings.enableMusic;
    const fastPlay    = window.state.settings.fastPlay;

    this.soundList = {
      snd_music               : { options: { type: "snd_mainTheme", volume: 0.05, loop: true } },
     
      
      // and other sounds...
    };

    Object.keys(this.soundList).forEach((item) => {
      // Init settings for sound
      window.resources[item].sound.volume = this.soundList[item].options.volume ?? 1;
      window.resources[item].sound.loop = this.soundList[item].options.loop || false;
    });
  }

  switchVolume(name: string, type: boolean): void {
    window.resources[name].sound.volume = type ? 1 : 0;
  }

  switchVolumeEffects(type: boolean): void {
    Object.keys(this.soundList).forEach((item) => {
      if (this.soundList[item].options.type === "snd_effect") {
        window.resources[item].sound.volume = type ? 1 : 0;
      }
    });
  }

  play(sound: string, onComplete: () => void): void {
    const instance = window.resources[sound].sound.play();

    if (onComplete) {
      instance.on("end", () => {
        onComplete();
      });
    }
  }

  stop(sound: string): void {
    window.resources[sound].sound.stop();
  }
}

export default Sounds;
