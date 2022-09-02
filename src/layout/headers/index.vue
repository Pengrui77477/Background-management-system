<template>
  <div class="navbar">
    <Hamburger></Hamburger>
    <BreadcrumbVue></BreadcrumbVue>
    <div class="navbar-right">
      <driver class="navbar-item"></driver>
      <screenFullVue class="navbar-item"></screenFullVue>
      <langVue class="navbar-item langIcon"></langVue>
      <avatorVue class="navbar-item"></avatorVue>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Hamburger from './components/hamburger.vue';
import BreadcrumbVue from './components/Breadcrumb.vue';
import avatorVue from './components/avator.vue';
import langVue from './components/lang.vue';
import screenFullVue from './components/screenFull.vue';
import driver from './components/driver/index.vue'
</script>

<style scoped lang='scss'>
.navbar {
  //   width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .langIcon{
      width: 20px;
      height: 20px;
      cursor: pointer;
      :deep(.el-dropdown){
        width: 100%;
        height: 100%;
        .svg-icon{
          width: 100%;
          height: 100%;
        }
      }
    }
    .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>