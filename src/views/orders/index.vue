<template>
  <el-card>
    <!-- <el-row :gutter="20" class="header">
        <el-col :span="7">
          <el-input v-model="queryForm.query" :placeholder="$t('goods.placeholder')" clearable></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="initGoods">{{ $t('table.search') }}</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAddGoods">{{ $t('goods.add_goods') }}
        </el-button>
      </el-row> -->
    <el-table :data="tableData" style="width: 100%" height="500">
      <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in options" :key="index">
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
  </el-card>
</template>

<script setup lang='ts'>
import { getOrders } from '@/api/orders'
import { ref } from 'vue';
import { options } from './options'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
})
const tableData = ref([])
const total = ref(0)
const initOrders = async () => {
  const res = await getOrders(queryForm.value);
  console.log(res);
  
  tableData.value = res.goods;
  total.value = res.total;
}
const handleSizeChange = (size)=>{
  queryForm.value.pagesize = size;
  initOrders();

}
const handleCurrentChange = (num)=>{
  queryForm.value.pagenum = num;
  initOrders();
  
}

initOrders()
</script>

<style lang="scss" scoped>

</style>
