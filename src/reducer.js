import { combineReducers } from "redux"
import * as types from "./types"

const image = (state = null, action) => {
  switch(action.type){
    case types.SET_IMAGE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({  
  image
})