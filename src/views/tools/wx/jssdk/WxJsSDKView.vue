<template>
  <div class="page-container">
    <a-row :gutter="[64, 8]">
      <a-col :span="12">
        <a-typography-title :level="3">Method Name</a-typography-title>
        <a-row :gutter="[16, 8]">
          <a-textarea v-model:value="fastConversion.originValue" placeholder="origin value" :rows="6" />
        </a-row>
      </a-col>

      <a-col :span="12">
        <a-typography-title class="" :level="3">Callback and CallbackResult</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.forwardSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.callbackAndCallbackResultValue" />
          </div>
        </a-row>
        <a-typography-title class="mt20" :level="3">Option</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.doubleBackSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.optionValue" />
          </div>
        </a-row>
        <a-typography-title class="mt20" :level="3">Method</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.backSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.methodValue" />
          </div>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import MyClipboardSpan from "@/components/Clipboard/MyClipboardSpan.vue";
import {toPascalCase} from "@/utils";

export default {
  name: "WxJsSDKView",
  components: {MyClipboardSpan},
  data() {
    return {
      originValue: '',
      originTargetValue: '',
      originValue2: '',
      originTargetValue2: '',
      originValue3: '',
      originTargetValue3: '',
      fastConversion: {
        originValue: '',
        //正斜杠
        callbackAndCallbackResultValue: '',
        //反斜杠
        methodValue: '',
        //双反斜杠
        optionValue: '',
      }
    }
  },
  watch: {
    originValue(newValue, oldValue) {
      this.originTargetValue = newValue.replaceAll("\\", "/")
    },
    originValue2(newValue, oldValue) {
      this.originTargetValue2 = newValue.replaceAll("/", "\\")
    },
    originValue3(newValue, oldValue) {
      this.originTargetValue3 = newValue.replaceAll("\\", "\\\\")
    },
    ['fastConversion.originValue'](newValue){
      let pascalCaseVar = toPascalCase(newValue)
      this.fastConversion.callbackAndCallbackResultValue = `
  interface ${pascalCaseVar}SuccessCallbackResult extends GeneralCallbackResult {}
  interface ${pascalCaseVar}FailCallbackResult extends GeneralCallbackResult {}
  interface ${pascalCaseVar}CompleteCallbackResult extends GeneralCallbackResult {}
  /** 接口调用成功的回调函数 */
  type ${pascalCaseVar}SuccessCallback = (
    res: ${pascalCaseVar}SuccessCallbackResult
  ) => void;
  /** 接口调用失败的回调函数 */
  type ${pascalCaseVar}FailCallback = (
    res: ${pascalCaseVar}FailCallbackResult
  ) => void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  type ${pascalCaseVar}CompleteCallback = (
    res: ${pascalCaseVar}CompleteCallbackResult
  ) => void;
      `.replace("\n", '')
//       this.fastConversion.backSlashValue = `
// ${newValue}<T extends ${pascalCaseVar}Option = ${pascalCaseVar}Option>(
//   option: T,
// ): void;
// `
      this.fastConversion.methodValue = `
${newValue}(
  option: ${pascalCaseVar}Option,
): void;
`.replace("\n", '')
      this.fastConversion.optionValue = `
  interface ${pascalCaseVar}Option {
    /** 接口调用成功的回调函数 */
    success?: ${pascalCaseVar}SuccessCallback;
    /** 接口调用失败的回调函数 */
    fail?: ${pascalCaseVar}FailCallback;
    /** 接口调用结束的回调函数（调用成功、失败都会执行）*/
    complete?: ${pascalCaseVar}CompleteCallback;
  }
      `.replace("\n", '')
    }
  },
  created() {
    this.fastConversion.originValue='playVoice'
  },
  methods: {
    winToLinux() {

    },
    linuxToWin() {

    }
  },
}
</script>

<style lang="less" scoped>
.target-value-preview{
  width: 100%;
  height: 140px;
  padding: 8px 12px;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  overflow-y: auto;
  :deep(.my-clipboard){
    white-space: pre;
  }
}
</style>
