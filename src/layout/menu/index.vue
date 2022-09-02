<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        :default-active="defaultActive" text-color="#fff" router :unique-opened="true" :collapse ="!app.siderType" >
        <el-sub-menu :index="item.id + '0'" v-for="(item, index) in menusList" :key="item.id">
            <template #title>
                <el-icon>
                    <component :is="iconList[index]"></component>
                </el-icon>
                <span>{{  $t(`menu_list.${item.path}`)  }}</span>
            </template>
            <el-menu-item :index="'/' + it.path" v-for="it in item.children" :key="it.id" >
                <template #title>
                    <el-icon>
                        <component :is="icon"></component>
                    </el-icon>
                    <span>{{  $t(`menus.${it.path}`)  }}</span>
                </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang='ts'>
import { menuList } from '@/api/menu'
import { reactive, ref,watch } from 'vue';
import { useRoute } from 'vue-router';
import useStore from '@/stores/index'
const {app} = useStore();
const route = useRoute();


const iconList = reactive(['user', 'setting', 'shop', 'tickets', 'pie-chart']);
const icon = ref('menu');
const menusList = reactive([]);

const defaultActive = ref(route.matched[1].path);
const initMenuList = async () => {
    //menusList = await menuList
    //直接赋值，是行不通的
    menusList.push(...await menuList())
}
initMenuList();
watch(route,()=>{
    
    defaultActive.value = route.matched[route.matched.length - 1].path || null;
    console.log(defaultActive.value);
},{deep:true})


</script>

<style scoped lang='scss'>
</style>