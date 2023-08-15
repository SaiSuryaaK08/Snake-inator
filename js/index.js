//Game Constants & variables
let InputDir ={x:0,y:0};
//type object
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 9;
let score =0;
let lastPaintime =0;
let snakeArr =[
    //snake position
    {x:13,y:15}
];
food ={x:6,y:7};
//Game Functions


function main(ctime){
    //Game loop
    //ctime =current time basically the call back time of the main function
    //thus reduce the ctime by checking a condition ,1000 to convert millisecond to second
    window.requestAnimationFrame(main);
    if((ctime - lastPaintime)/1000 < 1/speed){
        return;
        //if ctime is less than 0.5s then it will not render or callback
    }
    lastPaintime =ctime;
    gameEngine();
}

function gameEngine(){
    //Part1 :Updating the snake Array & Food

    if(snakeArr.length === 18*18){
        gameOverSound.play();
        musicSound.pause();
        InputDir ={x:0,y:0};
        alert("Congratutlations you've won ,Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score =0;
        scoreBox.innerHTML("Score:"+ 0);
    }
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        InputDir ={x:0,y:0};
        alert("Game Over ,Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score =0;
        scoreBox.innerHTML("Score:"+ 0);
        
        
    }

    function isCollide(sarr) {

        ///if you bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
            //body === head
            if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
                return true;
            }
        }

        //Out of Bound or into the wall
        if(snakeArr[0].x >=18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
            return true;
        }
        
    }

    //if you have eaten the food increment the score and regenerate the food
    //when both the head and food co -ordinates collide then increment score
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highScoreval){
            highScoreval =score;
            localStorage.setItem("highScore",JSON.stringify(highScoreval));
            HighScoreBox.innerHTML ="highScore:" + highScoreval;
        }
        scoreBox.innerHTML ="Score:" + score;
        // Unlike the equality operator, the strict equality operator always considers operands of different types to be different.
        snakeArr.unshift({x:snakeArr[0].x + InputDir.x ,y: snakeArr[0].y +InputDir.y});
        let a =2;
        let b =16;
        food ={x:Math.round(a +(b - a)*Math.random()),y:Math.round(a +(b - a)*Math.random())};
        //Mathematical cal for generating random no between a and b
    }

    //Moving your Snake
    for (let i = snakeArr.length - 2; i >=0 ; i--) {
    
        //snakeArr[i+1] = snakeArr[i]; if you keep doing this every element will point to one val so create a new object using ... opertor
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;

    //Part 2: Dispplay the snake
    //empty the board
    board.innerHTML ="";
    snakeArr.forEach((element,index)=>{
        //Increase the size of the snake after eating
        snakeElement =document.createElement('div');
        //adding css element
        //vertical = y,horizontal =x;
        snakeElement.style.gridRowStart =element.y;
        snakeElement.style.gridColumnStart =element.x;
        if(index ==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    FoodElement =document.createElement('div');
    //adding css element
    //vertical = y,horizontal =x;
    FoodElement.style.gridRowStart =food.y;
    FoodElement.style.gridColumnStart =food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);
}





//HighScore

let highScore = localStorage.getItem("highScore");
if(highScore ===null){
    highScoreval =0;
    localStorage.setItem("highScore",JSON.stringify(highScoreval));
}
else{
    highScoreval = JSON.parse(highScore);
    HighScoreBox.innerHTML ="HighScore :"+ highScore;
}

//Main logic executed here
// musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicSound.play();
    InputDir = {x:0,y:1}; //Start the game
    moveSound.play();
    switch(e.key){
        //Main thing the origin in grid view ins at top left corner and bottom and right dirstion are postive y and x axis respectively
        case "ArrowUp":
            console.log("ArrowUp");
            InputDir.x =0;
            InputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("yoyo");
            InputDir.x =0;
            InputDir.y=1;
            break;

        case "ArrowRight":
            console.log("ArrowUp");
            InputDir.x =1;
            InputDir.y=0;
            break;

        case "ArrowLeft":
            console.log("ArrowUp");
            InputDir.x =-1;
            InputDir.y=0;
            break;

        default:
            break;
    }
});