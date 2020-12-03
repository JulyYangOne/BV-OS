<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
      <el-form-item label="Brand" prop="brand">
        <el-select v-model="queryParams.brand" filterable placeholder="请选择">
          <el-option
            v-for="item in informationObj.brandList"
            :key="item.brandId"
            :label="item.brandName"
            :value="item.brandName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="AreaVersion" prop="areaVersion">
        <el-input
          v-model="queryParams.areaVersion"
          placeholder="areaVersion"
          clearable
          size="small"
        />
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
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>

        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:statistics:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <!-- 查看详情-->
    <Detail  ref="form1"></Detail>

    <el-table v-loading="loading" :data="statisticsList">
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="date" align="center" prop="date" :show-overflow-tooltip="true" />
      <el-table-column label="brand" align="center" prop="brand" :show-overflow-tooltip="true" />
      <el-table-column label="country" align="center" prop="country" :show-overflow-tooltip="true" />
      <el-table-column label="areaVersion" align="center" prop="areaVersion" :show-overflow-tooltip="true" />
      <el-table-column label="id" align="center" prop="id" :show-overflow-tooltip="true" />
      <el-table-column label="imei" align="center" prop="imei" :show-overflow-tooltip="true" />
      <el-table-column label="imsi" align="center" prop="imsi" :show-overflow-tooltip="true" />
      <el-table-column label="ipAddress" align="center" prop="ipAddress" :show-overflow-tooltip="true" />
      <el-table-column label="meid" align="center" prop="meid" :show-overflow-tooltip="true" />
      <el-table-column label="model" align="center" prop="model" :show-overflow-tooltip="true" />
      <el-table-column label="osVersion" align="center" prop="osVersion" :show-overflow-tooltip="true" />
      <el-table-column label="romVersion" align="center" prop="romVersion" :show-overflow-tooltip="true" />
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="text"
            type="primary"
            @click="handleView(scope.row)"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listStatistics,exportStatistics } from "@/api/system/statistics";
import Detail from "./detail"
import { getListInformation } from "@/api/OS/os";
export default {
  name: "Statistics",
  components:{
    Detail
  },
  data() {
    return {
      //品牌 国家 机型
      informationObj:{
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 销统表格数据
      statisticsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imei: null,
        romVersion: null,
        imsi: null,
        meid: null,
        ipAddress: null,
        brand: null,
        osVersion: null,
        areaVersion: null,
        date: null,
        country: null,
        uuid: null,
        model: null
      },

    };
  },
  created() {
    this.getList();
    /** 国家,品牌,机型数据
     *  @flag '' 空为全部
     *  @type  0 空为全部; 1 为权限范围内的
     * */

    getListInformation('',1).then(res => {
      this.informationObj = res.data
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })

  },
  methods: {
    /** 查看详情 */
    handleView(row){
      const _this = this.$refs.form1
      _this.form = {
        areaVersion: row.areaVersion,
        brand: row.brand,
        country: row.country,
        createBy:row.createBy,
        createTime: row.createTime,
        date: row.date,
        id: row.id,
        imei:row.imei,
        imsi: row.imsi,
        ipAddress:row.ipAddress,
        meid: row.meid,
        model: row.model,
        osVersion:row.osVersion,
        params: row.params,
        remark:row.remark,
        romVersion: row.romVersion,
        searchValue: row.searchValue,
        updateBy:row.updateBy,
        updateTime:row.updateTime,
        userBrand: row.userBrand,
        userCountry: row.userCountry,
        userModels: row.userModels,
        uuid: row.uuid
      }

      _this.dialog = true
    },
    /** 查询销统列表 */
    getList() {
      this.loading = true;
      listStatistics(this.queryParams).then(response => {
        this.statisticsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        imei: null,
        romVersion: null,
        imsi: null,
        meid: null,
        ipAddress: null,
        brand: null,
        osVersion: null,
        areaVersion: null,
        date: null,
        country: null,
        uuid: null,
        model: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },


    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有销统数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportStatistics(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
