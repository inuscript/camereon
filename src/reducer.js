import { combineReducers } from "redux"
import * as types from "./types"

const preview = (state = null, action) => {
  if(action.error){
    console.log(action.payload)
    throw action.payload
  }
  switch(action.type){
    case types.SET_PREVIEW:
      return action.payload
    default:
      return state
  }
}

const url = (state = null, action) => {
  switch(action.type){
    case types.CHANGE_URL:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({  
  preview, url
})