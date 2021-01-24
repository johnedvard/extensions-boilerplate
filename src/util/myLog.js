import twitch from './twitch';
export function myLog(msg, ...args) {
  if (twitch) {
    twitch.rig.log(msg, ...args);
  }
}
