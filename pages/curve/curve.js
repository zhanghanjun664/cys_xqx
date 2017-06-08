// pages/curve/curve.js

var utils = require("../../utils/util.js");
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
    canvasW: 750,
    canvasH: 250,
    canvasL: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.drawCanvas({
      id: "firstCanvas",
      box: [
        { x: 30, y: 22 },
        { x: 60, y: 98 },
        { x: 80, y: 48 },
        { x: 100, y: 55 },
        { x: 140, y: 95 },
        { x: 170, y: 75 },
        { x: 190, y: 144 },
        { x: 250, y: 105 },
        { x: 300, y: 95 },
        { x: 350, y: 75 },
        { x: 400, y: 144 },
        { x: 500, y: 105 },
        { x: 580, y: 95 },
        { x: 600, y: 75 },
        { x: 650, y: 180 },
        { x: -10, y: 180 },
      ],
      lineWidth: 2,
      strokeStyle: "red",
      r: 4,
      fillStyle: "blue",
      canvasW: that.data.canvasW,
      canvasH: that.data.canvasH
    })

    var ctx = wx.createCanvasContext("canvasY");
    ctx.beginPath();
    ctx.setFillStyle("white");
    ctx.fillRect(0, 0, 200, that.data.canvasH-50 );
    ctx.fill();
    ctx.setStrokeStyle("#c4c4c4");
    ctx.moveTo(0,that.data.canvasH-50);
    ctx.lineTo(100, that.data.canvasH - 50);
    ctx.stroke();

    var lengthY = Math.ceil(this.data.canvasH / 40 );
    console.log(lengthY)
    ctx.setFontSize(14);
    ctx.setFillStyle("#999999");
    for(var i=1;i<lengthY;i++){
      console.log(that.data.canvasH - 50 - i * 40 );
      ctx.fillText(40 * i, 20, that.data.canvasH - 50 - i * 40  );
    }
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(appSystem.screenWidth*0.16-1,0);
    ctx.lineTo(appSystem.screenWidth*0.16-1, that.data.canvasH - 50);
    ctx.stroke();    


    ctx.draw();

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
  handleScroll: function (e) {
    console.log(e);
    this.setData({})
  },
  getData:function(){
    console.log("拉数据");
  }
})