<template>
  <div>rights</div>
</template>

<script setup lang='ts'>
import { getAllRights } from '@/api/rights';
import { ref } from 'vue';
const type = ref('list')
const initRights = async () => {
  const res = await getAllRights(type.value);
  console.log(res);
  
}

initRights()
</script>

<style lang="scss" scoped>
</style>
