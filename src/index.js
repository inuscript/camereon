import React, { Component } from "react"
import ReactDom from "react-dom"
import Container from "./Component/App.js"
import reducer from "./reducer"
import { createStore, bindActionCreators } from "redux"
import * as actions from "./actions"
import { connect, Provider } from "react-redux"

function mapStateToProps(state){
  return state
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

function connectedApp(){
  let store = createStore(reducer, {})
  let Connected = connect(mapStateToProps, mapDispatchToProps)(Container)
  return (
    <Provider store={store}>
      <Connected  />
    </Provider>
  )
}

function render(){
  let containerEl = document.querySelector("#container")
  ReactDom.render(connectedApp(), containerEl)
}

render()