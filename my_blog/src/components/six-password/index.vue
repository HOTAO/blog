/*
 * @Author: HT
 * @Date: 2017-05-17 16:35:51
 * @Last Modified by: HT
 * @Last Modified time: 2017-11-14 17:12:10
 */
<template>
  <div class="payPsdInput">
    <Input class="passwordInput" autocomplete="off" :maxlength="6" type="password" v-model="password" placeholder="Password" @on-focus="inputFocus" @on-blur="inputBlur" @on-change="changeInput"></Input>
    <div class="one-box" :class="{ active: psdActive === 1}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd1">
    </div>
    <div class="one-box" :class="{ active: psdActive === 2}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd2">
    </div>
    <div class="one-box" :class="{ active: psdActive === 3}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd3">
    </div>
    <div class="one-box" :class="{ active: psdActive === 4}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd4">
    </div>
    <div class="one-box" :class="{ active: psdActive === 5}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd5">
    </div>
    <div class="one-box" :class="{ active: psdActive === 6}">
      <input class="psd-input-one" autocomplete="off" type="password" maxlength=1 v-model="psd6">
    </div>
    <!-- <span class="forget"> 忘记密码？</span> -->
  </div>
</template>

<script>
export default {
  props: {
    // 密码（父组件传下来的。做双向绑定 > 子组件改变 带动 父组件改变）
    psdProd: {
      type: String,
      default: ''
    }
    // 密码输入框是否获取了焦点，并且有多少个数字了（-1 未获取焦点、 1 2 3 4 5 6 分别表示第几个框有闪烁）
    // psdActive: {
    //   type: Number,
    //   default: -1
    // }
  },
  data() {
    return {
      password: this.psdProd,
      psdActive: -1,
      psd1: '',
      psd2: '',
      psd3: '',
      psd4: '',
      psd5: '',
      psd6: ''
    }
  },
  watch: {
    password: {
      handler(newValue, oldValue) {
        this.$emit('update:psdProd', newValue)
        /* eslint-disable */
        if (newValue.length > oldValue.length) {
          this.psdActive = newValue.length >= 6 ? 6 : newValue.length + 1
          // const lastNum = newValue.substr(newValue.length - 1, 1)
          newValue = newValue.length > 6 ? newValue.substr(0, 6) : newValue
          // if (newValue.length > 6){
          //   return
          // }
          switch (newValue.length) {
            case 6:
              this.psd6 = newValue.substr(newValue.length - 1, 1)
            case 5:
              this.psd5 = newValue.substr(newValue.length - 2, 1)
            case 4:
              this.psd4 = newValue.substr(newValue.length - 3, 1)
            case 3:
              this.psd3 = newValue.substr(newValue.length - 4, 1)
            case 2:
              this.psd2 = newValue.substr(newValue.length - 5, 1)
            case 1:
              this.psd1 = newValue.substr(newValue.length - 6, 1)
            default:
              break
          }
        } else {
          this.psdActive = newValue.length > 1 ? newValue.length + 1 : 1
          switch (newValue.length + 1) {
            case 1:
              this.psd1 = ''
              break
            case 2:
              this.psd2 = ''
              break
            case 3:
              this.psd3 = ''
              break
            case 4:
              this.psd4 = ''
              break
            case 5:
              this.psd5 = ''
              break
            case 6:
              this.psd6 = ''
              break
            default:
              break
          }
        }
        /* eslint-enable */
      },
      deep: true
    },
    psdProd(val) {
      if (!val) {
        this.password = ''
        this.psd1 = ''
        this.psd2 = ''
        this.psd3 = ''
        this.psd4 = ''
        this.psd5 = ''
        this.psd6 = ''
      }
    }
  },
  methods: {
    inputFocus() {
      this.psdActive = this.password.length >= 6 ? 6 : this.password.length + 1
    },
    inputBlur() {
      this.psdActive = -1
    },
    changeInput() {
      this.$emit('update:psdProd', this.password)
    }
  }
}
</script>
<style lang="stylus" scoped>
@keyframes flicker
  from
    opacity 0
  to
    opacity 1
.payPsdInput
  position relative
  .one-box
    display inline-block
    margin-right 8px
    &:first-child
      .psd-input-one
        border-left-width 1px
    .psd-input-one
      display inline-block
      width 45px
      height @width
      text-align center
      font-size 26px
      border 1px solid $color-border
      border-radius 6px
      outline 0
  .active
    position relative
    &:after
      content ''
      height 23px
      width 1px
      position absolute
      left 10px
      right 0
      top 0
      bottom 0
      margin auto
      background-color $color-disabled
      animation flicker 0.8s infinite
  .forget
    margin-left 5px
    color $color-dark-blue
    font-size 14px
    font-weight bold
    vertical-align super
  .passwordInput
    height 46px
    position absolute
    z-index 10
    opacity 0
    left 0
    top 0
    width 100%
    &>>>input
      width 334px
      height 46px
</style>