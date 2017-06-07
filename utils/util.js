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

module.exports = {
  formatTime: formatTime,
  formatOptions: formatOptions
}

