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

      dispatch(setPreview(preview))
      dispatch(setHistogram(histogram(parsed)))
      analyse(parsed)
    }).catch(e => {
      console.error(e)
      // return dispatch(setPreview(e))
    })
  }
}