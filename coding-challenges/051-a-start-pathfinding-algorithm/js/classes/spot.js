class Spot {

    constructor (row, col, w_scale, h_scale) {
        this.f = 0
        this.g = 0
        this.h = 0

        this.row = row
        this.col = col

        this.w_scale = w_scale
        this.h_scale = h_scale

        this.neighbors = []
        this.previous = null
        this.wall = (random (1) < 0.3)
    }

    show (c) {
        if (this.wall) {
            c = color(0)
            fill(c)
            noStroke()
            ellipse(
                this.col * this.w_scale + this.w_scale / 2,
                this.row * this.h_scale + this.h_scale / 2,
                this.w_scale / 2,
                this.h_scale / 2,
            )
        }
        
    }

    addNeighbors (grid) {
        let [row, col] = [this.row, this.col]
        let [width, length] = [grid[0].length - 1, grid.length - 1]

        if (row < length) {
            this.neighbors.push(grid[row + 1][col])            
        }
        if (col < width) {
            this.neighbors.push(grid[row][col + 1])
        }
        
        if (row > 0) {
            this.neighbors.push(grid[row - 1][col])
        }
        if (col > 0) {
            this.neighbors.push(grid[row][col - 1])
        }
        // diagonals
        if (row > 0 && col > 0) {
            this.neighbors.push(grid[row - 1][col - 1])
        }
        if (row > 0 && col < width) {
            this.neighbors.push(grid[row - 1][col + 1])
        }
        if (row < length && col < width) {
            this.neighbors.push(grid[row + 1][col + 1])
        }
        if (row < length && col > 0) {
            this.neighbors.push(grid[row + 1][col - 1])
        }
    }



}