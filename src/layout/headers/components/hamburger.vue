<template>
    <div class="hamburger-container" @click="app.changeSiderBar()" id="hamburger">
        <svg-icon :icon="icon"></svg-icon>
    </div>
</template>

<script setup lang='ts'>
import useStore from '@/stores/index';
import { computed } from 'vue';
const {app} = useStore()

const icon = computed(()=>{
    return app.siderType ? 'hamburger-opened' :'hamburger-closed'
})

</script>

<style scoped lang='scss'>
    .hamburger-container{
        margin-right: 20px;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>