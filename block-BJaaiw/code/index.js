var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;


// creating a paddle to hit the ball
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

var rightPressed = false; // Allowing user to control the paddles
var leftPressed = false; // Allowing user to control the paddles


// Creating  a brick field
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Tracking the score
var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}


// Giving the player some lives
var lives = 3;

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
// var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// To listen to the key press in order to control the paddle we add eventlisteners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Listening for Mouse move event. Better than key events
document.addEventListener("mousemove", mouseMoveHandler, false);


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// Collision Detection code (ball on bricks)
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            // Tracking and updating the status of collision in the collision detection function
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    // Displaying a winning message when all bricks have been destroyed
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        // clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    // clearing canvas each time this function called code 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing bricks
    drawBricks();

    // drawing ball code
    drawBall();
    // drawing paddle code call
    drawPaddle();

    // Counting the score code call
    drawScore();

    drawLives();

    // Collison Detction activate
    collisionDetection();

    // Conditions for the ball to bounce of the walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Also includes condition for game over. i.e in case ball dosent hit paddle
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            // alert("GAME OVER");
            // document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game

            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    // paddle moving logic. when left is pressed move 7 px to the left. likewise.
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}




// var interval = setInterval(draw, 10);
draw();









// PRACTICE
// // To draw a red square on canvas
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50); // drawing a rectangle.
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// // To draw a green circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();