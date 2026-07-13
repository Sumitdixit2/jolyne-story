import { Howl, Howler } from 'howler';

class AudioManager {
  constructor() {
    this.tracks = {};
    this.currentTrack = null;
    this.audioContext = null;
  }

  initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Synthesizes a retro text blip (Game Boy style)
  playBlip() {
    this.initContext();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime); // keep volume subtle
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  loadTrack(name, src, loop = true) {
    if (!this.tracks[name]) {
      this.tracks[name] = new Howl({
        src: [src],
        loop: loop,
        volume: 0
      });
    }
  }

  crossfade(toTrackName, duration = 1500) {
    const fromTrack = this.currentTrack;
    const toTrack = this.tracks[toTrackName];

    if (!toTrack) return;
    
    // If the track is already the current track, make sure it's at full volume
    if (fromTrack === toTrack) {
      if (!toTrack.playing()) toTrack.play();
      toTrack.fade(toTrack.volume(), 1, duration);
      return;
    }

    if (fromTrack) {
      fromTrack.fade(fromTrack.volume(), 0, duration);
      setTimeout(() => {
        fromTrack.pause();
      }, duration);
    }

    toTrack.volume(0);
    toTrack.play();
    toTrack.fade(0, 1, duration);
    
    this.currentTrack = toTrack;
  }

  playSFX(name) {
    if (this.tracks[name]) {
      this.tracks[name].volume(1);
      this.tracks[name].play();
    }
  }

  stopAll() {
    Object.values(this.tracks).forEach(track => track.stop());
    this.currentTrack = null;
  }
}

export const audioManager = new AudioManager();
