import logoApi from "../api/logo"
import parse from "pixelbank"
import Color from "color"

const promiseImage = function(src){
  return new Promise((resolve, reject) => {
    let imageElement = document.createElement("img")
    imageElement.onload = function(e){
      resolve(imageElement, e)
    }
    imageElement.src = src
  })
}

const imgToData = function(imageElement){
  let canvas = document.createElement("canvas")
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(imageElement, 0,0)
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  return imageData
}

const srcToImage = function(src, onImg){
  return promiseImage(src)
    .then((imageElement, e) => {
      let imageData = imgToData(imageElement)
      return {
        src,
        imageElement,
        imageData
      }
    })
}

const histogram = function(parsed){
  let colors = {}
  parsed.forEach((pix) => {
    let str = Color(pix.color).rgbString()
    if(!colors[str]){
      colors[str] = 1
      return
    }
    colors[str]++ 
  })
  return Object.entries(colors).map(e => {
    return {
      color: e[0],
      count: e[1]
    }
  }).sort(((a,b) => {
    return a.count > b.count
  }))
}
const analyse = function(parsed){
  let cls = parsed.map((pix) => {
    let { top, left, color} = pix
    let hsv = Color(pix.color).hsv()
    console.log(hsv)
    return {
      top, left, hsv
    }
  })
  console.log(cls)
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
    }).then(imgs => {
      let parsed = parse(imgs.imageData)
      // analyse(parsed)
      return {
        preview: imgs,
        histogram : histogram(parsed)
      }
    })
}