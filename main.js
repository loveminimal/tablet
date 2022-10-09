let cvs = document.querySelector('#cvs');	// 获取画布
let ctx = cvs.getContext('2d'); 			// 上下文
let curPoint = ''; 							// { x, y }
let img = document.querySelector('#img');

// console.log(cvs.offsetLeft, cvs.offsetTop);
// console.log(cvs.width, cvs.height);

initCvs();

// -------------------------------------------------------

// 初始化 ///

function initCvs() {
	// 初始自定义画布背景色
	// ctx.fillStyle = "rgba(255, 255, 0, 1)";
	// ctx.fillRect(0, 0, cvs.width, cvs.height);

	// ctx.strokeStyle = '#f00';
}

// -------------------------------------------------------

// 移动端事件 ///

function touchstart(e) {
    curPoint = e.changedTouches[0];
    drawstart(curPoint.pageX - cvs.offsetLeft, curPoint.pageY - cvs.offsetTop);
}

function touchmove(e) {
    curPoint = e.changedTouches[0];
    drawmove(curPoint.pageX - cvs.offsetLeft, curPoint.pageY - cvs.offsetTop);
}

function touchend(e) {
    drawend();
}

// -------------------------------------------------------

// PC 端事件 ///

function mousedown(e) {
    drawstart(e.pageX - cvs.offsetLeft, e.pageY - cvs.offsetTop);
}

function mousemove(e) {
    if (e.buttons === 1) {	// 鼠标左键按下时
        drawmove(e.pageX - cvs.offsetLeft, e.pageY - cvs.offsetTop);
    }
}

function mouseup(e) {
    drawend();
}

// -------------------------------------------------------

// 处理函数 ///

function drawstart(x, y) {
    document.body.classList.add('body-fix');	// 书写时禁止页面滚动

    ctx.beginPath();
    ctx.moveTo(x, y);
}

function drawmove(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawend() {
    // ctx.closePath()
    document.body.classList.remove('body-fix');	// 书写完成恢复页面滚动
}

// -------------------------------------------------------

// 相关操作 ///

// 生成签名
function expCvs() {
    let src = cvs.toDataURL('image/png', 1);
    /*
     * canvas.toDataURL(type, encoderOptions)
	 * 返回：
	 * - 该方法返回一串 URI 字符串（canvas 中图像数据的 base64 编码）
	 * 
	 * 参数：
     * - type：图像格式，默认为"image/png"
     * - encoderOptions：数值为 0 ~ 1，表示图片质量，仅在 type 为 "image/jpeg" 或 "image/webp" 时有效
     *
	 * 其他：
     * png 默认生成图片无背景，jpeg 默认生成图片为黑色背景
     * 如果需要白色背景，可以在绘制前先绘制背景：
     * ctx.fillStyle = '#fff';
     * ctx.fillRect(0, 0, canvas.width, canvas.height);
     */
    console.log(src);
    img.src = src;
}

// 清除签名
function clrCvs() {
    ctx.clearRect(0, 0, 600, 300);
    img.src = '';
}

// 选择签名颜色
function selectColor(e) {
    console.log(e.target.value);
    ctx.strokeStyle = e.target.value;
}

// -------------------------------------------------------

// 选择界面语言（与功能实现无关，纯属无聊 😂） ///

let title = document.querySelector('#title');
let gen = document.querySelector('#gen');
let clr = document.querySelector('#clr');
let en = false;

function switchLang() {
	en = !en;

	title.innerText = en ? 'Tablet' : '手写板';
	gen.innerText = en ? 'Generate' : '生成';
	clr.innerText = en ? 'Clear' : '清除';
}