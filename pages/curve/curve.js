// pages/curve/curve.js

var utils = require("../../utils/util.js");
var common = getApp();
var appSystem;
var hadLoad = true;
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
    canvasW: appSystem.screenWidth,
    canvasH: 240,
    showPressureLeft:0,
    showPressureTop:0,
    showPressureBox:false,
    showHeartLeft: 0,
    showHeartTop: 0,
    showHeartBox: false,
    page_num:0,
    allData:[],//所有数据
    pressureActiveNum:0,//当前血压图数据
    heartActiveNum:0,//当前心率图数据
    tH:20,//title高度
    bH: 270,//盒子高度 canvasH+tH
    pressureTouchBox:[],//记录手势
    heartTouchBox:[],
    canLoad:true,
    maxNum:0,
    pressureTouch: true,//离开屏幕才能拉第二次
    heartTouch: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("onload");
    hadLoad = false;

    var prom = new Promise(function (resolve, reject) {
      // 判断当前用户是否有token(已经登录会直接执行回调，若没登录会信登录再执行回调)
      common.isLogin(resolve);
    })
    prom.then(function () {
      console.log("异步操作完成")
      that.getData(0, function (data) {
        // 血压图
        utils.drawCanvas({
          id: "pressureCanvas",
          box: data,
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
          canvasW: (that.data.canvasW - 30),
          canvasH: that.data.canvasH
        })

        // 心率图
        utils.drawCanvas({
          id: "heartCanvas",
          box: data,
          lineWidth: 2,
          color: "#ff8201",
          r: 4,
          color2: "#4e8cfd",
          chartType: 1,
          dangerLineColor: "#ffd9b2",
          dangerColor: "#ff8201",
          dangerFont: "心率-警戒线",
          dangerValue: 95,
          canvasW: (that.data.canvasW - 30),
          canvasH: that.data.canvasH
        })


      })
    })

    
  },
  getData:function(num,cb){
    var that = this;
    if (this.data.page_num <= num){
      this.data.canLoad = false;
      // 拉数据
      utils.ajax({
        url: "/genericapi/private/healthcenter/healthdata/bloodpressure/page?page_num=" + that.data.page_num + "&page_size=7",
        success: function (res) {
          that.data.canLoad = true;
          that.data.maxNum = res.data.result.total_pages;
          console.log(res)
          that.data.page_num++;
          if (res.data.result.content.length) {
            console.log("新拉的还有数据")
            //处理显示时间
            res.data.result.content.map(function (item) {
              item.showX = utils.formatTime("m/d", item.exam_date);
              item.showTime = utils.formatTime("time", item.exam_date);
              return item
            });
            console.log("过得来")
            res.data.result.content.reverse();
            // 当前显示的数据
            that.data.allData.push(res.data.result.content);
            typeof cb == "function" && cb(res.data.result.content)
          }else{
            console.log("已经没数据可以拉了")
            typeof cb == "function" && cb();
          }

        }
      })
    }else{
      // 有数据直接返回
      typeof cb == "function" && cb(that.data.allData[num]);
    }

    

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
    var update = common.globalData.dataHadChanged;
    var that = this;
    console.log(update)
    if (update && hadLoad){
      this.data.heartActiveNum = 0;
      this.data.pressureActiveNum = 0;
      this.data.allData = [];
      this.data.page_num = 0;
      this.getData(0, function (data) {
        // 血压图
        // utils.drawCanvas({
        //   id: "pressureCanvas",
        //   box: data,
        //   lineWidth: 2,
        //   color: "#ff8201",
        //   r: 4,
        //   color2: "#4e8cfd",
        //   chartType: 2,
        //   dangerLineColor: "#ffd9b2",
        //   dangerColor: "#ff8201",
        //   dangerFont: "收缩压-警戒线",
        //   dangerValue: 140,
        //   dangerLineColor2: "#cadcfe",
        //   dangerColor2: "#4e8cfd",
        //   dangerFont2: "舒张压-警戒线",
        //   dangerValue2: 90,
        //   canvasW: (that.data.canvasW - 30),
        //   canvasH: that.data.canvasH
        // })

        // 心率图
        utils.drawCanvas({
          id: "heartCanvas",
          box: data,
          lineWidth: 2,
          color: "#ff8201",
          r: 4,
          color2: "#4e8cfd",
          chartType: 1,
          dangerLineColor: "#ffd9b2",
          dangerColor: "#ff8201",
          dangerFont: "心率-警戒线",
          dangerValue: 95,
          canvasW: (that.data.canvasW - 30),
          canvasH: that.data.canvasH
        })


      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    common.globalData.dataHadChanged = false;
    hadLoad = true;
    this.setData({
      showPressureBox:false,
      showHeartBox:false
    })
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
  clickPressureCanvas:function(e){
    var that = this;
    var pressureActiveNum = this.data.pressureActiveNum;
    if (!this.data.allData[pressureActiveNum].length) {
      console.log("血压没数据")
      return
    }
    var xstandard = (appSystem.screenWidth - 110) / 6;
    var num = Math.round((e.changedTouches[0].x - 60) / xstandard);//点中对应的下标
    if (that.data.allData[that.data.pressureActiveNum].length - 1 < num) {
      return
    }
    // 60-50=10 第一个点离左边距离，自身宽度一半，距离父级距离
    // systolic高压 
    var left = num * xstandard + 10;
    var c = 200 - e.changedTouches[0].y, high = that.data.allData[pressureActiveNum][num].systolic, low = that.data.allData[pressureActiveNum][num].diastolic;
    console.log(e.changedTouches[0].y,c, high, low)
    var who = ((c - low) < (high - c)) ? low : high;
    var top = 210 - who;



    this.setData({
      showPressureBox: true,
      showPressureLeft: left,
      showPressureTop: top
    })
    var showValue = that.data.allData[pressureActiveNum][num].showTime + " " + that.data.allData[pressureActiveNum][num].systolic + "/" + that.data.allData[pressureActiveNum][num].diastolic
    utils.drawModal({
      id: "showPressureBox",
      top_icon: "showPressure_top_icon",
      bottom_icon: "showPressure_bottom_icon",
      value: showValue,
      width: 100,
      height: 26
    })
  },
  clickHeartCanvas:function(e){
    var that = this;
    if (!this.data.allData[that.data.heartActiveNum].length) {
      return
    }

    var xstandard = (appSystem.screenWidth - 110) / 6;
    var num = Math.round((e.changedTouches[0].x - 60) / xstandard);//点中对应的下标
    // 60-20=10 第一个点离左边距离，自身宽度一半，距离父级距离
    // systolic高压 
    var left = num * xstandard + 40;
    // console.log(that.data.allData[that.data.heartActiveNum][num].heart_rate);
    if (that.data.allData[that.data.heartActiveNum].length-1 < num){
      return
    }
    var top = 210 - that.data.allData[that.data.heartActiveNum][num].heart_rate;


    console.log(e);
    console.log(num)

    this.setData({
      showHeartBox: true,
      showHeartLeft: left,
      showHeartTop: top
    })
    utils.drawModal({
      id: "showHeartBox",
      top_icon: "showHeart_top_icon",
      value: that.data.allData[that.data.heartActiveNum][num].heart_rate,
      width:40,
      height:26
    })
  },
  pressureTouchend:function(e){
    console.log(e);
    this.data.pressureTouchBox = [];
    this.data.pressureTouch = true;

  },
  pressureTouchmove:function(e){
    var that = this;
    this.data.pressureTouchBox.push(e.touches[0].x);
    if (this.data.pressureTouch){
      if (this.data.pressureTouchBox[this.data.pressureTouchBox.length - 1] - this.data.pressureTouchBox[0] > 80){
        this.data.pressureTouch = false;
        console.log("下一页");
        console.log(this.data.canLoad);
        if (this.data.canLoad && (that.data.maxNum-1 > that.data.pressureActiveNum) ){
          that.data.pressureActiveNum++;
          this.getData(that.data.pressureActiveNum, function (data) {
            if (data){
              utils.drawCanvas({
                id: "pressureCanvas",
                box: data,
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
                canvasW: (that.data.canvasW - 30),
                canvasH: that.data.canvasH
              })
              that.setData({ showPressureBox: false })
            }
          })

        }
        
      } else if (this.data.pressureTouchBox[this.data.pressureTouchBox.length - 1] - this.data.pressureTouchBox[0] < -80){
        this.data.pressureTouch = false;
        console.log("上一页");
        if (that.data.pressureActiveNum == 0) {
          console.log("无更多数据")
          return
        }
        console.log(this.data.canLoad)
        if (this.data.canLoad) {

          console.log("数据可拉")
          that.data.pressureActiveNum--;
          this.getData(that.data.pressureActiveNum, function (data) {
            utils.drawCanvas({
              id: "pressureCanvas",
              box: data,
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
              canvasW: (that.data.canvasW - 30),
              canvasH: that.data.canvasH
            })
            that.setData({ showPressureBox: false })
          })
        }
      }

    }

  },
  heartTouchend:function(e){
    this.data.heartTouchBox = [];
    this.data.heartTouch = true;
  },
  heartTouchmove:function(e){
    var that = this;
    this.data.heartTouchBox.push(e.touches[0].x);
    if (this.data.heartTouch) {
      if (this.data.heartTouchBox[this.data.heartTouchBox.length - 1] - this.data.heartTouchBox[0] > 80) {
        this.data.heartTouch = false;
        console.log("下一页");
        console.log(this.data.canLoad);
        if (this.data.canLoad && (that.data.maxNum - 1 > that.data.heartActiveNum)) {
          that.data.heartActiveNum++;
          this.getData(that.data.heartActiveNum, function (data) {
            if (data) {
              utils.drawCanvas({
                id: "heartCanvas",
                box: data,
                lineWidth: 2,
                color: "#ff8201",
                r: 4,
                color2: "#4e8cfd",
                chartType: 1,
                dangerLineColor: "#ffd9b2",
                dangerColor: "#ff8201",
                dangerFont: "心率-警戒线",
                dangerValue: 95,
                canvasW: (that.data.canvasW - 30),
                canvasH: that.data.canvasH
              })
              that.setData({ showHeartBox: false })
            }
          })

        }
        
      } else if (this.data.heartTouchBox[this.data.heartTouchBox.length - 1] - this.data.heartTouchBox[0] < -80) {

        this.data.heartTouch = false;
        console.log("上一页");
        if (that.data.heartActiveNum == 0) {
          console.log("无更多数据")
          return
        }
        console.log(this.data.canLoad)
        if (this.data.canLoad) {

          console.log("数据可拉")
          that.data.heartActiveNum--;
          this.getData(that.data.heartActiveNum, function (data) {
            utils.drawCanvas({
              id: "heartCanvas",
              box: data,
              lineWidth: 2,
              color: "#ff8201",
              r: 4,
              color2: "#4e8cfd",
              chartType: 1,
              dangerLineColor: "#ffd9b2",
              dangerColor: "#ff8201",
              dangerFont: "心率-警戒线",
              dangerValue: 95,
              canvasW: (that.data.canvasW - 30),
              canvasH: that.data.canvasH
            })
            that.setData({ showHeartBox: false })
          })
        }


      }

    }

  }


})