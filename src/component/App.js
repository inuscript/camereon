import React, {Component} from "react"
import ReactDOM from "react-dom"
import parse from "pixelbank"


const Input = function({url, onClick, onChange}){
  return (
    <div>
      <input value={url} onChange={onChange}/>
      <button onClick={onClick} >Send</button>
    </div>
  )
}

class Preview extends Component{
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
export default class App extends Component{
  handleSend(){
    this.props.getImage(this.props.url)
  }
  handleChange(e){
    this.props.changeUrl(e.target.input)
  }
  handleLoad(e){
    console.log(e.target)
  }
  render(){
    return (
      <div>
        <Input 
          url={this.props.url} 
          onClick={this.handleSend.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <Preview preview={this.props.preview} />
      </div>
    )
  }
}

