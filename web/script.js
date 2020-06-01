let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{    
    x: 8 * box,
    y: 8 * box
}];
let direction = "right";
let food = {
    x: 0,
    y: 0
};

function createBackground(){

    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
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

function generateFoodPosition(){

    //the funcion random() returns a random number between 0 and 1
    //the function floor() returns a integer of a number
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
}

function drawFood(){

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//generating the food position
generateFoodPosition();

//Includind the event listener for the keyboard commands
document.addEventListener('keydown', update);

function startGame(){

    //creating the background of the canvas
    createBackground();

    //drawning the snake's head in the start position or in the last position of the previous loop
    createSnake();

    //drawning the snake's food in the start position or in the last position of the previous loop
    drawFood();

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

    //verifing the crash conditions
    for(let i =1; i < snake.length; i++){

        //if snake's head crashes any part of it's body, the game will end
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert("Game Over! You made " + snake.length + "points.");
            location.reload();            
        }
    }

    //if not reaches the food, the snake's body won't grow
    if (snakeX != food.x || snakeY != food.y){

        //the method pop() removes the last item of an array
        //erasing the snake's head   
        snake.pop();
    }
    //if reaches the food, the snake's body will grow and generates a new food
    else{

        //generating the food position
        generateFoodPosition();
        //drawning the snake's food   
        drawFood();
    }    
    
    //setting the new position of the snake's head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //the method unshift() add a new item in the beginning of an array
    //drawning a new position of the snake's head after the repositioning
    snake.unshift(newHead);

    //if snake's size become 15, the game is over
    if(snake.length == 15){
        clearInterval(game);
        alert("You won! You made " + snake.length + "points.");
        location.reload();            
    }
}

//creating a infinite loop of starGame() execution 
let game = setInterval(startGame, 100);