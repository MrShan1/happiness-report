import { default as countries, countryMap } from './countries'

// 选取50个国家
const max = 50
const n = countries.length
const areas = [
  'Afghanistan',
  'Angola',
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Cambodia',
  'Canada',
  'China',
  'Cuba',
  'Denmark',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Malaysia',
  'Mongolia',
  'New Zealand',
  'United Kingdom',
  'United States',
  'Russia',
  'Spain',
  'Vietnam',
  'South Africa',
  'Saudi Arabia',
  'Philippines',
  'Pakistan',
  'Niger',
  'Syria',
  'Singapore',
  'Panama',
  'Indonesia',
]
while (areas.length < max) {
  const i = Math.floor(Math.random() * n)
  const target = countries[i]
  if (!areas.includes(target.qyyymc)) {
    areas.push(target.qyyymc)
  }
}

const gitInfos = []
let yearInfos = []
for (let i = 1999; i <= 2019; i++) {
  yearInfos = []
  for (let area of areas) {
    const info = {
      gjywm: area, // 国家英文名            随机，从列表中随机50个
      gjzwm: countryMap[area], // 国家中文名            与国家英文名对应
      yf: i, // 年份                  随机，近10年
      zpm: -1, // 总排名                根据kb主义指数分数设置
      zdj: randomRank(), // kb主义指数等级(总等级)      随机，0-7
      zfs: -1, // kb主义指数分数(总分数)      根据等级设置，0-10
      sjsjdj: randomRank(), // 事件数等级            随机，0-7
      sjsj: -1, // 事件数                根据等级设置，1000-9999
      swrsdj: randomRank(), // 死亡人数等级          随机，0-7
      swrs: -1, // 死亡人数              根据等级设置，1000-9999
      shdj: randomRank(), // 受伤人数等级          随机，0-7
      sh: -1, // 受伤人数              根据等级设置，1000-9999
      ccssdj: randomRank(), // 财产损失等级          随机，0-7
      ccss: -1, // 财产损失              根据等级设置，1000-9999
    }

    info.zfs = randomData(info.zdj, 0, 10, 3)
    info.sjsj = randomData(info.sjsjdj, 100, 9999)
    info.swrs = randomData(info.swrsdj, 100, 9999)
    info.sh = randomData(info.shdj, 100, 9999)
    info.ccss = randomData(info.ccssdj, 100, 9999)

    yearInfos.push(info)
    gitInfos.push(info)
  }

  // 设置总排名
  yearInfos
    .sort((a, b) => b.zfs - a.zfs)
    .forEach((info, i) => {
      info.zpm = i + 1
    })
}

function randomRank() {
  return Math.random() * 7
}

function randomData(rank, min, max, decimal = 0) {
  const times = Math.pow(10, decimal)
  return min + Math.floor(((rank * times) / 7) * (max - min)) / times
}

export const latestGitInfos = yearInfos
export default gitInfos
