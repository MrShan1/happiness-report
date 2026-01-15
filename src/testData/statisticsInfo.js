import gitInfos from './gtiInfos'
import happinessInfos from './happinessInfos'

// 人物组织事件数据总量及月更新量
const rwzzsjsjzlAndYgxl = {
  rwzCount: 2264, // 人物数据量
  rwyCount: 186, // 人物数据量（月更新）
  zzzCount: 674, // 组织数据量
  zzyCount: 24, // 组织数据量（月更新）
  sjzCount: 63489, // 事件数据量
  sjyCount: 1537, // 事件数据量（月更新）
}
export default rwzzsjsjzlAndYgxl

// 最近24个月全球及涉华事件趋势图
export const last24MonthQqsjydtjlList = [] // 最近24个月全球及涉华事件趋势图
for (let year = 2019; year < 2020; year++) {
  for (let month = 1; month < 13; month++) {
    const info = {
      ny: year + '' + month, // 年月
      qqsjsl: randomData(10000), // 全球事件数量
      shsjsl: randomData(1000), // 涉华事件数量
    }
    last24MonthQqsjydtjlList.push(info)
  }
}
export const last6MonthQqsjydtjlList = last24MonthQqsjydtjlList.slice(-6) // 最近6个月全球及涉华事件趋势图

function randomData(max = 0) {
  return Math.floor(Math.random() * max)
}

// 最近五年top5国家的SK指数趋势
// export const year5Top5KbzsListByYf = gitInfos
// .filter((info) => {
//   return info.yf >= 2015 && info.zpm <= 20;
// })
// .sort((a, b) => (a.yf === b.yf && a.zfs < b.zfs ? 1 : -1));
export const year5Top5KbzsListByYf = happinessInfos

// 最新涉华数据
export const zxshsjList = []
for (let i = 0; i < 10; i++) {
  const info = {
    sjid: randomData(1000), // 事件id
    sjzy: '涉华相关事件', // 事件摘要
    sjrq: '2019/12/31', // 事件日期
  }
  zxshsjList.push(info)
}

// 全球最新事件(最近五天top5事件信息列表)
export const zxsjList = []
for (let i = 0; i < 5; i++) {
  const dayInfos = []
  for (let i = 0; i < 5; i++) {
    const info = {
      id: randomData(1000), // 事件id
      sjnr: '事件内容', // 事件内容
      sjfsrq: '2019/12/01', // 事件发生日期
      sjlx: '', // 事件类型
      fsdgj: '', // 发生地国家
      fsdyj: '', // 发生地国家
    }
    dayInfos.push(info)
  }
  zxsjList.push(dayInfos)
}

// SK视频信息
export const spxxList = []
for (let i = 0; i < 5; i++) {
  // const url = '/static/video/1.mp4';
  // const url = '/static/video/2.mp4';
  const url = 'http://vjs.zencdn.net/v/oceans.mp4'
  const info = {
    wjdz: url + '?salt=' + randomData(100), // 视频地址
    ms: '视频描述', // 描述
  }
  spxxList.push(info)
}

// 最新的K情文档信息
export const threeWjxxList = []
for (let i = 0; i < 5; i++) {
  const info = {
    id: randomData(1000), // id
    wjmc: '文件名称.doc', // 文件名称
    cjsj: '2019/12/01', // 创建时间
  }
  threeWjxxList.push(info)
}
