<template>
  <div class="page-container">
    <a-typography-title :level="3">将Windows反斜杠路径转换为斜杠路径，如foo\bar ➔ foo/bar</a-typography-title>
    <a-row :gutter="[16, 8]">
      <a-col :span="24">
        <div class="left">
          <a-textarea v-model:value="originValue" placeholder="origin value" :rows="6" />
        </div>
      </a-col>

      <a-col :span="24">
        <div class="left">
          <a-button @click="winToLinux">转换</a-button>
        </div>
      </a-col>

      <a-col :span="24">
        <div class="right">
          <a-textarea v-model:value="originTargetValue" placeholder="target value" :rows="6" />
        </div>
      </a-col>
    </a-row>
    <a-typography-title class="mt20" :level="3">将Windows反斜杠路径转换为双反斜杠路径，如foo\bar ➔ foo\\bar</a-typography-title>
    <a-row :gutter="[16, 8]">
      <a-col :span="24">
        <div class="left">
          <a-textarea v-model:value="originValue3" placeholder="origin value" :rows="6" />
        </div>
      </a-col>

      <a-col :span="24">
        <div class="left">
          <a-button @click="winToLinux">转换</a-button>
        </div>
      </a-col>

      <a-col :span="24">
        <div class="right">
          <a-textarea v-model:value="originTargetValue3" placeholder="target value" :rows="6" />
        </div>
      </a-col>
    </a-row>
    <a-typography-title class="mt20" :level="3">将斜杠路径转换为Windows反斜杠路径，如foo/bar ➔ foo\bar</a-typography-title>
    <a-row :gutter="[16, 8]">
      <a-col :span="24">
        <div class="left">
          <a-textarea v-model:value="originValue2" placeholder="origin value" :rows="6" />
        </div>
      </a-col>

      <a-col :span="24">
        <div class="left">
          <a-button @click="linuxToWin">转换</a-button>
        </div>
      </a-col>

      <a-col :span="24">
        <div class="right">
          <a-textarea v-model:value="originTargetValue2" placeholder="target value" :rows="6" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "FilePathPage",
  data() {
    return {
      originValue: '',
      originTargetValue: '',
      originValue2: '',
      originTargetValue2: '',
      originValue3: '',
      originTargetValue3: '',
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

</style>
