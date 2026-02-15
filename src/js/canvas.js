import platform from '../img/platform.png'
import platformSmallTall from '../img/platformSmallTall.png'
import background from '../img/background.png'
import hills from '../img/hills.png'
import ring from '../img/ring.png'

import gameOver from '../img/game-over.png'
import Player from './player'
import Platform from './platform'
import { createImage } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
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
  }
}
 
let scrollOffset = 0

function init(){
  platformImage = createImage(platform)
  
  player = new Player()
  platforms  = [,
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
    x: platformImage.width - 3, 
    y: 200, 
    image: createImage(ring)
  }), 
  new Platform({
    x: platformImage.width - 3 + 50, 
    y: 200, 
    image: createImage(ring)
  }), 
  new Platform({
    x: platformImage.width - 3 + 100, 
    y: 200, 
    image: createImage(ring)
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
  })]
  
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
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= player.speed * 0.66
            })
        }
        else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x += player.speed * 0.66
            })
        }
    }

    //Platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y
                && player.position.y + player.height + player.velocity.y >= platform.position.y
                && player.position.x + player.width >= platform.position.x
                && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
    
    //win condition
    if (scrollOffset > 3480){
      console.log('You Win!')
      sleep(5000).then(() => {
        init()
      });
    }

    //lose condition
    if (player.position.y > canvas.height){
      genericObjects = [
        new GenericObject({
          x: 200,
          y: 200,
          image: createImage(gameOver)
        })
      ]
      
      init()
    }
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



init()
animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        case 38:
            player.velocity.y -= 25
            break
        case 39:
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        case 40:
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 38:
            break
        case 39:
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 40:
            break
    }
})