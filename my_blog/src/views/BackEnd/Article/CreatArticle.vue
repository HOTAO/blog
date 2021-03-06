<template>
  <div id="creatArticle">
    <div class="title">
      编辑文章
      <div class="actions">
        <el-button v-if="!articleId" type="warning" @click="saveActicle">保存至草稿箱</el-button>
        <el-button v-if="!articleId" @click="_publishActicle" type="primary">发布</el-button>
        <el-button v-else @click="_updateActicle" type="primary">更新</el-button>
      </div>
    </div>
    <div class="article-edit">
      <mavon-editor
        class="editor"
        ref="md"
        @imgAdd="_mdImgAdd"
        @change="_updateActicleForDrafts"
        v-model="article.content"
        @htmlCode="_htmlCode"
      />
      <div class="article-info">
        <div class="upload">
          <el-upload
            class="cover-uploader"
            action="//up-z2.qiniup.com"
            :data="uploadToken"
            :show-file-list="false"
            :on-success="_handleCoverSuccess"
            :on-error="_handleCoverError"
            :before-upload="_beforeCoverUpload"
          >
            <img v-if="article.cover" :src="article.cover" />
            <span v-else>上传封面</span>
            <div class="upload-cover">
              <i class="el-icon-plus cover-uploader-icon"></i>
            </div>
          </el-upload>
        </div>
        <el-input v-model="article.title" size="mini" placeholder="标题"></el-input>
        <el-input
          v-model="article.dec"
          type="textarea"
          size="mini"
          :rows="6"
          :maxlength="150"
          placeholder="简介"
        ></el-input>
        <el-checkbox label="阅读加密" size="mini" v-model="article.isSecret"></el-checkbox>
        <br />
        <el-select size="mini" v-model="article.category_id" placeholder="文章分类">
          <el-option
            size="mini"
            v-for="cate in categorysInfo.list"
            :key="cate.id"
            :value="cate.id"
            :label="cate.name"
          ></el-option>
        </el-select>
        <br />
        <el-select
          size="mini"
          v-model="tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="文章标签"
        >
          <el-option
            size="mini"
            v-for="tag in tagsInfo.list"
            :key="tag.id"
            :value="tag.id"
            :label="tag.name"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import marked from '@/plugins/marked'
import mdAddImage from '@/plugins/md_add_image'

export default {
  name: 'creatArticle',
  mixins: [mdAddImage],
  computed: {
    ...mapGetters(['uploadToken']),
    ...mapGetters('article', ['articleData']),
    ...mapGetters('classify', ['categorysInfo', 'tagsInfo'])
  },
  data () {
    return {
      tags: [],
      article: {
        title: '',
        cover: '',
        dec: '',
        isSecret: false,
        content: '',
        category_id: ''
      },
      articleId: '',
      draftInrerval: ''
    }
  },
  async created () {
    this.getTags()
    this.getCategory()
    this.articleId = this.$route.params.articleId
    if (this.articleId) {
      await this._getArticleInfoById(this.articleId)
      this.article = this.articleData.articleInfo
      this.tags = []
      for (let index = 0; index < this.articleData.tags.length; index++) {
        const item = this.articleData.tags[index]
        this.tags.push(item.tag_id)
      }
    }
    await this._getUploadToken()
  },
  methods: {
    ...mapActions(['getUploadToken', 'uploadToQiniu']),
    ...mapActions('article', [
      'insertArticle',
      'getArticleInfoById',
      'updateArticleById'
    ]),
    ...mapActions('classify', ['getCategory', 'getTags']),
    _mdImgAdd (pos, file) {
      this._imgAdd(pos, file, this.getUploadToken, this.uploadToQiniu)
    },
    _handleCoverError (err, file, fileList) {
      console.log(err, file, fileList)
    },
    _handleCoverSuccess (res, file) {
      console.log(res, file)
      // this.article.cover = URL.createObjectURL(file.raw)
      this.article.cover = res.url
    },
    _beforeCoverUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || 'png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    _getCategory () {
      this.getCategory()
    },
    _getTags () {
      this.getTags()
    },
    _getUploadToken () {
      this.getUploadToken()
    },
    _getArticleInfoById (id) {
      return this.getArticleInfoById(id)
    },
    _htmlCode (a, b) {
      console.log(a, b)
    },
    _getParams (status) {
      let html = marked(this.article.content)
      let params = {
        title: this.article.title,
        cover: this.article.cover,
        dec: this.article.dec,
        isSecret: this.article.isSecret ? '1' : '0',
        content: this.article.content,
        category_id: this.article.category_id,
        tags: JSON.stringify(this.tags),
        htmlContent: html,
        status
      }
      return params
    },
    // TODO 存草稿
    _updateActicleForDrafts (value) {
      console.log(value)
    },
    _updateActicle () {
      const params = this._getParams(1)
      console.log(params)
      params.aid = this.articleId
      this.updateArticleById(params)
        .then(res => {
          console.log(res)
          this.$notify({
            title: '成功',
            message: '文章更新成功',
            type: 'success'
          })
          this.$router.push({ name: 'BackEndHome' })
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '失败',
            message: '文章更新失败',
            type: 'error'
          })
        })
    },
    _publishActicle () {
      const params = this._getParams(1)
      console.log(params)
      // return
      this.insertArticle(params)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '文章发表成功',
            type: 'success'
          })
          this.$router.push({ name: 'BackEndHome' })
          console.log(res)
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: '文章发表失败',
            type: 'error'
          })
          console.log(err)
        })
    },
    saveActicle () {
      const params = this._getParams(2)
      this.insertArticle(params)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '文章已存入草稿箱',
            type: 'success'
          })
          this.$router.push({ name: 'BackEndHome' })
          console.log(res)
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: '文章已存入草稿箱失败',
            type: 'error'
          })
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
#creatArticle
  .title
    display flex
    justify-content space-between
    align-items center
    margin 10px 0 40px
    padding-bottom 20px
    border-bottom 1px solid $color-border
    @media (max-width: 1324px)
      margin-bottom 10px
    .actions
      display flex
      justify-content space-between
      align-items center
      font-size 14px
      p
        margin-right 4px
        color $color-light-grey
        span
          border 1px solid $color-light-grey
          cursor pointer
          margin 0 2px
      button
        height 30px
        padding 6px 16px
  .article-edit
    display flex
    @media (max-width: 1324px)
      flex-direction column-reverse
    .editor
      width calc(100% - 310px)
      min-height calc(100vh - 141px)
      @media (max-width: 1324px)
        width 100%
    .article-info
      width 300px
      margin-left 10px
      @media (max-width: 1324px)
        width 100%
        margin 0 0 10px 0
  .article-info
    .upload
      position relative
      display flex
      align-items center
      // justify-content center
      height 150px
      color white
      // background-color $color-mid-grey
      cursor pointer
      &:hover
        .upload-cover
          background rgba($color-mid-grey, 0.8)
          i
            display inline
      .upload-cover
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        display flex
        align-items center
        justify-content center
        i
          display none
      img
        max-width 320px
        width 100%
        height 150px
    >>>.el-input--mini
      margin-top 10px
    >>>.el-checkbox
      margin-top 10px
</style>
