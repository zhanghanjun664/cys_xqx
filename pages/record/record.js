// pages/record/record.js
'use strict';
var app = getApp();
// console.log(app);
var common = app.globalData;
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo:{
      diastolic:100,
      exam_date:"2017-5-24 19:35:00",
      heart_rate:95,
      systolic:80
    },
    recordArr:[],
    page_num: 0,
    page_size: 10,
    hasNext: true,
    canGet:true,
    activeData:null,
    activeIndex:null,
  },
  // shuaxin:function(){
  //   app.getUserInfo();
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    // var data = {
    //   page_num: 0,
    //   page_size: 10
    // }

    // wx.request({
    //   url: common.REST_PREFIX + "/genericapi/public/healthcenter/healthdata/bloodpressure/page?page_num=" + data.page_num + "&page_size=" + data.page_size,
    //   success: function (res) {
    //     console.log(res.data.result.content)
    //     res.data.result.content.map(function(item){
    //       item.showDate = utils.formatTime("date", item.exam_date);
    //       item.showTime = utils.formatTime("time", item.exam_date);
    //       return item
    //     })
    //     console.log(res.data.result.content)
    //     that.setData({
    //       recordArr:res.data.result.content
    //     })
    //   }
    // })

    
    // this.setData({
    //   recordArr: this.getData()
    // })
    var prom = new Promise(function(resolve,reject){
      // 判断当前用户是否有token(已经登录会直接执行回调，若没登录会信登录再执行回调)
      app.isLogin(resolve);
    })
    prom.then(function(){
      console.log("异步操作完成")
      that.getData()
    })
    
    // var promise = new Promise(function (resolve, reject) {
    //   console.log('Promise~~~');
    //   resolve();
    // });

    // promise.then(function () {
    //   console.log('Resolved.~~');
    // });


  },
  getData:function(){
    var that = this;
    console.log(that.data)
    if (that.data.hasNext && that.data.canGet){
      that.data.canGet = false;
      utils.ajax({
        url: common.REST_PREFIX + "/genericapi/private/healthcenter/healthdata/bloodpressure/page?page_num=" + that.data.page_num + "&page_size=" + that.data.page_size,
        success: function (res) {
          console.log(res)
          that.data.canGet = true;
          that.data.page_num++  ; 
          that.data.hasNext = res.data.result.has_next;
          //处理显示时间
          res.data.result.content.map(function (item) {
            item.showDate = utils.formatTime("date", item.exam_date);
            item.showTime = utils.formatTime("time", item.exam_date);
            return item
          })
          console.log(res.data.result.content)

          that.data.recordArr.push(...res.data.result.content);
          that.setData({
            recordArr: that.data.recordArr
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("隐藏record")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:"转发标题",
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    }
  },
  shouquan:function(){
    app.test(function(info){
      console.log(info)
    });
  },
  openAddRecord:function(e){
    console.log(e);
    console.log(JSON.stringify(this.data.activeData));
    if (e.currentTarget.dataset.type==1){
      this.data.activeIndex = e.currentTarget.dataset.index;
      this.data.activeData = this.data.recordArr[e.currentTarget.dataset.index]
    }
    console.log(JSON.stringify(this.data.activeData));
    wx.navigateTo({
      url: 'addRecord/addRecord?type=' + e.currentTarget.dataset.type
    })
  }
})

function getData(){
  var data = {
    page_num: 0,
    page_size: 10,
    hasNext: true
  }
  console.log(data)
  if (data.hasNext) {
    wx.request({
      url: common.REST_PREFIX + "/genericapi/public/healthcenter/healthdata/bloodpressure/page?page_num=" + data.page_num + "&page_size=" + data.page_size,
      success: function (res) {
        data.page_num++;
        data.hasNext = res.data.result.has_next;
        res.data.result.content.map(function (item) {
          item.showDate = utils.formatTime("date", item.exam_date);
          item.showTime = utils.formatTime("time", item.exam_date);
          return item
        })
        return res.data.result.content
      }
    })
  }
}