class Spot {

    constructor (x, y, w, h) {
        // position
        this.x = x
        this.y = y

        // scales
        this.w = w
        this.h = h

        // a* values
        this.f = 0
        this.g = 0
        this.heuristic = 0

        this.neighbors = []
        this.previous = null
    }

    /**
     * c - color
     */
    show (c) {
        fill(c)
        noStroke(0)
        rect(this.x * this.w, this.y * this.h, this.w - 1, this.h - 1)
    }

    addNeighbors (grid) {
        let [row, col] = [this.y, this.x]
        let [gridh, gridw] = [grid.length - 1, grid[0].length - 1]

        if (row < gridh) this.neighbors.push(grid[row + 1][col])
        if (col < gridw) this.neighbors.push(grid[row][col + 1])
        if (col > 0) this.neighbors.push(grid[row][col - 1])
        if (row > 0) this.neighbors.push(grid[row - 1][col])
    }

    getNeighbors (grid) {
        if (this.neighbors.lenght === 0) this.addNeighbors(grid)
        return this.neighbors
    }

    
}