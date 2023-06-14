<template>
  <div class="page-container">
    <template v-for="(item, index) in notes" :key="index">
      <div class="note-list-item">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "NotesPage",
  data() {
    return {
      notes: [
        { title: 'webstorm设置导入文件时的后缀是否省略(.vue省略报错可以看)', link: 'https://blog.csdn.net/weixin_49274461/article/details/124416109' },
        { title: 'webstorm引入时不要忽略文件扩展名', link: 'https://blog.csdn.net/u010281877/article/details/116492833' },
        { title: 'Webstorm 关闭自动保存功能', link: 'https://blog.csdn.net/GrootBaby/article/details/95500077' },
        { title: '前端海报生成的不同方案和优劣（包含dom-to-image图片模糊失真的解决方案）', link: 'https://jishuin.proginn.com/p/763bfbd570dc' },
      ]
    }
  },
}
</script>

<style scoped>

</style>
