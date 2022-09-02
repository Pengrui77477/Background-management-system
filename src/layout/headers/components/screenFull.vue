<template>
    <div @click="handleScreen" id="fullscreen">
        <svg-icon icon="fullscreen"></svg-icon>
    </div>
</template>

<script setup lang='ts'>
import screenfull from 'screenfull';

const handleScreen = () => {
    if (screenfull.isEnabled) {
        screenfull.toggle()
    }
}

</script>

<style scoped lang='scss'>
</style>