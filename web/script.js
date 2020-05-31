let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{    
    x: 8 * box,
    y: 8 * box
}];
let direction = "right";


function createBackground(){

    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16* box, 16 * box);
}

function createSnake(){

    for(let i=0; i < snake.length; i++){

        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function update(event){

    //the keycode 39 represents the arrowright key
    //the new direction of the snake's head cannot be the reverse of the previously direction
    if(event.keyCode == 39 && direction != "left") direction = "right";

    //the keycode 37 represents the arrowleft key
    //the new direction of the snake's head cannot be the reverse of the previously direction
    if(event.keyCode == 37 && direction != "right") direction = "left";

    //the keycode 40 represents the arrowdown key
    //the new direction of the snake's head cannot be the reverse of the previously direction
    if(event.keyCode == 40 && direction != "up") direction = "down";

    //the keycode 38 represents the arrowup key
    //the new direction of the snake's head cannot be the reverse of the previously direction
    if(event.keyCode == 38 && direction != "down") direction = "up";
}
//Includind the event listener for the keyboard commands
document.addEventListener('keydown', update);

function startGame(){

    //creating the background of the canvas
    createBackground();

    //drawning the snake's head in the start position or in the last position of the previous loop
    createSnake();

    //getting the actual position of the snake's head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //getting the new position of the snake's head
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    //adjusting the position of the snake's head avoiding the border of the canvas 
    if(snakeX > 15 * box && direction == "right") snakeX = 0;
    if(snakeX < 0 && direction == "left") snakeX = 15 * box;
    if(snakeY > 15 * box && direction == "down") snakeY = 0;
    if(snakeY < 0 && direction == "up") snakeY = 15 * box;

    //the method pop() removes the last item of an array
    //erasing the snake's head   
    snake.pop();
    
    //setting the new position of the snake's head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //the method unshift() add a new item in the beginning of an array
    //drawning a new position of the snake's head after the repositioning
    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);

