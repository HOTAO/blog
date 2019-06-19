/*
 * @Author: HoTao 
 * @Date: 2019-04-10 12:13:51 
 * @Last Modified by: HoTao
 * @Last Modified time: 2019-05-09 12:00:00
 */
<template>
  <div id="wave">
    <div id="waveform"></div>
    <div class="actions">
      <div class="auto-play">
        <span>自动播放：</span>
        <el-switch v-model="isAutoPlay" v-if="showAuToBtn" @change="_changeAutoPlay"></el-switch>
      </div>
      <div class="re-play">
        <span>循环播放：</span>
        <el-switch v-model="isRePlay" v-if="showRePalyBtn" @change="_changeRePlay"></el-switch>
      </div>
    </div>
  </div>
</template>
<script>
import wavesurfer from 'wavesurfer.js'
export default {
  name: 'wave',
  props: {
    url: {
      type: String,
      default: ''
    },
    showAuToBtn: {
      type: Boolean,
      default: true
    },
    showRePalyBtn: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    url: function (newVal, oldVal) {
      if (newVal !== oldVal) this._initWavesurfer()
    },
  },
  data () {
    return {
      wavesurfer: null,
      loading: null,
      isAutoPlay: false,
      isRePlay: false,
      isFinish: false
    }
  },
  created () {
    this.$nextTick(() => {
      this._initWavesurfer()
    })
  },
  methods: {
    /**
     * @description 是否循环播放
     */
    _changeRePlay (v) {
      // this.
    },
    /**
     * @description 是否自动播放
     */
    _changeAutoPlay (v) {
      if (v) this.wavesurfer.play()
    },
    _loading () {
      this.loading = this.$loading({
        text: '加载中',
      })
    },
    _closeLoading () {
      this.loading.close()
    },
    _initWavesurfer () {
      if (this.wavesurfer) {
        this.wavesurfer.pause()
        this.url && this.wavesurfer.load(this.url)
        return
      }
      this.wavesurfer = wavesurfer.create({
        container: '#waveform',
        // waveColor: '#22b5ff',
        cursorColor: 'red',
        pixelRatio: 1
        // progressColor: '#50d8ff',
        // plugins: [regionsplugin.create()]
      })
      this.url && this.wavesurfer.load(this.url)
      const that = this
      this.wavesurfer.on('ready', () => {
        that._closeLoading()
        that.isAutoPlay && that.wavesurfer.play()
      })
      this.wavesurfer.on('loading', () => {
        that._loading()
      })
      this.wavesurfer.on('seek', () => {
        that.wavesurfer.playPause()
      })
      this.wavesurfer.on('finish', () => {
        that.isFinish = true
        that.$emit('finish')
        if (that.isRePlay) that.wavesurfer.play()
      })
      this.wavesurfer.on('error', () => {
        that._closeLoading()
        that.$notify({
          title: '错误',
          message: '音频出错了~请联系管理员',
          type: 'error'
        })
        that.$emit('error')
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#wave
  #waveform
    margin-bottom 40px
    border 1px solid $color-border
  .actions
    display flex
    margin 20px 0
    div+div
      margin-left 30px
</style>
