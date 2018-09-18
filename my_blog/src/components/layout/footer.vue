<template>
  <div id="footerLayout">
    <div class="container footer-warp">
      <p>
        本站年龄：{{text}}
      </p>
      <p>
        @HoTao————前端开发、小程序开发、node开发....希望成为程序员的码农
      </p>
      <p>
        本站点采用
        <a href="">xxxxxxxxxxxxxxx协议</a>
      </p>
      <p>
        本站由 @HoTao 创建 - @2018.粤ICP背xxxxxxx号
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footerLayout',
  data() {
    return {
      createdTime: '1535438335433',
      text: ''
    }
  },
  created() {
    setInterval(() => {
      let time = new Date() - this.createdTime
      let day = parseInt(time / 1000 / 60 / 60 / 24, 10)
      let hour = parseInt((time / 1000 / 60 / 60) % 24, 10)
      let minute = parseInt((time / 1000 / 60) % 60, 10)
      let second = parseInt((time / 1000) % 60, 10)
      this.text = `${day}天${hour}小时${minute}分${second}秒`
    }, 1000)
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
</style>
