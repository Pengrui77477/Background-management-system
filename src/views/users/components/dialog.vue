<template>
    <el-dialog :model-value="dialogVisible" close-on-press-escape
        :title="isAddUser ? $t('table.add_user') : $t('table.edit_user')" width="40%">

        <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
            <el-form-item :label="$t('table.username')" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item :label="$t('table.password')" prop="password" v-if="isAddUser">
                <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-form-item :label="$t('table.email')" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item :label="$t('table.mobile')" prop="mobile">
                <el-input v-model="form.mobile" />
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
import { ref, reactive, watch } from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addUser, editUser } from '@/api/users'
import i18n from '@/i18n/index'

type Form = {
    username: string,
    password: string,
    email: string,
    mobile: string
}
type Props = {
    dialogVisible: Boolean,
    isAddUser: Boolean,
    dialogTableValue: Form
}
const props = defineProps<Props>()

const form = ref<Form>({
    username: '',
    password: '',
    email: '',
    mobile: ''
})
const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: true,
            type: 'email',
            message: '请输入正确邮箱',
            trigger: ['blur', 'change'],
        },
    ],
    mobile: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'blur',
        },
    ]
})
const ruleForm = ref<FormInstance>()
const emit = defineEmits(['handleDialog', 'initUserList'])

const handleDialog = () => {
    emit('handleDialog', false)
}
const handleConfirm = () => {
    ruleForm.value.validate(async (valid, fields) => {
        if (valid) {
            props.isAddUser ? await addUser(form.value) : await editUser(form.value)
            ElMessage({
                message: i18n.global.t('message.updeteSuccess'),
                type: 'success',
            });
            emit('initUserList')
            handleDialog()
        } else {
            ElMessage.error('error submit!')
            console.log('error submit!', fields)
        }
    })
}
watch(() => props.dialogTableValue, () => {
    if (!props.isAddUser) {
        form.value = props.dialogTableValue
    }

}, { deep: true, immediate: true });
</script>

<style scoped lang='scss'>
</style>