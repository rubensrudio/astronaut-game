const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class Collectible {
    constructor({x, y, image, type = 'ring'}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
        this.type = type
        this.collected = false
    }

    draw() {
        if (!this.collected) {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }
}

export default Collectible
