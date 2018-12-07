<template lang="pug">
  div
    el-container
      el-header 
        .text-right
      el-container
        el-aside(width="200px")
          el-menu(:default-opends="['1']")
            el-submenu(index="1")
              template(slot="title") 导航一
              el-menu-item-group
                el-menu-item(index="1-1") 选项1
                el-menu-item(index="1-2") 选项1
        el-container
          el-main
            div.h-750.fs-14
              h3 {{ $route.meta.title }}
              router-view
          el-footer footer
      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
