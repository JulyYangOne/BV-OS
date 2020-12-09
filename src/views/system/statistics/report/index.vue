<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true"  label-width="88px">
      <el-form-item label="Brand" prop="brand">
        <el-select v-model="queryParams.brand" filterable placeholder="请选择" style="width: 150px">
          <el-option
            v-for="item in informationObj.brandList"
            :key="item.brandId"
            :label="item.brandName"
            :value="item.brandName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Country" prop="country">
        <el-select v-model="queryParams.country" filterable placeholder="请选择">
          <el-option
            v-for="item in informationObj.countryList"
            :key="item.countryId"
            :label="item.countryName"
            :value="item.countryName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Model" prop="model">
        <el-select v-model="queryParams.model" filterable placeholder="请选择">
          <el-option
            v-for="item in informationObj.modelsList"
            :key="item.modelsId"
            :label="item.modelsName"
            :value="item.modelsName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="years" prop="years">
        <el-select v-model="queryParams.years" filterable placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in YearsOption"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="type" prop="type">
        <el-select v-model="queryParams.type" filterable placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in TypeOption"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData"/>
      </el-row>
   </div>
    </div>
</template>

<script>
  import LineChart from './LineChart'
  import { getListInformation , totalList} from "@/api/OS/os";
  const lineChartData = {
      active_num: [],
      date_time: []
  }

  export default {
    name: 'index',
    components:{
      LineChart
    },
    data(){
      return {
        /** 查询参数 */
        queryParams:{
          brand: null,
          date: null,
          country: null,
          model: null,
          years:new Date().getFullYear(),
          type:'weeks'
        },
        TypeOption:[
          {
            value:'weeks',
            label:"weeks"
          },
          {
            value:'months',
            label:"months"
          }
        ],
        YearsOption:[
        ],
        //品牌 国家 机型
        informationObj:{

        },
        lineChartData: lineChartData
      }
    },
    methods:{
      /** 查询按钮操作 */
      handleQuery() {
        totalList(this.queryParams).then(res=>{
          var obj = {
            active_num:[],
            date_time:[],
          }
          res.data.forEach((val)=>{
            obj.active_num.push(val.active_num)
            obj.date_time.push(val.date_time)
          })
          this.lineChartData = obj
        }).catch(error=>{
          console.log(error)
        })
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.queryParams.years = new Date().getFullYear(),
        this.queryParams.type = 'weeks'
        this.handleQuery();
      },
    },
    created() {

      /** 国家,品牌,机型数据
       *  @flag '' 空为全部 1.国家 2.品牌 3.机型
       *  @type  0 空为全部; 1 为权限范围内的
       * */

      this.YearsOption=[]


      var obj = {

      }
      var nowYear = new Date().getFullYear()

      for(var i =2020;i <= nowYear ; i++) {
        obj.value = i
        obj.label = i
        this.YearsOption.push(obj)
        obj = {}
      }
      getListInformation('',1).then(res => {
        this.informationObj = res.data
      }).catch(error => {
        console.log(error)
      })
      this.handleQuery()

    },
  }
</script>

<style scoped>

</style>
