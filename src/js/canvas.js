import platform from '../img/platform.png'
import platformSmallTall from '../img/platformSmallTall.png'
import background from '../img/background.png'
import hills from '../img/hills.png'
import ring from '../img/ring.png'

import gameOver from '../img/game-over.png'
import Player from './player'
import Platform from './platform'
import Collectible from './collectible'
import { createImage } from './utils'
import { initAudio, playRingSound, playJumpSound, playGameOverSound, playVictorySound, playDefeatSound } from './audio'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let ringCount = 0
class GenericObject {
  constructor({x, y, image}) {
      this.position = {
          x,
          y
      }

      this.image = image
      this.width = image.width
      this.height = 20
  }

  draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
  }
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
  
let player = new Player()
let platforms  = []
let rings  = []
  
let genericObjects = []

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false
  }
}
 
let scrollOffset = 0
let gameState = 'playing' // playing, won, lost

function init(){
  platformImage = createImage(platform)
  ringCount = 0
  gameState = 'playing' // Reset game state
  
  player = new Player()
  
  // Separate platforms from collectibles
  platforms  = [
    new Platform({
      x: platformImage.width * 4 + 300 -2 + platformImage.width - platformSmallTallImage.width, 
      y: 270, 
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage
    }), 
    new Platform({
      x: platformImage.width - 3, 
      y: 470, 
      image: platformImage
    }), 
    new Platform({
      x: platformImage.width * 2 + 300, 
      y: 470, 
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 3 + 300, 
      y: 470, 
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 4 + 300 -2, 
      y: 470, 
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 5 + 700 -2, 
      y: 470, 
      image: platformImage
    })
  ]
  
  // Create collectible rings
  rings = [
    new Collectible({
      x: platformImage.width - 3, 
      y: 200, 
      image: createImage(ring)
    }), 
    new Collectible({
      x: platformImage.width - 3 + 50, 
      y: 200, 
      image: createImage(ring)
    }), 
    new Collectible({
      x: platformImage.width - 3 + 100, 
      y: 200, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 2 + 200, 
      y: 250, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 2 + 250, 
      y: 250, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 3 + 100, 
      y: 300, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 3 + 150, 
      y: 300, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 4 + 100, 
      y: 200, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 4 + 150, 
      y: 200, 
      image: createImage(ring)
    }),
    new Collectible({
      x: platformImage.width * 5 + 500, 
      y: 250, 
      image: createImage(ring)
    })
  ]
  
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background)
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills)
    })
  ]
  
  scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObjects => {
      genericObjects.draw()
    })

    platforms.forEach(platform => {
      platform.draw()
    })
    
    // Draw rings
    rings.forEach(ring => {
      ring.draw()
    })


    // Only process game logic if still playing
    if (gameState !== 'playing') {
        // Draw ring counter even when not playing
        c.fillStyle = '#FFD700'
        c.font = 'bold 24px Arial'
        c.strokeStyle = '#000'
        c.lineWidth = 3
        c.strokeText(`Rings: ${ringCount}`, 20, 40)
        c.fillText(`Rings: ${ringCount}`, 20, 40)
        
        // Draw victory message
        if (gameState === 'won') {
            c.fillStyle = '#00FF00'
            c.font = 'bold 48px Arial'
            c.strokeStyle = '#000'
            c.lineWidth = 4
            c.strokeText('YOU WIN!', canvas.width / 2 - 120, canvas.height / 2)
            c.fillText('YOU WIN!', canvas.width / 2 - 120, canvas.height / 2)
        }
        
        // Draw defeat message
        if (gameState === 'lost') {
            c.fillStyle = '#FF0000'
            c.font = 'bold 48px Arial'
            c.strokeStyle = '#000'
            c.lineWidth = 4
            c.strokeText('GAME OVER!', canvas.width / 2 - 140, canvas.height / 2)
            c.fillText('GAME OVER!', canvas.width / 2 - 140, canvas.height / 2)
        }
        
        return
    }
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed 
      && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed
    }
    else{
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            rings.forEach(ring => {
                ring.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= player.speed * 0.66
            })
        }
        else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            rings.forEach(ring => {
                ring.position.x += player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x += player.speed * 0.66
            })
        }
    }

    //Platform collision detection (improved)
    player.isGrounded = false
    
    platforms.forEach(platform => {
        // Vertical collision (landing on platform from above)
        // Only collide when falling DOWN onto the platform
        if (player.position.y + player.height <= platform.position.y
                && player.position.y + player.height + player.velocity.y >= platform.position.y
                && player.position.x + player.width >= platform.position.x + 5
                && player.position.x <= platform.position.x + platform.width - 5
                && player.velocity.y >= 0) { // Only when falling or standing
            player.velocity.y = 0
            player.position.y = platform.position.y - player.height // Snap to platform
            player.isGrounded = true
            player.coyoteTime = player.coyoteTimeMax
        }
        
        // Horizontal collision (left side of platform)
        if (player.position.x + player.width >= platform.position.x
                && player.position.x < platform.position.x
                && player.position.y + player.height > platform.position.y + 10
                && player.position.y < platform.position.y + platform.height - 10) {
            player.position.x = platform.position.x - player.width
            player.velocity.x = 0
        }
        
        // Horizontal collision (right side of platform)
        if (player.position.x <= platform.position.x + platform.width
                && player.position.x + player.width > platform.position.x + platform.width
                && player.position.y + player.height > platform.position.y + 10
                && player.position.y < platform.position.y + platform.height - 10) {
            player.position.x = platform.position.x + platform.width
            player.velocity.x = 0
        }
    })
    
    // Ring collection (Sonic-style)
    rings.forEach(ring => {
        if (!ring.collected &&
            player.position.x < ring.position.x + ring.width &&
            player.position.x + player.width > ring.position.x &&
            player.position.y < ring.position.y + ring.height &&
            player.position.y + player.height > ring.position.y) {
            ring.collected = true
            ringCount++
            playRingSound()
        }
    })
    
    // Draw ring counter
    c.fillStyle = '#FFD700'
    c.font = 'bold 24px Arial'
    c.strokeStyle = '#000'
    c.lineWidth = 3
    c.strokeText(`Rings: ${ringCount}`, 20, 40)
    c.fillText(`Rings: ${ringCount}`, 20, 40)
    
    //win condition (only check once)
    if (scrollOffset > 3480 && gameState === 'playing'){
      gameState = 'won'
      console.log('You Win!')
      
      // Play victory music and get duration
      const victoryDuration = playVictorySound()
      
      // Wait for victory music to finish before restarting
      setTimeout(() => {
        init()
      }, victoryDuration)
    }

    //lose condition (only check once - falling off screen)
    if (player.position.y > canvas.height && gameState === 'playing'){
      gameState = 'lost'
      
      // Play defeat music and get duration
      const defeatDuration = playDefeatSound()
      
      // Wait for defeat music to finish before restarting
      setTimeout(() => {
        init()
      }, defeatDuration)
    }
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



init()
animate()

// Initialize audio on first user interaction
document.addEventListener('click', () => {
    initAudio()
}, { once: true })

addEventListener('keydown', ({ keyCode }) => {
    // Initialize audio on first keypress
    initAudio()
    
    switch (keyCode) {
        case 37: // Left arrow
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        case 38: // Up arrow - Jump
            if (!keys.up.pressed) {
                player.jump()
                playJumpSound()
                keys.up.pressed = true
            }
            break
        case 39: // Right arrow
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        case 32: // Spacebar - Alternative jump
            if (!keys.up.pressed) {
                player.jump()
                playJumpSound()
                keys.up.pressed = true
            }
            break
        case 40: // Down arrow (reserved for future use)
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37: // Left arrow
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 38: // Up arrow
            keys.up.pressed = false
            break
        case 39: // Right arrow
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 32: // Spacebar
            keys.up.pressed = false
            break
        case 40: // Down arrow
            break
    }
})