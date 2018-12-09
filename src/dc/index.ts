import { Profile } from '@/dc/api/profile';
import { Shop } from '@/dc/api/shop';
import { WorkType } from '@/dc/api/common';
import { Staff } from '@/dc/api/staff';

const dataCenter: any = {
  install(Vue: any, options: any) {
    Vue.prototype.dc = {
      profile: new Profile(),
      shop: new Shop(),
      workType: new WorkType(),
      staff: new Staff(),
    };
  },
};

export default dataCenter;
