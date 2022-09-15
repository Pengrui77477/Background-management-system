<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%" height="700" :stripe="true">
      <el-table-column :prop="item.prop" :label="$t(`rights.${item.label}`)"  v-for="item in options"/>
    </el-table>
  </el-card>
</template>

<script setup lang='ts'>
import { getAllRights } from '@/api/rights';
import { ref, type Ref } from 'vue';
import {options} from './options'

const tableData = ref([])
const initRights = async () => {
  const res = await getAllRights();
  tableData.value = res;
}

initRights()
</script>

<style lang="scss" scoped>

</style>
