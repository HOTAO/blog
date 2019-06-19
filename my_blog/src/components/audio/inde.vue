<template>
  <!-- 参考 https://segmentfault.com/a/1190000012453975?utm_source=tuicool&utm_medium=referral#articleHeader3 -->
  <div id="audio" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio
      ref="audio"
      class="dn"
      :autoplay="theAuto"
      :src="theUrl"
      :loop="theLoog"
      :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @waiting="onWaiting"
      @canplay="onCanplay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @ended="onEnded"
    ></audio>
    <div class="audio-warp">
      <!-- 当前播放时间 -->
      <el-tag v-show="!controlList.noCurrentTime" type="info">{{ audio.currentTime | formatSecond}}</el-tag>
      <!-- 播放进度条 -->
      <el-slider
        v-show="!controlList.noProcess"
        v-model="sliderTime"
        :step="0.01"
        :format-tooltip="formatProcessToolTip"
        @change="changeCurrentTime"
        class="slider"
      ></el-slider>
      <!-- <el-progress class="progress" v-show="!controlList.noProcess" :percentage="sliderTime" :stroke-width="6"></el-progress> -->
      <!-- 当前音频总时长 -->
      <el-tag v-show="!controlList.noMaxTime" type="info">{{ audio.maxTime | formatSecond }}</el-tag>
      <!-- 静音按钮 -->
      <el-button
        v-show="!controlList.noMuted"
        type="text"
        @click="startMutedOrNot"
      >{{audio.muted | transMutedOrNot}}</el-button>
      <!-- 音量控制条 -->
      <el-slider
        v-show="!controlList.noVolume"
        v-model="volume"
        :format-tooltip="formatVolumeToolTip"
        @change="changeVolume"
        class="slider"
      ></el-slider>
      <!-- 播放或者暂停按钮 -->
      <el-button class="play-or-pause" @click="startPlayOrPause">
        <transition name="playAndPause" mode="out-in">
          <!-- {{audio.playing | transPlayPause}} -->
          <i class="btn el-icon-caret-right" v-if="!audio.playing"></i>
          <span class="btn" v-else>=</span>
        </transition>
      </el-button>
      <!-- 播放速度按钮 -->
      <el-button v-show="!controlList.noSpeed" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>
      <!-- 下载按钮 -->
      <a
        :href="theUrl"
        v-show="!controlList.noDownload"
        target="_blank"
        class="download"
        download
      >下载</a>
    </div>
  </div>
</template>

<script>
import realFormatSecond from '@/fillter/secondFormat.js'
export default {
  name: 'vueAudio',
  props: {
    theAuto: {
      type: Boolean,
      default: false
    },
    theLoog: {
      type: Boolean,
      default: true
    },
    theUrl: {
      type: String,
      required: true
    },
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2]
      }
    },
    theControlList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second)
    },
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    transMutedOrNot(value) {
      return value ? '放音' : '静音'
    },
    transSpeed(value) {
      return '快进: x' + value
    }
  },
  created() {
    this.setControlList()
  },
  data() {
    return {
      // url: this.theUrl,
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: false,
        preload: 'auto'
      },

      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds,

      controlList: {
        // 不显示下载
        noDownload: true,
        // 不显示静音
        noMuted: true,
        // 不显示音量条
        noVolume: true,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: true,
        // 不要快进按钮
        noSpeed: true,
        // 不显示音频总时长
        noCurrentTime: false,
        noMaxTime: false
      }
    }
  },
  methods: {
    onEnded() {
      console.log('end', this.audio.playing)
      this.$emit('ended')
    },
    setControlList() {
      let keys = Object.keys(this.theControlList)
      keys.forEach(item => {
        if (this.controlList.hasOwnProperty(item)) {
          this.controlList[item] = this.theControlList[item]
        }
      })
    },
    // 播放速度
    changeSpeed() {
      let index = this.speeds.indexOf(this.audio.speed) + 1
      this.audio.speed = this.speeds[index % this.speeds.length]
      this.$refs.audio.playbackRate = this.audio.speed
    },
    // 是否静音
    startMutedOrNot() {
      this.$refs.audio.muted = !this.$refs.audio.muted
      this.audio.muted = this.$refs.audio.muted
    },
    // 音量条toolTip
    formatVolumeToolTip(index) {
      return '音量条: ' + index
    },
    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      // index = parseInt((this.audio.maxTime / 100) * index)
      index = (this.audio.maxTime / 100) * index
      return '进度条: ' + realFormatSecond(index)
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100
      this.volume = index
    },
    // 播放跳转
    changeCurrentTime(index) {
      console.log(index)
      this.$refs.audio.currentTime = (index / 100) * this.audio.maxTime
      // this.$refs.audio.currentTime = parseInt(
      //   (index / 100) * this.audio.maxTime
      // )
    },
    startPlayOrPause() {
      return this.audio.playing ? this.pausePlay() : this.startPlay()
    },
    // 开始播放
    startPlay() {
      console.log(this.$refs)
      this.$refs.audio.play()
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause()
    },
    // 当音频暂停(播放完成，会调用这个暂停函数)
    onPause() {
      this.audio.playing = false
      this.$emit('stop', false)
    },
    // 当发生错误, 就出现loading状态
    onError(err) {
      console.dir(err)
      this.audio.waiting = true
    },
    // 当音频开始等待
    onWaiting(res) {
      console.log('waiting')
      this.audio.waiting = true
      console.log(res)
    },
    // 当可以播放，就隐藏loading状态
    onCanplay(res) {
      console.log('canplay')
      this.audio.waiting = false
    },
    // 当音频开始播放
    onPlay(res) {
      this.audio.playing = true
      this.audio.loading = false

      if (!this.controlList.onlyOnePlaying) {
        return
      }

      let target = res.target

      let audios = document.getElementsByTagName('audio')

      ;[...audios].forEach(item => {
        if (item !== target) {
          item.pause()
        }
      })
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      this.audio.currentTime = res.target.currentTime
      // this.sliderTime = parseInt(
      //   (this.audio.currentTime / this.audio.maxTime) * 100
      // )
      this.sliderTime = (this.audio.currentTime / this.audio.maxTime) * 100
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.waiting = false
      this.audio.maxTime = parseInt(res.target.duration)
    }
  }
}
</script>

<style lang="stylus" scoped>
#audio
  .audio-warp
    display flex
    align-items center
  .slider, .progress
    flex 1
  .play-or-pause
    margin-left 18px
    background linear-gradient(to right, #49b3ed, #8cd6ff)
    border-radius 3px
    padding 0
    height 30px
    width 60px
  >>>.el-slider__bar
    background-color #79cefd
  >>>.el-slider__button
    background-color #79cefd
    border 0
    width 12px
    height @width
    box-shadow 0 0 10px 2px #79cefd
</style>

