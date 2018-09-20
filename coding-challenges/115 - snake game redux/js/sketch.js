let snake
let rez = 20
let food
let w
let h

function setup () {
    createCanvas(400, 400)
    w = floor(width / rez)
    h = floor(height / rez)
    frameRate(15)
    snake = new Snake()
    foodLocation()    
}

function foodLocation () {
    let x = floor(random(w))
    let y = floor(random(h))
    food = createVector(x, y)

}

function keyPressed () {
    snake.setDir(keyCode)
}

function draw () {
    scale(rez)
    background(220)
    snake.update()
    if (snake.eat(food)) {
        foodLocation()
    }
    snake.show()

    // food
    noStroke()
    fill(255, 0, 0)
    rect(food.x, food.y, 1, 1)
}