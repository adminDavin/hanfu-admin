<template>

<div style="display: flex;justify-content: center;height: 100%;" class="pic">

  <div style="margin-top: 12%;

    background: rgb(255, 255, 255);
    width: 451px;
    height: 425px;
    margin-left: 28%;
    border-radius: 10px;

">
    <div style="font-size: 24px;text-align: center;margin-top: 25px;">投票系统后台登录</div>
    <div style="display: flex;justify-content: center;">
      <div class="deng" style="margin-bottom: 10px;margin-top: 13%;">

        <input type="text" v-model="phone" placeholder="请输入手机号" style="height: 100%;outline: none;border: none;">
      </div>
    </div>

     <div style="color: red;font-size: 12px;    margin-left: 66px;">{{txt}}</div>

<div style="display: flex;justify-content: center;">
  <div class="deng1">
    <input type="text" v-model="code1"  style="width: 50%;height: 100%;outline: none;border: none;" placeholder="请输入验证码">
    <span @click="node" v-if="!show" style="color:#3A4BF8;font-size: 16px;">发送验证码</span>
    <span style="margin-left: 10px;color:red;font-size: 16px;" v-if="show" >{{time}}s后重新发送</span>

  </div>
</div>

        <div style="margin-left: 66px;color: red;font-size: 12px;margin-top: 3px;">{{txt1}}</div>
        <!-- <div style="margin-left: 10px;" > </div> -->

      <div @click="gologin" style="color:#fff;align-items: center; display: flex;justify-content: center;background:  #0C9CEC;
       width:320px;height:40px;border-radius: 10px;margin: 0 auto;margin-top:55px;">登录</div>
  </div>

</div>



</template>

<script>

import api from '@/apis/voteApi.js';
export default {
  name: 'login',
  data() {
   return {
     txt1:"",
     txt:'',
        code1:'',
        code:'2',
        phone1:'2',
        phone:'',
        show:false,
          time:60,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            timer:''
          }
        }
  },
  mounted() {

  },
  methods: {
    node:function(){

        var time = 60;
        var main=this;
        main.phone1=main.phone;
        main.txt=''
        if(main.phone==""){
          // this.$message({
          //   message: "请填写手机号",

          // });
          main.txt= "请填写手机号";
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(main.phone))){
          // this.$message({
          //   message: "请填写正确的手机号",

          // });
          main.txt= "请填写正确的手机号";
          return;
        }
        main.show=true;
        main.timer = setInterval(function() {
           if (time == 1) {
            clearInterval(main.timer);
            main.show=false;
            main.time=5;
           } else {
            // console.log(11)
            time--;
            // console.log(main.time)
            main.time=time;
           }
          }, 1000);
          api.erCode(main.phone).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.$message({
                  message: "发送成功",
                  type: "success"
                });
                 main.code1=response.data.data;
                main.code=response.data.data;
            } else {
              this.$message({
                message: "发送失败",

              });
            }
          });

    },
    gologin:function(){
      var main=this;
      if(main.phone!=main.phone1){
        // main.$message({
        //   message: "手机号不正确",
        // });
        main.txt="手机号不正确"
         return
      }else if(main.code!=main.code1){
        // main.$message({
        //   message: "验证码不正确",
        // });
         main.txt1="验证码不正确"
        return
      }
      else{
        let data={
          authKey:main.phone,
          passwd:main.code
        }

        api.login(data).then(response => {
          console.log(response);
          if (response.status === 200) {
              this.$message({
                message: "登录成功",
                type: "success"
              });

             this.$router.push({ path:'/activeIndex'  })
          } else {
            this.$message({
              message: "登录失败",

            });
          }
        });
        main.code="";
         main.phone="";
          main.code1="";
      }


    }
  }

}
</script>

<style >
  .pic{
     background: url('../img/ceng.png');
  }
.deng{
  color:#fff;
  width:320px;
  height:44px;

  /* background:rgba(27,27,27,1); */
  border-bottom:1px solid #D0D0D0;
  /* border-image:linear-gradient(135deg, rgba(245,226,171,1), rgba(184,146,69,1)) 4 4; */

 outline: none;

 display: block;
}
.deng1{
  color:#fff;
   width:320px;
  height:40px;

  /* background:rgba(27,27,27,1); */
   border-bottom:1px solid #D0D0D0;
  /* border-image:linear-gradient(135deg, rgba(245,226,171,1), rgba(184,146,69,1)) 4 4; */
justify-content: space-between;
 outline: none;
margin-top:40px;
  display: block;
  display: flex;
  align-items: center;
}
</style>
