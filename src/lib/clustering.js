import kmeans from "kmeansjs"
import Color from "color"

export default function clustering(histogram){
  let hsvs = histogram.map((pix) => {
    let { count, color} = pix
    return Color(color).hsvArray()
  })
  return new Promise((resolve, reject) => {
    kmeans(hsvs, 10, (err, clusters) => {
      if(err) return relect(err)
      let cls = clusters.map( (clsts) => {
        return clsts.map( (c) => {
          let color = Color({h: c[0], s: c[1], v: c[2]}).rgbString()
          let hist = histogram.find((item) => {
            return item.color == color
          })
          return {
            color: color,
            count: hist ? hist.count : 0
          }
        })
      })
      resolve(cls)
    })
  })
}