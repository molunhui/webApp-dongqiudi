//index.js
//获取应用实例
var app = getApp()

var slider = require('../../api/slider.js');
Page({
  data: {
    slider: slider.data.info,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    curIndex: 0
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  navigatorChange: function(event) {
    let cur_index = event.detail.current;
    this.setData({
      curIndex: cur_index
    })
  },

  nvChanged: function() {

  }

})
