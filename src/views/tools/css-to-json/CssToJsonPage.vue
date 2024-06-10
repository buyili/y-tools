<template>
  <div class="page-container">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-typography-title>JSON 转 Mybatis XML</a-typography-title>
      </a-col>
      <a-col :span="12">
        <a-form
          layout="inline"
          :model="condition"
        >
          <a-form-item label="HarmonyOS">
            <a-space>
              <a-switch v-model:checked="condition.isHOS" />
              <a
                href="https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V2/js-appendix-types-0000001478341245-V2#ZH-CN_TOPIC_0000001523648682__%E9%A2%9C%E8%89%B2%E7%B1%BB%E5%9E%8B"
              >
                HarmonyOS HEX格式为#aarrggbb
              </a>
            </a-space>
          </a-form-item>
        </a-form>
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
      condition: {
        isHOS: false,
      }
    }
  },
  computed: {
    targetValue () {
      let value = this.originValue
      if(!value){
        return ''
      }
      // console.log("",value)
      return JSON.stringify(parseFun(value, {forHOS: this.condition.isHOS}), null, 2)
    },
  },

}
</script>

<style>

</style>
