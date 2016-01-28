const logoApi = require("./api/logo")
const denodeify = require("denodeify")
const pngparse = require("pngparse")
module.exports = function(q){
  logoApi(q).then( res => {
    return res.data
  }).then( data => {
    return denodeify(pngparse.parse)(data)
  }).then( png => {
    console.log(png.getPixel(10,10))
  }).catch( e => {
    console.trace(e)
    throw e
  })
}
