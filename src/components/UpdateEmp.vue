<template >
  <div class="add">
    <h1 style="color:grey">修改员工信息</h1>
    <el-form :model="numberValidateForm" :rules="rules" ref="numberValidateForm" label-width="50px" class="demo-ruleForm">
    <el-form-item label="ID" prop="id">
      {{numberValidateForm.id}}
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="numberValidateForm.name"></el-input>
    </el-form-item>
    <el-form-item label="工资" prop="salary">
      <el-input v-model="numberValidateForm.salary"></el-input>
    </el-form-item>
    <el-form-item label="年龄"  prop="age" >
    <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    <el-button @click="comeback()">返回</el-button>
  </el-form-item>
</el-form>
  </div>
  
</template>
<script>
export default {
  data() {
      return {
        numberValidateForm: {
          id:'31232-31243-4214',
          name:'',
          salary:'',
          age: ''
        },
        rules: {
        age: [
          { message: '年龄不能为空'},
        ],
        name: [
          {  message: '请输入您的用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        salary: [
          { message: '请输入您的工资', trigger: 'blur' }
        ]
      },


      };
    },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$message({
            type: 'success',
            message: '修改成功',
            });
            this.$router.push('show');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      comeback() {
        this.$router.push('show');
      }
    }
  }

</script>
<style scoped>
  .add {
  width: 400px;
  margin: 0 auto;
}
</style>