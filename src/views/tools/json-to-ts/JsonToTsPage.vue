<template>
  <div class="page-container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-typography-title>JSON 转 Ts</a-typography-title>
      </a-col>
      <a-col :span="8">
        <a-form
          layout="inline"
          :model="condition"
        >
          <a-form-item label="包含问号">
            <a-switch v-model:checked="condition.includeQuestionMark" />
          </a-form-item>
          <a-form-item label="包含分号">
            <a-switch v-model:checked="condition.includeSemicolon" />
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <div class="left">
          <a-textarea v-model:value="originValue" placeholder="origin value" :rows="34" />
        </div>
      </a-col>
      <a-col :span="8">
        <div class="right">
          <a-textarea v-model:value="targetValue" placeholder="target value" :rows="34" />
        </div>
      </a-col>
      <a-col :span="8">
        <div class="right">
          <a-textarea v-model:value="targetValue2" placeholder="target value" :rows="34" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {getTsDeclare, getEmptyJson} from '@/views/tools/json-to-ts/utils'

export default {
  name: 'JsonToTsPage',
  data () {
    return {
      originValue: '{"id":14,"content":[{"card":"511381199203012277","phone":"19983181508","username":"张三"}],"reason":"张三","mini_user_id":2,"reservable_type":"activities","reservable_id":29,"created_at":"2023-06-01 00:00:00","updated_at":"2023-06-01 23:58:29","data":null,"check_status":0,"report_count":1,"check_reason":null,"reservable":{"id":29,"title":"4.21活动测试","address":"深圳软件园","times":{"day":["2023-05-12","2023-06-06"],"during":["18:00","23:00"],"whichTime":2},"status":1,"reserved":true,"favorited":false,"feedbacked":false,"today_reserved":false,"covers":[{"id":137,"path":"uploads\\/2023\\/05\\/10\\/a4056fc4bb0e2cbecb2dbd3499481acd.png","mime":"image\\/png","extension":"png","original_name":"shenzheng.png","size":423787,"filename":"a4056fc4bb0e2cbecb2dbd3499481acd.png","type":"cover"}],"tags":[{"id":1,"name":"棋牌类游戏","type":1},{"id":2,"name":"绘本阅读","type":1},{"id":3,"name":"心理咨询","type":1},{"id":4,"name":"心理测评","type":1},{"id":5,"name":"绘画投射","type":1}]}}',
      condition: {
        includeQuestionMark: true,
        includeSemicolon: true
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
      return getTsDeclare(value, 2, this.condition)
    },
    targetValue2 () {
      let value = this.originValue
      if(!value){
        return ''
      }
      return getEmptyJson(value)
    },
  },

}
</script>

<style>

</style>
