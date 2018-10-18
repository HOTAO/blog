const mdAddImage = {
  methods: {
    _imgAdd(pos, file, callback1, callback2) {
      callback1()
        .then(data => {
          let formParams = new FormData()
          formParams.append('token', data.token)
          formParams.append('file', file)
          this._startUploadImg(formParams, pos, callback2)
        })
        .catch(err => {
          console.log(err)
          this.$message({
            showClose: true,
            message: err.msg,
            type: 'error'
          })
        })
    },
    _startUploadImg(formParams, pos, callback2) {
      callback2(formParams)
        .then(qiniuData => {
          console.log(qiniuData)
          this.$refs.md.$img2Url(pos, qiniuData.data.url)
        })
        .catch(err => {
          console.log(err)
          this.$message({
            showClose: true,
            message: '上传失败',
            type: 'error'
          })
        })
    }
  }
}

export default mdAddImage
