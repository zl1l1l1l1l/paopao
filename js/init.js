import { changeCanvasSize } from "./utils.js";
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext('2d');
export const globalColor = '0, 0, 0';

window.MyPaopao = {
  canvas,
  ctx,
  W: window.innerWidth,
  H: window.innerHeight,
  globalColor,
  paopaoLength: 50,
  paopaoLimit: {
    maxSize: 50.5,
    minSize: 10.5,
    maxSpeed: 1,
    mixSpeed: 0.5,
    radian: 30 * Math.PI / 180,
  }
}

function init() {
  ctx.lineCap = "round";
  changeCanvasSize();
}

init();