<template>
    <div>
        <div class="pagepath">

        </div>
        <el-breadcrumb separator="/" style="padding:10px;border:1px solid #ddd;background:#fff;margin-bottom:1px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">活动管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs type="border-card">
            <el-tab-pane label="商品管理">
                商品管理
                <!-- <v-searchinput></v-searchinput> -->
            </el-tab-pane>
            <el-tab-pane label="仓库管理">仓库管理</el-tab-pane>
            <el-tab-pane label="店铺管理">店铺管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>

</style>

<script>
import vSearchinput from '../searchinput/searchinput.vue';
export default {
    name: 'tabpage',
    components: {
        vSearchinput
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
