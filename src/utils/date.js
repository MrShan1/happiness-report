/**
 * 日期格式转换
 *
 * @param {Num} val 时间戳
 * @return {String} 日期字符串YYYY-MM-DD
 */
function formatDate(val) {
  let dateTime = new Date(val);
  return `${dateTime.getFullYear()}-${dateTime.getMonth() +
    1}-${dateTime.getDate()}`;
}

export default formatDate;
