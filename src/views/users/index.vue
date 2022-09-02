<template>
    <el-card>
        <el-row :gutter="20" class="header">
            <el-col :span="7">
                <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
            </el-col>
            <el-button type="primary" :icon="Search" @click="initGetUsersList">{{ $t('table.search') }}</el-button>
            <el-button type="primary" :icon="Search" @click="handleDialogValue(null)">{{ $t('table.adduser') }}
            </el-button>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" :width="item.width"
                v-for="(item, index) in options" :key="index">

                <template #="{ row }" v-if="item.prop === `mg_state`">
                    <el-switch v-model="row.mg_state" @change="changeState(row)" />
                </template>
                <template #="{ row }" v-if="item.prop === `create_time`">
                    {{ filterTimes(row.create_time) }}
                </template>
                <template #default="{ row }" v-if="item.prop === `action`">
                    <el-button type="primary" @click="handleDialogValue(row)" :icon="Edit" />
                    <!-- <el-button type="info" :icon="Setting" /> -->
                    <el-button type="danger" @click="handleDeleteUSer(row)" :icon="Delete" />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 5, 10, 15]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" >
        </el-pagination>
    </el-card>
    <Dialog @handle-dialog="handleDialog" @init-user-list="initGetUsersList" v-model="dialogVisible"
        :dialogVisible="dialogVisible" :isAddUser="isAddUser" :dialogTableValue="dialogTableValue" v-if="dialogVisible">
    </Dialog>
</template>

<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { Search, Delete, Edit, Setting } from '@element-plus/icons-vue'
import { getUser, changeUserState, deleteUser } from '@/api/users'
import { options } from './options'
import { filterTimes, isNull, debounce } from '@/utils/filter'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n';
import Dialog from './components/dialog.vue'

const i18n = useI18n();
type Form = {
    username: string,
    password: string,
    email: string,
    mobile: string
}
const queryForm = reactive({
    query: '',
    pagenum: 1,
    pagesize: 10
})

const tableData = ref([]);
const total = ref(0);
const dialogVisible = ref(false);
const isAddUser = ref<Boolean>();
const dialogTableValue = ref<Form>()

const initGetUsersList = async () => {
    const res = await getUser(queryForm);
    console.log(res);
    
    total.value = res.total
    tableData.value = res.users
}
const handleSizeChange = (pagesize) => {
    queryForm.pagesize = 1;
    queryForm.pagesize = pagesize;
    initGetUsersList();
}
const handleCurrentChange = (pagenum) => {
    queryForm.pagenum = pagenum;
    initGetUsersList();
}
const changeState = async (info) => {
    await changeUserState(info.id, info.mg_state)
    ElMessage({
        message: i18n.t('message.updeteSuccess'),
        type: 'success',
    })
}
const handleDialog = (value: boolean) => {
    dialogVisible.value = value;
}
const handleDialogValue = (row) => {
    if (isNull(row)) {
        isAddUser.value = true
    } else {
        isAddUser.value = false;
        dialogTableValue.value = JSON.parse(JSON.stringify(row));
    }
    dialogVisible.value = true;
}
const handleDeleteUSer = (row) => {
    ElMessageBox.confirm(
        i18n.t('dialog.deleteTitle'),
        'Warning',
        {
            confirmButtonText: i18n.t('driver.doneBtnText'),
            cancelButtonText: i18n.t('driver.closeBtnText'),
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await deleteUser(row.id)
                .then(() => {

                })
            console.log(res);
            initGetUsersList();
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
const queryDebounce = debounce(initGetUsersList,1000);
watch(() => queryForm.query, () => {
    
    queryDebounce()
}, { deep: true })
initGetUsersList();
</script>

<style scoped lang='scss'>
.header {
    padding-bottom: 16px;
}

:deep(.el-pagination) {
    margin-top: 16px;
}
</style>