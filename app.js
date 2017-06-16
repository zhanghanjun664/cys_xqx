//app.js
var utils = require("utils/util.js");
App({
  onLaunch: function () {
    // wx.showModal({
    //   title: '第一次',
    //   content: '第一次啊',
    // })
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    wx.setStorageSync('REST_PREFIX', "https://wxtest.chengyisheng.com.cn" );
    // this.getUserInfo();
    this.setUserInfo();
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

          // wx.getStorage({
          //   key: 'token',
          //   success: function(res) {
          //     console.log(res);
          //     that.globalData.token = res.data
          //   },
          // })
          var hadToken = wx.getStorageSync("token");
          console.log(hadToken);
          // if (!hadToken){
          //   that.login(cb);
          //   // utils.wx_login(cb);
          // }else{
          //   cb();
          // }
          that.login(cb);
          
        },
        fail:function(cb){
          console.log("登录态过期")
          that.login();
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    REST_PREFIX: "https://wxtest.chengyisheng.com.cn",
    that:this
  },
  login:function(cb){
    var that = this;

      //调用登录接口
      wx.login({
        success: function (data) {
          console.log(data);

          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log(JSON.stringify(res));
              that.globalData.userInfo = res.userInfo

              var params = {
                code: data.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                rawData: res.rawData,
                signature: res.signature
              }
              console.log(params);
              utils.ajax({
                url: that.globalData.REST_PREFIX + '/mpapi/public/mini_program/account/login',
                method: "POST",
                data: params,
                success: function (res) {
                  console.log(res);
                  that.globalData.token = res.data.result.token;
                  wx.setStorage({
                    key: 'token',
                    data: res.data.result.token
                  })
                  // resolve(res.data.result.token);


                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })

            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) {
              console.log(res);
            }
          })

        }
      })
    // that.globalData.promise = promise;
    
    
  },
  setUserInfo:function(){
    var that = this;
    wx.login({
      success:function(){
        wx.getUserInfo({
          success:function(res){
            that.globalData.userInfo = res.userInfo
          }
        })
      }
    })
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
                    that.getUserInfo(function (userInfo) {
                      cb(userInfo);
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
  
