"use strict";

//取到canvas对象；
var canvas = document.querySelector('canvas');

//给canvas加宽高，不能通过css加宽高
canvas.width = '600';
canvas.height = '600';
//给canvas加样式
canvas.style.display = 'block';
canvas.style.margin = '50px auto';
canvas.style.border = '2px solid #333';
canvas.style.backgroundImage = './我的狗宝宝.jpg';
//创建 snake 数组
var snakeBody = [];
//snake 每个格子的大小
var snakeSize = 20;
//画布x，y上能放多少格
var snakeGridX = canvas.width / snakeSize;
var snakeGridY = canvas.height / snakeSize;
//snake长度
var snakeLength = 5;
var direction = 2; //向左
var food ;

//创建画布环境
var cvs = canvas.getContext('2d');
//生成snake

//
function creatSnakeBody(x,y){
    snakeBody.push({
        x:x,
        y:y,
        color: snakeBody.length===0 ? 'red':'yellow'
    })
}
//画snake
function drawSnake(){    
    for(var j = 0;j<snakeLength;j++){
        drawRect(snakeBody[j]);    
    }
    drawRect(food);
/*  
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 37 || e.keyCode == 65) { // 按 left 
            move_left(snakeBody) //要做的事情
        }
        if (e && e.keyCode == 39 || e.keyCode == 68) { // 按 right 
            move_right(snakeBody);      //要做的事情

        }
    };
*/
}
//画矩形
function drawRect(snakeBodyNode){
    cvs.beginPath();
    cvs.fillStyle =snakeBodyNode.color;
    cvs.fillRect(snakeBodyNode.x * snakeSize,snakeBodyNode.y*snakeSize,snakeSize,snakeSize);
    cvs.closePath();   
}
//初始化
function init(){
    cvs.clearRect(0, 0, canvas.width, canvas.height);
    snakeBody = [];
    for(let i = 0;i<snakeLength;i++){
        creatSnakeBody(parseInt(snakeGridX / 2) + i, parseInt(snakeGridY / 2));
    }
    creat_food();
    drawSnake();
}
//init();
/* 
function move_left(snakeBodyNode) {
    cvs.beginPath();
    cvs.fillStyle = snakeBodyNode.color;
    cvs.fillRect(snakeBodyNode.x - 1, snakeBodyNode.y, snakeSize, snakeSize);
    cvs.closePath();   
}
function move_right() {
    cvs.clearRect(0,0,canvas.width,canvas.height);
    for (var k = 0; k < snakeLength; k++) {
        snakeBody[k].x = snakeBody[k].x + 1;
    }
    drawSnake(snakeBody[k]);
    console.log(snakeBody);
}
*/
function snake_move(){
    cvs.clearRect(0, 0, canvas.width, canvas.height);

    for(var n = snakeBody.length-1;n>0;n--){
        snakeBody[n].x = snakeBody[n-1].x;
        snakeBody[n].y = snakeBody[n-1].y;
    }
    if(direction === 2){
        snakeBody[0].x -=1;
    }
    if (direction === -2) {
        snakeBody[0].x += 1;
    }
    if (direction === 1) {
        snakeBody[0].y -= 1;
    }
    if (direction === -1) {
        snakeBody[0].y += 1;
    }
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {

        console.log(111);
        creat_food();
        snakeLength++;
        snakeBody.push({
            x: snakeBody[snakeLength - 2].x,
            y: snakeBody[snakeLength - 2].y,
            color: snakeBody.length === 0 ? 'red' : 'yellow'
        })
    }
    if (snakeBody[0].x > snakeGridX-1 || snakeBody[0].x < 0 || snakeBody[0].y > snakeGridY-1 || snakeBody[0].y < 0){
//        alert("game over!");
        game_over();
        clearInterval(a);
        return;
    }
    
}
var a = setInterval(function(){
    snake_move();
    drawSnake();
},300)
//设置方向
function setDirection(dir){
    if (Math.abs(direction) === Math.abs(dir))
        return;
    direction = dir;
}

//按键
document.onkeydown = (function(event){
    event.preventDefault();
    switch(event.keyCode){
        case 37:
            setDirection(2);
            break;
        case 38:
            setDirection(1);
            break;
        case 39:
            setDirection(-2);
            break;
        case 40:
            setDirection(-1);
            break;
        case 65:
            setDirection(2);
            break;
        case 87:
            setDirection(1);
            break;
        case 68:
            setDirection(-2);
           break;
        case 83:
            setDirection(-1);
            break;
    }
})

function creat_food(){
    while(true){
        var flag = true;
        var foodX = parseInt(snakeGridX * Math.random());
        var foodY = parseInt(snakeGridY * Math.random());
        for(var h = 0;h<snakeBody.length;h++){
            if(foodX===snakeBody[h].x&&foodY===snakeBody[h].y){
                return;
            }
        }
        if(flag){
            break;
        }
    }
    food={
        x:foodX,
        y:foodY,
        color:'green'
    }
}
function eat(){
    if(snakeBody[0].x===food.x&&snakeBody[0].y===food.y){
        console.log(111);
        creat_food();
    }
    return snake_move();
}
function game_over(){
    localStorage.setItem('score',snakeLength-5);
    var n = localStorage.getItem('score');
    alert(n);
}