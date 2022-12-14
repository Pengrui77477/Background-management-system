<template>
    <div class="login-container">

        <el-form :model="form" class="login-form" :rules="rules" ref="ruleFormRef">
            <div class="title-container">
                <h3 class="title"> {{ $t('login.title') }}</h3>
            </div>
            <el-card>
                <el-form-item prop="username">
                    <svg-icon icon="user" class="svg-container"></svg-icon>
                    <el-input v-model="form.username" :autosize="true" />
                </el-form-item>

                <el-form-item prop="password">
                    <svg-icon icon="password" class="svg-container"></svg-icon>
                    <el-input v-model="form.password" :type="passwordType" />
                    <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="changeEye"
                        style="cursor:pointer"></svg-icon>
                </el-form-item>
                <el-button type="primary" class="login-button" @click="handleLogin(ruleFormRef)">
                    {{ $t('login.btnTitle') }}</el-button>
            </el-card>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import SvgIcon from '../../components/SvgIcon/index.vue';
import useStore from "@/stores/index";

const { app } = useStore();



const ruleFormRef = ref<FormInstance>()
let passwordType = ref<string>('password')

const form = reactive({
    username: 'admin',
    password: '123456'
});
const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Please select Activity name',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: 'Please select Activity password',
            trigger: 'blur',
        },
    ]
})
const handleLogin = async (formEl: FormInstance | undefined) => {

    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            app.login(form);
            // const res = await login(form) as unknown as User;
            // console.log('res', res);
            // app.setToken(res.token)
        } else {
            console.log('error submit!', fields)
        }
    })
}

const changeEye = () => {
    if (passwordType.value === "password") {
        passwordType.value = "text"
    } else {
        passwordType.value = "password"
    }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background: center/cover url('@/assets/img/0.0.jpg');

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        :deep(.el-form-item) {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        :deep(.el-input) {
            //   display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                // border: 0px;
                // -webkit-appearance: none;
                // padding: 12px 5px 12px 15px;
                // color: $light_gray;
                // height: 100%;
                // width: 100%;
            }
        }

        .login-button {
            width: 100%;
            height: 47px;
            box-sizing: border-box;
        }
    }

    .tips {
        font-size: 16px;
        line-height: 28px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        // color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            //   color: rgba(9, 8, 8, 0.1);
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        :deep(.lang-select) {
            position: absolute;
            top: 4px;
            right: 0;
            background-color: white;
            font-size: 22px;
            padding: 4px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    .show-pwd {
        // position: absolute;
        // right: 10px;
        // top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>