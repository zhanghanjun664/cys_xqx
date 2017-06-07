// pages/home/changeName/changeName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.name
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
  changeName:function(e){
    console.log(e);
    this.data.name = e.detail.value;
  },
  save:function(){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(prevPage.data.info)
    prevPage.setData({
      info: Object.assign(prevPage.data.info,{name:that.data.name})
    });
    wx.navigateBack({
      delta:1
    })
  }
})