import reqUtil from '../util';
import { Ireq } from './interface';

export class BaseApi {
  protected retreiveUrl: string = '';
  protected updateUrl: string = '';
  protected deleteUrl: string = '';
  protected createdUrl: string = '';
  constructor(url: string) {
    this.createdUrl = url;
    this.updateUrl = url;
    this.deleteUrl = url;
    this.retreiveUrl = url;
  }
  public delete(options: Ireq) {
    return reqUtil({
      method: 'delete',
      url: this.deleteUrl,
      data: options,
    });
  }
  public create(options: Ireq) {
    return reqUtil({
      method: 'post',
      url: this.createdUrl,
      data: options,
    });
  }
  public retreive(options?: Ireq) {
    return reqUtil({
      method: 'get',
      url: this.retreiveUrl,
      data: options,
    });
  }
  public update(options: Ireq) {
    return reqUtil({
      method: 'put',
      url: this.updateUrl,
      data: options,
    });
  }
}
