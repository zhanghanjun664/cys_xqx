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
    setCanvasL:0,
    canvasL: 0,
    showMsgLeft:0,
    showMsgTop:0,
    showMswBox:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.drawCanvas({
      id: "firstCanvas",
      id2: "canvasY",
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
      color: "#ff8201",
      r: 4,
      color2: "#4e8cfd",
      canvasW: that.data.canvasW,
      canvasH: that.data.canvasH,
      screenW: appSystem.screenWidth
    })
    utils.drawModal({
      id: "showMsg",
      value: "08:00 128/106"
    })

    // var ctx2 = wx.createCanvasContext("canvasY");
    // ctx2.beginPath();
    // // 背景涂白
    // ctx2.setFillStyle("white");
    // ctx2.fillRect(0, 0, 200, that.data.canvasH-50 );
    // ctx2.fill();
    // // x延长线
    // ctx2.setStrokeStyle("#c4c4c4");
    // ctx2.moveTo(0,that.data.canvasH-50);
    // ctx2.lineTo(100, that.data.canvasH - 50);
    // ctx2.stroke();

    // // 文字
    // var lengthY = Math.ceil(this.data.canvasH / 40 );
    // console.log(lengthY)
    // ctx2.setFontSize(14);
    // ctx2.setFillStyle("#999999");
    // for(var i=1;i<lengthY;i++){
    //   ctx2.fillText(40 * i, 20, that.data.canvasH - 50 - i * 40  );
    // }
    // ctx2.fill();

    // // y轴
    // ctx2.beginPath();
    // ctx2.moveTo(appSystem.screenWidth*0.12-1,0);
    // ctx2.lineTo(appSystem.screenWidth*0.12-1, that.data.canvasH - 50);
    // ctx2.stroke();    


    // ctx2.draw();

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
    this.setData({
      canvasL: e.detail.scrollLeft
    })
  },
  getData:function(){
    console.log("拉数据");
  },
  clickCanvas:function(e){
    var targetX = e.detail.x - 45 + this.data.canvasL;
    var num = Math.round((targetX - 20) / 40 + 1);
    console.log(num);
    // 20-50+45=15 第一个点离Y轴距离，自身宽度一半，距离父级距离
    var left = (num - 1) * 40 - 30 + appSystem.screenWidth*0.12 - this.data.canvasL;
    var top = e.detail.y - 25;
    console.log(left,top)
    this.setData({
      showMswBox:true,
      showMsgLeft:left,
      showMsgTop:top
    })

  }
})