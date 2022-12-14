<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input v-model="queryForm.query" :placeholder="$t('goods.placeholder')" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGoods">{{ $t('table.search') }}</el-button>
      <el-button type="primary" :icon="Plus" @click="handleAddGoods">{{ $t('goods.add_goods') }}
      </el-button>
    </el-row>
    <el-table :data="resData" style="width: 100%" height="600">
      <el-table-column :prop="item.prop" :label="$t(`goods.${item.label}`)" v-for="(item, index) in options"
        :key="index" :width="item.width">
        <template #default="{ row }" v-if="item.prop === `action`">
          <el-button type="primary" :icon="Setting" @click="handleEditGoods(row)" />
          <!-- <el-button type="info" :icon="Setting" /> -->
          <el-button type="danger" @click="handleDeleteGoods(row)" :icon="Delete" />
        </template>
        <template #default="{ row }" v-if="item.prop === `add_time`">
          {{ filterTimes(row.add_time) }}
        </template>
        <template #default="{ row }" v-if="item.prop === `upd_time`">
          {{ filterTimes(row.upd_time) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
  <dialogVue v-model="dialogVisible" :goodsId="goodsId" :dialogVisible="dialogVisible" @handle-dialog="handleDialog"
    v-if="dialogVisible"></dialogVue>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
import { getGoods, deleteGoods } from '@/api/goods';
import { Search, Delete, Plus, Setting } from '@element-plus/icons-vue'
import { options } from './options'
import { filterTimes, isNull, debounce } from '@/utils/filter'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n';
import dialogVue from './dialog.vue';

const i18n = useI18n();
const queryForm = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10
})
const resData = ref([]);
const total = ref(0);
const dialogVisible = ref(false)
const goodsId = ref(0)
const initGoods = async () => {
  const res = await getGoods(queryForm);
  total.value = res.total
  resData.value = res.goods;

}
// const handleSearch = () => {

// }
const handleSizeChange = (pagesize) => {
  queryForm.pagesize = pagesize;
  initGoods();
}
const handleCurrentChange = (pagenum) => {
  queryForm.pagenum = pagenum;
  initGoods();
}
const handleAddGoods = () => {
  dialogVisible.value = true;
}
const handleDeleteGoods = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.deleteGoods'),
    'Warning',
    {
      confirmButtonText: i18n.t('driver.doneBtnText'),
      cancelButtonText: i18n.t('driver.closeBtnText'),
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteGoods(row.goods_id)
      initGoods();
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
const handleDialog = (value) => {
  dialogVisible.value = value

}
const handleEditGoods = (row) => {
  dialogVisible.value = true
  goodsId.value = row.goods_id;
}

initGoods();
const queryDebounce = debounce(initGoods, 1500);
watch(() => queryForm.query, () => {
  queryDebounce()
}, { deep: true })

</script>

<style lang="scss" scoped>

</style>
