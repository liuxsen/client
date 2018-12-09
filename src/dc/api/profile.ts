import { BaseApi } from './base';
import reqUtil from '../util';

export class Profile extends BaseApi {
  private sLoginUrl: string = '/api/profile/login';
  private sGetEmailCodeUrl: string = '/api/profile/email';
  constructor() {
    super('/api/profile');
    this.createdUrl = '/api/profile/register';
  }
  public login(options: any) {
    return reqUtil({
      method: 'post',
      url: this.sLoginUrl,
      data: options.data,
    });
  }
  // 注册
  public register(options: any) {
    return reqUtil({
      method: 'post',
      url: this.createdUrl,
      data: options.data,
    });
  }
  public update(options: any) {
    return reqUtil(options);
  }
  public retreive(options: any) {
    return reqUtil(options);
  }
  // 获取邮箱验证码
  public getEmailCode(options: any) {
    return reqUtil({
      method: 'post',
      url: this.sGetEmailCodeUrl,
      data: options.data,
    });
  }
}
