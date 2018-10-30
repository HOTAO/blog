import marked from 'marked'

const renderer = new marked.Renderer()
let index = 0
/**
 * renderer.heading直接修改的是标题的渲染回调。有三个参数
 * text: 标题内容
 * level: 标题等级 (h1、h2、h3)->(1、2、3)
 * raw: 与text一致，暂时不知道有什么用
 * marked中，heading如下：
 * heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
 * https://marked.js.org/#/USING_PRO.md#renderer
 */
renderer.heading = (text, level) => {
  return `<h${level} class="blog-head" id="blog-head-id-${index++}">${text}</h${level}>`
}

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
})

export default function markdown(str) {
  return marked(str, { renderer: renderer })
}
/**
# 标题1
你在说你吗呢
## 标题1.1
别搞了，好么
## 标题1.2
### 标题1.2.1
### 标题1.2.2
# 标题2
## 标题2.1
### 标题2.1.1
### 标题2.1.2
## 标题2.2
 */
