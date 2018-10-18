<template>
  <div id="Me" v-loading="loading">
    <div class="container preview">
      <div class="header">
        <h1>关于我</h1>
      </div>
      <mdPreview :content="meInfo.html"></mdPreview>
      <div class="tips">如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</div>
      <div class="admire-btn">
        <el-button type="danger" @click="showQrcode = !showQrcode">赞赏支持</el-button>
      </div>
      <transition name="slide-fade">
        <div class="qrcode-wrap" v-show="showQrcode">
          <span class="qrcode">
            <img :src='baseInfo.wxpay_qrcode' />
            <p>微信支付</p>
          </span>
          <span class="qrcode">
            <img :src='baseInfo.alipay_qrcode' />
            <p>支付宝支付</p>
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import mdPreview from '@/components/md-preview'
export default {
  name: 'Me',
  computed: {
    ...mapGetters('webConfig', ['meInfo', 'baseInfo'])
  },
  components: {
    mdPreview
  },
  data() {
    return {
      showQrcode: false,
      loading: false
    }
  },
  created() {
    this._getMe()
    this._getWebConfig()
  },
  methods: {
    ...mapActions('webConfig', ['getMe', 'getWebConfig']),
    _getMe() {
      this.loading = true
      return this.getMe().then(() => {
        this.loading = false
      })
    },
    _getWebConfig() {
      return this.getWebConfig()
    }
  }
}
</script>

<style lang="stylus" scoped>
#Me
  padding 40px 0
  @media (max-width: 768px)
    padding-top 20px
  .preview
    border 1px solid $color-border
    padding 20px
    .header
      text-align center
      margin-bottom 20px
    .tips, .admire-btn
      text-align center
      margin-top 20px
    .qrcode-wrap
      margin-top 10px
      display flex
      flex-direction row
      justify-content center
      align-items center
      flex-wrap wrap
      .qrcode
        width 200px
        display flex
        flex-direction column
        align-items center
        justify-content center
        margin-bottom 10px
        padding 10px
        > img
          width 180px
          height 180px
        > p
          text-align center
          line-height 1.5
          color #555555
          font-size 14px
  .slide-fade-enter-active
    transition all 0.3s ease
  .slide-fade-leave-active
    transition all 0.3s ease
  .slide-fade-enter, .slide-fade-leave-to
    transform translateY(20px)
    opacity 0
  @keyframes show
    from
      margin-top -10px
      opacity 0
    to
      margin-top 0px
      opacity 1
</style>
