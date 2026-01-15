// 提取世界幸福报告官网上的数据
const table = []
function extrackData(clear = false) {
  if (clear) table.length = 0

  const elements = document.getElementsByClassName('MuiDataGrid-row')
  const map = {
    rank: 'EV',
    country: ['NA', ' strong'],
    lifeEvaluation: 'LI',
    changeSince2012: 'SI',
    inequality: 'IN',
    socialSupport: 'FA',
    gdpPerCapita: 'PE',
    healthyLifeExpectancy: ['AD', ''],
    freedom: 'RA',
    generosity: 'AF',
    perceptionsOfCorruption: 'AB',
    positiveEmotions: 'EM',
    negativeEmotions: 'NE',
    donated: 'BE',
    volunteered: 'VO',
    helpedAStranger: 'A',
  }

  for (let ele of elements) {
    const row = Object.create(null)
    for (let key in map) {
      const val = map[key]
      if (Array.isArray(val)) {
        row[key] = extrackText(ele, val[0], val[1])
      } else {
        row[key] = extrackText(ele, val)
      }
    }
    table.push(row)
  }

  // return table;
}

function extrackText(ele, key, query = ' div') {
  const prev = `[data-field="${key}"]`
  // console.log(`${prev}${query}`);
  const target = ele.querySelector(`${prev}${query}`)
  if (target) {
    return target.innerText.trim()
  }
  return ele.querySelector(`${prev}`).innerText.trim()
}
