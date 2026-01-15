<template>
  <div class="h100">
    <div class="h100" id="gtiView"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import map from '../utils/map'
import { latestGitInfos } from '../testData/gtiInfos'
import { latestHappinessInfos } from '../testData/happinessInfos'
import world_110m from '../testData/world_110m'
import { ref, reactive, onMounted, onBeforeUnmount, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'

const specialCountries = ['美国', '英国', '德国', '法国', '俄罗斯'] // 特别国家名称
let countries = {} // 国家信息字典
let gtiView = null // 3D的GTI地球
let gtiMap = null // 2D的GTI地图
let year = null // 数据年份
const router = useRouter()

/**
 * 组件初始化
 */
function init() {
  // 注册国家矢量图
  echarts.registerMap('world', world_110m)

  // 获取国家信息字典
  map.getCountries(null, (countriesData) => {
    countries = countriesData

    // 展示3D的GTI地图
    showGTIView()

    // 获取最新数据年份
    year = latestHappinessInfos[0].yf

    // 在地球上加载幸福指数数据（测试数据）
    loadGTIData(latestHappinessInfos)
  })
}

/**
 * 展示3D的GTI地图
 */
function showGTIView() {
  let gtiView = echarts.init(document.getElementById('gtiView'))

  // 创建2D地图，将2D地图作为3D地球的一个平面进行展示
  gtiMap = createGTIMap()

  // 设置3D地球参数
  let opts = {
    backgroundColor: 'rgba(0,0,0,0)',
    globe: {
      baseTexture: gtiMap,
      shading: 'color',
      atmosphere: {
        show: true, // 展示大气环境
      },
      viewControl: {
        autoRotateDirection: 'ccw', // 从上往下看为逆时针方向
        targetCoord: [63, 25], // 初始位置设置为中东地区
        minDistance: 100, // 最近距离
        maxDistance: 200, // 最远距离
      },
    },
    series: [],
  }
  gtiView.setOption(opts)

  // 控制地图旋转状态
  // 地图加载完成后再绑定是为了解决targetCoord还未初始化完就已经触发鼠标事件的问题
  // gtiView.on("finished", () => {
  //   // 鼠标进入地图时，地球停止旋转
  //   gtiView.getDom().onmouseover = stopRotateEarth;

  //   // 鼠标离开地图时，地球开始旋转
  //   gtiView.getDom().onmouseout = rotateEarth;
  // });

  gtiView = gtiView
}

/**
 * 创建2D的GTI地图
 * GTI即全球kb指数
 *
 * @return {EchartsIntance} 2DGTI地图
 */
function createGTIMap() {
  // 创建2D地图的canvas画布
  let canvas = document.createElement('canvas')
  let mapChart = echarts.init(canvas, null, {
    width: 4096,
    height: 2048,
  })

  // 设置2D地图参数
  let opts = {
    backgroundColor: 'rgba(8,30,94,0.5)',
    title: {
      show: true,
      text: `-年全球幸福指数`,
      textStyle: {
        fontSize: 50,
        color: 'white',
      },
      top: '40%',
      left: '0%',
    },
    visualMap: [
      {
        type: 'piecewise',
        show: false,
        pieces: map.gtiPieces,
        text: ['高', '底'],
      },
    ],
    series: [
      {
        type: 'map',
        map: 'world',
        nameProperty: map.areaNameKey,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        boundingCoords: [
          [-180, 90],
          [180, -90],
        ],
        label: {
          show: true,
          avoidLabelOverlap: true,
          formatter: (params) => {
            let country = getCountryName(params.name)
            if (
              country &&
              params.data &&
              params.data.score &&
              // (params.data.scoreLevel > 3 ||
              ((params.data.score > 5 && Math.random() > 0.5) ||
                specialCountries.indexOf(country) !== -1)
            ) {
              return `{country|${country}}{level|${params.data.score.toFixed(1)}}`
            }
            return ''
          },
          rich: getRichTextStyle(18),
        },
        itemStyle: {
          areaColor: 'rgba(14, 141, 243, 0.7)',
          borderColor: '#052c69',
          borderWidth: 1,
        },
        select: false, // 取消选中效果
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            color: '#fff',
            formatter: (params) => {
              let country = getCountryName(params.name)
              if (country && params.data && params.data.score) {
                return `{country|${country}}{level|${params.data.score.toFixed(1)}}`
              }
              return country
            },
            rich: getRichTextStyle(26),
          },
          itemStyle: {
            areaColor: '#cdbf2c',
          },
        },
        data: [],
      },
    ],
  }
  mapChart.setOption(opts)

  // // 鼠标进入某个可选区域时，地球停止旋转
  // mapChart.on('mouseover', () => {
  //   stopRotateEarth()
  // });
  // // 鼠标离开地图时，地球开始旋转
  // mapChart.on('globalout', () => {
  //   rotateEarth();
  // });

  // 鼠标点击地图时，跳转至态势感知
  mapChart.on('click', turnToSituationAwareness)

  // 同步中国区域的高亮状态
  highlightChinaAreasSync(mapChart)

  return mapChart
}

/**
 * 获取富文本样式
 *
 * @param {Number} fontSize 字体大小
 * @return {Object} 富文本样式
 */
function getRichTextStyle(fontSize) {
  return {
    country: {
      backgroundColor: 'darkred',
      color: '#fff',
      padding: [6, 3, 3, 3],
      textShadowColor: '#030615',
      fontSize: fontSize,
      fontWeight: 400,
      borderRadius: 5,
    },
    level: {
      backgroundColor: '#fff',
      color: '#000',
      padding: [6, 3, 3, 3],
      fontSize: fontSize,
      borderRadius: 5,
    },
  }
}
/**
 * 在地图上加载GTI数据
 *
 * @param {Array} gtiData 最新年份的GTI数据
 */
function loadGTIData(gtiData) {
  if (!gtiMap && !gtiData) return
  let ops = gtiMap.getOption()
  gtiData.forEach((item) => {
    item.name = item.gjywm // 国家名称
    // item.value = item.zdj; // 国家KB指数总等级
    item.value = item.scoreLevel // 国家KB指数总等级
  })
  ops.series[0].data = gtiData
  ops.title[0].text = `${gtiData[0].yf}年全球幸福指数`
  gtiMap.setOption(ops)
}
/**
 * 跳转至态势感知
 *
 * @param {Object} params echarts事件参数
 */
function turnToSituationAwareness(params) {
  if (!params.data) return
  router.push({
    name: 'happinessDetail',
    params: {
      currentArea: params.data.gjywm,
    },
  })
}
/**
 * 同步中国区域的高亮状态
 *
 * @param {EchartInstance} mapChart echarts实例
 */
function highlightChinaAreasSync(mapChart) {
  let fn = (params, isHighlight) => {
    let areaNames = ['China', 'Taiwan']
    let areaName = params.data && params.data.name
    if (areaName && areaNames.indexOf(areaName) !== -1) {
      gtiMap.dispatchAction({
        type: isHighlight ? 'highlight' : 'downplay',
        name: areaNames,
      })
    }
  }
  // 鼠标移入地图区域时，如果是中国区域，则同时高亮
  mapChart.on('mouseover', (params) => {
    fn(params, true)
  })
  // 鼠标离开地图区域时，如果是中国区域，则同时取消高亮
  mapChart.on('mouseout', (params) => {
    fn(params, false)
  })
}

/**
 * 旋转地球
 */
function rotateEarth() {
  setEarthRotation(true)
}
/**
 * 停止旋转地球
 */
function stopRotateEarth() {
  setEarthRotation(false)
}
/**
 * 设置地球旋转状态
 *
 * @param {Boolean} rotate 是否启用旋转
 */
function setEarthRotation(rotate) {
  let opts = gtiView.getOption()
  if (opts.globe[0].viewControl.autoRotate !== rotate) {
    opts.globe[0].viewControl.autoRotate = rotate
    opts.globe[0].viewControl.targetCoord = null // 避免开始旋转时恢复到初始位置
    gtiView.setOption(opts)
  }
}
/**
 * 获取国家名称
 *
 * 有中文名称时返回中文名称，没有时返回英文名称
 *
 * @param {String} nameEn 国家英文名称
 * @return {String} 国家名称
 */
function getCountryName(nameEn) {
  return countries[nameEn] ? countries[nameEn].qyzwmc : nameEn
}

// 生命周期钩子
onMounted(() => {
  init()

  // 窗口大小调整
  window.onresize = () => {
    if (gtiView) {
      gtiView.resize()
    }
  }
})

onBeforeUnmount(() => {
  // 清理事件监听器
  window.onresize = null

  // 清理图表实例
  if (gtiView) {
    gtiView.dispose()
    gtiView = null
  }

  if (gtiMap) {
    gtiMap.dispose()
    gtiMap = null
  }
})
</script>

<style scoped></style>
