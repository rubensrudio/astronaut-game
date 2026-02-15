
function createImage(imageSrc){
  const image = new Image()
  image.src = imageSrc
  return image
}

module.exports = { createImage }
