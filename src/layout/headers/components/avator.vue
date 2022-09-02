<template>
    <div id="avatar">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

</template>

<script setup lang='ts'>
import useStore from '@/stores/index';
const { app } = useStore();

const logout =()=>{
    app.logout()
}
</script>

<style scoped lang='scss'>
</style>