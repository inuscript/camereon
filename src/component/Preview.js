import React, {Component} from "react"
import ReactDOM from "react-dom"

export default class Preview extends Component{
  getContext(){
    return ReactDOM.findDOMNode(this).getContext('2d')
  }
  componentDidUpdate(){
    this.drawCanvas()    
  }
  drawCanvas(){
    if(!this.props.preview) return
    this.getContext().drawImage(this.props.preview.imageElement, 0,0)
  }
  handleLoad(){
    this.drawCanvas()
  }
  render(){
    let { preview } = this.props
    return <canvas ref="cnv" />
  }
}