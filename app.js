const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = INITIAL_COLOR; /*선들이 모두 이 색을 가지고 있음 */
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX; /*캔버스 내에서 좌표 값 */
  const y = event.offsetY;
  console.log(event);
  if (!painting) {
    /*클릭하고 움직이면 if문은 실행되지 않음 */
    ctx.beginPath();
    ctx.moveTo(x, y); /*그리지 않을 때, x,y좌표값으로 path(선) 생성*/
  } else {
    ctx.lineTo(x, y); /*path의 마지막 점을 특정 좌표와 직선으로 연결함*/
    ctx.stroke(); /*그린다(lineto&stroke는 마우스를 움직이는 내내 발생*/
  }
}
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true; /*fill 모드인 상황*/
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    /*filling이 true였을 때 배경 색 칠하므로 paint로 바꾸면 if문에 해당하지 않아서 배경채우기x paint모드로 사용 가능 */
    ctx.fillRect(0, 0, 700, 700);
  }
}
function handleCM(event) {
  event.preventDefault(); /*마우스 우클릭 방지*/
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image; /*href는 image(url) */
  link.download = "yerin"; /*download는 파일명 */
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); /*위에서 움직일때 */
  canvas.addEventListener("mousedown", startPainting); /*클릭했을 때 */
  canvas.addEventListener("mouseup", stopPainting); /*마우스 놓을때*/
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener(
    "contextmenu",
    handleCM
  ); /*마우스 우클릭 시 나오는 거 */
}
/*offset(캔버스 안에서 좌표값) 만약 캔버스를 풀화면크기로 했다면 client와 차이 없*/

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange); /*input주의*/
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
