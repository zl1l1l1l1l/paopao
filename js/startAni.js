import { paopaoBox } from './class/paopaoBox.class.js';
import {
  winResize
} from './eventsFn.js';
const { ctx, W, H, globalColor, paopaoLength } = MyPaopao;
const winlisteners = [
  [ 'resize' , winResize ],
  [ 'click', winClick ]
];
const clickArr = [];

const boxObj = new paopaoBox(paopaoLength); // 泡泡盒子
let aniTimer = null; // 帧ID

// 点击存储坐标数组
export function winClick({clientX, clientY}) {
  clickArr.push([clientX, clientY]);
}

// 监听事件
function initListeners() {
  winlisteners.forEach(i => window.addEventListener(i[0], i[1]));
}

// 移除监听事件
function removeListeners() {
  winlisteners.forEach(i => window.removeEventListener(i[0], i[1]));
}


// 暂停动画
export function stopAnimation() {
  window.cancelAnimationFrame(aniTimer);
}

export function startAnimation() {
  ctx.fillStyle = `rgb(${globalColor})`;
  ctx.fillRect(0, 0, W, H);
  boxObj.saveClickArr(clickArr); // 存储点击坐标，自动处理点击泡泡
  boxObj.render();
  clickArr.length = 0;
  aniTimer = window.requestAnimationFrame(startAnimation);
}

startAnimation();
initListeners();
