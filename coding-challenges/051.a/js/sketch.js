// windows sie
const WIDTH = 500
const HEIGHT = 500

// var grid = new Array(COLS)

let start
let end

let openSet = []
let closedSet = []

let colors

let loopControl = 0
let loopEnd = 1000

let route = []
let printRoute = false

const VALID_STEPS = {
    '^': {
        '^': 'F',
        '>': ['R', 'F'],
        'v': ['B', 'F'],
        '<': ['L', 'F'],
    },
    '>': {
        '^': ['L', 'F'],
        '>': 'F',
        'v': ['R', 'F'],
        '<': ['B', 'F'],
    },
    'v': {
        '^': ['B', 'F'],
        '>': ['L', 'F'],
        'v': 'F',
        '<': ['R', 'F'],
    },
    '<': {
        '^': ['R', 'F'],
        '>': ['B', 'F'],
        'v': ['L', 'F'],
        '<': 'F',
    },
}

const VALID_MOVEMENTS = {
    '0': {
        '-1': '<',
        '1': '>'
    },
    '1': {
        '0': 'v'
    },
    '-1': {
        '0': '^'
    }
}

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

let mazeArr = [
    [
        '#####################',
        '#     #   #       # #',
        '##### # ### ##### # #',
        '#       #       #   #',
        '# ####### # ####### #',
        '#   #     #     #   #',
        '### # ######### #####',
        '# #   #   #   #     #',
        '# ### # # # # ##### #',
        '#   # # # # #   #   #',
        '# # ### # # ### ### #',
        '# #     #     #     #',
        '# ##### ########### #',
        '# # #       #     # #',
        '# # # # ### # ### ###',
        '# #   # #   #   #   #',
        '# ### # ####### ### #',
        '# #   #   #   #   # #',
        '# # ##### ### ### # #',
        '# #     #^#   #   # #',
        '# ####### # # # ### #',
        '# #   #   # # #   # #',
        '# ### # ### # ### # #',
        '#     #     # #   # #',
        '############# # #####',
        '#         #     #   #',
        '# ####### # ### # # #',
        '# #     #   #   # # #',
        '# # # ####### ### ###',
        '# # #   #   # # #   #',
        '# # ### # # # # ### #',
        '# #   # # #   #   # #',
        '# ### # ####### ### #',
        '#     #           # #',
        '# ############# # # #',
        '# #           # # # #',
        '### ######### # # # #',
        '#   #   #   # # #   #',
        '# # # # # # ### #####',
        '# #   #   #         #',
        '#####################'
    ],
    [
        '####### #',
        '#>#   # #',
        '#   #   #',
        '#########'
    ],
    [
        '##########',
        '#        #',
        '#  ##### #',
        '#  #   # #',
        '#  #^# # #',
        '#  ### # #',
        '#      # #',
        '######## #',
    ],
    [
        "#########################################",
        "#<    #       #     #         # #   #   #",
        "##### # ##### # ### # # ##### # # # ### #",
        "# #   #   #   #   #   # #     #   #   # #",
        "# # # ### # ########### # ####### # # # #",
        "#   #   # # #       #   # #   #   # #   #",
        "####### # # # ##### # ### # # # #########",
        "#   #     # #     # #   #   # # #       #",
        "# # ####### ### ### ##### ### # ####### #",
        "# #             #   #     #   #   #   # #",
        "# ############### ### ##### ##### # # # #",
        "#               #     #   #   #   # #   #",
        "##### ####### # ######### # # # ### #####",
        "#   # #   #   # #         # # # #       #",
        "# # # # # # ### # # ####### # # ### ### #",
        "# # #   # # #     #   #     # #     #   #",
        "# # ##### # # ####### # ##### ####### # #",
        "# #     # # # #   # # #     # #       # #",
        "# ##### ### # ### # # ##### # # ### ### #",
        "#     #     #     #   #     #   #   #    ",
        "#########################################"
    ]
]

const N = 0
console.log('dimensions', mazeArr[N].length, mazeArr[N][0].length)
const COLS = mazeArr[N][0].length
const ROWS = mazeArr[N].length

// scales
const W = WIDTH / COLS
const H = HEIGHT / ROWS

let maze

function setup () {
    createCanvas(WIDTH, HEIGHT)
    maze = new Maze (mazeArr[N], W, H)

    colors = {
        blue: color(0, 0, 255),
        green: color(0, 255, 0, 50),
        red: color(255, 0, 0, 50),
        white: color(255),
    }

    maze.addNeighbors()

    start = maze.getStart()
    end = maze.getExits()[0]

    if (!end) {
        console.log('No solution')
        return
    }

    console.log('end', end)

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
            printRoute = true
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
                
                // 10 00

                let row = (neighbor.row - current.row) + ''
                let col = (neighbor.col - current.col) + ''

                neighbor.move = VALID_MOVEMENTS[row][col]

            }
        }
    } else {
        // no solution
        console.log('no solution')
        noLoop()
    }

    background(255)
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            maze.maze[row][col].show(colors.white)
        }
    }

    for (const i of closedSet) {
        i.show(colors.red)
    }

    noFill()
    stroke(255,0, 200)
    strokeWeight(W / 2)
    beginShape()
    for (const item of path) {
        vertex(item.col * W + W / 2, item.row * H + H / 2)
    }
    endShape()

    if (printRoute) {
        let ids = []
        let moves = []
        for (const item of path) {
            moves.push(item.move)
            ids.push(item.id)
        }

        moves = moves.reverse()

        let ans = []

        for (let i = 0; i < moves.length - 1; i++) {
            console.log(moves[i], moves[i + 1])
            ans = ans.concat(VALID_STEPS[moves[i]][moves[i + 1]])
        }

        console.log(ans)
    }
}