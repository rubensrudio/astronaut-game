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
        
        // Ground detection
        this.isGrounded = false
        this.coyoteTime = 0
        this.coyoteTimeMax = 6 // frames of coyote time
        
        // Jump properties
        this.jumpForce = 25
        this.canJump = true

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
    
    jump() {
        // Can only jump if grounded or within coyote time
        if (this.isGrounded || this.coyoteTime > 0) {
            this.velocity.y = -this.jumpForce
            this.isGrounded = false
            this.coyoteTime = 0
            this.canJump = false
        }
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

        // Apply gravity
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
        
        // Update coyote time
        if (!this.isGrounded && this.coyoteTime > 0) {
            this.coyoteTime--
        }
        
        // Reset jump when grounded
        if (this.isGrounded) {
            this.canJump = true
        }
    }
}

export default Player