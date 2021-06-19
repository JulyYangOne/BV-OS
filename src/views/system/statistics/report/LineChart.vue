<template>
<!--  <div :class="className" :style="{height:height,width:width}" />-->
  <div :class="className" style="width: 100%;height: 350px" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    // width: {
    //   type: String,
    //   default: '100%'
    // },
    // height: {
    //   type: String,
    //   default: '350px'
    // },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
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
        xAxis: {
          data: chartData.date_time,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel:{
            interval:0,
            rotate:40
          },
        },
        grid: {
          left: 50,
          right:50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
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
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['激活数']

        },
        series: [{
          name: '激活数', itemStyle: {
            normal: {
              color: '#4785FF',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          label: {
            show: true,
            position: 'top',
            color:'black'
          },
          smooth: true,
          type: 'bar',
          data: chartData.active_num,
          animationDuration: 1000,
          animationEasing: 'cubicInOut'
        },
        // {
        //   name: 'actual',
        //   smooth: true,
        //   type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#3888fa',
        //       lineStyle: {
        //         color: '#3888fa',
        //         width: 2
        //       },
        //       areaStyle: {
        //         color: '#f3f8ff'
        //       }
        //     }
        //   },

        //   data: actualData,
        //   animationDuration: 2800,
          // animationEasing: 'quadraticOut'
        // }
        ]
      })
    }
  }
}
</script>
<style scoped="scoped">
  .chart{
    width: 100%;
    height: 650px;
  }
</style>
