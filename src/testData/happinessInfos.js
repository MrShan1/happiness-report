import { default as countries, countryMap } from './countries'
import happinessData from './happiness/happiness'

const startYear = 2014
const len = happinessData.length
const happinessInfos = []
let yearInfos = []
for (let i = 0; i < len; i++) {
  const cnt = happinessData[i].length // 国家个数
  const year = startYear + i
  let realRank = 1
  yearInfos = []
  for (let origin of happinessData[i]) {
    if (!countryMap[origin.country]) {
      // console.log(`未找到国家：${origin.country}`);
      continue
    }
    const info = {
      gjywm: origin.country, // 国家英文名
      gjzwm: countryMap[origin.country], // 国家中文名，与国家英文名对应
      yf: year, // 年份
      // zpm: origin.rank, // 总排名
      zpm: realRank++, // 总排名
      score: +origin.lifeEvaluation, // 幸福指数得分
      // scoreLevel: getRank(origin.rank, 1, cnt),
      scoreLevel: getRank(origin.lifeEvaluation, 0, 10),
      gdpPerCapita: +origin.gdpPerCapita, // 人均国内生产总值
      gdpPerCapitaLevel: getRank(cnt - origin.gdpPerCapita, 1, cnt),
      socialSupport: +origin.socialSupport, // 社会支持度
      socialSupportLevel: getRank(cnt - origin.socialSupport, 1, cnt),
      healthyLifeExpectancy: +origin.healthyLifeExpectancy, // 预期健康寿命
      healthyLifeExpectancyLevel: getRank(cnt - origin.healthyLifeExpectancy, 1, cnt),
      freedomToMakeLifeChoices: +origin.freedom, // 人生选择自由度
      freedomToMakeLifeChoicesLevel: getRank(cnt - origin.freedom, 1, cnt),
      generosity: +origin.generosity, // 国民慷慨程度
      generosityLevel: getRank(cnt - origin.generosity, 1, cnt),
      perceptionsOfCorruption: +origin.perceptionsOfCorruption, // 社会清廉程度
      perceptionsOfCorruptionLevel: getRank(cnt - origin.perceptionsOfCorruption, 1, cnt),
    }
    yearInfos.push(info)
  }
  happinessInfos.push(...yearInfos)
}

function getRank(curr, min, max) {
  if (isNaN(curr)) {
    return 0
  }
  return Math.floor(((curr - min) / (max - min)) * 7 * 1000) / 1000
}

export const latestHappinessInfos = yearInfos
export default happinessInfos
