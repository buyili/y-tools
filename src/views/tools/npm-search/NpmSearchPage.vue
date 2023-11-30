<template>
  <div class="npm-search-container">
    <a-space direction="vertical" style="width: 100%">
      <div style="text-align: center">
        <a-button @click="loadInit">加载示例</a-button>
      </div>
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        @finish="search"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
        <a-input-group compact style="width: 100%;display: flex;">
          <a-form-item name="packageName">
            <a-input v-model:value="formState.packageName" placeholder="package name" style="width: 230px;text-align: left;" />
            <div>示例：ts-loader、@ant-design/icons-vue</div>
          </a-form-item>
          <a-form-item
            name="dependencyPackageSpec"
            style="width: calc(100% - 230px)"
          >
            <a-input
              v-model:value="formState.dependencyPackageSpec"
              placeholder="dependency package spec"
            />
            <div>依赖包过滤字符示例： webpack、webpack@3.0.0、webpack@^3.0.0、webpack@~3.0.0</div>
          </a-form-item>

          <a-button
            class="ml8"
            type="primary"
            shape="round"
            :loading="loading"
            html-type="submit"
          >
            <template #icon><SearchOutlined /></template>
            搜索
          </a-button>
        </a-input-group>
      </a-form>

      <!--    搜索结果展示-->
      <div class="mt20" />
      <a-card>
        <a-typography-title :level="4" style="font-size: 16px;">搜索结果:</a-typography-title>
        <a-spin :spinning="loading">
          <div class="version-list-wrapper">
            <template v-if="searchResultVersions && searchResultVersions.length">
              <ul class="version-list">
                <li v-for="rs in searchResultVersions" :key="rs.version" class="version-list-item">
                  <a :href="buildPackagePageUrl(rs)" target="_blank">{{ rs.name }}@{{ rs.version }}</a>
                  <span class="mr40" />
                  <a :href="buildPackagePageDepsUrl(rs)" target="_blank">依赖信息</a>
                </li>
              </ul>
            </template>
            <template v-else>
              <a-empty />
            </template>
          </div>
        </a-spin>
      </a-card>
    </a-space>
  </div>
</template>

<script>
import { findVersionsByDependency } from '@/views/tools/npm-search/utils'
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  name: 'NpmSearchPage',
  components: {
    SearchOutlined
  },
  data() {
    return {
      loading: false,
      formState: {
        packageName: '',
        dependencyPackageSpec: '',
      },
      rules: {
        packageName: [{ required: true, message: '请输入包名', trigger: 'change' }],
        dependencyPackageSpec: [{ required: true, message: '请输入依赖包过滤字符', trigger: 'change' }],
      },
      searchResultVersions: []
    }
  },
  methods: {
    loadInit(){
      this.formState.packageName = 'ts-loader'
      this.formState.dependencyPackageSpec = 'webpack@^3.0.0'
    },
    search(values) {
      // const qs = this.formState.packageName.trim()
      // const packageSpec = this.formState.dependencyPackageSpec.trim()
      //或者
      const qs = values.packageName.trim()
      const packageSpec = values.dependencyPackageSpec.trim()
      this.loading = true
      fetch("https://registry.npmmirror.com/" + qs).then(res=>{
        res.json().then(resp=>{
          this.searchResultVersions = findVersionsByDependency(resp.versions, packageSpec)
          this.loading = false
        }).catch(()=>{
          this.loading = false
        })
      }).catch(()=>{
        this.loading = false
      })
    },
    handleFinishFailed(errors){
      // console.log(errors)
    },
    handleValidate(...args){
      // console.log(args)
    },
    buildPackagePageUrl(version){
      return `https://npmmirror.com/package/${version.name}?version=${version.version}`
    },
    buildPackagePageDepsUrl(version){
      return `https://npmmirror.com/package/${version.name}/deps?version=${version.version}`
    }
  },
}
</script>

<style scoped lang="less">
.npm-search-container{
  width: 800px;
  margin: 0 auto;
  a{
    color: #1677ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  .version-list-wrapper{
    height: 500px;
    overflow-y: auto;
  }
  .version-list{
    list-style: none;
    font-size: 16px;
    color: #000;
    padding: 0;
    overflow-y: auto;
  }
  .version-list-item{
    margin: 16px;
  }
}
</style>
