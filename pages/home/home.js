// pages/home/home.js
function getAge(min, max) {
  var a = [];
  for (var i = min; i <= max; i++) {
    a.push(i);
  }
  return a
}
var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArr: ["男", "女"],
    ageArr: getAge(1, 100),
    ageIndex: 39,
    genderIndex: 0,
    info: {
      name: "zzz",
      age: 0,
      gender: "",
      avatar: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (data) {
      console.log(data);
      var sInfo = {
        name: (that.data.info.name ? that.data.info.name : data.nickName),
        gender: (that.data.info.gender ? that.data.info.gender : data.gender),
        avatar: data.avatarUrl
      }
      that.setData({
        info: Object.assign(that.data.info, sInfo),
        genderIndex: (that.data.genderIndex ? that.data.genderIndex : data.gender-1)
      })
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
    this.setData({
      genderIndex: e.detail.value
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
    app.authorize(function (data) {
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