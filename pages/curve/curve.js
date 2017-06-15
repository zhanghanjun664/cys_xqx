// pages/curve/curve.js

var utils = require("../../utils/util.js");
var common = getApp().globalData;
var appSystem;
wx.getSystemInfo({
  success: function (data) {
    appSystem = data;
  }
});


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasW: (appSystem.screenWidth-30),
    canvasH: 250,
    showPressureLeft:0,
    showPressureTop:0,
    showPressureBox:false,
    showHeartLeft: 0,
    showHeartTop: 0,
    showHeartBox: false,
    page_num:0,
    page_size:7,
    activeData:[],//当前曲线数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    utils.ajax({
      url: common.REST_PREFIX + "/genericapi/private/healthcenter/healthdata/bloodpressure/page?page_num=" + that.data.page_num + "&page_size=" + that.data.page_size,
      success: function (res) {
        console.log(res)
        that.data.page_num++;
        if (res.data.result.content.length){
          console.log("进来了")
          //处理显示时间
          res.data.result.content.map(function (item) {
            item.showX = utils.formatTime("m/d", item.exam_date);
            item.showTime = utils.formatTime("time", item.exam_date);
            return item
          });
          res.data.result.content.reverse();
          // 当前显示的数据
          that.data.activeData = res.data.result.content;

        }


        console.log(res.data.result.content)
        utils.drawCanvas({
          id: "pressureCanvas",
          box: res.data.result.content,
          lineWidth: 2,
          color: "#ff8201",
          r: 4,
          color2: "#4e8cfd",
          chartType: 2,
          dangerLineColor: "#ffd9b2",
          dangerColor: "#ff8201",
          dangerFont: "收缩压-警戒线",
          dangerValue: 140,
          dangerLineColor2: "#cadcfe",
          dangerColor2: "#4e8cfd",
          dangerFont2: "舒张压-警戒线",
          dangerValue2: 90,
          canvasW: that.data.canvasW,
          canvasH: that.data.canvasH
        })

        utils.drawCanvas({
          id: "heartCanvas",
          box: res.data.result.content,
          lineWidth: 2,
          color: "#ff8201",
          r: 4,
          color2: "#4e8cfd",
          chartType: 1,
          dangerLineColor: "#ffd9b2",
          dangerColor: "#ff8201",
          dangerFont: "心率-警戒线",
          dangerValue: 95,
          canvasW: that.data.canvasW,
          canvasH: that.data.canvasH
        })

      }
    })


    
    utils.drawModal({
      id: "showPressureBox",
      value: "08:00 128/106"
    })
    utils.drawModal({
      id: "showHeartBox",
      value: "09:00 128/106"
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
  getData:function(){
    console.log("拉数据");
  },
  clickPressureCanvas:function(e){
    var that = this;
    if(!this.data.activeData.length){
      return
    }

    var xstandard = (appSystem.screenWidth - 110)/6;
    var num = Math.round((e.detail.x - 60) / xstandard );
    // 60-50=10 第一个点离左边距离，自身宽度一半，距离父级距离
    var left = num * xstandard +10;
    var top = e.detail.y;
    console.log(e);

    this.setData({
      showPressureBox:true,
      showPressureLeft:left,
      showPressureTop:top
    })
    var showValue = that.data.activeData[num].showTime + " " + that.data.activeData[num].systolic + "/" + that.data.activeData[num].diastolic
    utils.drawModal({
      id: "showPressureBox",
      value: showValue
    })
  },
  clickHeartCanvas:function(e){
    var targetX = e.detail.x;
    var xstandard = (appSystem.screenWidth - 110) / 6;
    console.log(e)
    var num = Math.round((targetX - 60) / xstandard);
    console.log(num);
    // 20-50+45=15 第一个点离Y轴距离，自身宽度一半，距离父级距离
    var left = (num - 1) * 40 - 30 + appSystem.screenWidth * 0.12;
    var top = e.detail.y - 25;
  }
})