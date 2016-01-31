import React, {Component} from "react"
import logoApi from "../api/logo"
import parse from "pixelbank"

const Input = function({url, onClick, onChange}){
  return (
    <div>
      <input value={url} onChange={onChange}/>
      <button onClick={onClick} >Send</button>
    </div>
  )
}

class App extends Component{
  constructor(){
    super()
    this.state = {
      preview: ""
    }
  }
  handleSend(){
    logoApi(this.props.url)
      .then( (item) => {
        return {
          data: item.data,
          type: item.headers["content-type"]
        }
      })
      .then(({data, type}) => {
        let base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
        let prv = `data:${type};base64,${base64}`
        this.setState({
          preview: prv
        })
        // console.log(this.refs.preview)
        // let clamped = new Uint8ClampedArray(data)
        // console.log(clamped)
        // console.log(parse(clamped))
      })
  }
  handleChange(e){
    this.props.changeUrl(e.target.input)
  }
  handleLoad(e){
    console.log(e)
  }
  render(){
    console.log(this.state.preview)
    return (
      <div>
        <Input 
          url={this.props.url} 
          onClick={this.handleSend.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <img src={this.state.preview} onLoad={this.handleLoad.bind(this)}/>
      </div>
    )
  }
}

export default class Container extends Component{
  constructor(){
    super()
    this.state = {
      url: "http://www.sonymusic.co.jp/"
    }
  }
  changeUrl(url){
    this.setState({
      url: url
    })
  }
  render(){
    let actions = {
      changeUrl: this.changeUrl.bind(this)
    }
    return <App {...this.state } {...actions}/>
  }
}
