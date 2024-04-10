import { globalColor, ctx } from './init.js'

/**
 * 获取区间内的数字，四舍五入保留两位小数
*/
export function getRandom(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

// 重置画布大小
export function changeCanvasSize() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  MyPaopao.W = W;
  MyPaopao.H = H;
  fillPaopaoBox(W, H);
}

// 主色填充
export function fillPaopaoBox(W, H) {
  ctx.fillStyle = `rgb(${globalColor})`;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#fff';
}
