<template>
  <div id="Resume">
    <div class="title">
      <span>我的简历</span>
      <el-button size="mini" @click="_submit">更新</el-button>
    </div>
    <mavon-editor ref="md" @imgAdd="_mdImgAdd" class="editor" v-model="resume.md" />
  </div>
</template>
<script>
import marked from '@/plugins/marked'
import mdAddImage from '@/plugins/md_add_image'

export default {
  name: 'Resume',
  mixins: [mdAddImage],
  computed: {
    ...mapGetters('webConfig', ['resumeInfo'])
  },
  data() {
    return {
      resume: {
        md: "**Holle, I'm HoTao** \n\n==ResumeInfo== \n\nThis's my resume."
      }
    }
  },
  async created() {
    await this._getResume()
    if (JSON.stringify(this.resumeInfo) !== '{}') this.resume = this.resumeInfo
  },
  methods: {
    ...mapActions('webConfig', ['insertResume', 'getResume', 'updateResume']),
    ...mapActions(['getUploadToken', 'uploadToQiniu']),
    _mdImgAdd(pos, file) {
      this._imgAdd(pos, file, this.getUploadToken, this.uploadToQiniu)
    },
    _getResume() {
      return this.getResume()
    },
    _submit() {
      const parmas = {
        type: 'resume',
        md: this.resume.md,
        html: marked(this.resume.md)
      }
      if (!this.resume.id) {
        this.insertResume(parmas)
      } else {
        parmas.id = this.resume.id
        this.updateResume(parmas).then(() => {
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
#Resume
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
