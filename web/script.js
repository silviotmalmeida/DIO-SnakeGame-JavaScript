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

function startGame(){

    //creating the background of the canvas
    createBackground();

    //drawning the snake's head in the start position or in the last position of the previous loop
    createSnake();

    //getting the actual position of the snake's head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    //the method pop() removes the last item of an array
    //erasing the snake's head   
    snake.pop();
    
    //getting the new position of the snake's head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //the method unshift() add a new item in the beginning of an array
    //drawning a new position of the snake's head after the repositioning
    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);

