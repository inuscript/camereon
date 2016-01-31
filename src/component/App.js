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
  list(key, {count, color}){
    let style = {
      background : color
    }
    return <li key={key} style={style}>{color}:{count}</li>
  }
  render(){
    let top = this.props.histogram.slice(0, 10000)
    let lists = top.map((item, i) => {
      return this.list(i, item)
    })
    return <ul>
      {lists}
    </ul>
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

