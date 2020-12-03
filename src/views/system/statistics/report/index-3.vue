<template>
<div @click="handleC">

    我是报表
</div>
</template>

<script>
  // import { add, edit } from '@/api/yxStoreOrder'
  export default {
    name:'report',
    data() {
      return {

      }
    },
    methods:{
      handleC(){
        console.log(111)
      }
    }


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

