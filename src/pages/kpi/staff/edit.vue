<template lang='pug'>
  el-card
    el-form(ref="oForm" label-width="120px", :model="oForm", :rules="oFormRules")
      el-form-item(label="门店：" prop="shop_id")
        el-select(v-model="oForm.shop_id", clearable)
          el-option(v-for="(item,i) in aShopList", :key="item.id", :value="item.id.toString()", :label="item.name")
      el-form-item(label="工种：" prop="work_type_id")
        el-select(v-model="oForm.work_type_id", clearable)
          el-option(v-for="(item,i) in worktypeList", :key="item.id", :value="item.id.toString()", :label="item.name")
      el-form-item(label="姓名：" prop="name")
        el-input(placeholder="请输入姓名", v-model="oForm.name")
      el-form-item(label="联系号码：", prop="phone")
        el-input(placeholder="请输入联系号码", v-model="oForm.phone")
      el-form-item(label="微信号：", prop="weixin")
        el-input(placeholder="请输入微信号", v-model="oForm.weixin")
      el-form-item(label="基本简介：", prop="intro")
        el-input(placeholder="请输入基本简介", v-model="oForm.intro")
      el-form-item(label="擅长领域：")
        el-input(placeholder="请输入擅长领域", v-model="oForm.good_at")
    .text-center
      el-button(type="primary", @click="fnClickEdit", v-if="$route.name === 'staffCreate'" size="small") 创建
      el-button(type="primary", @click="fnClickEdit", v-if="$route.name === 'staffEdit'" size="small") 更新
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { StaffAttributes } from '@/interface/index';
@Component({
  components: {},
})
export default class Home extends Vue {
  private bIsLoadingShopList: boolean = false;
  private bIsLoadingCreatShop: boolean = false;
  private aShopList = [];
  private worktypeList = [];

  private oForm = {
    base_salary: 0, // 底薪
    name: '', // 姓名
    intro: '', // 基本简介
    job_num: '', // 工号
    work_type_id: '' as any, // 工种
    phone: '', // 手机号
    shop_id: '' as any,
    weixin: '', // 微信号
    good_at: '', // 擅长领域
    quit_time: Date, // 离职时间
    quit_reson: '', // 离职原因
    quit: 0, // 是否离职
    receipt_num: 0, // 接单数量
  };
  private oFormRules = {
    phone: [
      {
        required: true,
        message: '请输入联系号码',
        triger: 'blur',
      },
    ],

    shop_id: [
      {
        required: true,
        message: '请选择门店',
        triger: ['change', 'blur'],
      },
    ],
    base_salary: [
      {
        required: true,
        message: '请输入底薪',
        triger: 'blur',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入姓名',
        triger: 'blur',
      },
    ],
    work_type_id: [
      {
        required: true,
        message: '请选择工种',
        triger: ['blur', 'change'],
      },
    ],
  };
  // ======================事件处理函数======================
  private fnClickEdit() {
    const oForm: any = this.$refs['oForm'];
    oForm.validate((valide: boolean) => {
      if (valide) {
        if (this.$route.name === 'staffCreate') {
          this.fnNetCStaff();
        } else if (this.$route.name === 'staffEdit') {
          this.fnNetUstaff();
        }
      }
    });
  }

  // ======================网络请求函数======================
  // 获取工种
  private fnNetRworkTypeList() {
    this.dc.workType.retreive().then((res: any) => {
      this.worktypeList = res;
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
  private fnBsngetPostData() {
    const oData: StaffAttributes = {
      shop_id: +this.oForm.shop_id,
      name: this.oForm.name,
      work_type_id: +this.oForm.work_type_id,
      phone: this.oForm.phone,
      good_at: this.oForm.good_at,
      intro: this.oForm.intro,
      weixin: this.oForm.weixin,
    };
    return oData;
  }
  // 创建员工
  private fnNetCStaff() {
    const oData = this.fnBsngetPostData();
    const options = {
      data: oData,
    };
    this.bIsLoadingCreatShop = true;
    this.dc.staff
      .create(options)
      .then((res: any) => {
        console.log(res);
      })
      .finally(() => {
        this.bIsLoadingCreatShop = false;
      });
  }
  // 更新员工
  // 获取员工详情
  private fnNetRstaffDetail() {
    const options = {
      extUrl: `/${this.$route.params.id}`,
    };
    this.dc.staff
      .retreive(options)
      .then((res: any) => {
        console.log(res);
        res.shop_id = res.shop_id.toString();
        res.work_type_id = res.work_type_id.toString();
        this.oForm = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // 更新员工详情
  private fnNetUstaff() {
    const oData = this.fnBsngetPostData();
    const options = {
      extUrl: `/${this.$route.params.id}`,
      data: oData,
    };
    this.dc.staff
      .update(options)
      .then((res: any) => {
        console.log(res);
        this.$message.success('更新成功');
      })
      .finally(() => {});
  }
  // =======================初始化函数=======================
  private created() {
    if (this.$route.name === 'staffEdit') {
      this.fnNetRstaffDetail();
    } else {
      this.fnNetCStaff();
    }
    this.fnNetRShopList();
    this.fnNetRworkTypeList();
  }
}
</script>

