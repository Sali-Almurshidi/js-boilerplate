/* Hovergame Workshop

Set score and lives

Make target move to an assigned location when we hover and add a point to your score. (onmouseover)

Make speed changeable. (getSpeed, setSpeed)

Check the screen to place your target randomly on the screen. Don't forget the bar at the top

Make an enemy that reduces your lives when you touch them.

When your lives reach 0 make a game over feature

Make the enemy move

Make a boss that instantly kills you

Add enemies every 10 points you get

Add the boss when you get 60 points

Make a health bonus that gives you 1 life

Remove the bonus when you take it

add a life every 30 points

Make it visually a bit better

Fix collision

Fix immunity */

let target = document.getElementById("target");
let screenWidth = window.innerWidth;
let screenHeigth = window.innerHeight;
let score = 0;
let spawnRandom = 2;
let lives = 3;
let spawnBoosWien = 5;
let spawnLife = 3;
let mouseX = 0;
let mouseY = 0;
let immune = false;
let immuneTime = 500;
let gotPoint = false;
let cursor = document.getElementById("cursor");
let cursorWidth = getWidth(cursor);
let cursorHeigth = getHeight(cursor);

setLives();
setScore();
detectTarget();

let speedTop = Math.floor(Math.random() * 5);
document.onmousemove = findMouse;
setSpeed(target, speedTop);

target.onmouseover = function () {
    move(target);
    getPoint();
};

function checkScreen() {
    screenWidth = window.innerWidth;
    screenHeigth = window.innerHeight;
}

function move(element) {
    let x = Math.floor(Math.random() * (screenWidth - getWidth(element)));
    let y = Math.floor(Math.random() * (screenHeigth - getHeight(element)));
    element.style.marginTop = y + "px";
    element.style.marginLeft = x + "px";
}

function moveEnemy(element) {
    move(element);
    setTimeout(function () {
        moveEnemy(element);
    }, 1000 * getSpeed(element));
}

function spawn(className, speed) {
    let spawn = document.createElement("div");
    spawn.classList.add(className); /// !!!
    document.getElementById("game").appendChild(spawn);
    setSpeed(spawn, speed);
    moveEnemy(spawn);
    setEffect(spawn);
}

function setEffect(element) {
    setInterval(function () {
        if (element.className === "enemy") {
            //setInterval(function () {
            if (findCollision(element) == true && immune == false) {
                damge();
            }
            //  }, 50);
        }
        if (element.className == "boss") {
            // setInterval(function () {
            if (findCollision(element) == true && immune == false) {
                gameOver();
            }
            //  }, 50);
        }
        if (element.className == "life") {
            //setInterval(function () {
            if (findCollision(element) == true ) {
                gainLife(element);
            }
            // }, 50);
        }
    }, 50);
}

function gainLife(element) {
    lives++;
    setLives();
    destroy(element);
}

function setSpeed(element, speed) {
    element.style.transitionDuration = speed + "s";
}

function gameOver() {
    alert("you died, your score is " + score);
    location.reload();
}

function getSpeed(element) {
    let speed = element.style.transitionDuration;
    //speed = speed.substring(0,speed.length-1);
    speed = parseFloat(speed);
    return speed;
}

function getWidth(element) {
    return element.offsetWidth;
}

function getHeight(element) {
    return element.offsetHeight;
}

function getPoint() {
    if (gotPoint == false) {
        gotPoint = true;
        move(target);
        score++;
        setScore();
        if (score % spawnRandom === 0) {
            spawn("enemy", 1);
        }
        if (score == spawnBoosWien) {
            spawn("boss", 1.5);
        }

        if (score % spawnLife === 0) {
            spawn("life", 1);
        }
    }
    setTimeout(function () {
        gotPoint = false;
    }, immuneTime);
}

function destroy(element) {
    document.getElementById("game").removeChild(element);
}

function damge() {

    if (immune == false) {
        animateDamage();
        immune = true;
        lives--;
        setLives();
        if (lives == 0) {
            gameOver();
        }
    }
    setTimeout(function () {
        immune = false;
    }, immuneTime);

}

function setLives() {
    document.getElementById("lives").innerHTML = lives;
}

function setScore() {
    document.getElementById("score").innerHTML = score;
}

function detectTarget() {
    setInterval(function () {
        if (findCollision(target) === true) {
            getPoint();
        }
    }, 50);
}

function findCollision(element) {
    if (mouseX + (cursorWidth / 2) >= element.getBoundingClientRect().left &&
        mouseX + (cursorWidth / 2) <= element.getBoundingClientRect().right &&
        mouseY >= element.getBoundingClientRect().top &&
        mouseY <= element.getBoundingClientRect().bottom) {
        return true;
    }

    if (mouseX - (cursorWidth / 2) >= element.getBoundingClientRect().left &&
        mouseX - (cursorWidth / 2) <= element.getBoundingClientRect().right &&
        mouseY >= element.getBoundingClientRect().top &&
        mouseY <= element.getBoundingClientRect().bottom) {
        return true;
    }

    if (mouseX >= element.getBoundingClientRect().left &&
        mouseX <= element.getBoundingClientRect().right &&
        mouseY + (cursorHeigth / 2) >= element.getBoundingClientRect().top &&
        mouseY + (cursorHeigth / 2) <= element.getBoundingClientRect().bottom) {
        return true;
    }

    if (mouseX >= element.getBoundingClientRect().left &&
        mouseX <= element.getBoundingClientRect().right &&
        mouseY - (cursorHeigth / 2) >= element.getBoundingClientRect().top &&
        mouseY - (cursorHeigth / 2) <= element.getBoundingClientRect().bottom) {
        return true;
    }
}

function findMouse(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    let x = mouseX - (cursorWidth / 2);
    let y = mouseY - (cursorHeigth / 2);
    cursor.style.marginLeft = x + "px";
    cursor.style.marginTop = y + "px";
}

function animateDamage() {
    document.getElementById("body").style.background = "rgb(80,15,15)" ;
    setTimeout(function () {
        document.getElementById("body").style.background = "rgb(15,15,15)" ;
    }, 200)
}