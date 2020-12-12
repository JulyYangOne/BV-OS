<template>
  <el-tabs v-model="activeName" style="padding-left: 8px;" @tab-click="tabClick">
    <el-tab-pane label="趋势图" name="first">
      <report ref="report"></report>
<!--      <detailList ref="detail" />-->
    </el-tab-pane>
    <el-tab-pane label="区域" name="second">
      <IndexCountry ref="country"></IndexCountry>
<!--      <report ref="report" />-->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import report from './index_date'
  import IndexCountry  from './index_country'

  export default {
    name: 'Storage',
    components: { report,IndexCountry },
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      tabClick(name) {
        if (this.activeName === 'first') {
          this.$refs.report.handleQuery()
        } else {
          this.$refs.country.handleQuery()
        }
      }
    }
  }
</script>

<style scoped>
</style>
