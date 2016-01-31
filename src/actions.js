import { createAction } from "redux-actions"
import * as types from "./types"
import logoApi from "./api/logo"

export const setPreview = createAction(types.SET_PREVIEW, (image) => image)
export const changeUrl = createAction(types.CHANGE_URL, (url) => url)

const bToImage = function(src, onImg){
  let imageElement = document.createElement("img")
  let canvas = document.createElement("canvas")
  imageElement.onload = function(e) {
    let ctx = canvas.getContext('2d')
    ctx.drawImage(imageElement, 0,0)
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    onImg({
      imageElement,
      imageData,
    })
  }
  imageElement.src = src
}
export const getImage = function(url){
  return function(dispatch){
    logoApi(url)
      .then( (item) => {
        return {
          data: item.data,
          type: item.headers["content-type"]
        }
      })
      .then(({data, type}) => {
        let base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
        let src = `data:${type};base64,${base64}`
        return src
      })
      .then(src => {
        bToImage(src, (preview) => { 
          dispatch(setPreview(preview))
        })
      }).catch(e => {
        console.log(e)
      })
  }
}