// pages/record/addRecord/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moodBox: ["平静", "愉悦", "兴奋", "感情", "思念", "低落", "焦虑", "忧伤", "愤怒", "懊恼"],
    selectedMood:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  handleClickMood:function(e){
    console.log(e.target.dataset.index);
    this.setData({
      selectedMood: e.target.dataset.index
    })
  }
})