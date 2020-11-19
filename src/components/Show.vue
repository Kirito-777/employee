<template>
  <div class="show">
    <h1>员工信息管理界面</h1>
    <el-table
    :data="tableData"
    class="table"
    border
    style="width: 63.6%"
    max-height="250">
    <el-table-column
      prop="date"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="工资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="年龄"
      width="120">
    </el-table-column>
    
    <el-table-column
     
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除信息
        </el-button>
        <el-button type="text" size="small" @click="updateemp()">修改信息</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px ">
    <el-button @click="addemp()">增加员工信息</el-button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }]
    }
  },
  methods: {
     addemp(){
       this.$router.push('addemp');
     },
     updateemp(){
       this.$router.push('updateemp');
     },
     deleteRow(index, rows) {
        rows.splice(index, 1);
      }
  },

}
</script>
 

<style scoped>
   .table{
    margin-left: 200px;
  }
  
  
  
  

</style>