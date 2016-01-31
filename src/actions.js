import { createAction } from "redux-actions"
import * as types from "./types"
import logoApi from "./api/logo"

export const setPreview = createAction(types.SET_PREVIEW, (image) => image)
export const changeUrl = createAction(types.CHANGE_URL, (url) => url)

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
        let prv = `data:${type};base64,${base64}`
        dispatch(setPreview(prv))
      })
  }
}