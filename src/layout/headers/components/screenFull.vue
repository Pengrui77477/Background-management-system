<template>
    <div @click="handleScreen" id="fullscreen">
        <svg-icon :icon=" isFullscreen == true ? 'fullscreen' :'exit-fullscreen'" ></svg-icon>
    </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import screenfull from 'screenfull';
let isFullscreen = ref(true);
const handleScreen = () => {
    if (screenfull.isEnabled) {
        screenfull.toggle()
        isFullscreen.value = screenfull.isFullscreen
    }
    
}

</script>

<style scoped lang='scss'>
</style>