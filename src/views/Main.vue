<template>
    <el-container style="height: 100%">
        <!--左侧栏-->
        <el-aside width="auto">
            <!--左侧栏控件-->
            <common-aside></common-aside>
        </el-aside>
        <!--右侧栏-->
        <el-container>
            <!--header部分-->
            <el-header>
                <!--header部分控件-->
                <common-header></common-header>
            </el-header>
            <!--加入CommonTab-->
            <!-- <common-tab></common-tab> -->
            <el-main>
                <!--左侧栏 和 header部分对于整个后台部分都是不变的，唯一变的就是上面3的部分，这里就通过router-view来展示所需控件-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    
    import CommonAside from '../components/CommonAside'
    import CommonHeader from "../components/CommonHeader"
    // import CommonTab from '../components/CommonTab';
    
    export default {
        data(){
            return{
                // name:this.$global.username
            }
        },
        components: {
            CommonAside,
            CommonHeader,
            // CommonTab
        },
        beforeCreate:function(){
            // this.$global.username=window.localStorage.getItem(username);
            if (sessionStorage.getItem("username")==null) {
                this.$message({
                    type: "error",
                    message: "未登录，不能直接访问员工管理系统主页！",             
                });
                this.$router.push('/')
            }else{
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-header {
        background-color: #333;
    }
    .el-main {
        padding: 0px !important;
    }
</style>