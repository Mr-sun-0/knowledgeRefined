# [VUEPRESS](http://vuepress.vuejs.org/zh/)

##  1、[YARM Front Matter](https://jekyllrb.com/docs/front-matter/)

- Vuepress对yarm front matter提供了开箱即用的支持，在主题配置时可以用到。

- front matter是用来配置markdown的模板的，以---用来开头和结尾

##  2、导航栏

配置横向的导航栏，在.vuepress/config.js里配置，键的值是`nav:Array<{text:'',link:'',}`,`item`可以使导航变成下拉列表

导航栏的禁用，使用`navbar:false`，在markdown中用front matter的语法，在开头设置



## 3、侧边栏

1、为什么需要侧边栏？

- 文章内快速检索（目录TOC）
- 关联内容快速跳转

2、适合介绍页与博客的两种形式

数组和对象

3、一般在全局里设置`sidebar:auto`,侧边栏就是一篇文章的导航

## 4、SEO
- 1、title
- 2、destription
- 3、favicon(favicon.io)
- 4、author
- 5、keywords

### 在config里设置head字段
值为数组,与react封装节点差不多

## 5、[更新时间显示](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4)
1. 基于git提交时间
2. 修改文字
3. 时间格式moment(dayjs)




## 4、疑问解决
### 1、vuepress热更新失效问题解决
更改命令为：

"dev": "vuepress dev docs --temp .temp"

缺点：会多一个.temp文件，在进行git管理时需要忽略

