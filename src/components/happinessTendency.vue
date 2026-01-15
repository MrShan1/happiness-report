<template>
  <div id="tendencyChart" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import map from '../utils/map'
import { year5Top5KbzsListByYf } from '../testData/statisticsInfo' // 最近五年top5国家的SK指数趋势
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//获取最近五年top5国家的SK指数趋势
function getSkzsqsData() {
  // this.$axios.get("/api/api/index/getTop5KbzsListByYf").then(res => {
  //   if (!res.obj || res.obj.length === 0) return;
  //   //格式化SK指数趋势数据
  //   let yearDatas = this.formatSkzsqsData(res.obj);
  //   //展示国家SK指数趋势
  //   this.skzsqsDataPackEchart(yearDatas);
  // });

  //格式化SK指数趋势数据
  let yearDatas = formatSkzsqsData(year5Top5KbzsListByYf)
  //展示国家SK指数趋势
  skzsqsDataPackEchart(yearDatas)
}

//格式化SK指数趋势数据
function formatSkzsqsData(skData) {
  let yearDatas = {}
  let countries = []
  skData.forEach((item) => {
    let yearData = yearDatas[item.yf]
    if (!yearData) {
      yearDatas[item.yf] = yearData = {
        title: {
          text: item.yf + '年',
          textStyle: {
            color: '#fff',
            fontSize: 24,
          },
          right: 3,
          bottom: 2,
        },
        yAxis: {
          data: [],
        },
        series: [
          {
            data: [], // 展示国家名称和SK指数值
          },
          {
            data: [], // 展示国家SK指数值
          },
        ],
      }
    }
    let serieData = {
      name: item.gjzwm,
      value: item.score * 1000,
      year: item.yf,
      nameEn: item.gjywm,
    }
    yearData.yAxis.data.push(item.gjzwm)
    yearData.series[0].data.push(serieData)
    yearData.series[1].data.push(serieData)
  })

  return yearDatas
}

//展示国家SK指数趋势
function skzsqsDataPackEchart(yearDatas) {
  let chart = echarts.init(document.getElementById('tendencyChart'))

  // 拆解数据
  let yearArr = Object.keys(yearDatas)
  let yearDataArr = Object.values(yearDatas)
  let countPerYear = yearDataArr[0].yAxis.data.length

  // 配置视图选项
  let option = {
    baseOption: {
      grid: {
        top: '40',
        bottom: '40',
        left: '88',
        right: '60',
      },
      xAxis: {
        type: 'value',
        position: 'top',
        min: 0,
        max: 10000,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: '#f2f2f2',
          },
          formatter: (text) => {
            return text / 1000
          },
        },
      },
      yAxis: {
        type: 'category',
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 20, // 展示国家个数
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      visualMap: [
        {
          type: 'continuous',
          show: false,
          min: 0,
          max: 10,
          inRange: {
            color: map.gtiColors,
          },
        },
      ],
      // visualMap: [
      //   {
      //     type: "piecewise",
      //     show: false,
      //     pieces: map.gtiPieces,
      //     text: ["高", "底"]
      //   }
      // ],
      timeline: {
        axisType: 'category',
        show: false,
        data: yearArr,
        autoPlay: true,
        playInterval: 2000,
      },
      animationDuration: 1000,
      animationDurationUpdate: 1000,
      // animationEasing: "linear",
      // animationEasingUpdate: "linear",
      series: [
        {
          type: 'bar',
          barWidth: '50%',
          label: {
            show: true,
            position: 'left',
            formatter: '{b}',
            color: '#fff',
            fontSize: 16,
          },
          itemStyle: {
            borderRadius: 5,
          },
        },
        {
          type: 'bar',
          barWidth: '50%',
          barGap: '-100%',
          label: {
            show: true,
            valueAnimation: true,
            position: 'right',
            formatter: (params) => {
              return params.value != 0 ? (params.value / 1000).toFixed(3) : ''
            },
            color: '#fff',
            fontSize: 14,
          },
          itemStyle: {
            borderRadius: 5,
          },
        },
      ],
    },
    options: yearDataArr,
  }
  chart.setOption(option)

  //添加点击事件
  chart.on('click', (params) => {
    router.push({
      name: 'happinessDetail',
      params: {
        currentArea: params?.data?.nameEn,
        currentYear: params?.data?.year,
      },
    })
  })
}

onMounted(() => {
  //获取最近五年top5国家的SK指数趋势
  getSkzsqsData()
})
</script>
