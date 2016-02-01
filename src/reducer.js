import { combineReducers } from "redux"
import * as types from "./types"

const preview = (state = null, action) => {
  switch(action.type){
    case types.SET_PREVIEW:
      return action.payload
    default:
      return state
  }
}

const histogram = (state = [], action) => {
  switch(action.type){
    case types.SET_HISTOGRAM:
      return action.payload
    default:
      return state
  }
}

const url = (state = "", action) => {
  switch(action.type){
    case types.CHANGE_URL:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({  
  preview, url, histogram
})