<template lang="pug">
  div
    el-card
      el-form(label-width="120px")
        el-form-item(label="店铺名称：")
          el-input(placeholder="店铺名称", name="oForm.name")
        el-form-item(label="店铺头像：")
          el-upload(
            class="avatar-uploader"
            action="/api/base/upload"
            :show-file-list="false"
            :on-success="fnHandleAvatarSuccess"
            name="file"
            :before-upload="fnBeforeAvatarUpload"
            )
            img(v-if="oForm.avatar" :src="oForm.avatar" class="avatar")
            i(v-else class="el-icon-plus avatar-uploader-icon")
        el-form-item(label="联系电话：")
          el-input(placeholder="联系电话")
        el-form-item(label="地址：")
          el-input(placeholder="地址")
        el-form-item(label="是否总店：")
          el-radio-group
            el-radio() 是
            el-radio() 否
      .text-center
        el-button(type="primary", @click="fnNetCShop" size="small") 创建
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ShopAttibutes } from '@/typings/interface';
@Component({
  components: {},
})
export default class Home extends Vue {
  private oForm = {
    avatar: '', // 头像地址
    name: '', // 店铺名称
    address: '', // 店铺地址
    latitude: '', // 纬度
    longitude: '', // 精度
    remark: '', // 店铺备注
  };
  // 上传头像成功回调
  private fnHandleAvatarSuccess(response: any, file: File, fileList: File[]) {
    console.log('scuccess');
    console.log(response, file, fileList);
    this.oForm.avatar = response.data.result.file;
  }
  // 上传头像之前
  private fnBeforeAvatarUpload() {
    console.log('beforeupdate');
  }
  // 创建店铺
  private fnNetCShop() {
    // const oData: ShopAttibutes = {
    //   name:
    // }
    const options = {
      // data
    };
  }
}
</script>
