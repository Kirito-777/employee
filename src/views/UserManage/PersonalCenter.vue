<template>
    <div class="container">
        <header>
            <p>欢迎进入个人中心</p>
             
        </header>
        <main>
            <div class="cicle">
                <!-- 头像 -->
                <div class="img_position">
                        <span class="changePwd" @click="showF">-&nbsp;-&nbsp;修改密码&nbsp;-&nbsp;-</span>
                    </div>
                    <div class="content">
                        <ul class="per_ul">
                        <li>
                            <span class="space  "></span>
                            用户名：{{username}}
                        </li>
                        <li>
                            <span class="space"></span>
                            真实姓名：{{realname}}
                        </li>
                        <li>
                            <span class="space"></span>
                            性别：{{sex}}
                        </li>
                       
                    </ul>
                    </div>
            </div>
            <!-- <table class="per_table">
            <tr>
                    <td class="spaceTd"></td>
                </tr>
            <tr>
                <td>
                    <div class="img_position">
                        <img :src=src alt="我是头像" class="img_size">
                        <span class="changePwd" @click="showF">-&nbsp;-&nbsp;修改密码&nbsp;-&nbsp;-</span>
                    </div>
                   
                </td>
                
                </tr>
                <tr>
                    <td>
                    <ul class="per_ul">
                        <li>用户名：{{username}}</li>
                        <li>真实姓名：{{realname}}</li>
                        <li>性别：{{sex}}</li>
                       
                    </ul>
                </td>
                
                </tr>
                <tr>
                    <td class="spaceTd"></td>
                </tr>
            </table> -->
            <form action="#" v-if="showForm" class="form">
               
                <span>- - -请输入您的新旧密码- - -</span><br>
                <div class="form_p">
                    原密码：<input type="password" name="oldPWD" v-model="userGet.inputpassword" @blur="disabledCheck" ><br>
                    新密码：<input type="password" name="newPWD" v-model="userGet.inpuTNewpassword"><br>
                    <input type="submit" @click="goChange"  :disabled="checkBtn" class="btn btnCheck">
                    <input type="button" value="取消" @click="turnFalse" class="btn btnNo">
                </div>
                <span class="span_bottom">温馨提示：输入正确的原密码，才能点击“提交”按钮，否"提交"按钮会被隐藏</span>
            </form>
        </main>
        
    

       
    </div>
</template>

<script>
    // config分页数据，这里面至少包括当前页码 总数量
    export default {
        data() {
            return {
                username:sessionStorage.getItem("username"),
                password:sessionStorage.getItem("password"),
                realname:sessionStorage.getItem("realname"),
                sex:sessionStorage.getItem("sex"),
                // token:sessionStorage.getItem("token"),
                // serverSrc:sessionStorage.getItem("serverSrc"),
                // hasEnter:sessionStorage.getItem("hasEnter"),
                // src: '../assets/user.png',
                showForm:false,
                checkBtn:true,
                // editIN:true,
                // tip:"修改",
                userGet:{
                    inputUsername:"",
                    inputPassword:"",
                    inpuTNewpassword:""
                },
                UserPost:{
                    username:"",
                    password:""
                },
                ruleInputForm:{
                    agerule:"",
                    // phonerule:"",
                },
                ruleInput: {
                    agerule: [
                    { required: true, message: '请输入您的年龄', trigger: 'blur' },
                    { min: 1, max: 3, message: '长度在 1 到 3 个字符' }
                    ],
                    // phonerule: [
                    // { required: true, message: '请输入您的联系方式', trigger: 'blur' },
                    // { min: 11, max: 11, message: '长度为 11 个字符'}
                    // ],
                },
                
            }
        },
        methods:{
            //表单显示
            showF(){
                this.showForm = true;
                this.username = sessionStorage.getItem("username");
                this.password = sessionStorage.getItem("password");
                this.userGet.inputUsername = this.username;
                // console.log(this.userGet.inputUsername);
                this.UserPost.username = this.username;
                // console.log(this.username);
                // console.log(this.password);
                
            },
            //表单隐藏
            turnFalse(){
                this.showForm = false;
            },
            //禁止表单提交
            disabledCheck(){
                //如果用户输入的原密码与登陆的密码不一致，不给提交
                if(this.password != this.userGet.inputpassword){
                    this.checkBtn = true;
                    // alert("您输入的原密码与登陆密码不符...");
                    this.$message({
                        type:"error",
                        message: "您输入的原密码与登陆密码不符...",
                    });
                    this.userGet.inputpassword = "";
                    this.userGet.inpuTNewpassword = "";
                }else{
                    this.checkBtn = false;
                }
                
            },
            //提交表单
            goChange(){
                console.log(this.sex);
                //点击确定按钮，表单隐藏
                this.showForm = false;
                //给待传输数据赋值
                this.UserPost.password = this.userGet.inpuTNewpassword;
                
                //发送到接口
                if(1){
                    this.$http.post('http://192.168.1.20:8080/staffManage/updatepwd', this.UserPost).then(res => {
                        console.log(res.data)
                        this.isShow = false
                        if(res.data.code == 200){ //代表添加成功
                            this.$message({
                            type: "success",
                            message: "修改成功！",             
                            });
                        }else{
                            this.$message({
                            type: "warning",
                            message: "修改失败,修改密码和原密码相同",             
                            });
                        }                      
                        
                    })
                }
                // 清空表单内容
                sessionStorage.setItem("password",this.userGet.inpuTNewpassword);
                this.userGet.inputUsername = "";
                this.userGet.inputpassword = "";
                this.userGet.inpuTNewpassword = "";
            },
            // editImput(){
                
            //     if(this.tip=="修改"){
            //         this.editIN = false;
            //         this.tip = "确定修改";
            //     }else{
                    
            //         this.tip="修改";
            //         this.editIN = true;
            //     }
            // },
            //只能输入数字
            // onlyNumber(e){
            //     e.target.value = e.target.value.replace(/[^\d]/g,"");
            // },
        }
        
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/common';
    //最外层容器
    .container{
        width:100%;
        height:100%;
        box-sizing: border-box;
        background-color: #e5eef3c9;

        font-size:20px;
        padding:10px;
        position:relative;
    }
    //欢迎进入个人中心
    .container header{
        margin: 2% auto;
    }
    .container header p {
        font-size:30px;
        text-align: center;
        font-weight: 700;;
        padding:20px 10px;
    }
   
    .img_position {
        text-align:center;
        
    }
    //修改密码
    .changePwd {
        font-size:14px;
        position:absolute;
        top:150px;
        right:-80px;
        color:blue;
        
    }
    .changePwd:hover {
        cursor: pointer;
    }


    .per_ul {
        position:relative;
        left:50%;
        transform: translate(-50%);
        display:inline-block;
      
    }
    .per_ul li {
        border-bottom:1px dashed #777;
        padding:5px;
        width:200px;
        
       
    }
    .per_ul li input{
        border:0;
        padding-left:20px;
        font-size:16px;
        color:#000;
         width:120px;
    }


    //点击修改密码出现的弹框表单
    .form {
        position: relative;
        left:50%;
        top:50px;
        
        transform: translate(-50%);
        color:#fff;
        background-color: #303642;
        border-radius: 30px;
        box-shadow:0px 0px 85px #303642;
        width: 600px;
        padding: 50px 50px;
        height:350px;
    }
    .form span {
        color:#ccc;
        position:absolute;
        left:50%;
        transform: translate(-50%);
        padding:10px;
    }
    .form .span_bottom {
        left:50%;
        bottom:3px;
        transform: translate(-50%);
        font-size:14px;
        width:100%;
        text-align: center;
    }
    .form .form_p {
        width:400px;
        position: absolute;
        top:30%;
        left:50%;
        transform: translate(-50%);
    }
    .form input {
        height:30px;
        width:300px;
        margin:17px 0;
        
        
    }   
    .form input.btn {
        position:absolute;
        font-weight:700;
        width:60px;
        height:40px;
        margin:10px;
    } 
    .form input.btnCheck {
        left:30%;
    }
    .form input.btnNo {
        right:30%;
    }
    .btn:hover {
        background-color:cadetblue;
        color:#fff;
    }
    //光圈
    .cicle {
        width: 450px;
        height: 450px;
        border-radius:50%;
        position:absolute;
        left:50%;
        box-shadow: 0px 0px 15px #666;
        transform: translate(-50%);
        background-color:white;
        background-image: linear-gradient(to bottom right , #899ea7, #fff);

    }
    /*头像*/
    .img_position {
        margin:50px;
        width: 150px;
        height: 150px;
        background-image: url("../../assets/root.jpg");
        background-size:  auto 100%;
        background-color:pink;
        border-radius: 50%;
        position: relative;
        left:50%;
        transform: translate(-80%);

    }
    /*内容*/
    .content {   
        position:absolute;
        left:50%;
        transform: translate(-50%);
        margin:0 auto;
        text-align: center;
        
    }
    .space {
        display: inline-block;
        padding-top: 25px;
        // width:50px;
        // height:40px;
        // text-align: center;
    }
</style>