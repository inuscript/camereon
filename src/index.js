import React, { Component } from "react"
import ReactDom from "react-dom"
import Container from "./Component/App.js"
import reducer from "./reducer"
import { createStore, bindActionCreators, applyMiddleware } from "redux"
import * as actions from "./actions"
import { connect, Provider } from "react-redux"
import thunk from "redux-thunk"
import {crashReporter} from "./middleware"
import multi from 'redux-multi'

function mapStateToProps(state){
  let preview = state.preview
  return {
    url: state.url,
    preview: preview,
    histogram: preview ? preview.histogram : {}
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

function setupStore(){
  const initialState = {
    url: "http://www.sonymusic.co.jp/"
  }
  const middleware = applyMiddleware(thunk, multi, crashReporter)
  return createStore(reducer, initialState, middleware)
}

function connectedApp(store){
  let Connected = connect(mapStateToProps, mapDispatchToProps)(Container)
  return (
    <Provider store={store}>
      <Connected />
    </Provider>
  )
}

function render(){
  let containerEl = document.querySelector("#container")
  let store = setupStore()
  ReactDom.render(connectedApp(store), containerEl)
}

render()