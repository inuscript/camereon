import kmeans from "kmeansjs"
import Color from "color"

export default function clustering(histogram){
  let hsvs = histogram.map((pix) => {
    let { count, color} = pix
    return Color(color).hsvArray()
  })
  return new Promise((resolve, reject) => {
    kmeans(hsvs, 5, (err, res) => {
      if(err) return relect(err)
      resolve()
    })
  })
}