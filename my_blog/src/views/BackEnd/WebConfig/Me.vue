<template>
  <div id="Me">
    <div class="title">
      <span>关于我们</span>
      <el-button size="mini" @click="_submit">更新</el-button>
    </div>
    <mavon-editor class="editor" ref="md" @imgAdd="_mdImgAdd" v-model="me.md" />
  </div>
</template>
<script>
import marked from '@/plugins/marked'
import mdAddImage from '@/plugins/md_add_image'

export default {
  name: 'Me',
  mixins: [mdAddImage],
  computed: {
    ...mapGetters('webConfig', ['meInfo'])
  },
  data() {
    return {
      me: {
        md: "**Holle, I'm HoTao**\n==BaseInfo==\nI'm a good man."
      }
    }
  },
  async created() {
    await this._getMe()
    if (JSON.stringify(this.meInfo) !== '{}') this.me = this.meInfo
  },
  methods: {
    ...mapActions('webConfig', ['insertMe', 'getMe', 'updateMe']),
    ...mapActions(['getUploadToken', 'uploadToQiniu']),
    _mdImgAdd(pos, file) {
      this._imgAdd(pos, file, this.getUploadToken, this.uploadToQiniu)
    },
    // _imgAdd(pos, file) {
    //   this.getUploadToken()
    //     .then(data => {
    //       let formParams = new FormData()
    //       formParams.append('token', data.token)
    //       formParams.append('file', file)
    //       console.log(pos, file)
    //       console.log(formParams)
    //       this._startUploadImg(formParams, pos)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       this.$message({
    //         showClose: true,
    //         message: err.msg,
    //         type: 'error'
    //       })
    //     })
    // },
    // _startUploadImg(formParams, pos) {
    //   this.uploadToQiniu(formParams)
    //     .then(qiniuData => {
    //       console.log(qiniuData)
    //       this.$refs.md.$img2Url(pos, qiniuData.data.url)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       this.$message({
    //         showClose: true,
    //         message: '上传失败',
    //         type: 'error'
    //       })
    //     })
    // },
    _getMe() {
      return this.getMe()
    },
    _submit() {
      const parmas = {
        type: 'me',
        md: this.me.md,
        html: marked(this.me.md)
      }
      if (!this.me.id) {
        this.insertMe(parmas)
      } else {
        parmas.id = this.me.id
        this.updateMe(parmas).then(() => {
          this.$notify({
            title: '修改成功',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#Me
  .title
    display flex
    justify-content space-between
    align-items center
    font-weight bold
    margin 10px 0 20px
    border-left 2px solid $color-main
    padding-left 20px
    .el-button
      border-radius 5px
      background-color $color-main
      color white
      &:hover
        background-color lighten($color-main, 10%)
</style>
