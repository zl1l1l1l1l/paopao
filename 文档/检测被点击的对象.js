/**
 * @step1 初始
 * 1). 维护点击坐标数组(每次点击后往数组里push一个坐标，重新调用动画) clickArr
 * 2). new paopaoBox
 * 
 * @click clickArr.push(x, y)
 * 
 * @play requestAnimationFrame循环调用动画
 * 
 * @step2 动画一帧（可能有很多次点击事件）
 * 
 * @if deleteArr.length > 0
 * 1). ctx.beginPath()
 * 2). paopao调用破碎方法
 * 3). 根据deleteArr长度创建paopao（y = 0），加入paopaoBox内部
 * 3). 清空deleteArr
 * 4). paopaoBox调用删除函数， 删除对应deleteArr内部对象
 * 
 * @if clickArr > 0 时（记录点击对象）
 * 1). 维护所需删除泡泡数组 deleteArr
 * 2). paopao - 判断点击点是否在当前绘制图像内部（ctx.isPointInPath() => true/false）
 * 3). 判断重叠泡泡哪个zIndex最大
 * 4). push进deleteArr
 * 5). 清空clickArr数组
 * 
 * 1). 调用paopaoBox内部渲染函数
 * 
*/











