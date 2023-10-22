<template>
  <div class="page-container">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-typography-title>JSON 转 Mybatis XML</a-typography-title>
      </a-col>
      <a-col :span="12">
        <my-clipboard-span :value="targetValue">复制</my-clipboard-span>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <div class="left">
          <a-textarea v-model:value="originValue" placeholder="origin value" :rows="34" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="right">
          <a-textarea v-model:value="targetValue" placeholder="target value" :rows="34" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {parseFun} from './utils';
import {originValue} from './data';

export default {
  name: 'CssToJsonPage',
  data () {
    return {
      originValue: originValue,
    }
  },
  computed: {
    targetValue () {
      let value = this.originValue
      if(!value){
        return ''
      }
      // console.log("",value)
      return JSON.stringify(parseFun(value), null, 2)
    },
  },

}
</script>

<style>

</style>
