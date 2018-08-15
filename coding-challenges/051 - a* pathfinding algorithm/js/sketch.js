// window size
const WIDTH = 400
const HEIGHT = 400

// grid
const COLS = 10
const ROWS = 10
let grid = new Array(ROWS)

// scales
const W = WIDTH / COLS
const H = HEIGHT / ROWS

// sets
let openSet = []
let closedSet = []
let start
let end

let loop_control = 0
let loop_end = 100

// An educated guess of how far it is between two points
function heuristic(a, b) {
    // var d = dist(a.x, a.y, b.x, b.y)
    var d = abs(a.x - b.x) + abs(a.y - b.y)
    return d;
}

function removeFromArray (arr, element) {
    for (let i = arr.length - 1; i >= 0; i--)
        if (arr[i] === element) arr.splice(i, 1)
}
function setup () {
    createCanvas(WIDTH, HEIGHT)
    console.log('A*')

    // making a 2d array
    for (let i = 0; i < ROWS; i++) {
        grid[i] = new Array(ROWS)
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            grid[i][j] = new Spot(j, i, W, H)
        }
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            grid[i][j].addNeighbors(grid)
        }
    }

    start = grid[0][0]
    end = grid[ROWS - 1][COLS - 1]

    console.log('start', start)

    openSet.push(start)

}

function draw () {    
    // if (loop_control++ >= loop_end) noLoop()

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

            let tempG = current.g + 1

            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) neighbor.g = tempG
            } else {
                neighbor.g = tempG
                openSet.push(neighbor)
            }

            neighbor.heuristic = heuristic(neighbor, end)
            neighbor.f = neighbor.g + neighbor.heuristic
            neighbor.previous = current
        }
    } else {
        // no solution
        console.log('no solution')
        noLoop()
    }

    background(0)
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            grid[i][j].show(255)            
        }
    }

    for (const i of closedSet) {
        i.show(color(255, 0, 0, 50))
    }

    for (const i of openSet) {
        i.show(color(0, 255, 0, 50))
    }

    for (const i of path) {
        i.show(color(0, 0, 255, 50))
    }
}