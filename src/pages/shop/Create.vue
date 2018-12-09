<template lang="pug">
  div
    el-card
      el-form(ref="oForm", label-width="120px", :model="oForm", :rules="oFormRules")
        el-form-item(label="店铺名称：", prop="name")
          el-input(placeholder="店铺名称", v-model="oForm.name")
        el-form-item(label="是否总店：")
          el-radio-group(v-model="oForm.is_head")
            el-radio(:label="1") 是
            el-radio(:label="0") 否
        el-form-item(label="是否默认门店：")
          el-radio-group(v-model="oForm.is_default")
            el-radio(:label="1") 是
            el-radio(:label="0") 否
        el-form-item(label="是否微信显示：")
          el-radio-group(v-model="oForm.show_wx")
            el-radio(:label="1") 是
            el-radio(:label="0") 否
        el-form-item(label="店铺头像：", prop="avatar")
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
        el-form-item(label="联系电话：", prop="phone")
          el-input(placeholder="联系电话" v-model="oForm.phone")
        el-form-item(label="地址：", prop="address")
          el-input(placeholder="地址" v-model="oForm.address")
        el-form-item(label="经度：")
          el-input(placeholder="经度" v-model="oForm.longitude")
        el-form-item(label="纬度：")
          el-input(placeholder="纬度" v-model="oForm.latitude")
        
      .text-center
        el-button(type="primary", v-if="$route.name === 'shopCreate'" @click="fnNetCShop" size="small") 创建
        el-button(type="primary", v-if="$route.name === 'shopEdit'" @click="fnNetUshop" size="small") 更新
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ShopAttibutes } from '@/interface/index';
import { Ireq } from '@/dc/api/interface';

@Component({
  components: {},
})
export default class Home extends Vue {
  private bIsLoading: boolean = false;
  private oForm = {
    avatar: '', // 头像地址
    name: '', // 店铺名称
    address: '', // 店铺地址
    latitude: '', // 纬度
    longitude: '', // 精度
    remark: '', // 店铺备注
    phone: '', // 店铺电话
    is_head: 0, // 是否总店
    show_wx: 0, // 是否显示微信
    is_default: 0,
  };
  private oFormRules = {
    avatar: [
      {
        required: true,
        message: '请上传店铺头像',
        trigger: 'change',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入店铺名称',
        trigger: 'blur',
      },
    ],
    address: [
      {
        required: true,
        message: '请输入店铺地址',
        trigger: 'blur',
      },
    ],
    remark: [
      {
        required: true,
        message: '请输入店铺备注',
        trigger: 'blur',
      },
    ],
    phone: [
      {
        required: true,
        message: '请输入店铺电话',
        trigger: 'blur',
      },
    ],
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
  // 获取提交表单数据
  private fnBsnGetPostData() {
    const oData: ShopAttibutes = {
      name: this.oForm.name,
      avatar: this.oForm.avatar,
      address: this.oForm.address,
      latitude: this.oForm.latitude,
      longitude: this.oForm.longitude,
      is_head: this.oForm.is_head,
      remark: this.oForm.remark,
      phone: this.oForm.phone,
      show_wx: this.oForm.show_wx,
      is_default: this.oForm.is_default,
    };
    return oData;
  }
  // 创建店铺
  private fnNetCShop() {
    const oForm: any = this.$refs['oForm'];
    oForm.validate((valide: boolean) => {
      if (valide) {
        const data = this.fnBsnGetPostData();
        this.dc.shop
          .create({
            data,
          })
          .then((res) => {
            this.$message.success('创建成功');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  // 更新店铺
  private fnNetUshop() {
    const oForm: any = this.$refs['oForm'];
    oForm.validate((valide: boolean) => {
      if (valide) {
        const data = this.fnBsnGetPostData();
        const options = {
          extUrl: `/${this.$route.params.id}`,
          data,
        };
        this.dc.shop
          .update(options)
          .then((res) => {
            this.$message.success('更新成功');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  // 获取店铺详情
  private fnNetRShopDetail() {
    const shopId = this.$route.params.id;
    const options = {
      extUrl: `/${shopId}`,
    };
    this.bIsLoading = true;
    this.dc.shop
      .retreive(options)
      .then((res: any) => {
        console.log(res);
        this.oForm = res;
      })
      .finally(() => {
        this.bIsLoading = false;
      });
  }
  private created() {
    const sRouteName = this.$route.name;
    if (sRouteName === 'shopEdit') {
      this.fnNetRShopDetail();
    }
  }
}
</script>
