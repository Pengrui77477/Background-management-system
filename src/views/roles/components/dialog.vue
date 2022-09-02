<template>
    <el-dialog :model-value="dialogVisible" close-on-press-escape title="添加角色" width="40%">

        <el-form :model="queryRolesForm" label-width="100px" :rules="rules" ref="ruleForm">
            <el-form-item :label="$t('roles.roleName')" prop="roleName">
                <el-input v-model="queryRolesForm.roleName" />
            </el-form-item>
            <el-form-item :label="$t('roles.roleDesc')" prop="roleDesc">
                <el-input v-model="queryRolesForm.roleDesc" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleDialog">{{ $t('driver.closeBtnText') }}</el-button>
                <el-button type="primary" @click="handleConfirm()">{{ $t('driver.doneBtnText') }}</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { addRoles } from '@/api/rights'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index'
type Props = {
    dialogVisible: Boolean
}
const queryRolesForm = reactive({
    roleName: '',
    roleDesc: ''
})

const props = defineProps<Props>();
const emit = defineEmits(['handleDialog', 'initTables'])
const rules = reactive<FormRules>({
    roleName: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
        },
    ],
    roleDesc: [
        {
            required: false,
            message: 'Please select Activity zone',
            trigger: 'blur',
        },
    ]
})
const ruleForm = ref<FormInstance>()
const handleDialog = () => {
    emit('handleDialog', false)
}

const handleConfirm = async () => {
    ruleForm.value.validate(async (valid, fields) => {
        if (valid) {
            const res = await addRoles(queryRolesForm);
            emit('initTables');
            ElMessage({
                message: i18n.global.t('message.updeteSuccess'),
                type: 'success',
            });
            handleDialog()
        }else{
            ElMessage.error('error submit!')
        }
    })
}
</script>

<style scoped lang='scss'>
</style>