<template>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            status-icon>
            <el-form-item :label="i18n.t('goods.goods_name')" prop="goods_name">
                <el-input v-model="ruleForm.goods_name" />
            </el-form-item>
            <el-form-item :label="i18n.t('goods.goods_price')" prop="goods_price">
                <el-input v-model="ruleForm.goods_price" />
            </el-form-item>
            <el-form-item :label="i18n.t('goods.goods_number')" prop="goods_number">
                <el-input v-model="ruleForm.goods_number" />
            </el-form-item>
            <el-form-item :label="i18n.t('goods.goods_weight')" prop="goods_weight">
                <el-input v-model="ruleForm.goods_weight" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">{{ i18n.t('driver.closeBtnText') }}</el-button>
                <el-button type="primary" @click="handleSubmit">{{ i18n.t('driver.doneBtnText') }}</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup lang='ts'>
import { reactive,ref } from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';
import type { FormRules, FormInstance } from 'element-plus'
import { editGoods } from '@/api/goods';

const i18n = useI18n();
type Props = {
    dialogVisible: boolean,
    goodsId:number
}
const props = defineProps<Props>();
const emit = defineEmits(['handleDialog', 'initUserList'])
const rules = reactive<FormRules>({
    goods_name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
        },
    ],
    goods_price: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'blur',
        },
    ],
    goods_number: [
        {
            required: true,
            message: 'Please select Activity goods_number',
            trigger: ['blur', 'change'],
        },
    ],
    goods_weight: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'blur',
        },
    ]
})
const ruleForm = reactive({
    goods_name: '',
    goods_price: '',
    goods_number: '',
    goods_weight: '',
})
const ruleFormRef = ref<FormInstance>()
const handleClose = () => {
    emit('handleDialog', false)
}
const handleSubmit = () => {
    ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            await editGoods(props.goodsId,ruleForm)
            ElMessage({
                message: i18n.t('message.updeteSuccess'),
                type: 'success',
            });
            emit('initUserList')
        } else {
            ElMessage.error('error submit!')
            console.log('error submit!', fields)
        }
    })
}

</script>

<style scoped lang='scss'>
</style>