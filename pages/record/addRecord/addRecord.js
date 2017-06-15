// pages/record/addRecord/addRecord.js
var utils = require("../../../utils/util.js");
// var app = getApp();

// var app;
// wx.getSystemInfo({
//   success: function (data) {
//     console.log(data);
//     app = data;
//   }
// });

var common = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    highValue: 0,
    lowValue:0,
    heartValue:60,
    showDate:"",
    date:"",//value值 YYYY-MM-dd
    time:"",//hh:mm
    currentData:null,
    properties:{
      mood:"",
      remark:""
    },
    types:null,
    id:"",
    noteHeart:true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var now = new Date();
    // this.setData({
    //   nowDate: utils.formatTime("date:YY-MM-DD", now),
    //   nowTime: utils.formatTime("time", now),
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("addRecord----onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(this.data)
    // console.log("addRecord----onUnload!!");
    // wx.showModal({
    //   title: '你好',
    //   content: '内容',
    // })
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
  go:function(){
    wx.navigateTo({
      url: 'remark/remark',
    })
  },
  onLoad: function (options) {
    // type  1:点击对应数据进来    2：点击添加进来，显示空页面
    console.log(options);
    var pages = getCurrentPages();
    var prevPages = pages[pages.length - 2];
    var now = new Date();
    this.data.types = options.type;
    if(options.type == 1){
      this.data.currentData = prevPages.data.activeData;
      this.data.id = prevPages.data.activeData.id;
      this.data.properties.mood = prevPages.data.activeData.properties.mood;
      this.data.properties.remark = prevPages.data.activeData.properties.remark;
      this.setData({
        date: utils.formatTime("date:YY-MM-DD",prevPages.data.activeData.exam_date),
        time: utils.formatTime("time", prevPages.data.activeData.exam_date),
        highValue: prevPages.data.activeData.systolic,
        lowValue: prevPages.data.activeData.diastolic,
        heartValue: prevPages.data.activeData.heart_rate,
        showDate: utils.formatTime("date", prevPages.data.activeData.exam_date),
        nowDate: utils.formatTime("date:YY-MM-DD", now),
        properties: this.data.properties
      })
      console.log(this.data, prevPages.data.activeData)
    }else{
      this.setData({
        date: utils.formatTime("date:YY-MM-DD", now),
        time: utils.formatTime("time", now),
        showDate: utils.formatTime("date", now),
        nowDate: utils.formatTime("date:YY-MM-DD", now)
      })
    }
    console.log(this.data);
  },
  
  handleSwitch:function(e){
    console.log(e);
    this.data.noteHeart = e.detail.value;
  },
  changeDate:function(e){
    
    console.log(e);
    this.setData({
      date: e.detail.value,
      showDate: utils.formatTime(4, e.detail.value)
    })
  },
  changeTime:function(e){
    this.setData({
      time:e.detail.value
    })
  },
  handleConfirm:function(){
    var that = this;
    var record_date = that.data.date + " " + that.data.time;
    var record_stamp = utils.formatTime("stamp",record_date);//拿时间戳
    var heart_rate = this.data.noteHeart ? this.data.heartValue : "";//心率
    var data = {
      diastolic: that.data.lowValue,//低压
      exam_date: (that.data.date +" "+ that.data.time),
      heart_rate: heart_rate,
      properties: {
        mood: that.data.properties.mood,
        remark: that.data.properties.remark
      },
      systolic: that.data.highValue,//高压
      exam_timestamp: record_stamp,
      id:that.data.id
    }
    console.log(data);
    if (that.data.highValue < that.data.lowValue){
      wx.showToast({
        title: '收缩压必须大于舒张压！',
        duration:2000
      })
    }else{
      console.log("数据没问题")
      utils.ajax({
        url: common.REST_PREFIX + '/genericapi/private/healthcenter/healthdata/bloodpressure',
        data: data,
        method:"POST",
        success:function(res){
          var pages = getCurrentPages();
          var prevPages = pages[pages.length - 2];
          console.log(res);
          var handle_data = res.data.result;
          
          handle_data.showDate = utils.formatTime("date", handle_data.exam_date);
          handle_data.showTime = utils.formatTime("time", handle_data.exam_date);
          if(that.data.types == 2){
            // 新增
            console.log(prevPages.data.recordArr);
            var saveIndex = [];
            console.log(record_stamp);
            prevPages.data.recordArr.map(function(item,index){
              console.log(item)
              if (item.exam_timestamp < record_stamp) {
                saveIndex.push(index)
              }
            })
            console.log(saveIndex);
            if (saveIndex.length){
              prevPages.data.recordArr.splice(saveIndex[0], 0, handle_data);
            }else{
              prevPages.data.recordArr.push(handle_data)
            }
            prevPages.setData({
              recordArr: prevPages.data.recordArr
            })
          }else{
            // 修改
            prevPages.data.recordArr.splice(prevPages.data.activeIndex, 1, handle_data);
            prevPages.setData({
              recordArr: prevPages.data.recordArr
            })
          }
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
  },
  goRemark:function(){
    var that = this;
    console.log(that.data.properties);
    var data = utils.formatOptions(that.data.properties);
    wx.navigateTo({
      url: 'remark/remark?'+data,
    })
  },
  highChange:function(e){
    console.log(e)
    this.data.highValue = e.detail.value;
    // this.setData({
    //   highValue:e.detail.value
    // })
  },
  lowChange: function (e) {
    console.log(e)
    this.data.lowValue = e.detail.value;
    // this.setData({
    //   lowValue: e.detail.value
    // })
  },
  heartChange:function(e){
    this.data.heartValue = e.detail.value;
    // this.setData({
    //   heartValue: e.detail.value
    // })
  }
})