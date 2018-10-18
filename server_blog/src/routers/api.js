const router = require('koa-router')()
const articleController = require('../controllers/article')
const categoryController = require('../controllers/category')
const friendTypeController = require('../controllers/friend-type')
const friendsController = require('../controllers/friends')
const meController = require('../controllers/me')
const resumeController = require('../controllers/resume')
const tagController = require('../controllers/tag')
const webConfigController = require('../controllers/web-config')
const qiniuController = require('../controllers/qiniu')
const staticController = require('../controllers/static')
const adminController = require('../controllers/admin')
const sysLogController = require('../controllers/sys-log')
const commentController = require('../controllers/comment')
// const ar = router
// [1,2,3,4].map(item => {
//   ar.get(`/get${item}`,)
//     .post(`/insert${item}`)
//     .delete(`/delete${item}`)
//     .patch(`/update${item}/:id`)
// })
const routers = router
  .get('/getAllComments', commentController.getAllComments)
  .get('/getComments', commentController.getComments)
  .post('/verify/insertComment', commentController.insertComment)
  .delete('/verify/deleteComment/:id', commentController.deleteCommentById)
  .patch('/verify/updateComment/:id', commentController.updateComment)

  .get('/verify/getSysLog', sysLogController.getSysLog)

  .post('/login', adminController.login)

  .get('/verify/getHomeStatistics', staticController.getHomeStatistics)
  .get('/getUploadToken', qiniuController.getUploadToken)

  .get('/getWebConfig', webConfigController.getConfig)
  .post('/verify/insertWebConfig', webConfigController.insertConfig)
  .patch('/verify/updateWebConfig/:id', webConfigController.updateConfig)

  .get('/getTags', tagController.getTags)
  .post('/verify/insertTag', tagController.insertTag)
  .delete('/verify/deleteTag/:id', tagController.deleteTagById)
  .patch('/verify/updateTag/:id', tagController.updateTag)

  .get('/getResume', resumeController.getMyResume)
  .post('/verify/insertResume', resumeController.insertMyResume)
  .patch('/verify/updateResume/:id', resumeController.updateMyResume)

  .get('/getMe', meController.getMe)
  .post('/verify/insertMe', meController.insertMe)
  .patch('/verify/updateMe/:id', meController.updateMe)

  .get('/getFriends', friendsController.getFriends)
  .post('/verify/insertFriend', friendsController.insertFriends)
  .delete('/verify/deleteFriend', friendsController.deleteFriendById)
  .patch('/verify/updateFriend', friendsController.updateFriend)

  .get('/getFriendType', friendTypeController.getFriendTypes)
  .post('/verify/insertFriendType', friendTypeController.insertFriendType)
  .delete('/verify/deleteFriendType', friendTypeController.deleteFriendTypeById)
  .patch('/verify/updateFriendType', friendTypeController.updateFriendType)

  .get('/getCategory', categoryController.getCateGory)
  .post('/verify/insertCategory', categoryController.insertCateGory)
  .delete('/verify/deleteCategory/:id', categoryController.deleteCateGoryById)
  .patch(
    '/verify/updateCategory/:category_id',
    categoryController.updateCateGoryById
  )

  .get('/getArticleByTag/:tag_id', articleController.getArticleByTag)
  .get('/getArticlesForWeb', articleController.getArticlesForWeb)
  .get('/verify/getArticlesForServer', articleController.getArticlesForServer)
  .get('/getArticleInfoById/:article_id', articleController.getArticleInfoById)
  .post('/verify/insertArticle', articleController.insertArticle)
  .delete('/verify/deleteArticle', articleController.deleteArticleById)
  .patch('/verify/updateArticleById/:id', articleController.updateArticleById)
  .patch(
    '/verify/updateArticleByStatus/:id',
    articleController.updateArticleByStatus
  )

  .get('/', async ctx => {
    ctx.body = 'Hello World'
  })

module.exports = routers
