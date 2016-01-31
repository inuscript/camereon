import { createAction } from "redux-actions"
import * as types from "./types"

export const setImage = createAction(types.SET_IMAGE, (image) => image)