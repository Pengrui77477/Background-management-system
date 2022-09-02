<template>
  <!-- <div class="common-layout"> -->
  <el-container class="app-wrapper" >
    <el-aside :width="asideWidth" class="sidebar-container">
      <Menu></Menu>
    </el-aside>
    <el-container class="container" :class="{hidderContainer : !app.siderType}">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import Menu from './menu/index.vue'
import Header from './headers/index.vue';
import useStore from '@/stores/index'
// import variables from '@/assets/styles/variables.scss'


const {app} = useStore();
const asideWidth = computed(()=>{
  return app.siderType ? '210px' : '67px'
})

</script>

<style lang="scss" scoped>

.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

:deep(.el-header) {
  padding: 0;
}
</style>