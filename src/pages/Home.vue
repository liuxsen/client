<template lang="pug">
  div
    el-container
      el-header 
        .text-right
      el-container
        el-aside(width="200px")
          el-menu(:default-opends="['1-1']", @select="fnHandleSelect" default-active="1-1" background-color="#333333", text-color="#ffffff")
            el-submenu(index="1")
              template(slot="title") 绩效
              el-menu-item-group
                el-menu-item(index="1-1") 员工管理
                el-menu-item(index="1-2") 提成设置
                el-menu-item(index="1-3") 提成报表
                el-menu-item(index="1-4") 业绩报表
                el-menu-item(index="1-5") 工资报表
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
export default class Home extends Vue {
  private fnHandleSelect(index: number, indexPath: string) {
    console.log(index, indexPath);
  }
}
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
