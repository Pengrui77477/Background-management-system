<template>
    <div class="flex flex-wrap items-center" id="dropdown">
        <el-dropdown @command="handleCommand">
            <svg-icon icon="language"></svg-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="zh" :disabled="currentLanguage">中文</el-dropdown-item>
                    <el-dropdown-item command="en" :disabled="!currentLanguage">English</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import useStore from '@/stores/index'
const {app} = useStore();
const i18n = useI18n();

const currentLanguage = computed(() => {
    // console.log(i18n.locale.value);
    console.log(i18n.locale.value);
    
    return i18n.locale.value === 'zh' 
})

const handleCommand =(value:string)=>{
    i18n.locale.value = value
    app.changeLang(value);
    localStorage.setItem('lang',value)
}
</script>

<style scoped lang='scss'>
</style>