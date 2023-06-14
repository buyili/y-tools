<template>
  <span v-if="value" v-clipboard="value">
    <slot>
      {{value}}<copy-outlined />
    </slot>
  </span>
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

