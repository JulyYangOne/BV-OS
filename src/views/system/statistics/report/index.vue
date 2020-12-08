<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true"  label-width="88px">
      <el-form-item label="Brand" prop="brand">
        <el-select v-model="queryParams.brand" filterable placeholder="请选择" style="width: 100px">
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
  </div>
</template>

<script>
  import { getListInformation , totalList} from "@/api/OS/os";
  export default {
    name: 'index',
    data(){
      return {
        /** 查询参数 */
        queryParams:{
          brand: null,
          date: null,
          country: null,
          model: null,
          years:null,
          type:null
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
          {
            value:'2020',
            label:"2020"
          },
          {
            value:'2021',
            label:"2021"
          }
        ],
        //品牌 国家 机型
        informationObj:{

        },
      }
    },
    methods:{
      /** 查询按钮操作 */
      handleQuery() {

        console.log(this.queryParams)
        totalList(this.queryParams).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
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

    },
  }
</script>

<style scoped>

</style>
