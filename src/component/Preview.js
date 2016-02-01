import React, {Component} from "react"
import ReactDOM from "react-dom"

class PreviewImg extends Component{
    getContext(){
    return ReactDOM.findDOMNode(this).getContext('2d')
  }
  componentDidUpdate(){
    this.drawCanvas()    
  }
  drawCanvas(){
    if(!this.props.elm) return
    this.getContext().drawImage(this.props.elm, 0,0)
  }
  handleLoad(){
    this.drawCanvas()
  }
  render(){
    let { width, height } = this.props.elm
    return <canvas ref="cnv" width={width} height={height}/>
  }
}

export default class Preview extends Component{
  render(){
    let { preview } = this.props
    if(!preview || !preview.raw || !preview.quant){
      return <div />
    }
    return <div>
      <PreviewImg elm={preview.raw.elm} />
      <PreviewImg elm={preview.quant.elm} />
    </div>
  }
}