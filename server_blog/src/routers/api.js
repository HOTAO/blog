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
// const userController = require('../controllers/user')
// const ar = router
// [1,2,3,4].map(item => {
//   ar.get(`/get${item}`,)
//     .post(`/insert${item}`)
//     .delete(`/delete${item}`)
//     .patch(`/update${item}/:id`)
// })
const routers = router
  // .post('/login', userController.login)
  .get('/getHomeStatistics', staticController.getHomeStatistics)
  .get('/getUploadToken', qiniuController.getUploadToken)

  .get('/getWebConfig', webConfigController.getConfig)
  .post('/insertWebConfig', webConfigController.insertConfig)
  .patch('/updateWebConfig/:id', webConfigController.updateConfig)

  .get('/getTags', tagController.getTags)
  .post('/insertTag', tagController.insertTag)
  .delete('/deleteTag', tagController.deleteTagById)
  .patch('/updateTag/:id', tagController.updateTag)

  .get('/getResume', resumeController.getMyResume)
  .post('/insertResume', resumeController.insertMyResume)
  .patch('/updateResume/:id', resumeController.updateMyResume)

  .get('/getMe', meController.getMe)
  .post('/insertMe', meController.insertMe)
  .patch('/updateMe/:id', meController.updateMe)

  .get('/getFriends', friendsController.getFriends)
  .post('/insertFriend', friendsController.insertFriends)
  .delete('/deleteFriend', friendsController.deleteFriendById)
  .patch('/updateFriend', friendsController.updateFriend)

  .get('/getFriendType', friendTypeController.getFriendTypes)
  .post('/insertFriendType', friendTypeController.insertFriendType)
  .delete('/deleteFriendType', friendTypeController.deleteFriendTypeById)
  .patch('/updateFriendType', friendTypeController.updateFriendType)

  .get('/getCategory', categoryController.getCateGory)
  .post('/insertCategory', categoryController.insertCateGory)
  .delete('/deleteCategory', categoryController.deleteCateGoryById)
  .patch('/updateCategory/:category_id', categoryController.updateCateGoryById)

  .get('/getArticleByTag/:tag_id', articleController.getArticleByTag)
  .get('/getArticlesForWeb', articleController.getArticlesForWeb)
  .get('/getArticlesForServer', articleController.getArticlesForServer)
  .get('/getArticleInfoById/:article_id', articleController.getArticleInfoById)
  .post('/insertArticle', articleController.insertArticle)
  .delete('/deleteArticle', articleController.deleteArticleById)
  .patch('/updateArticleById/:id', articleController.updateArticleById)
  .patch('/updateArticleByStatus/:id', articleController.updateArticleByStatus)

  .get('/', async ctx => {
    ctx.body = 'Hello World'
  })

module.exports = routers
