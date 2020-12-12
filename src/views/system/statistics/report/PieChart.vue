<template>
  <div  style="width:500px;height:500px" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/mixins/resize'

export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)

    },
    setOptions(chartData) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'left',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        // legend: {
        //   left: 'center',
        //   bottom: '10',
        //   data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        // },
        series: [
          {
            name: '国家趋势图',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:chartData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
