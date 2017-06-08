// pages/record/addRecord/addRecord.js
var utils = require("../../../utils/util.js");
var that;
var minValue = 0;
// var app = getApp();

var app;
wx.getSystemInfo({
  success: function (data) {
    console.log(data);
    app = data;
  }
});

var common = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    highValue: 0,
    lowValue:0,
    heartValue:0,
    canvasHeight: 70,
    canvasWB: "90%",
    showDate:"2014年1月1日",
    high_deltaX:0,
    low_deltaX:0,
    heart_deltaX:0
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
    console.log(JSON.stringify(this.data))
    var now = new Date();
    this.setData({
      nowDate: utils.formatTime("date:YY-MM-DD", now),
      nowTime: utils.formatTime("time", now),
    })
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
    console.log(JSON.stringify(this.data))
    that = this;
    // 绘制标尺
    that.drawRuler();
  },
  drawRuler: function () {

    /* 1.定义变量 */

    // 1.1 定义原点与终点，x轴方向起点与终点各留半屏空白
    var origion = { x: app.screenWidth*0.9 / 2, y: that.data.canvasHeight };
    var end = { x: app.screenWidth*0.9  / 2, y: that.data.canvasHeight };
    // 1.2 定义刻度线高度
    var heightDecimal = 30;
    var heightDigit = 20;
    // 1.3 定义文本标签字体大小
    var fontSize = 16;
    // 1.4 最小刻度值
    // 已经定义在全局，便于bindscroll访问
    // 1.5 总刻度值
    var maxValue = 200;
    // 1.6 当前刻度值
    var high_currentValue = 20;
    var low_currentValue = 100;
    var heart_currentValue = 100;
    // 1.7 每个刻度所占位的px
    var ratio = 10;
    // 1.8 画布宽度
    var canvasWidth = maxValue * ratio + app.screenWidth*0.9 - minValue * ratio;
    // 设定scroll-view初始偏移
    that.setData({
      canvasWidth: canvasWidth,
      high_scrollLeft: (high_currentValue - minValue) * ratio,
      low_scrollLeft: (low_currentValue - minValue) * ratio,
      heart_scrollLeft: (heart_currentValue - minValue) * ratio
    });

    /* 2.绘制 */

    // 2.1初始化context
    var canvasId = ["canvas-ruler1", "canvas-ruler2","canvas-ruler3"];
    for(var k = 0;k<canvasId.length;k++){
      const context = wx.createCanvasContext(canvasId[k]);
      // 遍历maxValue
      for (var i = 0; i <= maxValue; i += 5) {
        context.beginPath();
        // 2.2 画刻度线
        context.moveTo(origion.x + (i - minValue) * ratio, origion.y - 5);
        // 画线到刻度高度，10的位数就加高
        context.lineTo(origion.x + (i - minValue) * ratio, origion.y - (i % ratio == 0 ? heightDecimal : heightDigit));
        // 设置属性
        context.setLineWidth(1);
        // 10的位数就加深
        context.setStrokeStyle(i % ratio == 0 ? 'gray' : 'darkgray');
        // 描线
        context.stroke();
        // 2.3 描绘文本标签
        context.setFillStyle('#bbbbbb');
        if (i % ratio == 0) {
          context.setFontSize(fontSize);
          // 为零补一个空格，让它看起来2位数，页面更整齐
          context.fillText(i == 0 ? ' ' + i : i, origion.x + (i - minValue) * ratio - fontSize / 2, fontSize+10);
        }
        context.closePath();
      }
      context.draw();
    }

    // 2.4 绘制到context
  },
  high_scroll: function (e) {
    console.log(e);
    // deltaX 水平位置偏移位，每次滑动一次触发一次，所以需要记录从第一次触发滑动起，一共滑动了多少距离
    this.data.high_deltaX += e.detail.deltaX;
    var lvalue;
    if (Math.floor(- this.data.high_deltaX / 10 + minValue) <= 0) {
      lvalue = 0;
    } else if (Math.floor(- this.data.high_deltaX / 10 + minValue) >= 200) {
      lvalue = 200;
    } else {
      lvalue = Math.floor(- this.data.high_deltaX / 10 + minValue);
    }
    console.log(lvalue, this.data.highValue);
    // 数据绑定
    that.setData({
      highValue: lvalue
    });
    console.log(lvalue,this.data.highValue);
  },
  low_scroll: function (e) {
    console.log(e);
    // deltaX 水平位置偏移位，每次滑动一次触发一次，所以需要记录从第一次触发滑动起，一共滑动了多少距离
    this.data.low_deltaX += e.detail.deltaX;
    var lvalue;
    if (Math.floor(- this.data.low_deltaX / 10 + minValue) <= 0) {
      lvalue = 0;
    } else if (Math.floor(- this.data.low_deltaX / 10 + minValue) >= 200) {
      lvalue = 200;
    } else {
      lvalue = Math.floor(- this.data.low_deltaX / 10 + minValue);
    }
    // 数据绑定
    that.setData({
      lowValue: lvalue
    });
  },
  heart_scroll: function (e) {
    console.log(e);
    // deltaX 水平位置偏移位，每次滑动一次触发一次，所以需要记录从第一次触发滑动起，一共滑动了多少距离
    this.data.heart_deltaX += e.detail.deltaX;
    var lvalue;
    if (Math.floor(- this.data.heart_deltaX / 10 + minValue) <= 0) {
      lvalue = 0;
    } else if (Math.floor(- this.data.heart_deltaX / 10 + minValue) >= 200) {
      lvalue = 200;
    } else {
      lvalue = Math.floor(- this.data.heart_deltaX / 10 + minValue);
    }
    // 数据绑定
    that.setData({
      heartValue: lvalue
    });
  },
  handleSwitch:function(e){
    console.log(e);
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
    console.log(this.data.date, this.data.time, this.data.highValue, this.data.lowValue, this.data.heartValue);
    var data = {
      diastolic: 100,
      exam_date: "2017-5-24 19:35:00",
      heart_rate: 95,
      properties: {
        mood: "pingjing",
        remark: "我是备注"
      },
      systolic: 80
    }
    console.log(data);
    wx.request({
      url: common.REST_PREFIX + '/genericapi/public/healthcenter/healthdata/bloodpressure',
      data: JSON.stringify(data),
      method:"POST",
      success:function(res){
        console.log(res);
      }
    })
  },
  goRemark:function(){
    wx.navigateTo({
      url: 'remark/remark',
    })
  }
})