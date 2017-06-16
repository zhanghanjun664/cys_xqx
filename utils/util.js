// function formatTime(date) {
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()


//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
'use strict';
var common = getApp();

function formatTime(type,date) {
  if(type == 4){
    var arr = date.split("-");
    return arr[0] + "年" + arr[1] +"月"+arr[2]+"日"
  }
  
  if(typeof(date) === "string" ){
    date = date.replace(/-/g,":").replace(" ",":");
    date = date.split(":");
    date = new Date(date[0], (date[1] - 1), date[2], date[3], date[4]);
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var standard;
  if (type === "date") {
    return year + "年" + month + "月" + day + "日"
  }else if(type === "time"){
    var hh = hour.toString().length == 1 ? "0"+hour  : hour;
    var mm = minute.toString().length == 1 ? "0" + minute : minute;
    return hh + ":" +mm
  } else if (type === "date:YY-MM-DD"){
    return year + "-" + month + "-" + day
  }else if(type == "stamp"){
    return Date.parse(date)
  }else if(type == "m/d"){
    return month+"/"+day
  }
  // switch (type){
  //   case "date": 
  //     return year + "年" + month + "月" + day + "日"
  //   case "time":
  //     var hh = hour.toString().length == 1 ? "0" + hour : hour;
  //     var mm = minute.toString().length == 1 ? "0" + minute : minute;
  //     return hh + ":" + mm
  //   case "te:YY-MM-DD":
  //     return year + "-" + month + "-" + day
  //   case 5:
  //     return year + "年" + month + "月" + day + "日"
  //   case 6:
  //     return year + "年" + month + "月" + day + "日"
  // }

}

function formatOptions(obj){
  var a = "";
  for(var i in obj){
    if (obj[i].toString()){
    a += (i+"="+obj[i]+"&")

    }
  }
  // console.log(a.slice(0, -1));
  return a;
}

function drawCanvas(config) {
  var rNum = 7;
  var ctx = wx.createCanvasContext(config.id);
  var padding = config.padding || 40;
  var paddingLeft = 20;
  var xstandard = (config.canvasW - paddingLeft * 2 - padding) / (rNum-1);
  console.log(xstandard)
  // 排序(根据x从小到大)
  // config.box.sort(function (a, b) {
  //   return a.x - b.x
  // })
  console.log(config)

  // 警戒线
  ctx.beginPath();
  ctx.setLineWidth(1);
  ctx.setStrokeStyle(config.dangerLineColor);
  ctx.moveTo(show("x", 0), show("y", config.dangerValue));
  ctx.lineTo(show("x", config.canvasW), show("y", config.dangerValue));
  ctx.stroke();
  ctx.setFillStyle(config.dangerColor);
  ctx.setFontSize(14);
  ctx.setTextAlign("right");
  ctx.fillText(config.dangerFont, show("x", config.canvasW - padding), show("y", config.dangerValue+5));
  // 清除右边再写警戒值
  ctx.clearRect(config.canvasW, 0, 30, config.canvasH);
  ctx.setTextAlign("left");
  ctx.fillText(config.dangerValue, show("x", config.canvasW-padding+5), show("y", config.dangerValue -4));
  ctx.fill();
  if(config.chartType == 2){

    ctx.beginPath();
    ctx.moveTo(show("x", 0), show("y", config.dangerValue2));
    ctx.lineTo(show("x", config.canvasW), show("y", config.dangerValue2));
    ctx.setStrokeStyle(config.dangerLineColor2);
    ctx.stroke();
    ctx.setFillStyle(config.dangerColor2);
    ctx.setFontSize(14);
    ctx.setTextAlign("right");
    ctx.fillText(config.dangerFont2, show("x", config.canvasW - padding), show("y", config.dangerValue2+5));
    // 清除右边再写警戒值
    ctx.clearRect(config.canvasW, show("y", config.dangerValue2+20 ), 30, config.canvasH);
    ctx.setTextAlign("left");
    ctx.fillText(config.dangerValue2, show("x", config.canvasW - padding + 5), show("y", config.dangerValue2 - 4));
    ctx.fill();
  }


  // 坐标
  ctx.beginPath();
  // x轴
  ctx.moveTo(0, show("y",0));
  ctx.lineTo(config.canvasW, show("y",0));
  // y轴
  ctx.moveTo(show("x", 0), show("y",0));
  ctx.lineTo(show("x",0), show("y",config.canvasH));
  ctx.setStrokeStyle("#c4c4c4");
  ctx.setLineWidth(1);
  ctx.stroke();

  // 刻度(文字)
  ctx.beginPath();
  ctx.setFontSize(14);
  var xlength = Math.ceil(config.canvasW / xstandard) - 1;
  var lengthY = Math.ceil(config.canvasH / 40) - 1;
  // ctx.setTextAlign("center");
  ctx.setFillStyle("#acacac");
  ctx.setTextAlign("center");
  if (config.box.length){
    for (var i = 0; i < xlength; i++) {
      ctx.fillText(config.box[i].showX, show("x", i * xstandard + paddingLeft), show("y",-20));
      ctx.moveTo(show("x",paddingLeft+i*xstandard),show("y",0));
      ctx.lineTo(show("x", paddingLeft + i * xstandard), show("y", 5));
    }
    ctx.stroke();
  }
  for (var i = 1; i < (lengthY - 1); i++) {
    ctx.fillText(40 * i, show("x",-20),show("y",i*40));
  }

  if(config.box.length){
    // 画线
    ctx.beginPath();
    ctx.moveTo(show("x", paddingLeft), show("y", config.box[0].systolic));
    for (var i = 1; i < rNum; i++) {
      ctx.lineTo(show("x", xstandard * i + paddingLeft), show("y", config.box[i].systolic));
    }
    ctx.setLineWidth(config.lineWidth);
    ctx.setStrokeStyle(config.color);
    ctx.stroke();
    // 描点
    for (var i = 0; i < rNum; i++) {
      ctx.beginPath();
      ctx.arc(show("x", xstandard * i + paddingLeft), show("y", config.box[i].systolic), config.r, 0, Math.PI * 2);
      ctx.setFillStyle(config.color);
      ctx.fill();
    }

    if (config.chartType == 2) {
      // 画线
      ctx.beginPath();
      ctx.moveTo(show("x", paddingLeft), show("y", config.box[0].diastolic));
      for (var i = 1; i < rNum; i++) {
        ctx.lineTo(show("x", xstandard * i + paddingLeft), show("y", config.box[i].diastolic));
      }
      ctx.setLineWidth(config.lineWidth);
      ctx.setStrokeStyle(config.color2);
      ctx.stroke();
      // 描点
      for (var i = 0; i < rNum; i++) {
        ctx.beginPath();
        ctx.arc(show("x", xstandard * i + paddingLeft), show("y", config.box[i].diastolic), config.r, 0, Math.PI * 2);
        ctx.setFillStyle(config.color2);
        ctx.fill();
      }
    }
  }

 

  ctx.draw();
  function show(type, num) {
    if (type == "x") {
      return num+padding
    }
    if (type == "y") {
      return config.canvasH - padding - num
    }
  }

}
function drawModal(config){
  var ctx2 = wx.createCanvasContext(config.icon_id);
  ctx2.beginPath();
  ctx2.setFillStyle("white");
  ctx2.fillRect(0,0,30,30);
  ctx2.fill();
  ctx2.setStrokeStyle("#dcdcdc");
  ctx2.moveTo(0,0);
  ctx2.lineTo(10,12);
  ctx2.lineTo(20,0);
  ctx2.stroke();
  ctx2.draw();

  var ctx = wx.createCanvasContext(config.id);
  ctx.setFillStyle("white");
  ctx.fillRect(0,0,100,30);
  ctx.fill();
  ctx.setFillStyle("black");
  ctx.setFontSize(14);
  ctx.fillText(config.value,5,20);
  ctx.fill();
  ctx.draw();
}

function ajax(config){
  var token = wx.getStorageSync("token");
  // var token = wx.getStorageSync("token");
  // if(!token){
  //   console.log("没有token");
  //   console.log(common.globalData.promise);
  //   common.globalData.promise.then(function(tokens){
  //     token = tokens;
  //     var header = {
  //       "X-Cys-Client": "WX_MINI_PROGRAM",
  //       Authorization: "CYSTOKEN " + token
  //     }
  //     console.log(config, header);

  //     wx.request({
  //       header: header,
  //       url: config.url,
  //       method: config.method || "GET",
  //       data: JSON.stringify(config.data),
  //       success: function (res) {
  //         console.log("下面")
  //         console.log(res);
  //         if (res.data.code == 2000) {
  //           config.success(res)
  //         }
  //         if (res.code == 4007) {
  //           console.log("4007过期了")
  //           common.login();
  //         }
  //       }
  //     })
  //   })
  // }else{
  //   var header = {
  //     "X-Cys-Client":"WX_MINI_PROGRAM",
  //     Authorization:"CYSTOKEN "+token
  //   }
  //   console.log(config, header);

  //   wx.request({
  //     header: header,
  //     url: config.url,
  //     method:config.method||"GET",
  //     data:JSON.stringify(config.data),
  //     success:function(res){
  //       console.log(res);
  //       if(res.data.code == 2000){
  //         config.success(res)
  //       }
  //       if(res.code == 4007){
  //         console.log("4007过期了")
  //         common.login();
  //       }
  //     }
  //   })

  // }
    var header = {
      "X-Cys-Client": "WX_MINI_PROGRAM",
      Authorization: "CYSTOKEN " + token
    }
    console.log(config, header);

    wx.request({
      header: header,
      url: config.url,
      method: config.method || "GET",
      data: JSON.stringify(config.data),
      success: function (res) {
        console.log(res);
        if (res.data.code == 2000) {
          config.success(res)
        }
        if (res.data.code == 4007) {
          console.log("4007过期了")
          common.login();
        }
      }
    })


}

function wx_login(cb){
  var hostName = wx.getStorageSync("REST_PREFIX");
  console.log(hostName)
  //调用登录接口
  wx.login({
    success: function (data) {
      console.log(data);

      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          console.log(res);
          var params = {
            code: data.code,
            encryptedData: res.encryptedData,
            iv: res.iv,
            rawData: res.rawData,
            signature: res.signature
          }
          ajax({
            url: hostName + '/mpapi/public/mini_program/account/login',
            method: "POST",
            data: params,
            success: function (res2) {
              console.log(res2);
              // wx.setStorage({
              //   key: 'token',
              //   data: res2.data.result.token
              // })
              wx.setStorageSync("token", res2.data.result.token )


              typeof cb == "function" && cb(res.userInfo)
            }
          })

        }
      })

    }
  })
}


module.exports = {
  formatTime: formatTime,
  formatOptions: formatOptions,
  drawCanvas: drawCanvas,
  drawModal: drawModal,
  ajax: ajax,
  wx_login: wx_login
}

