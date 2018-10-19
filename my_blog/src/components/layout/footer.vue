<template>
  <div id="footerLayout">
    <div class="container footer-warp">
      <p>
        本站年龄：{{text}}
      </p>
      <p>
        @{{baseInfo.blog_name}}--{{baseInfo.sign}}
      </p>
      <!-- <p>
        本站点采用
        <a href="">xxxxxxxxxxxxxxx协议</a>
      </p> -->
      <p>
        本作品采用：<a style="color:#3b74fe" rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a>
      </p>
      <p>
        本站由 @HoTao 创建 - @2018.
        <a href="http://www.miitbeian.gov.cn/" target="_black">粤ICP备18117296号</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footerLayout',
  computed: {
    ...mapGetters('webConfig', ['baseInfo'])
  },
  data() {
    return {
      createdTime: '1539745193000',
      text: ''
    }
  },
  created() {
    this._getWebConfig()
    setInterval(() => {
      let time = new Date() - this.createdTime
      let day = parseInt(time / 1000 / 60 / 60 / 24, 10)
      let hour = parseInt((time / 1000 / 60 / 60) % 24, 10)
      let minute = parseInt((time / 1000 / 60) % 60, 10)
      let second = parseInt((time / 1000) % 60, 10)
      this.text = `${day}天${hour}小时${minute}分${second}秒`
    }, 1000)
  },
  methods: {
    ...mapActions('webConfig', ['getWebConfig']),
    _getWebConfig() {
      return this.getWebConfig()
    }
  }
}
</script>
<style lang="stylus" scoped>
#footerLayout
  background-color $color-main
  font-size 13px
  color $color-light-grey
  .footer-warp
    display flex
    flex-direction column
    justify-content center
    height $footerHeight
  p
    padding 4px 0
    a
      color $color-light-grey
      text-decoration underline
</style>
