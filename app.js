//app.js
var utils = require("utils/util.js");

App({
  onLaunch: function () {
    // this.getUserInfo();
    // this.setUserInfo();
     
  },
  getUserInfo:function(cb){
    console.log(arguments)
    var that = this
    var tokens = wx.getStorageSync("token");
    if (this.globalData.userInfo || tokens){
      console.log("有");
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      console.log("无");
      // wx.getStorage({
      //   key: 'token',
      //   success: function(res) {
      //     console.log(res)
      //   },

      // })
      
      wx.checkSession({
        success:function(){
          console.log("登录成功")
          utils.wx_login(cb);
          
        },
        fail:function(cb){
          console.log("登录态过期")
          utils.wx_login(cb)
        }
      })
    }
  },
  isLogin:function(cb){
    var that = this
    var tokens = wx.getStorageSync("token");
    if(tokens){
      console.log("已经登录")
      cb()
    }else{
      console.log("还没登录")
      utils.wx_login(cb);
    }
  },
  globalData:{
    userInfo:null,
  },
  setUserInfo:function(cb){
    var that = this;
    if (that.globalData.userInfo){
      console.log("有资料了")
      cb(that.globalData.userInfo);
    }else{
      console.log("没资料")
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(res.userInfo);
            }
          })
        }
      })

    }
  },
  authorize:function(cb){
    var that = this;
    if (wx.canIUse("getSetting")) {
      wx.getSetting({
        success(res) {
          console.log(res);
          if (wx.canIUse("openSetting")) {
            console.log()
            if (!res.authSetting["scope.userInfo"]) {
              wx.openSetting({
                success: function (data) {
                  console.log(data)

                  if (data.authSetting["scope.userInfo"]) {
                    // that.getUserInfo(function (userInfo) {
                    //   cb(userInfo);
                    // })
                    that.setUserInfo(function(info){
                      cb(info)
                    })
                  }

                }
              })
            }
          } else {
            wx.showModal({
              title: '提提提醒',
              content: '不能openSetting',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提醒',
        content: '你的微信版本过低，不能getSetting',
      })
    }
  }
})
  
