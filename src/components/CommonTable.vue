<template>
    <div class="common-table">
        <!--stripe	是否为斑马纹  v-loading在请求数据未返回的时间有个加载的图案,提高用户体验-->
        <el-table :data="tableData" height="100%" stripe v-loading="config.loading">
            <!--第一行为序号 默认写死-->
            <el-table-column label="序号" width="85">
                <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ (config.page - 1) * 8 + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <!--show-overflow-tooltip 当内容过长被隐藏时显示 tooltip-->
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
                <!--其实可以在上面:prop="item.prop"就可以显示表单数据 这里设置插槽的方式话更加灵活 我们可以写样式-->
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button size="min" @click="handleEdit(scope.row)" :disabled="trueOrFalse">编辑</el-button>
                    <el-button size="min" type="danger" @click="handleDelete(scope.row)" :disabled="trueOrFalse">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="8"></el-pagination>
        <!-- <el-button type="primary" v-show="isBack" style="margin-left:10% ; margin-top : 15px " @click="back">返回</el-button> -->
    </div>
</template>

<script>
    // config分页数据，这里面至少包括当前页码 
    export default {
        props: {
            tableData: Array,
            tableLabel: Array,
            config: Object,
            isBack: Boolean
        },
         data() {
            return{
                trueOrFalse: sessionStorage.getItem("trueFalse") == "false"
            }
        },
        methods: {
            //更新
            handleEdit(row) {
                this.$emit('edit', row)
            },
            //删除
            handleDelete(row) {
                this.$emit('del', row)
            },
            //分页
            changePage(page) {
                this.$emit('changePage', page)
            },
            back(){
                this.$emit('back')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .common-table {
        height: calc(100% - 65px);
        position: relative;
        .pager {
            margin-top: 20px;
            position: absolute;
            left: 50%;
            margin-left: -180px;
        }
    }
    .el-table{
        height: 92.5% !important;
    }
</style>