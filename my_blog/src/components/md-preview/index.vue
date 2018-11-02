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
      this._initMd()
    }
  },
  mounted() {
    this._initMd()
  },
  beforeDestroy() {
    this.setArticleMenuStatus(false)
  },
  data() {
    return {
      titles: [],
      leval: 1
    }
  },
  methods: {
    ...mapActions([
      'setArticleMenuInfo',
      'setArticleMenuStatus',
      'setSourceArticleMenuInfo',
      'setArticleMenuTag'
    ]),
    _initMd() {
      // 如果要显示文章，那就把文章目录的状态设置为true，这样就能显示文章目录
      this.setArticleMenuStatus(true)
      // 下面需要操作渲染后的元素，所以要在$nextTick里面执行
      this.$nextTick(() => {
        this._getArticleMenu()
        this._getImg()
      })
    },
    // 获取articleList
    _getArticleMenu() {
      // 获取所有blog-head类名元素
      let nodeList = document.getElementsByClassName('blog-head')
      let titleList = []
      /**
       * 循环拼接数组数据
       * 参考：https://blog.csdn.net/qq_26847293/article/details/50833285
       */
      Array.prototype.map.call(nodeList, item => {
        let leval = item.tagName.replace('H', '')
        titleList.push({
          id: item.id,
          text: item.innerText,
          leval,
          children: []
        })
      })
      let tree = this._setTitleMune(titleList)
      console.log(tree)
      let source = JSON.parse(JSON.stringify(titleList))
      source.forEach(item => {
        item.children = []
      })
      // 保存文章目录到vuex
      this.setArticleMenuInfo(tree)
      // 初始化当前高亮的文章目录，默认'1.'
      this.setArticleMenuTag('1.')
      // 保存文章标题到vuex（即：没有判断父子标题的关系）
      this.setSourceArticleMenuInfo(source)
    },
    _setTitleMune(titleList, tag = '') {
      let titles = []
      titleList.map((item, index) => {
        let len = titles.length
        if (len <= 0) {
          item.tag = `${tag}${index + 1}.`
          titles.push(item)
        } else {
          let lastTitle = titles[len - 1]
          // 当前标题等级大于上一个标题的等级，例如（当前是h2，上一个是h1），那么当前标题为上一个标题的子标题
          if (lastTitle.leval < item.leval) {
            lastTitle.children.push(item)
          } else {
            item.tag = `${tag}${index + 1}.`
            titles.push(item)
          }
        }
      })
      /**
       * 上面的只能处理两层的父子标题关系，如果出现了3层甚至跟多，那么需要做递归处理。
       * 遍历上面等到的titles,遍历title.children属性，判断里面的leval时候有多个值，比如:2、3、4、5等等
       * 如果是，递归处理遍历title.children
       * */
      titles.map(title => {
        let children = title.children
        let levals = []
        children.map((child, index) => {
          child.tag = `${title.tag}${index + 1}.`
          if (levals.indexOf(child.leval) === -1) {
            levals.push(child.leval)
          }
        })
        if (levals.length > 1) {
          title.children = this._setTitleMune(children, title.tag)
        }
      })
      return titles
    },
    _getImg() {
      // 页面渲染完成后执行里面的代码
      let imgDomList = document
        .getElementById('markdown-preview-body')
        .getElementsByTagName('img')
      Array.prototype.slice.call(imgDomList).forEach(img => {
        img.onclick = this.showBigImg
      })
    },
    showBigImg(e) {
      let imgDomList = document
        .getElementById('markdown-preview-body')
        .getElementsByTagName('img')
      this.imgList = []
      /*
       * 这部分的需要获取img的宽度和高度，虽然已经有img存在了
       * 单数由于渲染的速度问题，会导致拿不到宽度和高度。
       * 所以，把这部分抽出来，在点击图片的时候，去设置高度和宽度等信息
      */
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
