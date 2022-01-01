<!--
 * @Author: zxy
 * @Date: 2021-12-31 14:02:05
 * @LastEditTime: 2022-01-01 19:36:05
 * @FilePath: /sku-blog-vite/src/views/billSystem/billSystem.vue
-->
<template>
  <div class="bill-system-main">
    <div ref="billYearEchartBox" class="bill-system-year-box">

    </div>
  </div>
</template>

<script setup>
// todo dataV不支持vite，所以还是先使用vue-cli开发
import { reactive, ref } from '@vue/reactivity'
import { nextTick, onMounted } from '@vue/runtime-core'
import * as echarts from 'echarts'

const billYearEchartBox = ref(null)

const bill = reactive({
  yearBill: {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: 'line'
      }
    ],
    width: 'auto',
    height: 'auto'
  }
})

/**
 * @description: 生成年度折线图
 * @param {*}
 * @return {*}
 */
const initYearBill = async () => {
  await nextTick()
  const yearEchart = echarts.init(billYearEchartBox.value)

  yearEchart.setOption(bill.yearBill)
}

onMounted(() => {
  // todo 在请求后调用
  initYearBill()
})
</script>

<style lang="scss" scoped>
.bill-system-main {
  min-height: 100vh;
  width: 100vw;
  background-color: #fff;
  z-index: 10;

  .bill-system-year-box {
    width: 100vw;
    height: 600px;
  }
}
</style>