<template>
  <div class="page-container">
    <a-row :gutter="[64, 8]">
      <a-col :span="12">
        <a-typography-title :level="3">将Windows反斜杠路径转换为正斜杠路径，如foo\bar ➔ foo/bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <a-col :span="24">
            <div class="left">
              <a-textarea v-model:value="originValue" placeholder="origin value" :rows="3" />
            </div>
          </a-col>

          <a-col :span="24">
            <div class="left">
              <a-button @click="winToLinux">转换</a-button>
            </div>
          </a-col>

          <a-col :span="24">
            <div class="right">
              <a-textarea v-model:value="originTargetValue" placeholder="target value" :rows="3" />
            </div>
          </a-col>
        </a-row>
        <a-typography-title class="mt40" :level="3">将Windows反斜杠路径转换为双反斜杠路径，如foo\bar ➔ foo\\bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <a-col :span="24">
            <div class="left">
              <a-textarea v-model:value="originValue3" placeholder="origin value" :rows="3" />
            </div>
          </a-col>

          <a-col :span="24">
            <div class="left">
              <a-button @click="winToLinux">转换</a-button>
            </div>
          </a-col>

          <a-col :span="24">
            <div class="right">
              <a-textarea v-model:value="originTargetValue3" placeholder="target value" :rows="3" />
            </div>
          </a-col>
        </a-row>
        <a-typography-title class="mt40" :level="3">将斜杠路径转换为Windows反斜杠路径，如foo/bar ➔ foo\bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <a-col :span="24">
            <div class="left">
              <a-textarea v-model:value="originValue2" placeholder="origin value" :rows="3" />
            </div>
          </a-col>

          <a-col :span="24">
            <div class="left">
              <a-button @click="linuxToWin">转换</a-button>
            </div>
          </a-col>

          <a-col :span="24">
            <div class="right">
              <a-textarea v-model:value="originTargetValue2" placeholder="target value" :rows="3" />
            </div>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="12">
        <a-typography-title :level="3">源路径，如：foo\bar  foo\\bar  foo/bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <a-textarea v-model:value="fastConversion.originValue" placeholder="origin value" :rows="6" />
        </a-row>
        <a-typography-title class="mt40" :level="3">转换为正斜杠路径，如：foo/bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.forwardSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview" placeholder="target value">
            <my-clipboard-span :value="fastConversion.forwardSlashValue" />
          </div>
        </a-row>
        <a-typography-title class="mt20" :level="3">转换为双反斜杠路径，如：foo\\bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.doubleBackSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.doubleBackSlashValue" />
          </div>
        </a-row>
        <a-typography-title class="mt20" :level="3">转换为反斜杠路径，如：foo/bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.backSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.backSlashValue" />
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
        forwardSlashValue: '',
        //反斜杠
        backSlashValue: '',
        //双反斜杠
        doubleBackSlashValue: '',
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
      this.fastConversion.forwardSlashValue = `
  interface ${pascalCaseVar}SuccessCallbackResult extends GeneralCallbackResult {
  }
  interface ${pascalCaseVar}FailCallbackResult extends GeneralCallbackResult {
  }
  interface ${pascalCaseVar}CompleteCallbackResult extends GeneralCallbackResult {
  }
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
      `
//       this.fastConversion.backSlashValue = `
// ${newValue}<T extends ${pascalCaseVar}Option = ${pascalCaseVar}Option>(
//   option: T,
// ): void;
// `
      this.fastConversion.backSlashValue = `
${newValue}(
  option: ${pascalCaseVar}Option,
): void;
`
      this.fastConversion.doubleBackSlashValue = `
  interface ${pascalCaseVar}Option {
    /** 接口调用成功的回调函数 */
    success?: ${pascalCaseVar}SuccessCallback;
    /** 接口调用失败的回调函数 */
    fail?: ${pascalCaseVar}FailCallback;
    /** 接口调用结束的回调函数（调用成功、失败都会执行）*/
    complete?: ${pascalCaseVar}CompleteCallback;
  }
      `
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
  ::v-deep .my-clipboard{
    white-space: pre;
  }
}
</style>
