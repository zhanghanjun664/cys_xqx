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
    return arr[0]+"年"+arr[1]+"月"+arr[2]+"日"
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
  var xstandard = 50;
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


  // 画线
  ctx.beginPath();
  ctx.moveTo(config.box[0].x , config.canvasH - config.box[0].y - padding);
  for (var i = 1; i < config.box.length; i++) {
    ctx.lineTo(config.box[i].x, config.canvasH - config.box[i].y - padding);
  }
  ctx.setLineWidth(config.lineWidth);
  ctx.setStrokeStyle(config.strokeStyle);
  ctx.stroke();
  // 描点
  for (var i = 0; i < config.box.length; i++) {
    ctx.beginPath();
    ctx.arc(config.box[i].x , config.canvasH - config.box[i].y - padding, config.r, 0, Math.PI * 2);
    ctx.setFillStyle(config.fillStyle);
    ctx.fill();
  }
  // 清除超出部分
  // ctx.clearRect(0, 0, padding, config.canvasH);
  ctx.clearRect(padding, config.canvasH - padding, config.canvasW, padding);
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
    ctx.fillText(i, i * xstandard + 20, config.canvasH+20 - padding);
  }


 

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

module.exports = {
  formatTime: formatTime,
  formatOptions: formatOptions,
  drawCanvas: drawCanvas
}

