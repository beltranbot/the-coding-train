let global_counter = 0

class Spot {

    constructor (row, col, w_scale, h_scale, space = null, parent) {
        this.f = 0
        this.g = 0
        this.h = 0

        this.row = row
        this.col = col

        this.w_scale = w_scale
        this.h_scale = h_scale

        this.neighbors = []
        this.previous = null
        this.parent = parent
        // this.wall = (random (1) < 0.3)
        
        this.wall = space == '#'
        this.start = ['^', '<', '>', 'v'].includes(space)
        this.exit = (space == ' ') && (row == 0 || col == 0 || row == this.parent.rows - 1 || col == this.parent.cols - 1)

        this.move = this.start ? space : ''
        this.step = this.start ? space : ''

        this.id = ++global_counter

        

        if (this.start) this.parent.setStart(this)
        if (this.exit) this.parent.addExit(this)
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
        } else if (this.start) {
            fill(color(0, 255, 0))
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
            // if (this.row == 1 && this.col == 1) console.log('added 1')
            this.neighbors.push(grid[row + 1][col])            
        }
        if (col < width) {
            // if (this.row == 1 && this.col == 1) console.log('added 2')
            this.neighbors.push(grid[row][col + 1])
        }        
        if (row > 0) {
            // if (this.row == 1 && this.col == 1) console.log('added 3')
            this.neighbors.push(grid[row - 1][col])
        }
        if (col > 0) {
            // if (this.row == 1 && this.col == 1) console.log('added 4')
            this.neighbors.push(grid[row][col - 1])
        }
        // diagonals
        // if (row > 0 && col > 0) {
        //     this.neighbors.push(grid[row - 1][col - 1])
        // }
        // if (row > 0 && col < width) {
        //     this.neighbors.push(grid[row - 1][col + 1])
        // }
        // if (row < length && col < width) {
        //     this.neighbors.push(grid[row + 1][col + 1])
        // }
        // if (row < length && col > 0) {
        //     this.neighbors.push(grid[row + 1][col - 1])
        // }
    }



}