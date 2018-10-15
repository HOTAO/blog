<template>
  <div id="login">
    <el-form :model="form" :rules="rule" ref="loginForm" class="login-form">
      <div class="title">
        博客管理-后台登录
      </div>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" autofocus></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="_submit">立即登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rule: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    _submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('验证通过')
          this.login(this.form)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
              this.$notify({
                title: '错误',
                message: err.error || err,
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#login
  position absolute
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  // background rgba($color-main, 0.6)
  background-position center
  background-size cover
  background-image url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531830187560&di=7b8aa98324e4bef84b772c236b9bf321&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-02%2F5a224e304cc4f.jpg')
  z-index 2003
  .login-form
    background white
    width 400px
    padding 20px
    border-radius 10px
    .title
      text-align center
      padding-bottom 20px
      font-size 30px
      font-weight bold
    button
      width 100%
</style>
