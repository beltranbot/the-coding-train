class Maze {

    constructor (maze, w_scale, h_scale) {
        this.rows = maze.length
        this.cols = maze[0].length

        this.w_scale = w_scale
        this.h_scale = h_scale

        this.start
        this.exits = []

        this.maze = this._generateMaze(maze)
        this.grid = maze
    }

    _generateMaze(grid) {
        let arr = new Array(this.rows)
        for (let row = 0; row < this.rows; row++) {
            arr[row] = new Array(this.cols)

            for (let col = 0; col < this.cols; col++) {
                arr[row][col] = new Spot(
                    row,
                    col,
                    this.w_scale,
                    this.h_scale,
                    grid[row][col],
                    this
                )
            }
        }
        return arr
    }

    addNeighbors () {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.maze[row][col].addNeighbors(this.maze)
            }
        }
    }

    getStart () {
        return this.start
    }

    getExits() {
        return this.exits
    }

    setStart(start) {
        this.start = start
    }

    addExit (exit) {
        return this.exits.push(exit)
    }

}