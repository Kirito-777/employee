<template>
    <header>
        <div class="l-content">
            <el-button plain :icon="icon" size="mini" @click="collapseMenu" class="con"></el-button>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <!--首页 一定是存在的 -->
                <el-breadcrumb-item >首页</el-breadcrumb-item>
                 <div class="headLogo_username">
                    <el-avatar  class="head_logo"></el-avatar>
                    <b class="username">用户名：{{username}}</b>
                </div>
                <!--第二级菜单名称 就要看左侧组件有没有点击指定菜单，没有那就只显示首页 点击就显示当前菜单名称-->
                <el-breadcrumb-item :to="current.path" v-if="current" >               
                    {{current.label}}
                </el-breadcrumb-item>               
            </el-breadcrumb>
        </div>
        <div class="cen">员工管理系统</div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <!-- <span class="el-dropdown-link username">{{this.$global.username}}</span> -->
                <span class="el-dropdown-link space" @click="logOut">退出</span>            
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item @click.native="goPersonal(menu)">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        data(){
            return{
                a:1,
                icon:'el-icon-arrow-left',
                username:sessionStorage.getItem("username"),
        }
        },
        computed: {
            ...mapState({
                current: state => state.tab.currentMenu
            })
        },
        methods: {
            //控制左侧菜单是否折叠
            collapseMenu() {
                sessionStorage.setItem("con1",this.a)                
                this.$store.commit('collapseMenu')
                if(sessionStorage.getItem("con1")%2==0){
                    this.icon='el-icon-arrow-left'
                    this.a+=1
                }else{
                    this.icon='el-icon-arrow-right'
                    this.a+=1
                }              
            },
            //退出登陆
            logOut() {
                this.$confirm("此操作将退出员工管理系统, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    sessionStorage.removeItem("username")
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$message({
                    type: "info",
                    message: "已取消退出",
                    });
                 });
                
                // window.location.reload();
            },
        }
    }
</script>

<style lang="scss" scoped>
    header {
        //position: relative;
        //text-align: center;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }
    .con{
        background-color:white;
        
    }
    .cen{
        //position: absolute;
        //left: 570px;
        //margin-left:100px;
        width: 300px;
        color: white;
        font-size: 30px;
    }
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    
</style>

<style lang="scss">
    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            color: #666666;
            font-weight: normal;
        }
        &:last-child {
            .el-breadcrumb__inner {
                color: #ffffff;
            }
        }
    }
    .el-dropdown-link{
        color: white;
    }
    .el-dropdown-link:hover {
        cursor: pointer;
    }
    .headLogo_username {
        position:absolute;
        right:100px;
        top:0px;
        width:200px;
        height:60px;
       
    }
    .head_logo {
        position:absolute;
        right:160px;
        top:8px;
        background-image: url("../assets/root.jpg");
        background-size: 100% auto;
    }

    .r-content .space {
        display:inline-block;
        margin:0 5px;
        border:1px solid #fff;
        padding:5px;
        border-radius:2px;
    }
    .username {
        position:absolute;
        left:50px;
        bottom:45%;
        padding-top: 10px;
        color:#fff;
    }
</style>