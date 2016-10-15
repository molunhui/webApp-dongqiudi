

var  articles = require('../../api/articles')
console.log(articles)

Page({
    data: {
        // 文章
        article: null,
        // 图集
        mediaList: [],

        // 图片预览模式
        previewMode: false,

        // 当前预览索引
        previewIndex: 0
    },
    onLoad: function(params) {
        console.log('onLoad')
        console.log('article')
        this.getArticle(params)
        this.getMediaList()
    },

    getArticle: function(params) {
        console.log(params)
        let id = params.id , article = {}

        if (id === undefined) {
            article = articles.articles[0]
        } else {
            article = this.fillterArticle(id);
            console.log(article)
            // this.fillterArticle(id)
        }
        this.setData({
            article: article
        })
    },

    // 过滤文章
    fillterArticle(id) {
        var article = {}
        for (let [index, elem] of articles.articles.entries()) {
            if (Number(elem.meta.id) == id) {
                article = elem
            }
        }
        return article
    },

    // 过滤出预览图片
    getMediaList() {
        if(typeof this.data.article !== 'undefined' && this.data.article.list.length) {
            this.setData({
                mediaList: this.data.article.list.filter(content => content.type === "IMAGE")
            })
        }
        console.log(this.data.mediaList)
    },

    // 预览图集
    enterPreviewMode(event) {
        let url = event.target.dataset.src;
        let urls = this.data.mediaList.map(media => media.content)
        console.log(url)
        console.log(urls)
        let previewIndex = urls.indexOf(url)

        this.setData({
            previewMode: true, previewIndex
        })
    },

    // 退出预览模式
    leavePreviewMode() {
        this.setData({previewMode: false, previewIndex: 0});
    },


})