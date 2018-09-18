<template>
  <div id="Base">
    <div class="title">
      <span>网站基本信息配置</span>
      <el-button size="mini" @click="_sumbit">提交</el-button>
    </div>
    <div class="base-info">
      <div class="avatar">
        <el-upload class="avatar-uploader" action="//up-z2.qiniup.com" :data="uploadToken" :show-file-list="false" :on-success="_handleAvatarSuccess" :on-error="_handleAvatarError" :before-upload="_beforeAvatarUpload">
          <img v-if="base.avatar" :src="base.avatar">
          <span v-else>上传封面</span>
          <div class="upload-avatar">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
      </div>
      <el-input v-model="base.blog_name" size="mini" placeholder="网站名称">
        <template slot="prepend">网站名称</template>
      </el-input>
      <el-input v-model="base.github" size="mini" placeholder="github">
        <template slot="prepend">github</template>
      </el-input>
      <el-input class="input-title" type="textarea" size="mini" :rows="6" :maxlength="150" resize="none" v-model="base.sign" placeholder="请输入个性签名">
      </el-input>
      <div class="label-wrap">
        设置阅读密码：
        <el-checkbox size="mini" v-model="base.settingPassword"></el-checkbox>
      </div>
      <el-input class="input-title" size="mini" type="password" v-if="base.settingPassword && hadOldPassword" v-model="base.oldPassword" placeholder="请输入原密码">
        <template slot="prepend">原密码</template>
      </el-input>
      <el-input class="input-title" size="mini" type="password" v-if="base.settingPassword" v-model="base.viewPassword" placeholder="请输入新密码">
        <template slot="prepend">新密码</template>
      </el-input>
      <el-input class="input-title" size="mini" type="password" v-if="base.settingPassword" v-model="newPassword" placeholder="请再次输入新密码">
        <template slot="prepend">新密码</template>
      </el-input>
      <div class="just-say-hello">
        <div class="wxpay">
          <el-upload class="avatar-uploader" action="//up-z2.qiniup.com" :data="uploadToken" :show-file-list="false" :on-success="_handleAvatarSuccess" :on-error="_handleAvatarError" :before-upload="_beforeAvatarUpload">
            <img v-if="base.wxpay_qrcode" :src="base.wxpay_qrcode">
            <span v-else>上传微信收款码</span>
            <div class="upload-avatar">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </div>
        <div class="alipay">
          <el-upload class="avatar-uploader" action="//up-z2.qiniup.com" :data="uploadToken" :show-file-list="false" :on-success="_handleAvatarSuccess" :on-error="_handleAvatarError" :before-upload="_beforeAvatarUpload">
            <img v-if="base.alipay_qrcode" :src="base.alipay_qrcode">
            <span v-else>上传支付宝收款码</span>
            <div class="upload-avatar">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Base',
  computed: {
    ...mapGetters('webConfig', ['baseInfo']),
    ...mapGetters(['uploadToken'])
  },
  data() {
    return {
      base: {
        avatar: '',
        blog_name: '',
        github: '',
        sign: '',
        settingPassword: false,
        view_password: '',
        wxpay_qrcode: '',
        alipay_qrcode: '',
        oldPassword: ''
      },
      hadOldPassword: false,
      newPassword: ''
    }
  },
  async created() {
    await this._getWebConfig()
    if (JSON.stringify(this.baseInfo) !== '{}') {
      this.hadOldPassword = this.baseInfo.hadOldPassword
      this.base = this.baseInfo
      delete this.base['hadOldPassword']
    }
    this.getUploadToken()
  },
  methods: {
    ...mapActions(['getUploadToken']),
    ...mapActions('webConfig', [
      'getWebConfig',
      'insertWebConfig',
      'updateWebConfig'
    ]),
    _handleAvatarError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    _handleAvatarSuccess(res, file) {
      console.log(res, file)
      // this.article.cover = URL.createObjectURL(file.raw)
      this.base.avatar = res.url
    },
    _beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    _getWebConfig() {
      return this.getWebConfig().then(res => {
        console.log(res)
      })
    },
    _sumbit() {
      console.log(this.base)
      if (this.base.id) {
        this.updateWebConfig(this.base).then(() => {
          this.$notify({
            title: '成功',
            message: '配置修改成功',
            type: 'success'
          })
        })
      } else {
        this.insertWebConfig(this.base).then(() => {
          this.$notify({
            title: '成功',
            message: '增加网站基本配置成功',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#Base
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
  .base-info
    max-width 400px
    text-align center
    margin auto
    padding 10px
    border 1px solid $color-border
    >>>.el-input--mini
      margin 10px 0
    .label-wrap
      text-align left
      margin-bottom 20px
    .avatar
      position relative
      &:hover
        .upload-avatar
          background-color rgba($color-mid-grey, 0.8)
          i
            display inline
      .upload-avatar
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        display flex
        justify-content center
        align-items center
        i
          color white
          display none
    .just-say-hello
      display flex
      justify-content center
      align-items center
      >div
        position relative
      .upload-avatar
        position absolute
        display flex
        justify-content center
        align-items center
        top 0
        bottom 0
        left 0
        right 0
    img
      width 100px
      height @width
      margin-right 10px
      border-radius 5px
</style>
