<template>
  <div class="login">
    <el-tabs>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <h1 style="color:grey">登录界面</h1>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
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
import register from '@/components/Register'
 
export default {
     data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },

    };
  },
  methods: {
    
    //注册
    registerForm() {
      this.$router.push('register');
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '登录成功'
          });
          this.$router.push('show');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  components: {
    
  }
}
</script>
<style >
.login {
  width: 400px;
  margin: 0 auto;
}
.head{
  text-align: center;
  font-size: 30px;
  color: grey;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-tabs__item {
  text-align: center;
  width: 60px;
}
</style>