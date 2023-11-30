<template>
  <div>
    <a-button @click="loadInit">加载示例</a-button>
    <a-input-group compact>
      <a-input v-model:value="packageName" placeholder="package name" style="width: 30%" />
      <a-input-search
        v-model:value="dependencyPackageSpec"
        placeholder="dependency package spec"
        style="width: 50%"
        :loading="loading"
        enter-button
        @search="search"
      />
    </a-input-group>

    <!--    搜索结果展示-->
    <div v-for="rs in searchResultVersions" :key="rs.version">
      {{ rs.name }}@{{ rs.version }}
    </div>
  </div>
</template>

<script>
import { findVersionsByDependency } from '@/views/tools/npm-search/utils'

export default {
  name: 'NpmSearchPage',
  data() {
    return {
      loading: false,
      packageName: '',
      dependencyPackageSpec: '',
      searchResultVersions: []
    }
  },
  methods: {
    loadInit(){
      this.packageName = 'less-loader'
      this.dependencyPackageSpec = 'webpack@^3.0.0'
    },
    search() {
      const qs = this.packageName
      const packageSpec = this.dependencyPackageSpec
      fetch("https://registry.npmmirror.com/" + qs).then(res=>{
        res.json().then(resp=>{
          console.log(resp);
          this.searchResultVersions = findVersionsByDependency(resp.versions, packageSpec)
        })
      })
    }
  },
}
</script>

<style scoped>

</style>
