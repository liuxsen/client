<template lang="pug">
  div.w-400.m-auto.mt-150.bg-white.ptb-80.pr-50
    div(v-show="bStatus === 0")
      el-form(ref="oForm" label-width="120px", :model="oForm", :rules="oFormRules")
        el-form-item(label="邮箱:", prop="email")
          el-input(placeholder="请输入邮箱", v-model="oForm.email" clearable)
        el-form-item(label="密码:", prop="password")
          el-input(placeholder="请输入密码" type="password" v-model="oForm.password" clearable)
      .text-center.ml-50
        el-button(type="primary" @click="fnClickCheckLoginForm") 登录
    div(v-show="bStatus===1")
      el-form(ref="oRegister", label-width="120px", :model="oRegister", :rules="oRegisterRules")
        el-form-item(label="邮箱:", prop="email")
          el-input(placeholder="请输入邮箱", v-model="oRegister.email" clearable)
        el-form-item(label="验证码", prop="code")
          .dspl-inbl.w-150
            el-input(placeholder="请输入验证码" v-model="oRegister.code")
          .dspl-inbl.ml-20
            el-button(type="primary" :loading="bIsLoadingEmailCode" @click="fnNetREmailCode" size="small")
              span(v-show="timer === 0") 获取验证码
              span(v-show="timer") {{ sTimerStr }}
        el-form-item(label="密码:", prop="password")
          el-input(placeholder="请输入密码" type="password" v-model="oRegister.password" clearable)
        el-form-item(label="重复密码:", prop="repassword")
          el-input(placeholder="请输入二次密码" type="password" v-model="oRegister.repassword" clearable)
      .text-center.ml-50
        el-button(type="primary" @click="fnClickCheckRegisterForm") 注册
      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { fnValidateEmail } from '../utils/validate';

@Component({
  components: {},
})
export default class Home extends Vue {
  private bStatus: number = 0; // 前端定义，0 登录 1 注册
  private bIsLoadingEmailCode: boolean = false; // 是否正在请求邮箱
  private timer: number = 0;
  private sTimerStr: string = '';

  // 登录model
  private oForm = {
    email: 'wyliuxsen@163.com',
    password: '123456',
  };
  // 登录校验
  private oFormRules = {
    email: [{ validator: fnValidateEmail, trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };

  // 注册model
  private oRegister = {
    email: '',
    password: '',
    repassword: '',
    code: '', // 验证码
  };

  // 注册校验
  private oRegisterRules = {
    email: [{ validator: fnValidateEmail, trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    repassword: [{ validator: this.fnCheckRePass, trigger: 'blur' }],
    code: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
      },
    ],
  };

  private fnCheckRePass(rule: any, value: string, callback: (arg?: any) => void) {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.oRegister.repassword !== this.oRegister.password) {
        callback(new Error('两次输入密码不一致'));
      }
      callback();
    }
  }
  private fnClickCheckLoginForm() {
    const oForm: any = this.$refs.oForm;
    oForm.validate((valide: boolean) => {
      if (valide) {
        // this.$message.success('登录成功');
        this.fnNetLogin();
      }
    });
  }

  private fnClickCheckRegisterForm() {
    const oForm: any = this.$refs.oRegister;
    oForm.validate((valide: boolean) => {
      if (valide) {
        // this.$message.success('登录成功');
        this.fnNetRegister();
      }
    });
  }
  private fnTimerStr() {
    if (this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    } else {
      let allTime: number = 60;
      this.sTimerStr = `${allTime}s`;
      this.timer = setInterval(() => {
        if (allTime <= 1) {
          clearInterval(this.timer);
          this.timer = 0;
          this.sTimerStr = '';
          return;
        }
        allTime--;
        this.sTimerStr = `${allTime}s`;
      }, 1000);
    }
  }
  // 获取邮箱验证码
  private fnNetREmailCode() {
    if (this.sTimerStr !== '') {
      return;
    }
    if (!this.oRegister.email) {
      this.$message.warning('请输入邮箱');
      return;
    }
    const options = {
      data: {
        email: this.oRegister.email,
      },
    };
    this.bIsLoadingEmailCode = true;
    this.dc.profile
      .getEmailCode(options)
      .then((res: any) => {
        console.log(res.data);
        this.$message.success('发送成功');
        this.bIsLoadingEmailCode = false;
        this.fnTimerStr();
      })
      .catch((err: any) => {
        console.log(err);
        this.bIsLoadingEmailCode = false;
      });
  }
  // 注册
  private fnNetRegister() {
    const options = {
      data: {
        email: this.oRegister.email,
        password: this.oRegister.password,
        code: this.oRegister.code,
      },
    };
    this.dc.profile
      .register(options)
      .then((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.$message.success('注册成功');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  // 登录
  private fnNetLogin() {
    const options = {
      data: {
        email: this.oForm.email,
        password: this.oForm.password,
      },
    };
    this.dc.profile
      .login(options)
      .then((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.$store.commit('UPDATE_PROFILE', res.user);
        this.$message.success('登录成功');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
