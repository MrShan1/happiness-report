<template>
  <div class="viewContent positionRe">
    <div class="boxcontent">
      <div class="boxcontent_title_box">
        <img src="@/assets/image/titleIcon.png" alt="" />
        <span class="boxcontent_title">幸福指数详情</span>
      </div>
      <!-- 时间轴组件 -->
      <div class="timeAxis">
        <Timeline ref="timeline" :items="years" v-model:currentItem="year"></Timeline>
      </div>
      <div class="mapBox">
        <!-- 左侧筛选 -->
        <div class="screenBox">
          <!-- 地区筛选 -->
          <div class="screenBox_item">
            <div class="screenBox_item_title">
              <div>地区</div>
              <div class="inlineBlock heightFormItem">
                <el-select
                  class="searchInput heightFormInput"
                  v-model="area"
                  placeholder="请选择地区"
                  filterable
                >
                  <el-option
                    v-for="item in areas"
                    :key="item"
                    :label="getCountryName(item)"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 指标筛选 -->
          <div class="screenBox_item mt15">
            <div class="screenBox_item_title">
              <div>指标</div>
              <div class="inlineBlock heightFormItem">
                <el-select
                  class="searchInput heightFormInput"
                  v-model="indicator"
                  value-key="name"
                  placeholder="请选择指标"
                >
                  <el-option
                    v-for="item in indicators"
                    :key="item.name"
                    :label="item.name"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 年份筛选 -->
          <div class="screenBox_item mt15">
            <div class="screenBox_item_title">
              <div>年份</div>
              <div class="inlineBlock heightFormItem">
                <el-select
                  class="searchInput heightFormInput"
                  v-model="year"
                  placeholder="请选择年份"
                >
                  <el-option v-for="item in years" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="rightContentBox">
          <div class="h100">
            <div class="rightContentBox_title">
              <img src="@/assets/image/titleIcon.png" alt="" />
              <span
                class="inlineBlock"
                style="vertical-align: top; margin-top: 7px; margin-left: 5px"
              >
                <span>{{ year }}</span>
                <span>年全球幸福指数</span>
              </span>
            </div>
            <div class="closeBox" v-if="showAreaInfo" @click="closeAreaInfoView()">
              <i class="el-icon-close fontWeight"></i>
            </div>
            <div v-if="!showAreaInfo" class="skList">
              <h1 class="fontWeight400 mt10 mb10">
                {{ indicator.title }}
              </h1>
              <div style="color: #e1dfed; height: 85px">
                {{ indicator.desc }}
              </div>
              <div class="skListTable mt5 f14">
                <table style="width: 100%" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr style="text-align: left">
                      <th style="width: 55px">总排名</th>
                      <th style="width: 60%">地区</th>
                      <th style="text-align: left">
                        {{ indicator.name }}
                        <i v-if="indicator.name === '幸福指数'" class="el-icon-caret-bottom"></i>
                        <i v-if="indicator.name !== '幸福指数'" class="el-icon-caret-top"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in gtiYearData" :key="index">
                      <td>{{ item.rank }}</td>
                      <td @click="setArea(item.name)" style="cursor: pointer">
                        <img :src="iconPath(item.name)" class="coutryIcon" />{{
                          getCountryName(item.name)
                        }}
                      </td>
                      <td>{{ rank(item.score) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="showAreaInfo" class="skList" style="overflow: auto">
              <div class="countryTitle f30">
                <img :src="iconPath(gtiInfo.gjywm)" class="coutryIcon coutryIconBig" />
                {{ getCountryName(gtiInfo.gjywm) }}
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">幸福指数</div>
                  <div>{{ gtiInfo.score }}</div>
                </div>
                <div class="inlineBlock">
                  <div class="fontWeight f15">总排名</div>
                  <div>
                    <span>{{ gtiInfo.zpm }}</span>
                    <span class="f20" style="color: #808ba9"> /{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">人均国内生产总值</div>
                  <div>
                    {{ rank(gtiInfo.gdpPerCapita) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">社会支持度</div>
                  <div>
                    {{ rank(gtiInfo.socialSupport) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">预期健康寿命</div>
                  <div>
                    {{ rank(gtiInfo.healthyLifeExpectancy) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">人生选择自由度</div>
                  <div>
                    {{ rank(gtiInfo.freedomToMakeLifeChoices) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">国民慷慨程度</div>
                  <div>
                    {{ rank(gtiInfo.generosity) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
              <div class="paiming">
                <div class="inlineBlock">
                  <div class="fontWeight f15">社会清廉程度</div>
                  <div>
                    {{ rank(gtiInfo.perceptionsOfCorruption) }}
                    <span class="f20" style="color: #808ba9">/{{ gtiYearData.length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间地图 -->
        <div class="mapCon" id="gtiView"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import Timeline from '../components/timeline.vue'
import map from '../utils/map'
// import gtiInfos from '../testData/gtiInfos' // 测试数据
import happinessInfos from '../testData/happinessInfos' // 测试数据
import world_50m from '../testData/world_110m' // 测试数据
import { indicatorList } from '../testData/indicators' // 测试数据
import { reactive, ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  currentArea: {
    type: String,
    default: '',
  },
  currentYear: {
    type: String,
    default: '',
  },
})

// State
let gtiChart = null // 全球KB指数分布图
const gtiInfos = ref([]) // 所有GTI信息
const areas = ref([]) // GTI信息对应的所有区域
const area = ref('') // 当前选中区域
const defaultArea = '所有区域' // 区域列表的默认选中项
const indicators = reactive(indicatorList) // 指标列表
const indicator = ref({}) // 当前选中的指标信息
const years = ref([]) // GTI信息涉及的所有年份
const year = ref('') // 当前选中的年份
const defaultOpt = {
  zoom: 1.5, // 地图缩放比例
  center: [39.27, 18.26], // 地图中心点坐标
} // 地图默认配置项
const countries = ref({}) // 国家字典信息

// template refs
const timeline = ref(null)

// Computed
const gtiYearData = computed(() => {
  if (!indicator.value) return []
  const data = []
  gtiInfos.value.forEach((item) => {
    if (item.yf === year.value) {
      data.push({
        name: item.gjywm,
        value: item[indicator.value.levelCol],
        score: item[indicator.value.scoreCol],
        rank: item.zpm,
      })
    }
  })
  if (indicator.value && indicator.value.name === '幸福指数') {
    data.sort((a, b) => b.score - a.score)
  } else {
    data.sort((a, b) => {
      const scoreA = isNaN(a.score) ? Infinity : a.score
      const scoreB = isNaN(b.score) ? Infinity : b.score
      return scoreA - scoreB
    })
  }
  return data
})

const gtiInfo = computed(() => {
  let info = ''
  if (area.value && area.value !== defaultArea) {
    for (let i = 0, len = gtiInfos.value.length; i < len; i++) {
      const item = gtiInfos.value[i]
      if (item.yf === year.value && item.gjywm === area.value) {
        info = item
        break
      }
    }
  }
  return info
})

const showAreaInfo = computed(() => {
  return !!area.value && area.value !== defaultArea
})

// Watchers
watch(area, (val, oldVal) => {
  // 目标区域发生变化时，停止时间轴的自动播放
  if (timeline.value && timeline.value.stopPlay) {
    timeline.value.stopPlay()
  }

  // 判断是否选中了新的有效区域
  if (val !== defaultArea && (!oldVal || val !== oldVal)) {
    // 在地图上选中新区域
    selectArea(val)
  } else {
    // 点击空白(无效)区域或者点击已经选中的区域，则取消已选中区域的选中效果
    unselectArea(oldVal)
  }
})

watch(gtiYearData, (val) => {
  // 更新地图上的GTI数据
  updateGTIMapData(val)
})

// Lifecycle
onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if (gtiChart) {
    gtiChart.dispose()
    gtiChart = null
  }
})

// Methods
function iconPath(countryName) {
  countryName = countryName || 'default'
  return `static/image/countries/${countryName}.png`
}

function rank(r) {
  if (isNaN(r)) {
    return '-'
  }
  return r
}

/**
 * 页面初始化
 */
function init() {
  // // 指标列表
  // indicators = indicatorList

  // 注册国家矢量图
  echarts.registerMap('world', world_50m)

  // 创建GTI地图
  createGTIMap()

  // 获取国家字典信息
  map.getCountries(null, (c) => {
    countries.value = c

    // 获取所有KB指数信息
    gtiInfos.value = happinessInfos

    // 加载筛选面板选项
    loadFilterData()
  })
}

/**
 * 获取国家矢量图数据
 *
 * @return {Promise} 处理请求
 */
function getCountryGeoJson() {
  // return this.$axios.get(map.geoJsonUrl.world_50);
  return Promise.resolve(world_50m) // 测试数据
}

/**
 * 获取所有KB指数信息
 *
 * @return {Promise} 处理请求
 */
function getAllGTIData() {
  // return this.$axios.get("/api/api/tsgz/getAllKbzsList");
  return Promise.resolve({ obj: happinessInfos }) // 测试数据
}

/**
 * 加载筛选面板选项
 */
function loadFilterData() {
  const _areas = []
  const _years = []

  // 遍历GTI数据，获取区域选项和年份选项
  gtiInfos.value.forEach((item) => {
    if (_areas.indexOf(item.gjywm) === -1) {
      _areas.push(item.gjywm)
    }
    if (_years.indexOf(item.yf) === -1) {
      _years.push(item.yf)
    }
  })

  // 区域选项包括“所有区域”和各国家区域，各国家区域按名称排序
  areas.value = [defaultArea].concat(_areas.sort())

  // 年份选项按年份倒序排列
  years.value = _years.sort()

  // 初始化各筛选条件的选择项
  area.value = props.currentArea || defaultArea
  year.value = props.currentYear || (years.value.length ? years.value[years.value.length - 1] : '')
  indicator.value = indicators[0]
}

/**
 * 设置选中区域
 *
 * @param {String} item 区域信息
 */
function setArea(item) {
  area.value = item
}

/**
 * 创建GTI地图
 */
function createGTIMap() {
  if (!gtiChart) {
    gtiChart = echarts.init(document.getElementById('gtiView'))
    // 监听鼠标点击操作
    gtiChart.on('click', (params) => {
      if (!params.data) {
        gtiChart.dispatchAction({
          type: 'unselect',
          name: params.name,
        })
      } else if (area.value !== params.data.name) {
        area.value = params.data.name
      } else {
        area.value = defaultArea
      }
    })
    // 点击画布，判断是否点击到了空白处
    gtiChart.getZr().on('click', (params) => {
      if (!params.target) {
        if (area.value !== defaultArea) {
          area.value = defaultArea
        } else {
          resetGTIMap()
        }
      }
    })
  }

  // 设置2D地图参数
  const opts = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgb(10,30,91,0.9)',
      textStyle: {
        color: '#fff',
      },
      className: 'textAlign',
      formatter: (params) => {
        const countryName = getCountryName(params.name)
        if (isNaN(params.value)) {
          return countryName
        } else {
          const richText = `<img src="static/image/countries/${params.name}.png"
                 style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>
                 <br/>${countryName}`
          if (indicator.value && indicator.value.name === '幸福指数') {
            return richText + `<br/>${indicator.value.name}：${params.data.score}`
          } else {
            return (
              richText +
              `<br/>${indicator.value.name}：${isNaN(params.data.score) ? '-' : `第${params.data.score}名`}`
            )
          }
        }
      },
    },
    visualMap: [
      {
        type: 'piecewise',
        pieces: map.gtiPieces,
        inRange: {
          color: map.gtiColors,
        },
        text: [' 高', '低'],
        textStyle: {
          fontSize: 14,
          color: '#fff',
        },
        orient: 'horizontal',
        itemWidth: 50,
        itemHeight: 22,
        itemGap: 0,
        itemSymbol: 'rect',
        hoverLink: true,
        showLabel: true,
        textGap: -30,
        formatter: '{value}',
      },
    ],
    series: [
      {
        type: 'map',
        map: 'world',
        nameProperty: map.areaNameKey,
        roam: true,
        zoom: defaultOpt.zoom,
        scaleLimit: {
          min: 1.5,
          max: 7,
        },
        center: defaultOpt.center,
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: 'rgba(245, 245, 245, 0.3)',
        },
        emphasis: {
          label: {
            show: true,
            color: '#000',
            fontSize: 14,
            textBorderColor: '#fff',
            textBorderWidth: 3,
            formatter: (params) => {
              return getCountryName(params.name)
            },
          },
          itemStyle: {
            areaColor: 'yellow',
          },
        },
        select: {
          label: {
            show: true,
            color: '#000',
            fontSize: 14,
            textBorderColor: '#fff',
            textBorderWidth: 3,
            formatter: (params) => {
              return getCountryName(params.name)
            },
          },
          itemStyle: {
            areaColor: 'yellow',
            borderColor: 'red',
            borderWidth: 1,
          },
        },
        data: gtiYearData.value,
      },
    ],
  }
  gtiChart.setOption(opts)
}

/**
 * 更新地图数据
 *
 * @param {Array} gtiData 某一年份的GTI数据
 */
function updateGTIMapData(gtiData) {
  if (!gtiChart) return
  const opts = gtiChart.getOption()
  opts.series[0].data = gtiData
  gtiChart.setOption(opts)
}

/**
 * 在地图上选中某一区域
 *
 * @param {String} areaName 某区域信息
 */
function selectArea(areaName) {
  if (!gtiChart) return

  // 根据经纬度定位区域
  const country = countries.value[areaName]
  if (country && !isNaN(country.zxdjd) && !isNaN(country.zxdwd)) {
    const opts = gtiChart.getOption()
    opts.series[0].zoom = 2
    opts.series[0].center = [country.zxdjd, country.zxdwd]
    gtiChart.setOption(opts)
  } else {
    resetGTIMap()
  }

  // 在地图上选中该区域并高亮
  gtiChart.dispatchAction({
    type: 'select',
    name: areaName,
  })
}

/**
 * 清理地图上的选中区域
 *
 * @param {String} area 当前被选中的区域信息
 */
function unselectArea(areaName) {
  if (!gtiChart) return

  // 重置视图展示
  resetGTIMap()

  // 取消目标区域的选中状态
  if (areaName) {
    gtiChart.dispatchAction({
      type: 'unselect',
      name: areaName,
    })
  }
}

/**
 * 重置视图展示
 */
function resetGTIMap() {
  if (!gtiChart) return
  const opts = gtiChart.getOption()
  opts.series[0].zoom = defaultOpt.zoom
  opts.series[0].center = defaultOpt.center
  gtiChart.setOption(opts)
}

/**
 * 关闭区域GTI信息详情面板
 */
function closeAreaInfoView() {
  area.value = defaultArea
}

/**
 * 跳转至事件分布图页面
 *
 * @param {String} countryName 国家名称
 */
function turnToIncidentDistribution(countryName) {
  // use router from Options API in template; if router needed, import/useRouter can be added
  // this.$router.push({ ... })
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
  return countries.value[nameEn] ? countries.value[nameEn].qyzwmc : nameEn
}
</script>

<style scoped>
.paiming {
  height: 120px;
  border-bottom: 1px solid #dddddd;
}
.paiming .inlineBlock {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.paiming .inlineBlock > div:nth-child(1) {
  height: 35%;
  line-height: 65px;
}
.paiming .inlineBlock > div:nth-child(2) {
  height: 65%;
  font-size: 38px;
}
.countryTitle {
  line-height: 90px;
  padding: 0 15px;
  border-bottom: 1px solid #dddddd;
}
.zjsjscreenRightList {
  padding: 5px 10px;
  border: 1px solid #0be4ec;
}
.listStyle_item {
  padding: 12px 30px;
  cursor: pointer;
}
.listStyle_item:hover,
.listStyle_item_active {
  background-color: #38466d;
}
.listStyle {
  height: calc(100% - 37px);
  overflow: auto;
  box-sizing: border-box;
}
.zjsjscreenBoxList_search {
  height: 35px;
  line-height: 35px;
  border: 1px solid #00a0e8;
  border-radius: 5px;
  margin: 0 10px;
  box-sizing: border-box;
}
.zjsjscreenBoxList_search input {
  width: calc(100% - 30px);
  color: #fff;
  outline: none;
  border: 0 none;
  background-color: #fff0;
}
.zjsjscreenBoxList {
  height: calc(100% - 50px);
  padding: 10px 0;
  box-sizing: border-box;
  border: 1px solid #0668a0;
  background-color: rgba(0, 0, 0, 0.2);
}
.zjsjscreenBox {
  position: absolute;
  height: calc(100% - 20px);
  top: 10px;
  left: 0;
  z-index: 1;
}
.zjsjscreenBox_item {
  padding: 0 10px;
  box-sizing: border-box;
}
.mapCon {
  width: 100%;
  height: 100%;
}
.skListTable {
  height: calc(100% - 135px);
  overflow: auto;
}
.skListTable table th,
.skListTable table td {
  border-bottom: 1px solid #bdc0c8;
  padding: 10px 0;
}
.skList {
  height: calc(100% - 45px);
  padding: 0 15px;
  box-sizing: border-box;
}
.closeBox {
  position: absolute;
  right: 25px;
  top: 4px;
  cursor: pointer;
}
.rightContentBox_title {
  height: 35px;
  background: url('../assets/image/skDefentitle.png') no-repeat bottom;
  background-size: 100%;
}
.rightContentBox {
  position: absolute;
  right: 0;
  top: 10px;
  z-index: 1;
  height: calc(100% - 20px);
  width: 380px;
  padding: 15px 10px;
  box-sizing: border-box;
  background: url('../assets/image/skDefenDataBg.png') no-repeat;
  background-size: 100% 100%;
}
.screenBox_item_option {
  position: absolute;
  width: calc(100% - 3px);
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #0489c0;
  box-sizing: border-box;
  top: 50px;
  left: 1px;
  z-index: 1;
}
.screenBox_item_option div {
  line-height: normal;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: right;
  background-color: #041247;
  max-height: 500px;
  overflow-y: auto;
}
.screenBox_item_option div:hover {
  background-color: #39476e;
}
.screenBox_item_title {
  display: flex;
}
.screenBox_item_title > div:nth-child(1) {
  flex: none;
  margin-left: 20px;
}
.screenBox_item_title > div:nth-child(2) {
  flex: 1;
  text-align: right;
  margin-right: 10px;
}
.screenBox_item_title > div:nth-child(2) input {
  color: #fff;
  border: 0 none;
  outline: none;
  background: #fff0;
  text-align: right;
  cursor: pointer;
}
.screenBox_item {
  position: relative;
  width: 290px;
  height: 50px;
  line-height: 50px;
  background: url('../assets/image/skSelectBg.png') no-repeat;
  background-size: 100% 100%;
}
.screenBox {
  position: absolute;
  z-index: 10;
  top: 35px;
}
.mapBox {
  position: relative;
  height: calc(100% - 85px);
  box-sizing: border-box;
  padding: 10px 0;
}
.viewContent {
  position: relative;
  color: #fff;
}
.timeAxis {
  height: 50px;
}
.contentTab {
  position: absolute;
  top: -50px;
  left: 20px;
}
.contentTab_btn {
  width: 170px;
  height: 47px;
  background: url('../assets/image/sktabbtnBg.png') no-repeat;
  background-size: 100% 100%;
  line-height: 47px;
  cursor: pointer;
  text-align: center;
}
.contentTab_btn:hover,
.contentTab_btn_activve {
  background-image: url('../assets/image/sktabbtnBgActive.png');
}
.coutryIcon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
  object-fit: cover;
}
.coutryIconBig {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.heightFormItem {
  margin-top: 6.5px;
  margin-left: 35px;
  border-color: transparent;
}
.heightFormItem :deep(.searchInput) {
  border-left-color: transparent;
}
.heightFormItem :deep(.el-input__suffix) {
  top: -2px;
}
.heightFormItem :deep(.el-select .el-input .el-select__caret) {
  color: #11e7f0;
}
</style>
