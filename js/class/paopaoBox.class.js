import { getRandom } from "../utils.js";
import { Paopao, getExtendLen } from "./paopao.class.js";

const {
  ctx,
  W,
  H,
  paopaoLimit: { minSize, maxSize, mixSpeed, maxSpeed, radian },
} = window.MyPaopao; // 画笔

/**
 * @param {boolean} isInit 是否是初始化随机位置
 * @param {string} pos 初始化位置 top right bottom left
*/
function getNewPaopao(isInit, pos) {
  let x = 0;
  let y = 0;
  let extendLen = getExtendLen(radian);
  const size = getRandom(minSize, maxSize);
  if (isInit) {
    switch(pos) {
      case 'top':
        x = getRandom(-extendLen, W);
        y = -size - getRandom(0, H * 3/4);
        break;
      case 'right':
        x = W + size + getRandom(0, W * 3/4);
        y = getRandom(0, H);
        break;
      case 'bottom':
        x = getRandom(0, W + extendLen);
        y = H + size + getRandom(0, H * 3/4);
        break;
      case 'left':
        x = -size - getRandom(0, W * 3/4);
        y = getRandom(0, H);
        break;
    }
  } else {
    x = getRandom(-extendLen, W);
    y = getRandom(0, H);
  }
  return new Paopao(
    size,
    x,
    y,
    getRandom(mixSpeed, maxSpeed),
    radian
  )
}

export class paopaoBox {
  /**
   * @param {number} len paopao的多少
   *
   */
  constructor(len) {
    this.len = len;
    // 当前泡泡数组
    this.paopaoSet = new Set(
      Array.from(new Array(len)).map( i => getNewPaopao())
    );
    // 泡泡被点击数组
    this.clickArr = [];
    // 泡泡破碎数组
    this.deleteSet = new Set();
  }

  // 渲染
  render() {
    if (this.deleteSet.size > 0) {
      this._bursting();
      this.deleteSet.clear();
    }
    const paopaoSet = this.paopaoSet;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // 泡泡填充颜色
    for(const pao of paopaoSet) {
      ctx.beginPath();
      if (this.clickArr.length > 0) {
        this.clickArr.forEach(i => {
          const clickedPaopao = this._getClickedPaopao(...i);
          if(clickedPaopao) {
            this.deleteSet.add(clickedPaopao)
          }
        })
      }
      pao.move();
    }
  }

  // 找到被点击的泡泡
  _getClickedPaopao(x, y) {
    const checkPaopaos = Array.from(this.paopaoSet).filter(paopao => paopao.checkClickSelf(x, y));
    const MaxZIndex = Math.max(...checkPaopaos.map(paopao => paopao.myZIndex));
    this.clickArr.length = 0;
    return checkPaopaos.find(item => item.myZIndex === MaxZIndex )
  }
  
  // 存储本次点击坐标数组
  /**
   * @param {array} clickArr 点击坐标[x, y]的集合
  */
  saveClickArr(clickArr) {
    if(clickArr.length === 0) {
      return;
    }
    this.clickArr = this.clickArr.concat(clickArr);
  }

  // 泡泡破碎渲染
  _bursting() {
    const deleteSet = this.deleteSet;
    for(const pao of deleteSet) {
      ctx.beginPath();
      pao.bursting();
      this.paopaoSet.delete(pao);
    }
    this.addMyPaopao(deleteSet.size);
    // if (this.paopaoSet.size === 0) {
    //   this.addMyPaopao(this.len);
    // }
  }

  // 泡泡新生
  /**
   * @param {number} len 新生长度
  */
  addMyPaopao(len) {
    for(let i = 0; i < len; i++) {
      this.paopaoSet.add(getNewPaopao(true, 'top'));
    }
  }
}
