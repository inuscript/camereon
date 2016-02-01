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
  let cmap = quantize(colors, 16)
  // console.log(cmap.palette())
  let quantized = parsed.reduce( (r, px) => {
    let quant = [...cmap.map(Color(px.color).rgbArray()), px.color.a]
    // console.log(px.color, quant)
    return r.concat(quant)
  }, [])
  return new Uint8ClampedArray(quantized)
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
  return imageData
}

const qunatizedImg = function(imageData, imageElement){
  let q = quant(imageData)
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext('2d')
  let pl = ctx.getImageData(0,0, imageElement.width, imageElement.height)
  pl.data.set(q)
  ctx.putImageData(pl,0,0)
  return canvas.toDataURL()
}

const srcToImage = function(src, onImg){
  return promiseImage(src)
    .then((_imageElement, e) => {
      let imageData = imgToData(_imageElement)
      let qUrl = qunatizedImg(imageData, _imageElement)
      return promiseImage(qUrl)
    }).then( (imageElement, e) => {
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