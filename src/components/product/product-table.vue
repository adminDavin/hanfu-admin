<template>
  <div>

    <div class="handle-box " style="background: #fff;width: 94%;height: 70px;padding:30px 3%  10px 3%;">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;font-size: 15px;">
        <el-form :inline="true">
          <el-form-item style="margin-bottom:50px;" label="">
            <div style="font-size: 15px;">商品名称:</div>
          </el-form-item>

          <el-form-item style="margin-bottom:50px;" label="">
            <el-input v-model="souhfName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:50px;margin-left: 5px;" label="">

            <el-form-item style="margin-bottom:50px;" label="">
              <div style="font-size: 15px;">商品分类：</div>
            </el-form-item>
            <el-select v-model="value1" placeholder="请选择" @change="checkMulist">
              <el-option v-for="(item, index) in leiMu" :key="index" :label="item.hfName" :value="item.hfName">
              </el-option>
            </el-select>
            <!-- <el-cascader :options="leiMu" @active-item-change="handleItemChange" :props="props"></el-cascader> -->

          </el-form-item>

          <el-button type="primary" @click="sou" :loading="addLoading">搜索</el-button>
          <el-button type="danger" style="border-radius:3px;float:right;margin-right: 4%;font-size: 15px;" icon="el-icon-delete"
            @click="deletegood" size="mini" round>删除</el-button>
          <el-button type="success" style="border-radius:3px;float:right;" icon="el-icon-circle-plus-outline" @click="handleAdd"
            size="mini" round>新增</el-button>
          <el-button type="success" style="border-radius:3px;float:right;" @click="addMu" size="mini" round>添加分类</el-button>
        </el-form>
      </el-col>
    </div>
    <!--添加类目-->
    <el-dialog title="添加类目" :visible.sync="mu" :close-on-click-modal="false">
      <el-form :model="leimu" ref="leimuForm" :inline="true">
        <el-form-item label="" prop="category">
          <div style="display: flex;align-items: center;">
            <div style="width: 167px;font-weight: bold;">添加一级分类:</div>
            <el-input v-model="leimu.category" auto-complete="off" placeholder="输入一级分类名称"></el-input>

            <el-button type="primary" @click="addleimu" style="margin-left: 10px;">提交</el-button>
          </div>

        </el-form-item>
      </el-form>
      <div style="height: 1px;border-top:1px solid #000000;margin-bottom: 20px;"> </div>
      <el-form :model="leimu" ref="leimuForm1" :inline="true">

        <el-form-item label="" prop="category">

          <div style="display: flex;align-items: center;">
            <div style="width: 140px;font-weight: bold;">添加二级分类:</div>
            <el-input v-model="leimu1.category" auto-complete="off" placeholder="输入二级分类名称"></el-input>
            <!-- <el-button type="primary" @click="addleimu" style="margin-left: 10px;">提交</el-button> -->
          </div>

        </el-form-item>
        <el-form-item label="选择对应的一级分类:" prop="category">
          <el-select v-model="values1" placeholder="请选择" @change="checkMulist1">
            <el-option v-for="(item, index) in leiMu" :key="index" :label="item.hfName" :value="item.hfName">
            </el-option>
          </el-select>
          <el-button type="primary" @click="addleimu1" style="margin-left: 10px;">提交</el-button>
        </el-form-item>
      </el-form>

      <div style="height: 1px;border-top:1px solid #000000;margin-bottom: 20px;"> </div>
      <el-form :model="leimu" label-width="80px" ref="leimuForm2" :inline="true">
        <el-form-item label="" prop="category" label-width="100">
          <div style="display: flex;align-items: center;">
            <div style="width: 140px;font-weight: bold;">添加三级分类:</div>
            <el-input v-model="leimu3.category" auto-complete="off" placeholder="输入三级分类名称"></el-input>
            <!-- <el-button type="primary" @click="addleimu" style="margin-left: 10px;">提交</el-button> -->
          </div>
        </el-form-item>
        <el-form-item label="选择对应的一级分类:" prop="category" label-width="100">
          <el-select v-model="values2" placeholder="请选择" @change="checkMulist2">
            <el-option v-for="(item, index) in leiMu" :key="index" :label="item.hfName" :value="item.hfName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择对应的二级分类:" prop="category" label-width="100">

          <el-select v-model="values3" placeholder="请选择" @change="checkMulist3">
            <el-option v-for="(item, index) in lenmdata2" :key="index" :label="item.hfName" :value="item.hfName">
            </el-option>
          </el-select>
          <el-button type="primary" @click="addleimu2" style="margin-left: 10px;">提交</el-button>
        </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orgFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <div style="padding-top: 10px;background: #fff;margin-top: 10px;">
      <el-table :data="tableData" size="mini" highlight-current-row border class="el-tb-edit " style="font-size: 15px"
        ref="multipleTable" tooltip-effect="dark">
        <el-table-column type="selection" label="序号" width="59px" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="70px" align="center">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" align="center">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="productDesc" label="商品描述" align="center">
        </el-table-column>

        <!-- <el-table-column prop="productDesc" label="商品描述" align="center">
        </el-table-column> -->
        <el-table-column prop="productCategoryName" label="商品类目" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="260" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="primary" plain size="small" @click="addgui(scope.row)" style="margin-bottom: 10px;">查看规格</el-button> -->
            <!--  <el-button type="primary" plain size="small" @click="biangui(scope.row)" style="margin-bottom: 10px;">修改规格</el-button>
              <el-button type="danger" plain size="small" @click="deletesingle(scope.row)">删除</el-button> -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="biangui(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deletesingle(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div style="float:right;width:100%;background: #fff;">
        <el-pagination style="padding-top:30px; background: #fff;height: 40px;float:right;" @size-change="3"
          @current-change="3" :current-page="2" :page-size="3" layout="total, prev, pager, next" :total="tableData.length">
        </el-pagination>
      </div>
    </div>




    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">

        <el-form-item label="商品名称" prop="hfName">
          <el-input v-model="addForm.hfName" auto-complete="off"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="商品分类" prop="value">
          <el-select v-model="addForm.value" placeholder="请选择" @change="changeQuentitySubject(index)">
            <el-option v-for="(item,index) in leiMu" :key="index" :label="item.hfName" :value="item.hfName">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="商品描述" prop="productDesc">
          <el-input v-model="addForm.productDesc" auto-complete="off" type="textarea" style="width:550px;" resize="none"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/apis/hf-api.js';
  export default {
    name: 'productTable',
    data() {
      return {
        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'hfName',
          children: 'hfName'
        },
        values3: '',
        lenmdata2: '',
        leiMuId1: '',
        values1: '',
        values2: '',
        leiMuId: '',
        leiMu: {},
        leimu: {
          category: '',
          parentCategoryId: "-1",
          levelId: '0'
        },
        leimu1: {
          category: '',
          parentCategoryId: "-1",
          levelId: '1'
        },
        leimu2: {
          category: '',
          parentCategoryId: "-1",
          levelId: '1'
        },
        leimu3: {
          category: '',
          parentCategoryId: "-1",
          levelId: '2'
        },
        mu: false,
        addForm: {
          bossId: '1', //商家id
          brandId: '1', //品牌id
          categoryId: '', //类目
          hfName: '', //商品名称
          lastModifier: '1', //最后修改者
          productDesc: '', //产品描述
        },
        index: 0,
        addFormVisible: false,
        leiMu: '',
        value1: '',
        souhfName: '',
        tableData: [],
        leiMuId: '',
        selectList: [],
        addLoading: false
      }
    },
    methods: {
      handleItemChange: function(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },




      addMu: function(row) {

        this.mu = true;
      },
      // 编辑商品
      biangui: function(row) {
        var arr = JSON.stringify(row);
        this.$router.push({
          path: '/detail',
          query: {
            row: arr
          }
        })
      },
      deletesingle: function(row) {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          var _this = this;
          api.singledeleteProduct(row.id).then(response => {
            console.log(response);
            if (response.data.status === 200) {
              _this.listProduct();
            }
          });
        });
      },
      selectChange: function(val) {
        console.log(val)
        this.selectList = val;
      },
      //删除商品
      deletegood: function(row) {
        let delarr = [];
        const length = this.selectList.length;
        for (let i = 0; i < length; i++) {

          delarr.push(this.selectList[i].id)

        }

        console.log(delarr);
        var _this = this;
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          api.deleteProduct(delarr.toString()).then(response => {
            console.log(response);
            if (response.data.status === 200) {
              _this.listProduct();
            }
          });

        })

      },
      // 添加类目
      addleimu: function() {
        var _this = this;
        _this.$refs.leimuForm.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              _this.addLoading = true;
              let param = Object.assign({}, _this.leimu);
              console.log(param);
              _this.$ajax({
                method: "post",
                url: "/api/product/addCategory",
                params: param
              }).then(res => {
                _this.mu = false;
                _this.addLoading = false;
                console.log('添加类目', res)
                _this.$message({
                  message: "提交成功",
                  type: "success"
                });

                _this.$refs["leimuForm"].resetFields();

                // this.getResult(1);
              });
            });
          }
        });

      },
      // 添加类目二级
      addleimu1: function() {
        console.log(13232)
        var _this = this;
        _this.$refs.leimuForm1.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              _this.addLoading = true;
              let param = Object.assign({}, _this.leimu1);
              console.log(param);
              _this.$ajax({
                method: "post",
                url: "/api/product/addCategory",
                params: param
              }).then(res => {
                _this.mu = false;
                _this.addLoading = false;
                console.log('添加类目', res)
                _this.$message({
                  message: "提交成功",
                  type: "success"
                });

                _this.$refs["leimuForm"].resetFields();

                // this.getResult(1);
              });
            });
          }
        });

      },
      // 添加类目三级
      addleimu2: function() {
        console.log(13232)
        var _this = this;
        _this.$refs.leimuForm1.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              _this.addLoading = true;
              let param = Object.assign({}, _this.leimu3);
              console.log(param);
              _this.$ajax({
                method: "post",
                url: "/api/product/addCategory",
                params: param
              }).then(res => {
                _this.mu = false;
                _this.addLoading = false;
                console.log('添加类目', res)
                _this.$message({
                  message: "提交成功",
                  type: "success"
                });

                _this.$refs["leimuForm"].resetFields();

                // this.getResult(1);
              });
            });
          }
        });

      },
      // 添加商品
      addSubmit: function() {
        // console.log(this.value)
        var _this = this;

        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              // ============
              console.log(_this.addForm);

              let param = Object.assign({}, _this.addForm);
              api.addProduct(param).then(res => {
                console.log('ssss', res);
                this.addLoading = false;
                _this.listProduct();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.addForm.hfName = '';
                this.addForm.productDesc = '';
                this.addFormVisible = false;
              });
            });
          }
        });
      },
      changeQuentitySubject: function() {
        let obj = {};
        obj = this.leiMu.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.addForm.value) {
            return item
          }
        });
        this.addForm.categoryId = obj.id;


      },
      sou: function() {
        var _this = this;
        console.log(_this.souhfName)
        api.search(1, _this.leiMuId, _this.souhfName).then(response => {
          console.log(response);
          if (response.data.status === 200) {
            _this.tableData = response.data.data;
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].createTime = this.tableData[i].createTime.split('T');
              this.tableData[i].createTime = this.tableData[i].createTime[0] + '  ' + this.tableData[i].createTime[
                1]
            }
          }
        });
      },
      // 查询类目
      checkType: function(val) {
        var _this = this;
        api.category().then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status === 200) {

              _this.leiMu = response.data.data;

            }
          }

        });

      },
      // 通过类目查询商品列表
      checkMulist: function() {
        let obj = {};
        obj = this.leiMu.find((item) => {
          //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.value1) {
            return item
          }
        });
        // leimu1: {
        //   values1: '',
        //   parentCategoryId: "-1",
        //   levelId: '1'
        // },
        this.leimu1.parentCategoryId = obj.id;
        console.log(this.leiMuId)

      },
      //选择一级分类
      checkMulist1: function() {

        let obj = {};
        obj = this.leiMu.find((item) => {
          //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.values1) {
            return item
          }
        });

        this.leimu1.parentCategoryId = obj.id;
        // console.log(this.leiMuId1)

      },
      //选择一级分类
      checkMulist2: function() {

        let obj = {};
        obj = this.leiMu.find((item) => {
          //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          console.log(this.values2)
          if (item.hfName == this.values2) {
            return item
          }
        });

        this.leimu2.parentCategoryId = obj.id;
        console.log(this.leimu2.parentCategoryId)
        api.categoryTwo(this.leimu2.parentCategoryId).then(response => {
          console.log(response);
          this.lenmdata2 = response.data.data
          // if (response.status == 200) {
          //   if (response.data.status === 200) {

          //     _this.leiMu = response.data.data;
          //   }
          // }

        });


      },
      //选择二级分类
      checkMulist3: function() {

        let obj = {};
        obj = this.lenmdata2.find((item) => {
          //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          console.log(this.values3)
          if (item.hfName == this.values3) {
            return item
          }
        });

        this.leimu3.parentCategoryId = obj.id;
        console.log(this.leimu3.parentCategoryId)



      },
      conver: function(s) {
        return s < 10 ? '0' + s : s;
      },
      //显示新增界面
      handleAdd: function() {
        this.addFormVisible = true;
      },
      TellMeId(num) {
        console.log(num)
      },
      // 获取商品列表
      listProduct() {
        api.getProductList(1).then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status === 200) {
              this.tableData = response.data.data;
              for (var i = 0; i < this.tableData.length; i++) {
                let date = new Date(this.tableData[i].createTime)
                let Str = date.getFullYear() + '-' +
                  (date.getMonth() + 1) + '-' +
                  date.getDate() + ' ' +
                  (date.getHours() + 8) % 24 + ':' +
                  date.getMinutes() + ':' +
                  date.getSeconds()
                this.tableData[i].createTime = Str;
                // var date = new Date(this.tableData[i].createTime);
                // Calendar cal = Calendar.getInstance();
                // var localeString = date.toLocaleString();
                // console.log(localeString);
                // this.tableData[i].createTime=this.tableData[i].createTime.split('T');
                // this.tableData[i].createTime=this.tableData[i].createTime[0]+''+this.tableData[i].createTime[1];
              }
            }
          }

        });
      },

      init() {
        this.listProduct();
        this.checkType();
      }
    },
    mounted() {
      this.init();
      var myDate = new Date();

      //获取当前年
      var year = myDate.getFullYear();

      //获取当前月
      var month = myDate.getMonth() + 1;

      //获取当前日
      var date = myDate.getDate();
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var m = myDate.getMinutes(); //获取当前分钟数(0-59)
      var s = myDate.getSeconds();

      //获取当前时间

      var now = year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) +
        ":" + this.conver(s);
      console.log(now)
      let GMT = new Date(now);
      console.log(GMT)

    }
  }
</script>
