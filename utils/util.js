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
  var ctx = wx.createCanvasContext(config.id);
  var padding = config.padding || 50;
  var xstandard = 40;
  var paddingLeft = 20;
  // 排序(根据x从小到大)
  config.box.sort(function (a, b) {
    return a.x - b.x
  })
  console.log(config.box)

  // 警戒线
  ctx.beginPath();
  ctx.setLineWidth(1);
  ctx.setStrokeStyle("#cadcfe");
  ctx.moveTo(show("x", 0), show("y", 90));
  ctx.lineTo(show("x", config.canvasW), show("y", 90));
  ctx.stroke();
  // ctx.setFillStyle("#4e8cfd");
  // ctx.setFontSize(14);
  // ctx.fillText("舒张压-警戒线", show("x", 0), show("y", 95));
  // ctx.fill();

  ctx.beginPath();
  ctx.moveTo(show("x", 0), show("y", 140));
  ctx.lineTo(show("x", config.canvasW), show("y", 140));
  ctx.setStrokeStyle("#ffd9b2");
  ctx.stroke();
  // ctx.setFillStyle("#ff8201");
  // ctx.setFontSize(14);
  // ctx.fillText("收缩压-警戒线", show("x", 0), show("y", 145));
  // ctx.fill();


  // 清除超出部分
  // ctx.clearRect(padding, config.canvasH - padding, config.canvasW, padding);
  // 坐标
  ctx.beginPath();
  ctx.moveTo(0, config.canvasH - padding);
  ctx.lineTo(config.canvasW, config.canvasH - padding);
  ctx.setStrokeStyle("#c4c4c4");
  ctx.setLineWidth(1);
  ctx.stroke();

  // 刻度
  ctx.beginPath();
  ctx.setFontSize(14);
  var xlength = Math.ceil(config.canvasW / xstandard) - 1;
  // ctx.setTextAlign("center");
  ctx.setFillStyle("#acacac");
  for (var i = 0; i < xlength; i++) {
    ctx.fillText(i, i * xstandard + paddingLeft, config.canvasH+20 - padding);
  }

  // 画线
  ctx.beginPath();
  ctx.moveTo(paddingLeft, show("y", config.box[0].y));
  for (var i = 1; i < config.box.length; i++) {
    ctx.lineTo(paddingLeft + xstandard * i, show("y", config.box[i].y));
  }
  ctx.setLineWidth(config.lineWidth);
  ctx.setStrokeStyle(config.color);
  ctx.stroke();
  // 描点
  for (var i = 0; i < config.box.length; i++) {
    ctx.beginPath();
    ctx.arc(paddingLeft + xstandard * i, show("y", config.box[i].y), config.r, 0, Math.PI * 2);
    ctx.setFillStyle(config.color);
    ctx.fill();
  }


  // 左半部分
  var ctx2 = wx.createCanvasContext(config.id2);
  ctx2.beginPath();
  // 背景涂白
  ctx2.setFillStyle("white");
  ctx2.fillRect(0, 0, 200, config.canvasH - 50);
  ctx2.fill();
  // x延长线
  ctx2.setStrokeStyle("#c4c4c4");
  ctx2.moveTo(0, config.canvasH - 50);
  ctx2.lineTo(100, config.canvasH - 50);
  ctx2.stroke();

  // 文字
  var lengthY = Math.ceil(config.canvasH / 40);
  console.log(lengthY)
  ctx2.setFontSize(14);
  ctx2.setFillStyle("#999999");
  for (var i = 1; i < lengthY; i++) {
    ctx2.fillText(40 * i, 12, config.canvasH - 50 - i * 40);
  }
  ctx2.fill();

  // y轴
  ctx2.beginPath();
  ctx2.moveTo(config.screenW * 0.12 - 1, 0);
  ctx2.lineTo(config.screenW * 0.12 - 1, config.canvasH - 50);
  ctx2.stroke();

  ctx2.draw();

  

 

  ctx.draw();
  function show(type, num) {
    if (type == "x") {
      return num
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

module.exports = {
  formatTime: formatTime,
  formatOptions: formatOptions,
  drawCanvas: drawCanvas,
  drawModal: drawModal
}

