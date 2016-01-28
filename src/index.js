const logoApi = require("./api/logo")
const pngparse = require("pngparse")
module.exports = function(q){
  logoApi(q).then( res => {
    return {
      data: res.data,
      type: res.headers['contet-type']
    }
  }).then( item => {
    pngparse(item.data)
  })
}
