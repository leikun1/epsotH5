<template>
<div>
  <header>
      <div class="header">
          <h1>专家</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!--更多专家列表-->
  <div class="contact-search">
    <i class="ba-color0 icon-search"></i>
    <input id="searchData" type="search" placeholder="搜索专家" v-model="searchkey"  v-on:keyup="searchData">
  </div>
  <div class="m-Mien expert-list">
    <ul id="professorList" v-for="professor in professorList">
      <li><a :href="professor.callPhone" class="cl">
          <img :src="professor.picUrl">
      		<div class="mienIntro">
      			<span class="userPhone"> <i class="icon-phone"></i> </span>
      			<h1>{{professor.empName}}</h1>
      			<p>{{professor.empPhone}}</p>
      			<p>{{professor.empEmail}}</p>
      		</div></a>
      </li>
    </ul>
  </div>
  <!--更多专家列表end-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'

  export default{
    name: 'Professor',
    components: {
    },
    data(){
      return{
        searchkey:"",
        professorList:[]
      }
    },
    created () {
       this.queryProfessors();
       sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      searchData: function(){
        this.queryProfessors();
      },
      queryProfessors: function(){
        var queryProfessors = this.queryProfessors;
        this.professorList = [];
        var professorList = this.professorList;
        var empName = this.searchkey;
        var params = {
      		"empName":empName,
      		"ptName":"",
      		"beginNum":"1",
      		"queryNum":"20"
      	};
        var loading = layer.open({type: 2});
      	$.post(GLOBALURL.DO_QUERY_EXPERT_LIST_NO_DETAIL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result){
      				for(var i=0;i<result.length;i++){
                var datas = {};
      					var picUrl = result[i].employeeInfo.employeeinfoprofileimageurl;
      					var empName = result[i].employeeInfo.employeeinfoname;
      					var empPhone = result[i].employeeInfo.employeeinfophonenumber;
      					var empEmail = result[i].employeeInfo.employeeinfoemail;
      					var callPhone = "tel:"+empPhone;
                datas.picUrl = picUrl;
                datas.empName = empName;
                datas.empPhone = empPhone;
                datas.empEmail = empEmail;
                datas.callPhone = callPhone;
                professorList.push(datas);
      				}
      			}
      		}else if(data.statusCode == - 999){
      			//initLoginStatus(initProfessor());
      		}else{
      			 layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      }
    }
}
</script>
<style>
.userPhone{
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  background-color: #06C1AE;
  border-radius: 50%;
  text-align: center;
  z-index: 9;
  float:right;
  color:#fff;
}
</style>
