const logoApi = require("./api/logo")
const denodeify = require("denodeify")
const pngparse = require("pngparse")
const parse = require("pixelbank")

const parsePng = function(png){
  return denodeify(pngparse.parse)(png)
    .then( png => {
      console.log(png.data.length)
      // console.log(parse(png))
    })
}
module.exports = function(q){
  logoApi(q).then( res => {
    return res.data
  }).then( data => {
    return parsePng(data)
  }).catch( e => {
    console.trace(e)
    throw e
  })
}
