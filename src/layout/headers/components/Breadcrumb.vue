<template>
    <el-breadcrumb :separator-icon="ArrowRight" >
        <el-breadcrumb-item  v-for="(item,index) in breadcrumbList" :key="index">
            <span class="no-redirect" v-if="index === breadcrumbList.length -1" >{{$t(`menus.${item.name}`)}}</span>
            <span class="redirect" v-else @click="router.push(item.path)">{{$t(`menus.${item.name}`)}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
//从路由上面取
import { useRoute,useRouter } from 'vue-router';
import { watch,ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute();
const router = useRouter();
let breadcrumbList = ref([]);

//reactive响应式数据赋值丢失响应式
const initBreadcrumb = ()=>{
    breadcrumbList.value=route.matched;
    
}

watch(route,()=>{
    initBreadcrumb();
    console.log(route.matched);
},{deep:true,immediate:true})


</script>

<style scoped lang='scss'>
    .no-redirect{
        cursor: text;
    }
    .redirect{
        cursor: pointer;
        font-weight: 600;
        &:hover{
            color: rgb(0, 0, 0);
        }
    }
</style>