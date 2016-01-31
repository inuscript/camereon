import logoApi from "../api/logo"

const promiseImage = function(src){
  return new Promise((resolve, reject) => {
    let imageElement = document.createElement("img")
    imageElement.onload = function(e){
      resolve(imageElement, e)
    }
    imageElement.src = src
  })
}
const srcToImage = function(src, onImg){
  return promiseImage(src)
    .then((imageElement, e) => {
      let canvas = document.createElement("canvas")
      let ctx = canvas.getContext('2d')
      ctx.drawImage(imageElement, 0,0)
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      return {
        src,
        imageElement,
        imageData,
      }
    })
}

export const loadImage = function(url){
  return logoApi(url)
    .then( (item) => {
      return {
        data: item.data,
        type: item.headers["content-type"]
      }
    }).then(({data, type}) => {
      let base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
      let src = `data:${type};base64,${base64}`
      return src
    }).then(src => {
      return srcToImage(src)
    }).catch(e => {
      console.log(e)
    })
}