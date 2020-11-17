<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" width="700px">
    <el-card>
          <div class="text item">date:{{form.date}}</div>
          <div class="text item">brand:{{form.brand}}</div>
          <div class="text item">country:{{form.country}}</div>
          <div class="text item">areaVersion:{{form.areaVersion}}</div>
          <div class="text item">id:{{form.id}}</div>
          <div class="text item">imei:{{form.imei}}</div>
          <div class="text item">imsi:{{form.imsi}}</div>
          <div class="text item">ipAddress:{{form.ipAddress}}</div>
          <div class="text item">model:{{form.model}}</div>
          <div class="text item">osVersion:{{form.osVersion}}</div>
          <div class="text item">romVersion:{{form.romVersion}}</div>
          <div class="text item">params:{{form.params}}</div>
          <div class="text item">createBy:{{form.createBy}}</div>
          <div class="text item">createTime:{{form.createTime}}</div>
          <div class="text item">remark:{{form.remark}}</div>
          <div class="text item">searchValue:{{form.searchValue}}</div>
          <div class="text item">updateBy:{{form.updateBy}}</div>
          <div class="text item">updateTime:{{form.updateTime}}</div>
          <div class="text item">userBrand:{{form.userBrand}}</div>
          <div class="text item">userBrand:{{form.userBrand}}</div>
          <div class="text item">userModels:{{form.userModels}}</div>
          <div class="text item">uuid:{{form.uuid}}</div>
    </el-card>
  </el-dialog>
</template>

<script>


  export default {
    props: {

    },
    data() {
      return {
        loading: false, dialog: false,
        form: {


        }
      }
    },
    filters:{


    },
    methods: {

      cancel() {
        this.resetForm()
      },
      doSubmit() {

      },

      resetForm() {
        this.dialog = false

        if (this.$refs['form1']!==undefined) {
          this.$refs['form1'].resetFields()
        }

        this.form = {

        }
      }
    },
  }
</script>

<style scoped>
  .text {
    font-size:14px;
  }

  .item {
    padding: 6px 0;
  }

</style>

