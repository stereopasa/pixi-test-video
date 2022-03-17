export const gameWidth = 1280;
export const gameHeight = 720;

export const videoList = {
  lose: './videos/lose.mp4',
  uncut_loop_anticipation: './videos/uncut_loop_anticipation.mp4',
  uncut_win: './videos/uncut_win.mp4',
  triumph: './videos/triumph.mp4',
  uncut_loop_punch: './videos/uncut_loop_punch.mp4',
  uncut_loop_run: './videos/uncut_loop_run.mp4',
};

export type VideoName = keyof typeof videoList;
export const videoNames = Object.keys(videoList) as VideoName[];
