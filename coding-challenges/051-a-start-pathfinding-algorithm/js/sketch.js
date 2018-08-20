// windows sie
const WIDTH = 500
const HEIGHT = 500

const COLS = 50
const ROWS = 50

// scales
const W = WIDTH / COLS
const H = HEIGHT / ROWS

var grid = new Array(COLS)

let start
let end

let openSet = []
let closedSet = []

let colors

let loopControl = 0
let loopEnd = 1000

function removeFromArray (arr, ele) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === ele) {
            arr.splice(i, 1)
        }        
    }
}

function heuristicDist (a, b) {
    return dist(a.row, a.col, b.row, b.col)
}

function heuristicManhattan (a, b) {
    return abs(a.row - b.row) + abs(a.col - b.col)
}

function setup () {
    createCanvas(WIDTH, HEIGHT)

    colors = {
        blue: color(0, 0, 255),
        green: color(0, 255, 0, 50),
        red: color(255, 0, 0, 50),
        white: color(255),
    }

    for (let row = 0; row < ROWS; row++) {
        grid[row] = new Array(COLS)
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            grid[row][col] = new Spot(row, col, W, H)
        }        
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            grid[row][col].addNeighbors(grid)
        }        
    }
    
    start = grid[0][0]
    end = grid[ROWS - 1][COLS - 1]
    start.wall = false
    end.wall = false

    openSet.push(start)

    console.log('A*')
}

function draw () {
    let path = []

    if (openSet.length > 0) {
        // we can keep going
        let winner = 0

        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) winner = i
        }

        let current = openSet[winner]

        let temp = current
        path.push(temp)
        while (temp.previous) {
            temp = temp.previous
            path.push(temp)
        }

        if (current === end) {
            console.log('Done')
            noLoop()
        }

        removeFromArray(openSet, current)
        closedSet.push(current)

        for (const neighbor of current.neighbors) {
            if (closedSet.includes(neighbor)) continue
            if (neighbor.wall) continue

            let tempG = current.g + 1
            let newPath = false // only add to path if is a better route
            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG
                    newPath = true
                }
            } else {
                neighbor.g = tempG
                newPath = true
                openSet.push(neighbor)
            }

            if (newPath) {
                neighbor.h = heuristicDist(neighbor, end)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.previous = current
            }
        }
    } else {
        // no solution
        console.log('no solution')
        noLoop()
    }

    background(255)
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            grid[i][j].show(colors.white)            
        }
    }

    for (const i of closedSet) {
        i.show(colors.red)
    }

    for (const i of openSet) {
        i.show(colors.green)
    }

    noFill()
    stroke(255,0, 200)
    strokeWeight(W/2)
    beginShape()
    for (const item of path) {
        vertex(item.col * W + W / 2, item.row * H + H / 2)
    }
    endShape()
}