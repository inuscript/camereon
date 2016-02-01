import {logoApi} from "../api"
import clustering from "./clustering"
import parse from "pixelbank"
import Color from "color"
import RgbQuant from "rgbquant"
import quantize from "quantize"

const promiseImage = function(src){
  return new Promise((resolve, reject) => {
    let imageElement = document.createElement("img")
    imageElement.onload = function(e){
      resolve(imageElement, e)
    }
    imageElement.src = src
  })
}

const quant = function(imageData){
  let parsed = parse(imageData)
  let colors = parsed.map((px) => {
    return Color(px.color).rgbArray()
  })
  let cmap = quantize(colors, 10)
  // // console.log(cmap.palette())
  let qunatized = parsed.map( (px) => {
    return cmap.map(px)
  })
  // console.log(qunatized)
}

const drawImage = function(canvas, imageElement){
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  let ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(imageElement, 0,0)
  return ctx
}

const imgToData = function(imageElement){
  let canvas = document.createElement("canvas")
  let ctx = drawImage(canvas, imageElement)
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  quant(imageData)
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

export const histogram = function(parsed){
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
  }).sort(function(a,b) {
    return b.count - a.count
  })
}
export const analyse = function(parsed){
  return clustering(parsed)
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
      return {
        preview: imgs,
        parsed: parsed
      }
    })
}