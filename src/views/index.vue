<template>
  <div class="h100 indexstyle">
    <div class="textAlign headerSty f35">
      <span>全&nbsp;球&nbsp;幸&nbsp;福&nbsp;指&nbsp;数&nbsp;报&nbsp;告</span>
    </div>
    <div class="bodyStyle">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.indexstyle {
  background: url('../assets/image/bgborder.png') #091e5b no-repeat;
  background-size: 100% 96%;
  background-position: 0 30px;
}
.headerSty {
  position: relative;
  height: 90px;
  line-height: 65px;
  color: #2ff8ff;
  background: url('../assets/image/topTitle.png') no-repeat top;
  background-size: 97% 112%;
}
.bodyStyle {
  height: calc(100% - 90px);
}
</style>
