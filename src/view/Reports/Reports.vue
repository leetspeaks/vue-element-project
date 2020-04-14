<template>
  <el-card>
    <my-bread lv1="数据统计" lv2="数据报表"></my-bread>
    <div id="main"></div>
  </el-card>
</template>

<script>
var echart = require('echarts');
export default {
  mounted() {
      this.getReports()
  },
  methods: {
      async getReports() {
    var myEchart = echart.init(document.getElementById('main'))
    const res = await this.$http.get('reports/type/1')
    console.log(res)
    let option2 = res.data.data
    let option1 = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
      let options = {...option1,...option2}
      myEchart.setOption(options)
  }
  },
}
</script>

<style>
#main {
  width: 600px;
  height: 400px;
}
</style>
