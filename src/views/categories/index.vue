<template>
  <div>categories</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { getCategories } from '@/api/goods'

const queryData = reactive({
  type: [],
  pagenum: 1,
  pagesize: 10
})
console.log(queryData);

const initCategories = async () => {
  await getCategories(queryData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);

    })
}
initCategories()
</script>

<style lang="scss" scoped></style>
