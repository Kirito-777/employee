<template>   
   <div class="login"> 
      <vue-particles
        id="particles-js"    	
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="8"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"          
      >
    </vue-particles>   
    <el-tabs class="form">
      <h1 class="lin">员工管理系统/登录</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >       
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="registerForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tabs>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  // beforeCreate:function(){
  //   window.reload();
  // },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");

        // }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          { min: 3, max: 40, message: "长度在 3 到 40 个字符", trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" },
          { min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur' }
        ],

      },
    };
  },
  methods: {
    // mounted() {
    //   window.reload()
    // },
    activated(){},
    //注册
    registerForm() {
      this.$router.push("register");
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 从后端获取用户数据对比是否登录成功;
          axios({
            method: "post",
            url: "http://192.168.1.20:8080/staffManage/getlogin",
            data:{
              "username":this.ruleForm.username,
              "password":this.ruleForm.password,
            }
          }).then((res) => {
            // console.log(res.data.data.User.username);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              sessionStorage.setItem("username",res.data.data.User.username)
              sessionStorage.setItem("realname",res.data.data.User.realname)
              sessionStorage.setItem("password",res.data.data.User.password)
              sessionStorage.setItem("sex",res.data.data.User.sex)
              // console.log(sessionStorage.getItem("sex"));
              // console.log(trueFlase)
              if(res.data.data.User.username == 'root'){
                sessionStorage.setItem("trueFalse",true)
              }else{
                sessionStorage.setItem("trueFalse",false)
              }
              console.log(typeof(sessionStorage.getItem("trueFalse")))
              this.$router.push("Main");
            } else {
              console.log(res.data);
              this.$message({
                type:"warning",
                message: "登录失败，用户名或者密码输入错误",
              });
            }
          });
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {},
};
</script>
<style >
.login {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
#particles-js{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color:#151321;     
 }

.form{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
 /* margin-top: 180px;
  margin-left: 450px;*/
  background-color: #303642;
 /* opacity: 0.8;*/
  border-radius: 30px;
  box-shadow:0px 0px 85px #303642;
  width: 600px;
  padding: 50px 50px;
}
.form label {
  color:#fff;
  font-size:20px;
}
.el-tabs__content {
  height:225px;
}
.form .el-form-item is-required {
  position:relative;
  
}

/*el-form-item__content*/
.form .el-button--primary {
  color:#2a222fd9;
  background-color: #fff;
  border-color:#fff;
  font-size:20px;
  font-weight:700;
  position:absolute;
  left:50%;
  margin-left:-150px;
  height:40px;
}
.form .el-button--default {
  color:#fff;
  background-color: #2a222fd9;
  border-color:#fff;
  position:absolute;
  right:50%;
  margin-right:-50px;
}
.lin{
  position:relative;
  left:50%;
  transform: translate(-50%);
  font-size: 30px;
  color:#fff;
  /*color: grey;*/
  margin-bottom: 30px;
  text-align: center;
}
.el-tabs__item {
  text-align: center;
  width: 60px;
}
</style>
