<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" width="700px">
    <el-card>
          <div class="text item">date:{{form.date}}</div>
          <div class="text item">channel:{{form.channel}}</div>
          <div class="text item">brand:{{form.brand}}</div>
          <div class="text item">country:{{form.country}}</div>
          <div class="text item">model:{{form.model}}</div>
          <div class="text item">imei:{{form.imei}}</div>
          <div class="text item">moduleBase:{{form.moduleBase}}</div>
          <div class="text item">moduleSecond:{{form.moduleSecond}}</div>
          <div class="text item">moduleThird:{{form.moduleThird}}</div>
          <div class="text item">orderNumber:{{form.orderNumber}}</div>
          <div class="text item">problem:{{form.problem}}</div>
          <div class="text item">type:{{form.type}}</div>
          <div class="text item">shopName:{{form.shopName}}</div>
          <div class="text item">describeProblem: <br>{{form.describeProblem}}</div>
          <div class="text item">id:{{form.id}}</div>
          <div class="text item">ip:{{form.ip}}</div>
<!--          <div class="text item">Status:{{form.status}}</div>-->
          <div class="text item">Status:{{form.status==0?'未处理':form.status==1?'处理中':'已处理'}}</div>
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

