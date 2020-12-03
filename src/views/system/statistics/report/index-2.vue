<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog"  width="700px">
    <el-card>
      <div slot="header">
        <span>收货信息</span>
      </div>
      <div class="text item">用户昵称:Bersani Andrea</div>
      <div class="text item">收货人:Bersani Andrea</div>
      <div class="text item">联系电话:3282630127</div>
            <div class="text item">收货地址:  Via Monte Osero, 7/C, Piacenza (PC) 29121 </div>
      <!--      <div class="text item">-->

      <!--      </div>-->
<!--      <div class="text item" >-->
<!--   -->

<!--      </div>-->
      <div class="text item">   </div>
      <div class="text item">用户备注:Returned goods (value 20€)</div>
    </el-card>
    <el-card>
      <div slot="header">
        <span>订单信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="text item">订单编号:1328699208248590336</div>
          <div class="text item">商品总数:2 </div>
          <div class="text item">Shipping Method: expedited</div>
          <div class="text item">支付邮费: 0</div>  <!-- totalPostage-->
          <div class="text item">payPrice:20€</div>
          <div class="text item">支付方式: paypal</div>
        </el-col>
        <el-col :span="12">
          <div class="text item">订单状态: 未发货</div>
          <div class="text item">商品总价: 20€</div>
          <div class="text item">优惠券金额:0</div>
          <div class="text item">创建时间: 2020-11-17 13:59:11</div>
          <div class="text item">支付时间:2020-11-17 14:11:58</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">
        <span>物流信息</span>
      </div>
      <div class="text item">快递公司:{{ form.deliveryName }}</div>
      <div class="text item">快递单号:{{ form.deliveryId }}</div>
    </el-card>
    <el-card>
      <div slot="header">
        <span>备注信息</span>
      </div>
      <div class="text item">{{ form.remark }}</div>
    </el-card>
  </el-dialog>
</template>

<script>
  // import { add, edit } from '@/api/yxStoreOrder'
  export default {
    props: {
      // isAdd: {
      //   type: Boolean,
      //   required: true
      // }
    },
    data() {
      return {
        loading: false, dialog: true,
        form: {
          id: '',
          orderId: '',
          uid: '',
          realName: '',
          userPhone: '',
          userAddress: '',
          cartId: '',
          freightPrice: '',
          totalNum: '',
          totalPrice: '',
          totalPostage: '',
          payPrice: '',
          payPostage: '',
          deductionPrice: '',
          couponId: '',
          couponPrice: '',
          paid: '',
          payTime: '',
          payType: '',
          addTime: '',
          status: '',
          refundStatus: '',
          refundReasonWapImg: '',
          refundReasonWapExplain: '',
          refundReasonTime: '',
          refundReasonWap: '',
          refundReason: '',
          refundPrice: '',
          deliveryName: '',
          deliveryType: '',
          deliveryId: '',
          gainIntegral: '',
          useIntegral: '',
          backIntegral: '',
          mark: '',
          isDel: '',
          unique: '',
          remark: '',
          merId: '',
          isMerCheck: '',
          combinationId: '',
          pinkId: '',
          cost: '',
          seckillId: '',
          bargainId: '',
          verifyCode: '',
          storeId: '',
          shippingType: '',
          isChannel: '',
          isRemind: '',
          isSystemDel: '',
          mark:'',
          billAddress:''
        },
        rules: {
          unique: [
            { required: true, message: 'please enter', trigger: 'blur' }
          ]
        }
      }
    },
    filters:{


    },
    methods: {
      GetEmail(val){
        if(val != ''){
          var res = JSON.parse(val)
          var address =  `
         <p><span style='display:inline-block;width: 100px;'> Address:</span>${res.address}</p>
         <p><span style="display:inline-block;width: 100px;"> City:</span>${res.city}</p>
         <p><span style="display:inline-block;width: 100px;"> Postal:</span>${res.zip}</p>
         <p><span style="display:inline-block;width: 100px;"> Zone:</span>${res.state}</p>
         <p><span style="display:inline-block;width: 100px;"> Country:</span>${ res.country}</p>
         <p><span style="display:inline-block;width: 100px;"> Telephone:</span>${res.phone}</p>
          <p><span style="display:inline-block;width: 100px;"> Email:</span>${res.email}</p>
                  `

          return address
        }
      },
      orderAddress(val){
        if(val.userAddress != '' || val.billAddress){
          var email = JSON.parse(val.billAddress)
          var res = JSON.parse(val.userAddress)
          var address =  `
         <p><span style="display:inline-block;width: 100px;">Address:</span>${res.detail}</p>
         <p><span style="display:inline-block;width: 100px;"> City:</span>${res.city}</p>
         <p><span style="display:inline-block;width: 100px;"> Postal:</span>${res.postCode}</p>
         <p><span style="display:inline-block;width: 100px;"> Zone:</span>${res.province}</p>
         <p><span style="display:inline-block;width: 100px;"> Country:</span>${ res.country}</p>
         <p><span style="display:inline-block;width: 100px;"> Telephone:</span>${res.phone}</p>
         <p><span style="display:inline-block;width: 100px;"> Email:</span>${email.email}</p>
  `

          return address
        }

      },
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        this.loading = true
        if (this.isAdd) {
          this.doAdd()
        } else this.doEdit()
      },
      doAdd() {
        add(this.form).then(res => {
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      doEdit() {
        edit(this.form).then(res => {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      resetForm() {
        this.dialog = false

        if (this.$refs['form']!==undefined) {
          this.$refs['form'].resetFields()
        }

        this.form = {
          id: '',
          orderId: '',
          uid: '',
          realName: '',
          userPhone: '',
          userAddress: '',
          cartId: '',
          freightPrice: '',
          totalNum: '',
          totalPrice: '',
          totalPostage: '',
          payPrice: '',
          payPostage: '',
          deductionPrice: '',
          couponId: '',
          couponPrice: '',
          paid: '',
          payTime: '',
          payType: '',
          addTime: '',
          status: '',
          refundStatus: '',
          refundReasonWapImg: '',
          refundReasonWapExplain: '',
          refundReasonTime: '',
          refundReasonWap: '',
          refundReason: '',
          refundPrice: '',
          deliveryName: '',
          deliveryType: '',
          deliveryId: '',
          gainIntegral: '',
          useIntegral: '',
          backIntegral: '',
          mark: '',
          isDel: '',
          unique: '',
          remark: '',
          merId: '',
          isMerCheck: '',
          combinationId: '',
          pinkId: '',
          cost: '',
          seckillId: '',
          bargainId: '',
          verifyCode: '',
          storeId: '',
          shippingType: '',
          isChannel: '',
          isRemind: '',
          isSystemDel: '',
          billAddress:''
        }
      }
    },
  }
</script>

<style scoped>
  .text {
    font-size: 12px;
  }

  .item {
    padding: 6px 0;
  }

</style>

