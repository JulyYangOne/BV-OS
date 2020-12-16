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
      <line-chart style="width: 100%;" :chart-data="lineChartData"/>

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
          brand: 'all',
          date: null,
          country: 'all',
          model: 'all',
          years:new Date().getFullYear(),
          type:'thirty'
        },
        TypeOption:[
          {
            value:'weeks',
            label:"weeks"
          },
          {
            value:'months',
            label:"months"
          },
          {
            value:'seven',
            label:"seven"
          },
          {
            value:'thirty',
            label:"thirty"
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
        this.queryParams.type = 'thirty'
        this.queryParams.country = 'all'
        this.queryParams.model = 'all'
        this.queryParams.brand = 'all'
        this.handleQuery();
      },
    },
    created() {

      /** 国家,品牌,机型数据
       *  @flag '' 空为全部 1.国家 2.品牌 3.机型
       *  @type  0 空为全部; 1 为权限范围内的
       * */
      this.YearsOption=[]
      var obj = {}
      var nowYear = new Date().getFullYear()

      for(var i = 2020;i <= nowYear ; i++) {
        obj.value = i
        obj.label = i
        this.YearsOption.push(obj)
        obj = {}
      }
      getListInformation('',1).then(res => {

        this.informationObj = res.data
        // this.$nextTick(()=> {
        //   this.informationObj.modelsList.unshift({modelsName: "全部机型", modelsId: "0"})
        //   this.informationObj.countryList.unshift({countryName: "全部国家", countryId: "0"})
        //   this.informationObj.brandList.unshift({brandName: "全部品牌", brandId: "0"})
        // })
      }).catch(error => {
        console.log(error)
      })
      this.handleQuery()

    },
  }
</script>

<style scoped>

</style>
