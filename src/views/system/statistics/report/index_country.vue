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
      <el-form-item label="日期范围" >
        <el-button type="cyan"  size="mini" @click="CustomDate(7)">近七天</el-button>
        <el-button type="cyan" size="mini" @click="CustomDate(30)">近一个月</el-button>

        <el-date-picker type="daterange" v-model="queryParams.date" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '70%'}" start-placeholder="开始日期" end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
<div class="chart-box">
  <div class="chart-wrapper">
    <p style="text-align: center">     Country ({{this.queryParams.date[0]  }} - {{this.queryParams.date[1]  }})</p>
    <pie-chart  :chart-data="PieChartData" />
  </div>
  <div class="chart-wrapper">
    <p>     Country ({{this.queryParams.date[0]  }} - {{this.queryParams.date[1]  }})</p>
    <el-table
      :data="PieChartData"
      style="width: 300px">
      <el-table-column
        prop="name"
        label="国家"
        width="150">
      </el-table-column>
      <el-table-column
        prop="value"
        label="激活数"
        width="150">
      </el-table-column>
    </el-table>
  </div>
</div>

  </div>
</template>

<script>
  import PieChart from './PieChart'
  import { getListInformation , CountryList} from "@/api/OS/os";
  const PieChartData = []

  export default {
    name: 'index',
    components:{
      PieChart
    },
    data(){
      return {
        /** 查询参数 */
        queryParams:{
          brand: null,
          model: null,
          date: []
        },

        //品牌 国家 机型
        informationObj:{

        },
        PieChartData: PieChartData,

      }
    },
    methods:{
      CustomDate(date){
        this.queryParams.date= []

          this.queryParams.date[0]=  this.date_count(date)
          this.queryParams.date[1] =  this.date_count(0)




        this.$nextTick(()=>{
          this.handleQuery();
        })
      },
      /** 查询按钮操作 */
      handleQuery() {
        CountryList(this.queryParams).then(res=>{
         this.PieChartData = res.data

        }).catch(error=>{
          console.log(error)
        })

          this.$nextTick(()=>{


          })


      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.CustomDate(7)
      },
      date_count(date){
        var date1 = new Date();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() - parseInt(date));
        var times = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        Year = date2.getFullYear();
        Month = date2.getMonth() + 1;
        Day = date2.getDate();
        CurrentDate += Year + "-";
        if(Month >= 10) {
          CurrentDate += Month + "-";
        } else {
          CurrentDate += "0" + Month + "-";
        }
        if(Day >= 10) {
          CurrentDate += Day;
        } else {
          CurrentDate += "0" + Day;
        }

        return CurrentDate
      }
    },
    created() {


      /** 国家,品牌,机型数据
       *  @flag '' 空为全部 1.国家 2.品牌 3.机型
       *  @type  0 空为全部; 1 为权限范围内的
       * */

      getListInformation('',1).then(res => {
        this.informationObj = res.data
      }).catch(error => {
        console.log(error)
      })

      this.CustomDate(7)

    },
  }
</script>

<style scoped>
  .chart-box{
    width: 100%;

    display: flex;
    justify-content: center;
  }
  .chart-wrapper{
    margin: 20px;
  }

</style>
