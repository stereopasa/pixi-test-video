import { GUI } from 'lil-gui';
import { Application, resources, Sprite, Texture } from 'pixi.js';
import { gameHeight, gameWidth, videoList, VideoName, videoNames } from './constants';
import { addResize } from './utils';
import VideoResource = PIXI.resources.VideoResource;

const app = new Application({
  view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  width: gameWidth,
  height: gameHeight,
});

const gui = new GUI({ width: 300 });

const back = Sprite.from('images/back.jpg');
back.anchor.set(0.5);
back.position.set(app.screen.width / 2, app.screen.height / 2);

app.stage.addChild(back);

const guiObject: { video: VideoName | null; isPlaying: boolean } = {
  video: null,
  isPlaying: true,
};

const videoResources = Object.fromEntries(
  Object.entries(videoList).map(([name, path]) => [
    name,
    new resources.VideoResource(path, { autoPlay: false }),
  ]),
) as Record<keyof typeof videoList, VideoResource>;
// @ts-ignore
Promise.all(Object.values(videoResources).map((r) => r.load())).then(() => {
  const name = videoNames[0];
  videoCtrl.setValue(name);
  playVideo(name);
});

const videoSprite = new Sprite();
app.stage.addChild(videoSprite);
videoSprite.anchor.set(0.5);
videoSprite.position.set(app.screen.width / 2, app.screen.height / 3);
videoSprite.scale.set(0.65);

let video: HTMLVideoElement;
const videoCtrl = gui
  .add(guiObject, 'video', [...Object.keys(videoList)])
  .onFinishChange(async (name: keyof typeof videoList) => playVideo(name));

gui.add(guiObject, 'isPlaying').onChange((isPlaying: boolean) => {
  if (video) {
    isPlaying ? video.play() : video.pause();
  }
});

function playVideo(name: keyof typeof videoList): void {
  video?.pause();
  video?.removeEventListener('ended', playNextVideo);
  const videoRes = videoResources[name];
  video = videoRes.source as HTMLVideoElement;
  video.addEventListener('ended', playNextVideo);
  videoSprite.texture = Texture.from(video);
  // videoSprite.scale.set(video.videoWidth / gameWidth);
  if (guiObject.isPlaying) {
    void video.play();
  }
}

function playNextVideo(): void {
  const prevName = guiObject.video as VideoName;
  const nextName = videoNames[(videoNames.indexOf(prevName) + 1) % videoNames.length];
  console.log('prev:', prevName, 'next:', nextName);
  videoCtrl.setValue(nextName);
  playVideo(nextName);
}

addResize(app);
