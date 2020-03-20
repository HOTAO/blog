<template>
  <div class="qr-code-container">
    <img :src="imgSrc" alt />
  </div>
</template>


<script>
import QRCode from 'qrcode'
export default {
  props: {
    logo: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    width: {
      type: Number | String,
      default: 100,
      validator: s => isNaN(Number(s)) !== true
    },
    height: {
      type: Number | String,
      default: 100,
      validator: s => isNaN(Number(s)) !== true
    },
    format: {
      type: String,
      default: ''
    },
    quality: {
      type: String,
      default: ''
    },
    isBlob: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgSrc: ''
    }
  },
  mounted () {
    let op = {
      width: this.width,
      height: this.height
    }
    this.renderQrcode(this.value, this.logo, op)
  },
  methods: {
    renderQrcode (shareUrl, logo, op, format, quality) {
      QRCode.toCanvas(shareUrl, op, (error, canvas) => {
        if (error) console.log(error)
        if (logo) {
          const ctx = canvas.getContext('2d')
          let img = new Image()
          img.src = logo
          img.onload = () => {
            ctx.drawImage(img, (canvas.width / 5) * 2, (canvas.height / 5) * 2, canvas.width / 5, canvas.height / 5)
            this.setImg(canvas)
          }
          return
        }
        this.setImg(canvas)
      })
    },
    setImg (canvas) {
      if (this.isBlob) {
        let dataurl = this.canvas2dataurl(canvas, this.format, this.quality)
        let blbo = this.dataurl2blbo(dataurl)
        this.imgSrc = URL.createObjectURL(blbo)
        return
      }
      this.imgSrc = canvas.toDataURL()
    },
    canvas2dataurl (canvas, format, quality) {
      return canvas.toDataURL(format || 'image/jpeg', quality || 1.0)
    },
    dataurl2blbo (dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
