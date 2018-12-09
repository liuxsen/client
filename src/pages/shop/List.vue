<template lang='pug'>
  el-card
    el-table(size="small", border, :data="aShopList" v-loading="bIsLoading")
      el-table-column(label="门店", prop="name")
      el-table-column(label="电话", prop="phone")
      el-table-column(label="地址", prop="address")
      el-table-column(label="微信上显示",)
        template(slot-scope="scope")
          span(v-if="scope.row.show_wx") 是
          span(v-if="!scope.row.show_wx") 否
      el-table-column(label="是否默认门店")
        template(slot-scope="scope")
          span(v-if="scope.row.is_default") 是
          span(v-if="!scope.row.is_default") 否
      el-table-column(label="是否总店设置")
        template(slot-scope="scope")
          span(v-if="scope.row.is_head") 是
          span(v-if="!scope.row.is_head") 否
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button(type="primary", @click="fnClicknavigateEdit(scope.row)" size="small") 修改
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class List extends Vue {
  private aShopList = [] as any;
  private bIsLoading: boolean = false;
  private fnClicknavigateEdit(row: any) {
    console.log(row);
    this.$router.push({
      name: 'shopEdit',
      params: {
        id: row.id,
      },
    });
  }
  private fnNetRShopList() {
    this.bIsLoading = true;
    this.dc.shop
      .retreive()
      .then((res: any) => {
        this.bIsLoading = false;
        console.log(res);
        this.aShopList = res;
      })
      .catch((err) => {
        this.bIsLoading = false;
        console.log(err);
      });
  }
  private created() {
    this.fnNetRShopList();
  }
}
</script>

