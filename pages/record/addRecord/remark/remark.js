// pages/record/addRecord/remark/remark.js
var common = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moodBox: [],
    selectedMood:null,
    properties:{
      remark: "我是备注页的内容",
      mood:""
    },
    canSave:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: common.REST_PREFIX +'/genericapi/public/healthcenter/healthdata/moods',
      success:function(res){
        console.log(res);
        var moodIndex = null;
        res.data.result.map(function(item,index){
          if (item.key == options.mood){
            moodIndex = index
          }
        })

        that.setData({
          moodBox:res.data.result,
          selectedMood:moodIndex
        })
      }
    })
    this.data.properties.remark = options.remark;
    this.data.properties.mood = options.mood;
    console.log(this.data.properties)
    this.setData({
      properties: that.data.properties
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
  handleClickMood:function(e){
    console.log(e);
    
    var index = e.currentTarget.dataset.index;
    console.log(this.data.moodBox[index]);
    if (index != this.data.selectedMood ){
      this.setData({
        selectedMood: index,
        canSave: true
      })
    }
    this.data.properties.mood = this.data.moodBox[index].key;
    
  },
  handleInput:function(e){
    console.log(e);
    this.data.properties.remark = e.detail.value;
    this.setData({
      canSave:true
    })
  },
  handleSave:function(){
    console.log(this.data.properties)
    var that = this;
    var pages = getCurrentPages();
    var prevPages = pages[pages.length - 2];
    prevPages.setData({
      properties:that.data.properties
    })
    wx.navigateBack({
      delta:1
    })
  }
})