import kmeans from "kmeansjs"
import Color from "color"

export default function clustering(parsed){
  let hsvs = parsed.map((pix) => {
    let { top, left, color} = pix
    return Color(pix.color).hsvArray()
  })
  kmeans(hsvs, 3, (err, res) => {
    console.log(err, res)
  })
}