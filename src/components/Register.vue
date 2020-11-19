<template>
  <div class="register">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item>
      <h1 style="color:grey">登录界面</h1>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="pass">
      <el-input type="password" v-model="ruleForm.pass"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
       <el-radio v-model="radio" label="1" value="男" name="sex">男</el-radio>
       <el-radio v-model="radio" label="2" value="女" name="sex">女</el-radio>
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      radio: '1',
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        
      }
    };
  },
  methods: {
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '注册成功',
          });
          this.$router.push('login');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
  }
}
</script>
<style >
  .register{
    width: 400px;
    margin: 0 auto;
  }
  .btn{
    align-items: center;
  }
</style>
