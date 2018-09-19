function setup () {
    createCanvas(400, 300)
}

function draw () {
    background (220, 0, 200)

    // line (0, 50, 400, 300)
    rectMode(CENTER)

    fill(0,0,255)
    stroke(0, 255, 0)
    strokeWeight(1)
    rect(200, 150, 150, 150)

    fill(255, 0, 0, 100)
    // noFill()
    stroke(255)
    // noStroke()
    strokeWeight(8)
    ellipse(150, 225, 100, 75)
}