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
      console.log('watch')
      this._getImg()
    }
  },
  mounted() {
    console.log('mounted')
    this._getImg()
  },
  methods: {
    _getImg() {
      // 页面渲染完成后执行里面的代码
      this.$nextTick(() => {
        let imgDomList = document
          .getElementById('markdown-preview-body')
          .getElementsByTagName('img')
        console.log(('imgDomList:', imgDomList))
        this.imgList = []
        Array.prototype.slice.call(imgDomList).forEach((img, index) => {
          img.indexTag = index
          img.onclick = this.showBigImg
          this.imgList.push({
            src: img.src,
            w: img.width,
            h: img.height,
            target: img
          })
        })
      })
    },
    showBigImg(e) {
      console.log('你好')
      this.$photoPreview.open(e.target.indexTag, this.imgList)
    }
  }
}
</script>
