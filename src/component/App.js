import React, {Component} from "react"
import parse from "pixelbank"
import Preview from "./Preview"

const Input = function({url, onClick, onChange}){
  return (
    <div>
      <input value={url} onChange={onChange}/>
      <button onClick={onClick} >Send</button>
    </div>
  )
}

class Histogram extends Component{
  render(){
    console.log(this.props.histogram.slice(0, 10))
    return <div></div>
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
        <Histogram histogram={this.props.histogram} />
      </div>
    )
  }
}

