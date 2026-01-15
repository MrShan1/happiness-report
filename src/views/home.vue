<template>
  <div class="h100 homecontent">
    <div class="h100">
      <!-- 左侧 -->
      <div class="contentLeft inlineBlock">
        <div class="contentLeft_item pleft20 pbottom20" style="height: 480px">
          <div class="tendency" style="padding-bottom: 0">
            <div class="tendency_title1">
              <!-- <img src="../assets/image/titleIcon.png" alt="" />
              <span
                style="
                  display: inline-block;
                  vertical-align: text-bottom;
                  margin-left: 0px;
                "
                >幸福指数趋势</span
              > -->
            </div>
            <div class="tendency_echarts" style="color: #fff; padding: 10px; overflow: auto">
              <div style="padding: 15px">
                什么是
                <strong style="font-size: 22px; color: #ff9f2d">幸福指数</strong>
                ？
              </div>
              <p style="padding: 15px; font-family: math">
                幸福指数是衡量个体或群体对生存发展状况主观感受的社会学指标，综合反映幸福感及外部环境因素的影响，涵盖生活满意度、心理体验等维度。其内涵包括对物质条件、社会环境、心理状态的主客观双重评估，常通过经济增长、收入分配、生存成本等经济变量与心理参照系、成就动机等非经济因素共同测算。
              </p>
              <p style="padding: 15px; font-family: math">
                每年牛津大学幸福感研究中心以及民调机构 Gallup
                合作，根据全球147个国家或地区人民对于自己生活的评价，并参考<span
                  style="color: #00bcd4"
                  >GDP、预期寿命、自由度、社会支持、国民慷慨程度、政府清廉度</span
                >等各项指标，对平均幸福指数进行排名，生成幸福指数报告。
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="contentMiddle inlineBlock h100">
        <div class="contentMiddle_content">
          <div class="contentMiddle_middle" style="margin: 20px 0px 0px">
            <!-- 全球幸福指数图 -->
            <HappinessMap></HappinessMap>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="contentRight inlineBlock">
        <div class="contentRight_item pright20 pbottom20" style="height: 100%">
          <div class="tendency" style="padding-bottom: 0">
            <div class="tendency_title">
              <img src="../assets/image/titleIcon.png" alt="" />
              <span style="display: inline-block; vertical-align: text-bottom; margin-left: 0px"
                >幸福指数趋势</span
              >
            </div>
            <div class="tendency_echarts">
              <HappinessTendency />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HappinessMap from '../components/happinessMap.vue'
import HappinessTendency from '../components/happinessTendency.vue'
</script>

<style scoped>
.homecontent {
  position: relative;
  background: url('../assets/image/mapbg.png') no-repeat bottom center;
  overflow: hidden;
}

.tendency_echarts {
  height: calc(100% - 39px);
  box-sizing: border-box;
}

.contentMiddle_middle {
  position: relative;
  height: calc(100% - 200px);
  overflow: hidden;
  /* background-color: cadetblue; */
}
.contentMiddle_header_item {
  display: inline-block;
  height: 100%;
  width: 33.3%;
  box-sizing: border-box;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
}
.contentMiddle_header {
  height: 90px;
  padding: 0 30px;
  padding-top: 20px;
  box-sizing: border-box;
}
.contentLeft,
.contentRight {
  height: calc(100% - 30px);
  width: 26%;
  box-sizing: border-box;
  vertical-align: top;
}
.contentMiddle {
  width: 48%;
  padding: 0 20px;
  box-sizing: border-box;
  vertical-align: top;
  overflow: hidden;
}
.contentMiddle_content {
  position: relative;
  height: 100%;
}
.contentLeft_item,
.contentRight_item {
  position: relative;
  height: 33.3%;
  box-sizing: border-box;
}
.tendency {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  /* background: url('../assets/image/testtt.png') no-repeat bottom; */
  background-size: 100% 100%;
  border: 1px solid #3d559e;
  border-radius: 10px;
}
</style>
