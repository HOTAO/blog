const FrontEndRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/FrontEnd/Home/Home.vue')
  },
  {
    path: '/Classify',
    name: 'Classify',
    component: () =>
      import(/* webpackChunkName: "classify" */ '../views/FrontEnd/Classify/Classify.vue')
  },
  {
    path: '/Archives',
    name: 'Archives',
    component: () =>
      import(/* webpackChunkName: "archives" */ '../views/FrontEnd/Archives/Archives.vue')
  },
  {
    path: '/Friends',
    name: 'Friends',
    component: () =>
      import(/* webpackChunkName: "friends" */ '../views/FrontEnd/Friends/Friends.vue')
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: () =>
      import(/* webpackChunkName: "me" */ '../views/FrontEnd/Me/Me.vue')
  },
  {
    path: '/Article/:id',
    name: 'Article',
    component: () =>
      import(/* webpackChunkName: "article" */ '../views/FrontEnd/Article/Article.vue')
  },
  {
    path: '/ArticleList',
    name: 'ArticleList',
    component: () =>
      import(/* webpackChunkName: "articleList" */ '../views/FrontEnd/Article/ArticleList.vue')
  }
]
const BackEndRoutes = [
  {
    path: '/BackEnd/Home',
    name: 'BackEndHome',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "backEndHome" */ '../views/BackEnd/Home/Home.vue')
  },
  {
    path: '/BackEnd/Article/Creat',
    name: 'CreatArticle',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "creatArticle" */ '../views/BackEnd/Article/CreatArticle.vue')
  },
  {
    path: '/BackEnd/Article/Edit/:articleId',
    name: 'EditArticle',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "EditArticle" */ '../views/BackEnd/Article/CreatArticle.vue')
  },
  {
    path: '/BackEnd/Article/Manage',
    name: 'ManageArticle',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "ManageArticle" */ '../views/BackEnd/Article/ManageArticle.vue')
  },
  {
    path: '/BackEnd/Article/Drafts',
    name: 'DraftsArticle',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "DraftsArticle" */ '../views/BackEnd/Article/DraftsArticle.vue')
  },
  {
    path: '/BackEnd/Article/Deleted',
    name: 'DeletedArticle',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "DeletedArticle" */ '../views/BackEnd/Article/DeletedArticle.vue')
  },
  {
    path: '/BackEnd/Classify/Categories',
    name: 'BackEndCategories',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Categories" */ '../views/BackEnd/Classify/Categories.vue')
  },
  {
    path: '/BackEnd/Classify/Tags',
    name: 'BackEndTags',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Tags" */ '../views/BackEnd/Classify/Tags.vue')
  },
  {
    path: '/BackEnd/WebConfig/Base',
    name: 'Base',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Base" */ '../views/BackEnd/WebConfig/Base.vue')
  },
  {
    path: '/BackEnd/WebConfig/Friends',
    name: 'BackEndFriends',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Friends" */ '../views/BackEnd/WebConfig/Friends.vue')
  },
  {
    path: '/BackEnd/WebConfig/Me',
    name: 'Me',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Me" */ '../views/BackEnd/WebConfig/Me.vue')
  },
  {
    path: '/BackEnd/WebConfig/Resume',
    name: 'Resume',
    meta: { isBackEnd: true },
    component: () =>
      import(/* webpackChunkName: "Resume" */ '../views/BackEnd/WebConfig/Resume.vue')
  }
]
const routes = [...FrontEndRoutes, ...BackEndRoutes]
export default routes
