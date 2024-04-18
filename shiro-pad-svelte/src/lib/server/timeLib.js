// 计算过去的时间
const timeAfter = ({ startTime, period }) => {
  const startMilliSecond = new Date(startTime).getTime();

  const periodToMilliSecondArray = {
    'burnAfterRead': 0,
    '5m': 5 * 60 * 1000,
    '30m': 30 * 60 * 1000,
    '1h': 1 * 60 * 60 * 1000,
    '5h': 5 * 60 * 60 * 1000,
    '1d': 1 * 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
  }

  let periodToMilliSecond = periodToMilliSecondArray[period];

  return startMilliSecond + periodToMilliSecond;
}

// 将时间转换为可读日期
const timeFormat = (timestamp) => {
  return new Date(timestamp).toLocaleString();
}

export { timeAfter, timeFormat }