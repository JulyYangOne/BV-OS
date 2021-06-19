<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" width="700px">
    <el-card>
          <div class="text item">日期:{{form.date}}</div>
          <div class="text item">品牌:{{form.brand}}</div>
          <div class="text item">国家:{{form.country}}</div>
          <div class="text item">购买渠道:{{form.channel}}</div>
          <div class="text item">店铺名称:{{form.shopName}}</div>
          <div class="text item">订单号:{{form.orderNumber}}</div>
          <div class="text item">机型:{{form.model}}</div>
          <div class="text item">imei:{{form.imei}}</div>
          <div class="text item">种类:{{form.type}}</div>
          <div class="text item">问题:{{form.problem}}</div>
          <div class="text item">一级模块:{{form.moduleBase}}</div>
          <div class="text item">二级模块:{{form.moduleSecond}}</div>
          <div class="text item">三级模块:{{form.moduleThird}}</div>
          <div class="text item">问题描述: <br>{{form.describeProblem}}</div>
          <div class="text item">邮箱:{{form.email}}</div>
          <div class="text item">状态:{{form.status==0?'未处理':form.status==1?'处理中':'已处理'}}</div>
          <div class="text item">id:{{form.id}}</div>
          <div class="text item">ip:{{form.ip}}</div>
          <div class="text item" style="color: red">feedBack:{{form.feedBack}}</div>
      <!--          <div class="text item">reserved:{{form.reserved}}</div>-->
      <!--          <div class="text item">reserved1:{{form.reserved1}}</div>-->

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
          date:"",
          channel:"",
          brand:"",
          country:"",
          model:"",
          imei:"",
          moduleBase:"",
          moduleSecond:"",
          moduleThird:"",
          orderNumber:"",
          problem:"",
          type:"",
          shopName:"",
          describeProblem:"",
          email:"",
          reserved:"",
          reserved1:"",
          id:"",
          ip:"",
          status:"",

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
    font-size: 14px;
  }

  .item {
    padding: 6px 0;
  }

</style>

