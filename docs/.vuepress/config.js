
module.exports = {
    base:'/docs/',
    title: '微光的个人空间',
    head:[
      ['meta',{name:'keywords',content:'前端，博客，微光'}],
      ['meta',{name:'author',content:'微光'}]
    ],
    description: '此心光明，夫复何求',
    plugins: [
      [
        '@vuepress/last-updated',
        {
          transformer: (timestamp) => {
            // 不要忘了安装 moment
            const moment = require('moment')
            moment.locale('zh-cn')
            return moment(timestamp).format('LLLL')
          }
        }
      ]
    ],
    themeConfig: {
      nav: [
        { text: '常见技术栈', link: '/common/' },
        { text: '深入理解',link: '/deepUse/'},
        { text: '工具和扩展', link: '/tools/'},
        { text: '项目', link: '/project/'}
      ],
      sidebar:{
        '/common':[
          '',
          'TypeScript'
        ]
      },
      lastUpdated:'最后更新时间'
    }
  }