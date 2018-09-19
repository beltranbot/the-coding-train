class Snake {
    constructor () {
        this.body = [createVector(0, 0)]
        this.len = 1
        this.xdir = 0
        this.ydir = 0
        this._snake_moves = {
            37: [-1, 0],
            38: [0, -1],
            39: [1, 0],
            40: [0, 1],
        }
    }

    setDir (key) {
        let [x, y] = this._snake_moves[key]
        this.xdir = this.xdir == 0 ? x : x == 0 ? 0 : this.xdir
        this.ydir = this.ydir == 0 ? y : y == 0 ? 0 : this.ydir
    }

    update () {
        this.body[0].x += this.xdir
        this.body[0].y += this.ydir
    }

    grow () {
        this.len++
        let body = this.body[this.body.length - 1]
        let [x, y] = [body.x, body.y]
        this.body.push(createVector(body.x - abs(this.xdir), body.y - abs(this.ydir)))
    }

    eat (food) {
        let [x, y] = [this.body[0].x, this.body[0].y]
        if (x == food.x && y == food.y) {
            this.grow()
            return true
        }
        return false
    }

    show () {
        noStroke()
        let x
        let y
        for (let i = 0; i < this.body.length; i++) {
            if (i == 0) {
                fill(0, 255, 0);
                [x, y] = [this.body[i].x, this.body[i].y]
                rect(x, y, 1, 1)
            } else {
                fill(0)
                rect(x, y, 1, 1);
                [x, y] = [this.body[i].x, this.body[i].y]
            }
        }
        
    }
}