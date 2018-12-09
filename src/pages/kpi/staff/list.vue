<template lang='pug'>
  //- 员工管理
  el-card
    el-table(border, size="small", :data="aStaffList", v-loading="bIsLoadingList")
      el-table-column(label="工号", prop="id")
      el-table-column(label="姓名", prop="name")
      el-table-column(label="擅长领域", prop="good_at")
      el-table-column(label="联系号码", prop="phone")
      el-table-column(label="微信号", prop="weixin")
      el-table-column(label="基本简介", prop=intro)
      el-table-column(label="操作", width="150px")
        template(slot-scope="scope")
          el-button(size="small", @click="fnClicknavigateToEdit(scope.row)" type="primary") 修改
          el-button(size="small", type="default") 离职
    .mt-20.text-right
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="oForm.pn"
        :page-sizes="[10,20,30,40,50,100]"
        :page-size="oForm.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="oForm.nTotal"
      )
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  private bIsLoadingList: boolean = false;
  private aStaffList = [];
  private oForm = {
    pn: 1,
    limit: 10,
    nTotal: null,
  };
  // ======================事件处理函数======================
  private fnClicknavigateToEdit(row: any) {
    console.log(row.id);
    this.$router.push({
      path: `/kpi/staff/edit/${row.id}`,
    });
  }
  private handleSizeChange(limit: number) {
    this.oForm.limit = limit;
    this.fnNetRstaffList();
  }
  private handleCurrentChange(pn: number) {
    this.oForm.pn = pn;
    this.fnNetRstaffList();
  }
  // ======================网络请求函数======================
  fnNetRstaffList() {
    this.bIsLoadingList = true;
    const oQuery = {
      limit: this.oForm.limit,
      pn: this.oForm.pn,
    };
    const options = {
      params: oQuery,
    };
    this.dc.staff
      .retreive(options)
      .then((res: any) => {
        this.oForm.nTotal = res.count;
        this.aStaffList = res.rows;
      })
      .finally(() => {
        this.bIsLoadingList = false;
      });
  }
  // =======================初始化函数=======================
  fnBsnInitData() {
    const oQuery = this.$route.query;
    this.oForm = {
      pn: +oQuery.pn || 1,
      limit: +oQuery.limit || 10,
      nTotal: null,
    };
  }
  created() {
    this.fnBsnInitData();
    this.fnNetRstaffList();
  }
}
</script>

