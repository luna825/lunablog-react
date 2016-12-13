
export function customTime(time){

  let nowTime = new Date().getTime(),
      minuTime = 60 * 1000,
      hourTime = minuTime * 60,
      dayTime = hourTime * 24,
      weekTime = dayTime * 7,
      monthTime = dayTime * 30,
      yearTime = dayTime * 365;

  let publishTime = new Date(time).getTime();
  let historyTime = parseInt(nowTime) - parseInt(publishTime);
  let descTime;

  if (historyTime >= yearTime){
    descTime = parseInt(historyTime/yearTime) + '年前'
  }else if (historyTime >= monthTime && historyTime < yearTime){
    descTime = parseInt(historyTime/monthTime) + '月前'
  }else if( historyTime >= weekTime && historyTime < monthTime ){
    descTime = parseInt(historyTime/weekTime) + '周前'
  }else if( historyTime >= dayTime && historyTime < weekTime ){
    descTime = parseInt(historyTime/dayTime) + '天前'
  }else if( historyTime >= hourTime && historyTime < dayTime ){
    descTime = parseInt(historyTime/hourTime) + '小时前'
  }else if( historyTime >= minuTime && historyTime < hourTime ){
    descTime = parseInt(historyTime/minuTime) + '分钟前'
  }else{
    descTime = '刚刚'
  }

  return descTime
}