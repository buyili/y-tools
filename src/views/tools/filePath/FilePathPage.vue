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
            <my-clipboard-span :value="fastConversion.forwardSlashValue" />
          </div>
        </a-row>
        <a-typography-title class="mt20" :level="3">转换为反斜杠路径，如：foo/bar</a-typography-title>
        <a-row :gutter="[16, 8]">
          <!--          <a-textarea v-model:value="fastConversion.backSlashValue" placeholder="target value" :rows="6" />-->
          <div class="target-value-preview">
            <my-clipboard-span :value="fastConversion.forwardSlashValue" />
          </div>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import MyClipboardSpan from "/src/components/Clipboard/MyClipboardSpan.vue";
const forwardToBackSlash = (value)=>{
  return value.replaceAll("/", "\\")
}
const forwardToDoubleBackSlash = (value)=>{
  return value.replaceAll("/", "\\\\")
}
const backToForwardSlash = (value)=>{
  return value.replaceAll("\\", "/")
}
const backToDoubleBackSlash = (value)=>{
  return value.replaceAll("\\", "\\\\")
}
const doubleBackToForwardSlash=(value)=>{
  return value.replaceAll("\\\\", "/")
}
const doubleBackToBackSlash=(value)=>{
  return value.replaceAll("\\\\", "\\")
}
export default {
  name: "FilePathPage",
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
      if(newValue.indexOf("\\") !== -1){
        newValue = backToForwardSlash(newValue)
      }else if(newValue.indexOf("\\\\") !== -1){
        newValue = doubleBackToForwardSlash(newValue)
      }
      this.fastConversion.forwardSlashValue = newValue
      this.fastConversion.backSlashValue = forwardToBackSlash(newValue)
      this.fastConversion.doubleBackSlashValue = forwardToDoubleBackSlash(newValue)
    }
  },
  methods: {
    winToLinux() {

    },
    linuxToWin() {

    }
  },
}
</script>

<style scoped>
.target-value-preview{
  width: 100%;
  height: 140px;
  padding: 8px 12px;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
}
</style>
