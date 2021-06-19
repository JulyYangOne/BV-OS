<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
        <el-select v-model="queryParams.model" filterable placeholder="请选择" style="width: 150px">
          <el-option
            v-for="item in informationObj.modelsList"
            :key="item.modelsId"
            :label="item.modelsName"
            :value="item.modelsName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input
          v-model.trim="queryParams.email"
          placeholder="email"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="Status"
          clearable
          size="small"
          style="width: 100px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
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
          v-hasPermi="['system:back:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
<!--查看详情-->
    <Detail  ref="form1" ></Detail>
    <el-table v-loading="loading" :data="backList" @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" align="center">
      <template slot-scope="scope">
        <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
      </template>
    </el-table-column>
      <el-table-column label="日期" align="center" prop="date" width="150" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="国家" align="center" prop="country" :show-overflow-tooltip="true" />
      <el-table-column label="购买渠道" align="center" prop="channel" :show-overflow-tooltip="true" />
      <el-table-column label="店铺名称" align="center" prop="shopName" :show-overflow-tooltip="true" />
      <el-table-column label="订单号" align="center" prop="orderNumber" :show-overflow-tooltip="true" />
      <el-table-column label="机型" align="center" prop="model" :show-overflow-tooltip="true" />
      <el-table-column label="imei" align="center" prop="imei" :show-overflow-tooltip="true" />
      <el-table-column label="种类" align="center" prop="type" :show-overflow-tooltip="true" />
      <el-table-column label="问题" align="center" prop="problem" :show-overflow-tooltip="true" />
      <el-table-column label="一级模块" align="center" prop="moduleBase" :show-overflow-tooltip="true" />
      <el-table-column label="二级模块" align="center" prop="moduleSecond" :show-overflow-tooltip="true" />
      <el-table-column label="三级模块" align="center" prop="moduleThird" :show-overflow-tooltip="true" />
      <el-table-column label="问题描述" align="center" prop="describeProblem" :show-overflow-tooltip="true" />
      <el-table-column label="邮箱" align="center" prop="email"  />
      <el-table-column label="状态" align="center" fixed="right" width="70" >
        <template slot-scope="scope">
          <span :class="scope.row.status==0?'gray':scope.row.status==1?'red':'green'">  {{scope.row.status==0?'未处理':scope.row.status==1?'处理中':'已处理'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="130" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:back:edit']"
          ></el-button>
          <el-button
            size="text"
            type="primary"
            @click="handleView(scope.row)"
          >
            Detail
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

    <!-- 添加或修改用户反馈对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="状态" prop="status">-->
<!--          <el-radio-group v-model="form.status">-->
<!--            <el-radio-->
<!--              v-for="dict in statusOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictValue"-->
<!--            >{{dict.dictLabel}}</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->

        <el-form-item label="Status">
          <el-radio v-model="form.status" :label="0">未处理</el-radio>
          <el-radio v-model="form.status" :label="1">处理中</el-radio>
          <el-radio v-model="form.status" :label="2">已处理</el-radio>
        </el-form-item>
        <el-form-item label="Reply">
          <el-input type="textarea" v-model="form.feedBack" row="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBack, getBack, delBack, addBack, updateBack, exportBack } from "@/api/system/back";
import  Detail from './detail'
import { getListInformation } from "@/api/OS/os";
export default {
  name: "Back",
  components:{
    Detail
  },
  data() {
    return {
      //品牌 国家 机型
      informationObj:{
      },
      statusOptions:[],
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
      // 用户反馈表格数据
      backList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        describeProblem: null,
        moduleBase: null,
        date: null,
        email: null,
        ip: null,
        country: null,
        brand: null,
        model: null,
        moduleSecond: null,
        moduleThird: null,
        problem: null,
        channel: null,
        shopName: null,
        orderNumber: null,
        reserved: null,
        reserved1: null,
        status: null,
        feedBack: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        channel: [
          { required: true, message: "购买渠道不能为空", trigger: "blur" }
        ],
        orderNumber: [
          { required: true, message: "订单号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("advise_status").then(response => {
      this.statusOptions = response.data;
    });
    /** 国家,品牌,机型数据
     *  @flag '' 空为全部
     *  @type  0 空为全部 1为权限内的
     * */

    getListInformation('',1).then(res => {
      this.informationObj = res.data

    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    /** 查询用户反馈列表 */
    getList() {
      this.loading = true;
      listBack(this.queryParams).then(response => {
        this.backList = response.rows;
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
        type: null,
        describeProblem: null,
        moduleBase: null,
        date: null,
        email: null,
        ip: null,
        brand: null,
        country: null,
        imei: null,
        model: null,
        moduleSecond: null,
        moduleThird: null,
        problem: null,
        channel: null,
        shopName: null,
        orderNumber: null,
        reserved: null,
        reserved1: null,
        status: 0,
        feedBack: null,
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加用户反馈";
    // },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBack(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户反馈状态";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBack(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBack(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 查看详情 */
    handleView(row){
      const _this = this.$refs.form1
      _this.form = {
        date:row.date,
        channel:row.channel,
        country:row.country,
        moduleBase:row.moduleBase,
        moduleSecond:row.moduleSecond,
        moduleThird:row.moduleThird,
        orderNumber:row.orderNumber,
        problem:row.problem,
        type:row.type,
        shopName:row.shopName,
        describeProblem:row.describeProblem,
        email:row.email,
        reserved:row.reserved,
        reserved1:row.reserved1,
        id:row.id,
        ip:row.ip,
        status:row.status,
        brand:row.brand,
        model:row.model,
        imei:row.imei,
        feedBack:row.feedBack
      }

      _this.dialog = true
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户反馈数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBack(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
<style scoped>

  .red{
    color: red;
  }
  .gray{
    color: #5a5e66;
  }
  .green{
    color: green;
  }
</style>
