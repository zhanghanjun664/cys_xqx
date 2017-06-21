
'use strict';
var REST_PREFIX = "https://wxtest.chengyisheng.com.cn";

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
  var maxLenth = config.box.length;

  // 排序(根据x从小到大)
  // config.box.sort(function (a, b) {
  //   return a.x - b.x
  // })

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
  // ctx.setTextAlign("center");
  ctx.setFillStyle("#acacac");
  ctx.setTextAlign("center");
  if (config.box.length){
    for (var i = 0; i < maxLenth; i++) {
      ctx.fillText(config.box[i].showX, show("x", i * xstandard + paddingLeft), show("y",-20));
      ctx.moveTo(show("x",paddingLeft+i*xstandard),show("y",0));
      ctx.lineTo(show("x", paddingLeft + i * xstandard), show("y", 5));
    }
    ctx.stroke();
  }
  for (var i = 1; i < 5; i++) {
    ctx.fillText(40 * i, show("x",-20),show("y",i*40));
  }

  if(config.box.length){
    console.log(config.box)
    if(config.chartType == 1){
      // 一条线  
      // 画线
      ctx.beginPath();
      ctx.moveTo(show("x", paddingLeft), show("y", config.box[0].heart_rate));
      for (var i = 1; i < maxLenth; i++) {
        if (config.box[i].heart_rate){
          ctx.lineTo(show("x", xstandard * i + paddingLeft), show("y", config.box[i].heart_rate));
        }
      }
      ctx.setLineWidth(config.lineWidth);
      ctx.setStrokeStyle(config.color);
      ctx.stroke();
      // 描点 心率有可能为空
      for (var i = 0; i < maxLenth; i++) {
        if (config.box[i].heart_rate){
          ctx.beginPath();
          ctx.arc(show("x", xstandard * i + paddingLeft), show("y", config.box[i].heart_rate), config.r, 0, Math.PI * 2);
          ctx.setFillStyle(config.color);
          ctx.fill();

        }
      }
    }else if (config.chartType == 2) {
      //两条线
      // 画线
      ctx.beginPath();
      ctx.moveTo(show("x", paddingLeft), show("y", config.box[0].systolic));
      for (var i = 1; i < maxLenth; i++) {
        ctx.lineTo(show("x", xstandard * i + paddingLeft), show("y", config.box[i].systolic));
      }
      ctx.setLineWidth(config.lineWidth);
      ctx.setStrokeStyle(config.color);
      ctx.stroke();
      // 描点
      for (var i = 0; i < maxLenth; i++) {
        ctx.beginPath();
        ctx.arc(show("x", xstandard * i + paddingLeft), show("y", config.box[i].systolic), config.r, 0, Math.PI * 2);
        ctx.setFillStyle(config.color);
        ctx.fill();
      }


      // 画线
      ctx.beginPath();
      ctx.moveTo(show("x", paddingLeft), show("y", config.box[0].diastolic));
      for (var i = 1; i < maxLenth; i++) {
        ctx.lineTo(show("x", xstandard * i + paddingLeft), show("y", config.box[i].diastolic));
      }
      ctx.setLineWidth(config.lineWidth);
      ctx.setStrokeStyle(config.color2);
      ctx.stroke();
      // 描点
      for (var i = 0; i < maxLenth; i++) {
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

// 点击显示框
function drawModal(config){
  // 上箭头  w:10  h:6
  var ctx3 = wx.createCanvasContext(config.top_icon);
  ctx3.beginPath();
  ctx3.setFillStyle("white");
  ctx3.fillRect(0, 0, 10, 6);
  ctx3.fill();
  ctx3.setStrokeStyle("#dcdcdc");
  ctx3.moveTo(0, 6);
  ctx3.lineTo(5, 0);
  ctx3.lineTo(10, 6);
  ctx3.stroke();
  ctx3.draw();
  // 下箭头
  // var ctx2 = wx.createCanvasContext(config.bottom_icon);
  // ctx2.beginPath();
  // ctx2.setFillStyle("white");
  // ctx2.fillRect(0,0,10,6);
  // ctx2.fill();
  // ctx2.setStrokeStyle("#dcdcdc");
  // ctx2.moveTo(0,0);
  // ctx2.lineTo(5,6);
  // ctx2.lineTo(10,0);
  // ctx2.stroke();
  // ctx2.draw();
  console.log(config);

  var ctx = wx.createCanvasContext(config.id);
  ctx.setFillStyle("white");
  ctx.fillRect(1, 1, config.width - 1, config.height-1);
  ctx.fill();
  ctx.setFillStyle("black");
  ctx.setFontSize(14);
  ctx.setTextAlign("center");
  ctx.fillText(config.value, config.width/2,20);
  ctx.fill();
  ctx.draw();
}

function ajax(config){
  var header;
  
  var privateUrl =  config.url.match("private");
  var loginUrl = config.url.match("login");
  // private接口或者login接口需要设置请求头
  if ((privateUrl && privateUrl.length) || (loginUrl&&loginUrl.length)){
    var token = wx.getStorageSync("token");
    header = {
      "X-Cys-Client": "WX_MINI_PROGRAM",
      Authorization: "CYSTOKEN " + token
    }
  }

  wx.request({
    header: header,
    url: REST_PREFIX + config.url,
    method: config.method || "GET",
    data: JSON.stringify(config.data),
    success: function (res) {
      if (res.data.code == 2000) {
        config.success(res)
      }
      if (res.data.code == 4007) {
        console.log("4007过期了")
        wx_login(function(){
          ajax(config);
        });
      }
    }
  })



}

function wx_login(cb){
  //调用登录接口  拿到token
  wx.login({
    success: function (data) {
      console.log(data);

      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          console.log(res);
          ajax({
            url: "/mpapi/private/mini_program/account/info",
            method:"POST",
            data: { isAuthorized:true},
            success: function (res) {
              
            }
          })
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
            url: '/mpapi/public/mini_program/account/login',
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
  wx_login: wx_login,
}

