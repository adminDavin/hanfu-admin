<template>
  <div>
    <el-form :model="form">
      <el-form-item prop="files">
        <el-upload ref="upload"
         class="upload-poster"
         accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
         action='' list-type="picture-card" :on-remove="onRemove" :on-change="imgPreview" :auto-upload="false">
          <i class="el-icon-plus"></i>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="picUrl" alt="">
          </el-dialog>
        </el-upload>

      </el-form-item>
    </el-form>
    <div style="display: flex;flex-wrap:wrap ;">
      <div  v-for="(item,index) in pic" style="margin-right: 10px;position: relative;width: 130px;height: 130px;" >
        <img   :src="item.img" alt="" style="width: 130px;height: 130px;">
        <div style="position: absolute;width:100%;height: 100%;background: rgba(0,0,0,0.5); top:0;left:0; display: flex;justify-content: center;align-items: center;">
            <img src="../../img/del.png" style="width: 20px;"  alt="" @click="lun(index)">
        </div>
      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: 'uploadFiles',
  // props: ['goods'],
  data() {
    return {
      pic:[],
      dialogVisible: false,
      picUrl: '',
      form: {
        files: []
      },
    }
  },
  methods: {
    lun:function(index){
       console.log(index);
      
       axios.get("/api/strategy/deletelunbotu").then((response) => {
       console.log('获取轮播图',response)
       if(response.data.data.length>0){
          for(var i=0;i<response.data.data.length;i++){
               response.data.data[i].img= '/api/wareHouse/getFile?fileId='+response.data.data[i].id
          }
        }
        this.pic=response.data.data
       })
    },
    uploadAction() {
      console.log(this);
    },
    uploadFile(file) {
    console.log(file)
     let fd = new FormData();
      fd.append('file', file.raw);
      axios.post('/api/strategy/addlunbotu', fd, {
        responseType: 'arraybuffer'
      }).then(res => {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        console.log(res);
      });
    },

    initGoodsFiles() {
      // console.log(this.goods.id);
      axios.get("/api/strategy/findlunbotu").then((response) => {
      console.log('获取轮播图',response)
      if(response.data.data.length>0){
         for(var i=0;i<response.data.data.length;i++){
              response.data.data[i].img= '/api/wareHouse/getFile?fileId='+response.data.data[i].id
         }
       }
       this.pic=response.data.data
      })
    },
    onRemove(file) {
      console.log("remove:", file);
    },
    imgPreview(file) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.picUrl = URL.createObjectURL(file.raw);
        this.uploadFile(file);
      } else {
        this.$message.error('请选择图片文件');
      }
    },
  },
  mounted() {
    this.initGoodsFiles();
  }
}
</script>
