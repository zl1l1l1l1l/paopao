import { globalColor, ctx } from './init.js'
import { packagePath } from './config.js';
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

/**
 * 线上：包名一定在origin后
 * @param str 根目录起始，有/
*/
export function getDeployUrl(str) {
  if(new RegExp(`(http|https):\/\/.*?\/${packagePath}`).test(location.href)) {
    // 线上
    return location.origin + `/${packagePath}` + str;
  }else {
    return location.origin + str;
  }
}