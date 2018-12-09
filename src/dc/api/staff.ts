import { BaseApi } from './base';
// import reqUtil from '../util';

// import { Ireq } from './interface';

export class Staff extends BaseApi {
  constructor() {
    super('/api/staff');
  }
}
