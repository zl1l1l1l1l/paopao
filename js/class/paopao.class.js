import { getRandom, getDeployUrl } from "../utils.js";
const { 
  ctx,
  W,
  H,
} = window.MyPaopao;
let myZIndex = 0;

/**
 * 根据弧度获取延长范围（仅top）
 * @param {number} radian （角度 * π / 180）
*/
export function getExtendLen(radian) {
  const deg = radian * 180 / Math.PI;
  if (deg > 180) {
    return H / Math.tan((deg - 180) * Math.PI / 180)
  }else {
    return H / Math.tan(radian)
  }
}

function getMySound() {
  return new Audio(getDeployUrl('/assets/sounds/paopao.wav'));
}

/**
 * 角度 = 弧长 / 周长 = 弧长/(2πr) = 弧度*r/(2πr) = 弧度/(2π)
 * 弧度 = 弧长 / 半径 = [(角度 / 360) * 周长] / 半径 =[ (角度 / 360) * 2πr] / r = 角度 * π / 180
*/

export class Paopao {
  /**
   * @param {number} r 泡泡半径
   * @param {number} x 中心点横坐标
   * @param {number} y 中心点纵坐标
   * @param {number} speed 速度 ？px/mm
   * @param {number} radian 初始化运动弧度，根据电脑坐标系，（角度 * π / 180）
  */
  constructor(r, x, y, speed, radian) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radian = radian;
    this.myZIndex = myZIndex;
    this.paopaoPath = null;
    this.paopaoSound = getMySound();
    myZIndex++;
  }

  // 绘制泡泡
  paint() {
    this.paopaoPath = new Path2D();
    this.paopaoPath.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

    // 先画背面
    const gradient = ctx.createRadialGradient(this.x + this.r *3 / 4, this.y + this.r *3 / 4, this.r/100, this.x, this.y, this.r);

    gradient.addColorStop(0, "rgba(255, 60, 0, 0.8)");
    gradient.addColorStop(1, "pink");

    const gradient1 = ctx.createRadialGradient(this.x - this.r / 2, this.y - this.r / 2, this.r/100, this.x, this.y, this.r);
    gradient1.addColorStop(0, "rgb(255, 255, 255, 0.1)");
    gradient1.addColorStop(1, "rgba(255, 0, 0, 0.3)");

    ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;
    ctx.fill(this.paopaoPath);
    ctx.fillStyle = gradient1;
    ctx.fill(this.paopaoPath);
  }

  // 移动泡泡
  move() {
    this.x += this.speed * Math.cos(this.radian);
    this.y += this.speed * Math.sin(this.radian);
    this.paint();
    if(this._checkOverScreen()) {
      // this.bursting();
    }
  }

  // 泡泡破碎
  bursting() {
    this.paopaoSound?.play();
  }

  // 检测点击事件是否是在当前泡泡上
  checkClickSelf(x, y) {
    return ctx.isPointInPath(this.paopaoPath, x, y);
  }

  // 改变弧度（风向）
  changeRadian(radian) {
    this.radian = this.radian + radian;
  }

  // 超出屏幕重置位置
  _resizePos(x, y) {
    this.x = x;
    this.y = y;
  }

  // 跟根据移动方向检测泡泡是否超出屏幕
  _checkOverScreen() {
    const deg = this.radian * 180 / Math.PI;
    const r = this.r;
    const x = this.x;
    const y = this.y;
    let extendLen = getExtendLen(this.radian); // 延长，以防空白
    
    // console.log(extendLen)
    if(deg <= 90) {
      if (x - r >= W || y - r >= H) {
        this._resizePos( getRandom(-extendLen, W), -r );
        return true;
      }
      return false;
    }
    if(deg <= 180 && deg > 90) {
      if (y - r >= H || x + r <= 0) {
        this._resizePos( getRandom(0, W + extendLen), -r );
        return true;
      }
      return false;
    }
    if(deg > 180 && deg <= 270) {
      if (y + r <= 0 || x + r <= 0) {
        this._resizePos( getRandom(0, W + extendLen), H + r );
        return true;
      }
      return false;
    }
    if(deg > 270 && deg <= 360) {
      if (y + r <= 0 || x - r >= W) {
        this._resizePos( getRandom(-extendLen, W), H + r );
        return true;
      }
      return false;
    }
    return false;
  }
}