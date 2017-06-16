// pages/home/home.js
function getAge(min, max) {
  var a = [];
  for (var i = min; i <= max; i++) {
    a.push(i);
  }
  return a
}
var utils = require("../../utils/util.js");
var common = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArr: ["男", "女"],
    ageArr: getAge(1, 100),
    ageIndex: 0,
    genderIndex: 0,
    info: {
      name: "",
      age: null,
      gender: "",
      avatar: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    common.getUserInfo(function (data) {
      console.log(data);
      if(data){
        var sInfo = {
          name: (that.data.info.name ? that.data.info.name : data.nickName),
          gender: (that.data.info.gender ? that.data.info.gender : data.gender),
          avatar: data.avatarUrl
        }
        that.setData({
          info: Object.assign(that.data.info, sInfo),
          genderIndex: String((that.data.genderIndex ? that.data.genderIndex : data.gender - 1))
        })
      }
    })

    utils.ajax({
      url: common.globalData.REST_PREFIX +"/mpapi/private/mini_program/account/info",
      success:function(res){
        console.log(res);
      }
    })

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
    console.log("home.onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("home.onUnload")
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

  },
  go: function () {
    wx.navigateTo({
      url: 'changeName/changeName',
    })
  },
  changeAge: function (e) {


    this.setData({
      ageIndex: e.detail.value
    })
  },
  changeGender: function (e) {
    var that = this;
    utils.ajax({
      url: common.globalData.REST_PREFIX + "/mpapi/private/mini_program/account/info",
      method:"POST",
      data: { gender: Number(that.data.genderIndex)+1 },
      success:function(res){
        that.setData({
          genderIndex: e.detail.value
        })
      }
    })

  },
  changeName: function () {
    // var data = JSON.stringify(this.data.info);
    var data = utils.formatOptions(this.data.info);
    var that = this;
    wx.navigateTo({
      url: 'changeName/changeName?name=' + that.data.info.name,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goAuthorize: function () {
    var that = this;
    common.authorize(function (data) {
      var sInfo = {
        name: that.data.info.name ? that.data.info.name : data.nickName,
        gender: that.data.info.gender ? that.data.info.gender : data.gender,
        avatar: data.avatarUrl
      }
      console.log(data);
      that.setData({
        info: Object.assign(that.data.info,sInfo),
        genderIndex: (that.data.genderIndex ? that.data.genderIndex : data.gender-1)
      })
    })
  },
})