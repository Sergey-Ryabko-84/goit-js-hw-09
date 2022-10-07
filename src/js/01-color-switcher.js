import '../css/styles.css'

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

let intervalId = null;

function onStartBtnClick () {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    startBGColorChange();
}

function onStopBtnClick () {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
    clearInterval(intervalId);
}

function startBGColorChange () {
    intervalId = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

onStopBtnClick();

