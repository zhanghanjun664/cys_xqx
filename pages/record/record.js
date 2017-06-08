// pages/record/record.js
console.log(common);
var app = getApp();
var common = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo:{
      diastolic:100,
      exam_date:"2017-5-24 19:35:00",
      heart_rate:95,
      properties:{
        mood: "pingjing",
        remark: "我是备注"
      },
      systolic:80
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // var data = {
    //   date_from:"2017-5-23 19:35:00",
    //   date_to:"2017-5-26 19:35:00"
    // }
    // wx.request({
    //   url: common.REST_PREFIX + '/genericapi/public/healthcenter/healthdata/bloodpressure',
    //   data: JSON.stringify(data),
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
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
  openAddRecord:function(){
    wx.navigateTo({
      url: 'addRecord/addRecord'
    })
  }
})