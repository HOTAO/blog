<template>
  <div id="mdPreview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" class=" markdown-body" v-html="content">
    </section>
  </div>
</template>
<script>
export default {
  name: 'mdPreview',
  props: ['content'],
  watch: {
    content() {
      // this.setArticleMenu(false)
      this._getImg()
      // setTimeout(this._getImg, 1000)
    }
  },
  mounted() {
    this._getImg()
    // setTimeout(this._getImg, 1000)
  },
  methods: {
    _getImg() {
      // 页面渲染完成后执行里面的代码
      this.$nextTick(() => {
        let imgDomList = document
          .getElementById('markdown-preview-body')
          .getElementsByTagName('img')
        Array.prototype.slice.call(imgDomList).forEach(img => {
          img.onclick = this.showBigImg
        })
      })
    },
    showBigImg(e) {
      let imgDomList = document
        .getElementById('markdown-preview-body')
        .getElementsByTagName('img')
      this.imgList = []
      Array.prototype.slice.call(imgDomList).forEach((img, index) => {
        img.indexTag = index
        this.imgList.push({
          src: img.src,
          w: img.width,
          h: img.height,
          target: img
        })
      })
      this.$photoPreview.open(e.target.indexTag, this.imgList)
    }
  }
}
</script>
