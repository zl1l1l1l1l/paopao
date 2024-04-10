import { changeCanvasSize } from './utils.js';
import { startAnimation, stopAnimation } from './startAni.js';

// 窗口大小重置
export function winResize() {
  changeCanvasSize();
  stopAnimation()
  startAnimation();
}



