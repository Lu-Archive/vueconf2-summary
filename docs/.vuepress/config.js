module.exports = {
    host: '127.0.0.1',
    port: '2224',
    base:'/doc/vueconf-2/',
    title: '第二届Vue.js开发者大会',
    description: '第二届Vue.js开发者大会',
    plugins: [
        // 搜索插件
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }]
    ],
    themeConfig: {
        sidebar: {
            '/subject/':[
            // {
            //     title: '介绍',
            //     collapsable: false,
            //     children: [
            //         '/subject/',
            //     ]
            // },
            {
                title: '日程',
                collapsable: false,
                children: [
                    'vue3',
                    'vueDeclarative',
                    'vueCli',
                    'vue-weiyuanyue',
                    'vue-heshijun',
                    'vueAccessible',
                    'vue-tangjinzhou',
                    'vueElectron',
                    'vueHippy',
                    'vue-zhuoling',
                    'vueSSR',
                    'vueCRDT'
                ]
            }]
        },
        nav: [{
                text: '主页',
                link: '/'
            },
            {
                text:'日程',
                link:'/subject/'
            }
        ]
    }
}