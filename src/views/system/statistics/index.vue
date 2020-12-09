<template>
  <el-tabs v-model="activeName" style="padding-left: 8px;" @tab-click="tabClick">
    <el-tab-pane label="销统列表" name="first">
      <detailList ref="detail" />
    </el-tab-pane>
    <el-tab-pane label="销统报表" name="second">
      <report ref="report" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import report from './report/index'
  import detailList from './detail_list/index'

  export default {
    name: 'Storage',
    components: { report, detailList },
    data() {
      return {
        activeName: 'second'
      }
    },
    methods: {
      tabClick(name) {
        if (this.activeName === 'first') {
          this.$refs.detail.handleQuery()
        } else {
          this.$refs.second.handleQuery()
        }
      }
    }
  }
</script>

<style scoped>
</style>
