<template>
    <div class="hamburger-container" @click="changeHamburger" id="hamburger">
        <svg-icon :icon="icon"></svg-icon>
    </div>
</template>

<script setup lang='ts'>
import useStore from '@/stores/index';
import { computed } from 'vue';
const {app} = useStore()

const changeHamburger = ()=>{
    app.changeSiderBar()
}   
const icon = computed(()=>{
    return app.siderType == true ? 'hamburger-opened' :'hamburger-closed'
})

</script>

<style scoped lang='scss'>
    .hamburger-container{
        margin-right: 20px;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>