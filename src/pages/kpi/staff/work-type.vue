<template lang='pug'>
  el-card
    el-form(ref="oForm" label-width="120px", :model="oForm", :rules="oFormRules")
      el-form-item(label="选择店铺", prop="shop_id")
        el-select(v-model="oForm.shop_id", clearable)
          el-option(v-for="(item,i) in aShopList", :key="item.id", :value="item.id.toString()", :label="item.name")
      el-form-item(label="工种名称：", prop="name")
        el-input(placeholder="请输入工种名称", v-model="oForm.name")
      el-form-item(label="排序：")
        el-input(placeholder="请输入排序", v-model="oForm.order")
      el-form-item(label="备注：")
        el-input(placeholder="请输入备注", v-model="oForm.remark" type="textarea")
    .text-center
      el-button(type="primary", :loading="bIsLoadingCreate", @click="fnClickSubmit" size="small") 创建
      el-button.ml-20(type="default", size="small") 返回
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { worktypeAttribute } from '@/interface/index';

@Component({
  components: {},
})
export default class Home extends Vue {
  private bIsLoadingShopList: boolean = false;
  private bIsLoadingCreate: boolean = false;

  private aShopList = [];
  private oForm = {
    shop_id: '' as any,
    remark: '', //备注
    name: '', //工种名称
    order: '' as any, //排序
  };
  private oFormRules = {
    shop_id: [
      {
        required: true,
        message: '请选择店铺',
        triger: 'change',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入店铺名称',
        triger: 'blur',
      },
    ],
  };
  // ======================事件处理函数======================
  private fnClickSubmit() {
    const oForm: any = this.$refs['oForm'];
    oForm.validate((valide: boolean) => {
      if (valide) {
        this.fnNetCworkType();
      }
    });
  }
  // ======================网络请求函数======================
  // 新建工种类型
  private fnNetCworkType() {
    const oData: worktypeAttribute = {
      shop_id: +this.oForm.shop_id,
      name: this.oForm.name,
      order: +this.oForm.order || 0,
      remark: this.oForm.remark,
    };
    const options = {
      data: oData,
    };
    this.bIsLoadingCreate = true;
    this.dc.workType
      .create(options)
      .then((res: any) => {
        console.log(res);
      })
      .finally(() => {
        this.bIsLoadingCreate = false;
      });
  }
  // 获取店铺列表
  private fnNetRShopList() {
    this.bIsLoadingShopList = true;
    this.dc.shop
      .retreive()
      .then((res: any) => {
        console.log(res);
        this.aShopList = res;
      })
      .finally(() => {
        this.bIsLoadingShopList = false;
      });
  }
  // =======================初始化函数=======================
  private created() {
    this.fnNetRShopList();
  }
}
</script>

