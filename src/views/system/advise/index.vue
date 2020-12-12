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
          v-model="queryParams.email"
          placeholder="Email"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="Status" prop="status">
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
          v-hasPermi="['system:advise:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="adviseList" @selection-change="handleSelectionChange">
      <el-table-column label="日期" align="center" prop="date" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="机型" align="center" prop="model" />
      <el-table-column label="imei" align="center" prop="imei" />
      <el-table-column label="一级模块" align="center" prop="moduleBase" :show-overflow-tooltip="true" />
      <el-table-column label="二级模块" align="center" prop="moduleSecond" :show-overflow-tooltip="true" />
      <el-table-column label="三级模块" align="center" prop="moduleThird" :show-overflow-tooltip="true" />
      <el-table-column label="问题描述" align="center" prop="describeProblem" :show-overflow-tooltip="true" />
      <el-table-column label="邮箱" align="center" prop="email" :show-overflow-tooltip="true" />
      <el-table-column label="ip" align="center" prop="ip" />
      <el-table-column label="状态" align="center"  >
        <template slot-scope="scope">
          <span :class="scope.row.status==0?'gray':scope.row.status==1?'red':'green'">  {{scope.row.status==0?'未处理':scope.row.status==1?'处理中':'已处理'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:advise:edit']"
          ></el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:advise:remove']"-->
<!--          >删除</el-button>-->
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Status">
          <el-radio v-model="form.status" :label="0">未处理</el-radio>
          <el-radio v-model="form.status" :label="1">处理中</el-radio>
          <el-radio v-model="form.status" :label="2">已处理</el-radio>
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
import { listAdvise, getAdvise, delAdvise, addAdvise, updateAdvise, exportAdvise } from "@/api/system/advise";
import { getListInformation } from "@/api/OS/os";
export default {
  name: "Advise",
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
      statusOptions: [],
      // 【请填写功能名称】表格数据
      adviseList: [],
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
        moduleSecond: null,
        moduleThird: null,
        email: null,
        ip: null,
        date: null,
        country: null,
        model: null,
        brand: null,
        reserved: null,
        reserved1: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
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
     *  @type  0 空为全部
     * */
    getListInformation('',1).then(res => {
      this.informationObj = res.data

    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listAdvise(this.queryParams).then(response => {
        this.adviseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // statusFormat(row, column) {
    //   return this.selectDictLabel(this.statusOptions, row.status);
    // },
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
        moduleSecond: null,
        moduleThird: null,
        email: null,
        ip: null,
        date: null,
        country: null,
        model: null,
        brand: null,
        reserved: null,
        reserved1: null,
        status:"0"
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
    // /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加【请填写功能名称】";
    // },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAdvise(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改Status";

      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAdvise(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAdvise(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return delAdvise(ids);
    //     }).then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     })
    // },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【Advise】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportAdvise(queryParams);
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
