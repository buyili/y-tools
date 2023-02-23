<template>
  <span v-if="value" v-clipboard="value">{{value}}<copy-outlined /></span>
</template>

<script>
import { CopyOutlined } from '@ant-design/icons-vue';

export default {
  name: 'MyClipboardSpan',
  components: {CopyOutlined},
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
  },
}
</script>

