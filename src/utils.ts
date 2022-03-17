import { Application } from 'pixi.js';
import { gameHeight, gameWidth } from './constants';

export function addResize(app: Application): void {
  const resize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
    app.stage.scale.set(scale);
    app.stage.position.set(
      (window.innerWidth - gameWidth * scale) / 2,
      (window.innerHeight - gameHeight * scale) / 2,
    );
  };

  resize();

  window.addEventListener('resize', resize);
}
