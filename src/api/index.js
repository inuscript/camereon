const axios = require("axios")
const clearbitUrl = "https://logo.clearbit.com/"
const URL = require("url")

export function logoApi(uri){
  const domain = URL.parse(uri).hostname
  return axios.get(`${clearbitUrl}/${domain}`, {
    responseType: 'arraybuffer'
  })
}