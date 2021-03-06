import { createAction } from "redux-actions"
import * as types from "./types"
import {loadImage, histogram, analyse} from "./lib/img"

export const setPreview = createAction(types.SET_PREVIEW, (image) => image)
export const setHistogram = createAction(types.SET_HISTOGRAM, (h) => h)
export const changeUrl = createAction(types.CHANGE_URL, (url) => url)

export const getImage = function(url){
  return function(dispatch){
    loadImage(url).then((imgs) => {
      let {preview, parsed} = imgs
      let hist = histogram(parsed)
      dispatch(setPreview(preview))
      // dispatch(setHistogram(hist))
      analyse(hist).then(clusters => {
        dispatch(setHistogram(clusters))
      })
    }).catch(e => {
      console.error(e)
      // return dispatch(setPreview(e))
    })
  }
}