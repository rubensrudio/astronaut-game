import Util from "./utils"

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import spriteStandLeft from '../img/spriteStandLeft.png'
import spriteStandRight from '../img/spriteStandRight.png'
import { createImage } from "./utils"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 1.5

class Player {
    constructor(){
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150

        this.image = Util.createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
          stand: {
            right: createImage(spriteStandRight),
            cropWidth: 177,
            width: 66,
            left: createImage(spriteStandLeft)
          },
          run: {
            right: createImage(spriteRunRight),
            cropWidth: 341,
            width: 127.875,
            left: createImage(spriteRunLeft)
          }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
      //177 é a divisão de width pela quantidade de bonecos, 400 é height da imagem
      c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.frames++
        
        if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left))
          this.frames = 0
        else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left))
          this.frames = 0
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

export default Player