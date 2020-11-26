<template>
  <div class="box">
  <div class="text">
      <h1 class="name">Hi~&nbsp;{{username}}</h1>
      <h1>欢迎来到员工信息管理系统</h1>
      <h2>开发团队</h2>
      <ul>
        <li><span>组长：魏晓葵</span><span>副组长：肖宇恒</span></li>
        <li><h3>组员：王泽鑫、伍烽华、戚惠敏、莫世有、蔡嘉妍、邱世豪、谢浩荣</h3></li>
      </ul>
    </div>
    <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222836070&di=764228bd30c6f3e058f7457bc36c9b2e&imgtype=0&src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F16%2F12%2F21%2F4c7587c2fb82a4e7e1068ed5f3a8df35.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" alt=""> -->
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:sessionStorage.getItem("username")
    }
  }
}
</script>

<style>

.box{
  margin: 0 auto;
    height: 100%;
    /* width: 1100px; */
    background-color: #f6f6f6;
    padding-top: 100px;
    background: url(../../assets/11.jpg);
  
}
.name{
  font-size: 30px;
}
.text{
  /*float: left;*/
  margin: 0px auto;
  padding-top: 50px;
  font-size: 20px;
  text-align: center;
  color: #d4dae8;
  width: 600px;
}
.text h1{
  height: 40px;
}
.text h2{
  margin-top: 50px;
  height: 40px;
}
.text ul li{
  height: 40px;
}
.text ul li span{
  margin-right: 20px;
}

</style>
