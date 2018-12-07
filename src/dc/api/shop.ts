import { BaseApi } from './base';
import reqUtil from '../util';

export class Shop extends BaseApi {
  constructor() {
    super();
    this.createdUrl = '/api/shop/create';
  }
  public create(options: any) {
    return reqUtil({
      method: 'post',
      url: this.createdUrl,
      data: options.data,
    });
  }
}
