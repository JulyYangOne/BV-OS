<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="品牌编码" prop="brandCode">
        <el-input
          v-model="queryParams.brandCode"
          placeholder="请输入品牌编码"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="品牌名称" prop="brandName">
        <el-input
          v-model="queryParams.brandName"
          placeholder="请输入品牌名称"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:brand:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:brand:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:brand:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:brand:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="brandList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="品牌ID" align="center" prop="brandId" />-->
      <el-table-column label="品牌编码" align="center" prop="brandCode" />
      <el-table-column label="品牌名称" align="center" prop="brandName" />
      <el-table-column label="显示顺序" align="center" prop="brandSort" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:brand:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:brand:remove']"
          >删除</el-button>
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

    <!-- 添加或修改品牌对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品牌编码" prop="brandCode">
          <el-input v-model="form.brandCode" placeholder="请输入品牌编码" />
        </el-form-item>
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="form.brandName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="brandSort">
          <el-input v-model="form.brandSort" placeholder="请输入显示顺序" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
<!--        <el-form-item label="预留字段1" prop="brandReserved1">-->
<!--          <el-input v-model="form.brandReserved1" placeholder="请输入预留字段1" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预留字段2" prop="brandReserved2">-->
<!--          <el-input v-model="form.brandReserved2" placeholder="请输入预留字段2" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预留字段3" prop="brandReserved3">-->
<!--          <el-input v-model="form.brandReserved3" placeholder="请输入预留字段3" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预留字段4" prop="brandReserved4">-->
<!--          <el-input v-model="form.brandReserved4" placeholder="请输入预留字段4" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预留字段5" prop="brandReserved5">-->
<!--          <el-input v-model="form.brandReserved5" placeholder="请输入预留字段5" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预留字段6" prop="brandReserved6">-->
<!--          <el-input v-model="form.brandReserved6" placeholder="请输入预留字段6" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBrand, getBrand, delBrand, addBrand, updateBrand, exportBrand } from "@/api/system/brand";

export default {
  name: "Brand",
  data() {
    return {
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
      // 品牌表格数据
      brandList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        brandCode: null,
        brandName: null,
        brandSort: null,
        brandReserved1: null,
        brandReserved2: null,
        brandReserved3: null,
        brandReserved4: null,
        brandReserved5: null,
        brandReserved6: null
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
  },
  methods: {
    /** 查询品牌列表 */
    getList() {
      this.loading = true;
      listBrand(this.queryParams).then(response => {
        this.brandList = response.rows;
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
        brandId: null,
        brandCode: null,
        brandName: null,
        brandSort: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        brandReserved1: null,
        brandReserved2: null,
        brandReserved3: null,
        brandReserved4: null,
        brandReserved5: null,
        brandReserved6: null
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
      this.ids = selection.map(item => item.brandId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加品牌";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const brandId = row.brandId || this.ids
      getBrand(brandId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改品牌";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.brandId != null) {
            updateBrand(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBrand(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const brandIds = row.brandId || this.ids;
      this.$confirm('是否确认删除品牌编号为"' + brandIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBrand(brandIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有品牌数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBrand(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
