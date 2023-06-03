<template>
  <div class="tools-page">
    <a-typography-title>JSON字符串转JavaScript对象</a-typography-title>
    <a-row :gutter="16">
      <a-col :span="12">
        <div class="left">
          <a-textarea v-model:value="originValue" placeholder="origin value" :rows="44" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="right">
          <a-textarea v-model:value="targetValue" placeholder="target value" :rows="44" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getEmptyJson } from "./empty-json-utils.js"

export default {
  name: "ToolsPage",
  data () {
    return {
      originValue: '',
    }
  },
  computed: {
    targetValue () {
      let value = this.originValue
      if(!value){
        return ''
      }
      return getEmptyJson(value)
    },
  },
}
</script>

<style scoped>
.tools-page{
  padding: 0 30px;
  margin-top: 60px;
}
</style>
