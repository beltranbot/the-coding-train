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
        console.log('key', key)
        let [x, y] = this._snake_moves[key]
        this.xdir = this.xdir == 0 ? x : x == 0 ? 0 : this.xdir
        this.ydir = this.ydir == 0 ? y : y == 0 ? 0 : this.ydir
    }

    update () {
        let previous_body = {x:this.body[0].x, y:this.body[0].y}
        let current_body
        this.body[0].x += this.xdir
        this.body[0].y += this.ydir

        for (let i = 1; i < this.body.length; i++) {
            current_body = {x:this.body[i].x, y:this.body[i].y}
            this.body[i].x = previous_body.x
            this.body[i].y = previous_body.y

            previous_body.x = current_body.x
            previous_body.y = current_body.y
        }
    }

    grow (food) {
        this.len++
        this.body.push(createVector(food.x, food.y))
    }

    eat (food) {
        let [x, y] = [this.body[0].x, this.body[0].y]
        if (x == food.x && y == food.y) {
            this.grow(food)
            return true
        }
        return false
    }

    show () {        
        noStroke()
        for (let i = 0; i < this.body.length; i++) {
            if (i == 0) {
                fill(0, 255, 0)
            } else {
                fill(0)
            }
            rect(this.body[i].x, this.body[i].y, 1, 1)
        }
        
    }
}