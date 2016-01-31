import { createAction } from "redux-actions"
import * as types from "./types"
import {loadImage} from "./lib/img"

export const setPreview = createAction(types.SET_PREVIEW, (image) => image)
export const changeUrl = createAction(types.CHANGE_URL, (url) => url)

export const getImage = function(url){
  return function(dispatch){
    loadImage(url).then((preview) => {
      return dispatch(setPreview(preview))
    }).catch(e => {
      console.error(e)
      // return dispatch(setPreview(e))
    })
  }
}