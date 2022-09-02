<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input v-model="roleId" :placeholder="$t('roles.placeholder')" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="handleSearchRoles">{{ $t('table.search') }}</el-button>
      <el-button type="primary" :icon="Plus" @click="handleAddRoles">{{ $t('roles.add_roles') }}
      </el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :prop="item.prop" :label="$t(`roles.${item.label}`)" v-for="(item, index) in options"
        :key="index">
        <template #default="{ row }" v-if="item.prop === `action`">
          <!-- <el-button type="primary" :icon="Plus" /> -->
          <!-- <el-button type="info" :icon="Setting" /> -->
          <el-button type="danger" @click="handleDeleteRoles(row)" :icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <dialogVue v-model="dialogVisible" :dialogVisible="dialogVisible" @handle-dialog="handleDialog"
    @init-tables="initRoles"></dialogVue>
</template>

<script setup lang='ts'>
import { getAllRoles, deleteRoles, searchRoles } from '@/api/rights';
import { Search, Delete, Plus, Setting } from '@element-plus/icons-vue'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, watchEffect, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import dialogVue from './components/dialog.vue';
import { debounce } from '@/utils/filter'
const i18n = useI18n();
// type Role = {
//   id:number,
//   roleDesc:string,
//   roleName:string
// }
const tableData = ref([]);
const dialogVisible = ref(false);
const roleId = ref<number>()

const initRoles = async () => {
  const res = await getAllRoles();
  tableData.value = res;
}
const handleAddRoles = () => {
  dialogVisible.value = true;
}
const handleDialog = (value) => {
  dialogVisible.value = value
}
const handleDeleteRoles = row => {
  ElMessageBox.confirm(
    '你确定要删除吗？',
    '警告',
    {
      confirmButtonText: i18n.t('driver.doneBtnText'),
      cancelButtonText: i18n.t('driver.closeBtnText'),
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteRoles(row.id).then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        initRoles();
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const handleSearchRoles = async () => {
  await searchRoles(roleId.value)
    .then(res => {
      console.log(res);
    })
}
const requestDebounce = debounce(handleSearchRoles,1000);
watch(roleId,()=>{
  requestDebounce()
})
// watch(roleId,()=>{
//   const requestDebounce = debounce(handleSearchRoles,2000);
//   requestDebounce()
// })
initRoles()
</script>

<style lang="scss" scoped>
</style>
