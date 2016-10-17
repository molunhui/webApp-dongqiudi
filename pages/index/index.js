//index.js
//获取应用实例
let app = getApp()
let slider = require('../../api/slider.js')
let list = require('../../api/list')
let util = require('../../utils/util')
    // real api
let api = require('../../api/config')
let indexApi = 'https://api.dongqiudi.com/app/tabs/android/1.json?mark=gif'
let page = 1;
let articleList = []
console.log(api.index())
Page({
    data: {
        slider: [],
        swiper: {
          indicatorDots: false,
          autoplay: true,
          interval: 5000,
          duration: 1000
        },
        curIndex: 0,
        articleList: []
        // recommendLive: []
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
            that.getIndexData(indexApi)
            // that.getRecommendLive()
        })
    },

    navigatorChange: function(event) {
        let cur_index = event.detail.current;
        this.setData({
            curIndex: cur_index
        })
    },
    getIndexData: function(url) {
        // console.log(api.api.index)
        let that = this
        console.log(url)
        wx.request ({
            url: url,
            header: {},
            success: function(res) {
                articleList = articleList.concat(res.data.articles)
                console.log(articleList)
                for (let [index, elem] of res.data.recommend.entries()) {
                  elem.shareTitle = util.formatString(elem.title) + '...'
                }
                that.setData({
                  indexData: res.data,
                  slider: res.data.recommend,
                  articleList: articleList
                })
            }
        })
    },

    getRecommendLive: function() {
      let that = this
      wx.request({
        url: api.recommendLive(),
        header: {},
        success: function(res) {
          that.setData({
            recommendLive: res.data
          })
        }
      })
    },

    scrolltolower: function(event) {
      page += 1
      let url = event.target.dataset.loadUrl
      this.getIndexData(url)
    }
})