<template>

<div style="display: flex;justify-content: center;height: 100%;" class="pic">

  <div style="margin-top: 12%;
    display: flex;
    background: rgb(255, 255, 255);
    width: 451px;
    height: 425px;
    margin-left: 28%;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
">
    <div style="font-size: 24px;text-align: center;margin-top: 25px;">投票系统后台登录</div>

    <div class="deng" style="margin-bottom: 10px;margin-top: 13%;">

      <input type="text"  placeholder="请输入手机号" style="height: 100%;outline: none;border: none;">
    </div>



        <div class="deng1">
          <input type="text" style="width: 50%;height: 100%;outline: none;border: none;" placeholder="请输入验证码">
          <span @click="node" v-if="!show" style="color:#3A4BF8;font-size: 16px;">发送验证码</span>
          <span style="margin-left: 10px;color:red;font-size: 16px;" v-if="show" >{{time}}s后重新发送</span>

        </div>

        <!-- <div style="margin-left: 10px;" > </div> -->

      <div @click="gologin" style="color:#fff;align-items: center; display: flex;justify-content: center;background:  #0C9CEC;
       width:320px;height:40px;border-radius: 10px;margin: 0 auto;margin-top:55px;">登录</div>
  </div>

</div>



</template>

<script>


export default {
  name: 'login',
  data() {
   return {
        show:false,
          time:5,
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

        var time = 5;
        var main=this;
        main.show=true;
        main.timer = setInterval(function() {
           if (time == 1) {
            clearInterval(main.timer);
            main.show=false;
            main.time=5;
           } else {
            console.log(11)
            time--;
            console.log(main.time)
            main.time=time;
           }
          }, 1000);
        // this.time=5;
    },
    gologin:function(){
       this.$router.push({ path:'/activeIndex'  })
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
