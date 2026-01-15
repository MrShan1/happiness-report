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

const happinessInfos = []
let yearInfos = []
for (let i = 1999; i <= 2019; i++) {
  yearInfos = []
  for (let area of areas) {
    const info = {
      gjywm: area, // 国家英文名            随机，从列表中随机50个
      gjzwm: countryMap[area], // 国家中文名            与国家英文名对应
      yf: i, // 年份                  随机，近10年
      zpm: -1, // 总排名
      score: -1, // 幸福指数得分
      scoreLevel: -1,
      gdpPerCapita: randomData(0, 2, 3), // 人均国内生产总值
      gdpPerCapitaLevel: -1,
      socialSupport: randomData(0, 2, 3), // 社会支持度
      socialSupportLevel: -1,
      healthyLifeExpectancy: randomData(0, 2, 3), // 预期健康寿命
      healthyLifeExpectancyLevel: -1,
      freedomToMakeLifeChoices: randomData(0, 2, 3), // 人生选择自由度
      freedomToMakeLifeChoicesLevel: -1,
      generosity: randomData(-1, 1, 3), // 国民慷慨程度
      generosityLevel: -1,
      // perceptionsOfCorruption: randomData(-1, 1, 3), // 社会清廉程度
      perceptionsOfCorruption: randomData(0, 2, 3), // 社会清廉程度
      perceptionsOfCorruptionLevel: -1,
    }

    info.score =
      Math.floor(
        (info.gdpPerCapita +
          info.socialSupport +
          info.healthyLifeExpectancy +
          info.freedomToMakeLifeChoices +
          info.generosity +
          info.perceptionsOfCorruption) *
          1000,
      ) / 1000 // 幸福指数得分
    info.scoreLevel = getRank(info.score, 0, 10)

    info.gdpPerCapitaLevel = getRank(info.gdpPerCapita, 0, 2)
    info.socialSupportLevel = getRank(info.socialSupport, 0, 2)
    info.healthyLifeExpectancyLevel = getRank(info.healthyLifeExpectancy, 0, 2)
    info.freedomToMakeLifeChoicesLevel = getRank(info.freedomToMakeLifeChoices, 0, 2)
    info.generosityLevel = getRank(info.generosity, -1, 1)
    info.perceptionsOfCorruptionLevel = getRank(info.perceptionsOfCorruption, 0, 2)

    yearInfos.push(info)
  }

  // 设置总排名
  yearInfos
    .sort((a, b) => b.score - a.score)
    .forEach((info, i) => {
      info.zpm = i + 1
    })

  happinessInfos.push(...yearInfos)
}

function randomRank() {
  return Math.random() * 7
}

function getRank(curr, min, max) {
  return ((curr - min) / (max - min)) * 7
}

function randomData(min, max, decimal = 0) {
  const times = Math.pow(10, decimal)
  const temp = min * times + Math.random() * (max - min) * times
  const ans = Math.floor(temp) / times
  return ans
}

export const latestHappinessInfos = yearInfos
export default happinessInfos
