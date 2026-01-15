<template>
  <div class="h100" id="timelineView"></div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

// 定义props
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  currentItem: {
    type: [String, Number, Object],
    default: '',
  },
})

// 定义emit事件
const emit = defineEmits(['update:currentItem'])

// 响应式数据
const chart = ref(null) // 时间轴图

// 方法定义
/**
 * 组件初始化
 */
const createChart = () => {
  const chartDom = document.getElementById('timelineView')
  if (!chartDom) return

  const chartInstance = echarts.init(chartDom)

  // 设置时间轴图参数
  const opts = {
    timeline: {
      axisType: 'category',
      autoPlay: false,
      left: '20',
      right: '20',
      progress: {
        show: false,
        lineStyle: {
          color: 'transparent',
        },
        itemStyle: {
          color: '#a4b1d7',
        },
        label: {
          show: true,
          color: '#a4b1d7',
        },
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
        },
      },
      checkpointStyle: {
        symbolSize: 17,
        color: '#17a0cb',
      },
      controlStyle: {
        show: true,
      },
      data: [],
    },
  }

  chartInstance.setOption(opts)

  // 时间轴选择项改变时，更新当前时间数据
  chartInstance.on('timelinechanged', (param) => {
    if (props.items && props.items.length > param.currentIndex) {
      emit('update:currentItem', props.items[param.currentIndex])
    }
  })

  chart.value = chartInstance
}

/**
 * 加载时间轴数据
 */
const loadChartData = (arr) => {
  if (!chart.value || !arr || arr.length === 0) return

  const ops = chart.value.getOption()
  ops.timeline[0].data = arr
  chart.value.setOption(ops)
}

/**
 * 选择指定的时间轴节点
 */
const selectItem = (val) => {
  if (!chart.value || !props.items || props.items.length === 0) return

  // 获取目标对象的索引位置
  let index = props.items.indexOf(val)
  index = index === -1 ? 0 : index

  // 根据索引位置设置当前选中的节点
  const opts = chart.value.getOption()
  opts.timeline[0].currentIndex = index
  chart.value.setOption(opts)
}

/**
 * 停止自动播放
 */
const stopPlay = () => {
  setAutoPlay(false)
}

/**
 * 开始自动播放
 */
const startPlay = () => {
  setAutoPlay(true)
}

/**
 * 设置自动播放效果
 */
const setAutoPlay = (autoPlay) => {
  if (!chart.value) return
  const opts = chart.value.getOption()
  opts.timeline[0].autoPlay = autoPlay
  chart.value.setOption(opts)
}

/**
 * 获取自动播放状态
 */
const getPlayStatus = () => {
  if (!chart.value) return false
  const opts = chart.value.getOption()
  return opts.timeline[0].autoPlay
}

/**
 * 组件初始化
 */
const init = (items) => {
  // 确保DOM已渲染
  nextTick(() => {
    // 创建时间轴图
    if (!chart.value) {
      createChart()
    }

    // 加载时间轴数据
    if (items && items.length > 0) {
      loadChartData(items)
    }
  })
}

// 监听props变化
watch(
  () => props.items,
  (val) => {
    if (!val || val.length === 0) return
    init(val)
  },
  { immediate: true },
)

watch(
  () => props.currentItem,
  (val) => {
    // 选择指定的时间轴节点
    selectItem(val)
  },
)

// 生命周期
onMounted(() => {
  // 组件挂载时初始化
  if (props.items && props.items.length > 0) {
    init(props.items)
  }
})

onBeforeUnmount(() => {
  // 清理图表实例
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>
<style scoped></style>
