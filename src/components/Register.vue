<template>
  <div class="register">
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
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="dns"
    >
     <h1 class="re">员工管理系统/注册</h1>
      <el-form-item label="用户名" prop="username">
        <!-- <el-input v-model="ruleForm.username"></el-input> -->
        <el-input v-model="ruleForm.username"  @keyup.native="onlyChianeseEn1"  @blur="check('ruleForm.username')" minlength="3" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm.realname"  @keyup.native="onlyChianeseEn" minlength="1" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"   minlength="3" maxlength="60"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="ruleForm.sex" label="男" value="男" name="sex">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="女" value="女" name="sex">女</el-radio>
      </el-form-item>
    
      <el-form-item label="验证码" prop="code">
          <el-row :span="24">
            
            <el-col :span="12">
              <div class="checkCode" @click="createCode()" >{{checkCode}}</div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="ruleForm.code"  placeholder="认证码不区分大小写"></el-input>
            </el-col>
          </el-row>
      </el-form-item>

      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {

  beforeCreate(){
    this.checkCode();
  },

  data() {
    return {
      checkCode:"",
      radio: "",
      ruleForm: {
        username: "",
        realname: "",
        password: "",
        sex:"男",
        code:""
      },
      rules: {
        username: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 60, message: '长度在 3 到 60 个字符' }
        ],
        // sex: [
        //   { required: true },
        // ],
        code: [
          { required: true, message: '请输入认证码', trigger: 'blur' },
        ],
      },
    };
  },

  mounted(){
    this.createCode()
  },

  methods: {
    check(username){
      axios({
            method: "post",          
            url:"http://192.168.1.20:8080/staffManage/userexist?username="+this.ruleForm.username,
          }).then((res) =>{
            // console.log(res)
            // console.log(res.data.code)
            if(res.data.code == 200){ //100代表不存在，200代表存在
              this.$message({
              type: "warning",
              message: "改用户名已存在,请修改用户名！",             
              });
            }
          });
    },

    createCode() {
		let code1 = '';
		let codeLength = 4; //验证码的长度  
		let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
			's', 't', 'u', 'v', 'w', 'x', 'y', 'z'); //随机数  
		for(let i = 0; i < codeLength; i++) { //循环操作  
			let index = Math.floor(Math.random() * 62); //取得随机数的索引（0~62）  
			code1 += random[index]; //根据索引取得随机数加到code上  
		}
		this.checkCode = code1; //把code值赋给验证码  
	  },

    //返回
    back() {
      this.$router.push("login");
    },

    //限制输入特殊字符和数字
    onlyChianeseEn(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0123456789]/g,
        ""
      );
    },

    //限制输入特殊字符
    onlyChianeseEn1(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },

    //只能输入数字和小数点
    onlyNum(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    },

    submitForm(formName) { 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm);
          if( (this.ruleForm.code != this.checkCode.toLowerCase())) {
         this.$message({
              message: "验证码错误",
              type: "warning"
        });
        this.createCode();
        return false;
      };
          //将注册数据传给后台
          axios({
            method: "post",
            // url: "http://192.168.1.20:8080/staffManage/getemps?page=1",
            url:"http://192.168.1.20:8080/staffManage/getRegister",
            data:{
              "username":this.ruleForm.username,
              "realname":this.ruleForm.realname,
              "password":this.ruleForm.password,
              "sex":this.ruleForm.sex,
            }

          }).then((res) => {
            // console.log(res);

            //注册成功后传回数据
            if(res.data == 1){
              this.$message({
              type: "success",
              message: "注册成功",
              
              });
              this.$router.push("login");
            }else{
              this.$message({
                type: "error",
                message: "注册失败,该用户已存在",
              });
              createCode()
            }
            
          });
        } else {
          createCode()
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style >
  .register {
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

.dns{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: #303642;
 /* opacity: 0.8;*/
  border-radius: 30px;
 
  box-shadow:0px 0px 85px #303642;
  width: 600px;
  padding: 50px 50px;
}
.re{
  font-size: 30px;
  margin-left: 60px;
  color: white;
  margin-bottom: 30px;
}
.checkCode{
    font-size: 15px;
    text-align: center;
    margin-left: 60px;
    width: 70px;
    height: 40px;
    background-color: white;
    border-radius: 3px;
  }
.dns label {
  color:#fff;
  font-size:18px;
}
.dns .el-button--primary {
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
.dns .el-button--default {
  color:#fff;
  background-color: #2a222fd9;
  border-color:#fff;
  position:absolute;
  right:50%;
  margin-right:-50px;
}
</style>
