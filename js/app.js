"use strict";

const sound = document.getElementById("sound");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const btnReset = document.querySelector(".btn-reset");
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
let tens = 0;
let seconds = 0;
let interval;

btnStart.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});

btnStop.addEventListener("click", stopTimer);
btnReset.addEventListener("click", resetTimer);

function startTimer() {
  sound.play();
  tens++;

  if (tens <= 9) {
    appendTens.innerHTML = `0${tens}`;
  } else if (tens > 9 && tens < 100) {
    appendTens.innerHTML = tens;
  } else {
    seconds++;
    tens = 0;
    appendTens.innerHTML = "00";
    appendSeconds.innerHTML = `0${seconds}`;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

function stopTimer() {
  sound.pause();
  clearInterval(interval);
}

function resetTimer() {
  sound.pause();
  clearInterval(interval);
  tens = 0;
  seconds = 0;
  appendTens.innerHTML = "00";
  appendSeconds.innerHTML = "00";
}


$(window).on("load", () => {
  setTimeout(removeLoader, 1600);
});

function removeLoader() {
  $("#loadingDiv").fadeOut(470, () => {
    $("#loadingDiv").remove();
  });
}

var ctx;
  $(document).ready(function(){
    ctx = $("#myCanvas").get(0).getContext('2d');
  });

var startPoint;
var currentPoint;
var drawing;
var moved = false;
var pickedColor = "#000";
var linewidth = "1.0";
$("#myCanvas").mousedown(function(e){
  startPoint = {x:e.clientX, y:e.clientY};
  drawing = true;
  ctx.beginPath();
});
$("#myCanvas").mousemove(function(e){
  $("#myCanvas").get(0).onselectstart = function(){
          return false;  
      };
  if(drawing)
  {
    moved = true;
    currentPoint = {x:e.clientX, y:e.clientY};
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.strokeStyle=pickedColor;
    ctx.lineWidth=linewidth;
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
    startPoint = currentPoint;
  }
});

$("#myCanvas").mouseup(function(e)
{
  
  if(!moved)
  {
    ctx.fillStyle=pickedColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, linewidth,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
  }
  moved = false;
  drawing = false;
});


$("div.colorPanel").mouseover(function(){
  $(this).css("border","1px solid #aaaaaa");
});
$("div.colorPanel").mouseleave(function(){
  $(this).css("border","");
});
$("div.colorPanel").click(function(){
  pickedColor = $(this).css("background-color");
  $("#myCanvas").css("border", "2px solid " + $(this).css("background-color"));
});


$("div.linewidth").mouseover(function(){
  $(this).css("border","1px solid #000");
});
$("div.linewidth").mouseleave(function(){
  $(this).css("border","1px solid #aaa");
});
$("div.linewidth").click(function(){
  linewidth = $(this).text();
  $("div.linewidth").css("background-color","#fff");
  $(this).css("background-color","#aaa");
});

$("#limpar").click(function(){
  ctx.clearRect(0,0, 500, 500);
});