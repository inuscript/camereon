const axios = require("axios")
const clearbitUrl = "https://logo.clearbit.com/"
const URL = require("url")
module.exports = function(uri){
  const domain = URL.parse(uri).hostname
  return axios.get(`${clearbitUrl}/${domain}`)
}