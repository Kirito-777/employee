<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
      :destroy-on-close="true"
      :show-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="cancelUser"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUser()">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser" :disabled="trueOrFalse"
        >+ 新增</el-button
      >
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button
          type="primary"
          style="width: auto"
          @click="
            change();query(searchFrom.keyword,page)
          "
          >搜索</el-button
        >
      </common-form>
    </div>
    <!--依次是: 表格数据 表格标签数据 分页数据  列表方法 更新方法 删除方法-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      :isBack="isBack"
      @changePage="query(searchFrom.keyword)"
      @edit="editUser"
      @del="delUser"
      @back="backUser"
    ></common-table>
  </div>
</template>

<script>
import Axios from "axios";
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      page:1,
      operateType: "add",
      isShow: false,
      isBack: false,
      tableData: [],
      trueOrFalse: sessionStorage.getItem("trueFalse") == "false",
      tableLabel: [
        {
          prop: "id",
          label: "员工号",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "dname",
          label: "部门名称",
          width: 200,
        },
        {
          prop: "manage",
          label: "部门主管",
          width: 200,
        },
        {
          prop: "salary",
          label: "薪水",
          width: 200,
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
      operateForm: {
        name: "",
        age: "",
        sex: "",
        did: "",
        ename: "",
        salary: "",
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "did",
          label: "部门名称",
          type: "select",
          opts: [
            {
              label: "研发部",
              value: 1,
            },
            {
              label: "测试部",
              value: 2,
            },
            {
              label: "运营部",
              value: 3,
            },
          ],
        },

        {
          model: "salary",
          label: "薪水",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
        userId: "",
        userName: "",
        userAge: "",
        userSalary: "",
      },
      formLabel: [
        {
          model: "userId",
          label: "员工号",
          type: "input",
        },
        {
          model: "userName",
          label: "姓名",
          type: "input",
        },
        {
          model: "userAge",
          label: "年龄",
          type: "input",
        },
        {
          model: "keyword",
          label: "部门名称",
          type: "input",
        },
        {
          model: "userSalary",
          label: "薪水",
          type: "input",
        },
      ],
    };
  },
  methods: {
    change()  {
      sessionStorage.setItem("queryTrueOrFalse",true)
    },
    getList() {
      console.log(this.config.page);
      this.config.loading = true; // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      // name ? (this.config.page = 1) : "";
      Axios({
        method: "post",
        url: "http://192.168.1.20:8080/staffManage/getemps?page="+this.config.page,
        data: {
          id: '',
          name: '',
          salary: '',
          age: '',
          dept: {
            dname: '',
          },
        },
      }).then((res) => {
        this.tableData = res.data.data.employee.list.map((item) => {
          if (item.dept) {
            item.dname = item.dept.dname;
            item.manage = item.dept.manage;
          }
          return item;
        });
        this.config.total = res.data.data.employee.total;
        this.config.loading = false;
      });
    },
    query(keyword,page) {
      console.log("queryTrueOrFalse="+sessionStorage.getItem("queryTrueOrFalse")=="true")
      if(sessionStorage.getItem("queryTrueOrFalse")=="false"){this.getList()}
      else{
      console.log(this.searchFrom);
      console.log(page==1?page:this.config.page)
      this.config.page = page==1?page:this.config.page
      console.log(this.config.page)
      Axios({
        method: "post",
        url:
          "http://192.168.1.20:8080/staffManage/getemps?page=" + this.config.page,
        data: {
          id: this.searchFrom.userId,
          name: this.searchFrom.userName,
          salary: this.searchFrom.userSalary,
          age: this.searchFrom.userAge,
          dept: {
            dname: this.searchFrom.keyword,
          },
        },
        // + "&name=" + keyword
      }).then((res) => {
        console.log(res.data);
        // this.tableData = res.data.data.employee
        if (res.data.code == 200) {
          this.tableData = res.data.data.employee.list.map((item) => {
            if (item.dept) {
              item.dname = item.dept.dname;
              item.manage = item.dept.manage;
            }
            return item;
          });
        } else {
          this.$message({
            type: "warning",
            message: "不存在该员工，搜索失败~",
          });
        }
        this.config.total = res.data.data.employee.total;
        this.config.loading = false;
        this.isBack = true;
      });}
    },
    addUser() {
      this.operateForm = {};
      this.operateType = "add";
      this.isShow = true;
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    cancelUser() {
      this.isShow = false;
      this.operateForm="";
      this.query();
    },
    backUser() {
      this.searchFrom.keyword = "";
      this.isBack = false;
      this.getList();
    },
    confirm() {
      if (this.operateType === "edit") {
        console.log("--------------" + this.operateForm);
        this.$http
          .post(
            "http://192.168.1.20:8080/staffManage/updateemp",
            this.operateForm
          )
          .then((res) => {
            console.log(res.data);
            this.isShow = false;
            if (res.data.code == 200) {
              //代表添加成功
              this.$message({
                type: "success",
                message: "修改成功！",
              });
            } else {
              this.$message({
                type: "warning",
                message: "修改失败,"+res.data.data.employee+"!",
              });
            }
            this.query();
          });
      } else {
        this.$http
          .post("http://192.168.1.20:8080/staffManage/addemp", this.operateForm)
          .then((res) => {
            console.log(res.data);
            this.isShow = false;
            if (res.data.code == 200) {
              //代表添加成功
              this.$message({
                type: "success",
                message: "添加成功！",
              });
            } else {
              this.$message({
                type: "warning",
                message: "添加失败,"+res.data.data.employee+"!",
              });
            }
            this.query();
          });
      }
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = row.id;
          console.log(typeof id);
          this.$http
            .post("http://192.168.1.20:8080/staffManage/deleteemp?id=" + id, {
              // params: {
              // id
              // }
            })
            .then((res) => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.query();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getList();
  },
  beforeCreate(){
    sessionStorage.setItem("queryTrueOrFalse",false)
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
