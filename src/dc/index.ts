import { Profile } from '@/dc/api/profile';
import { Shop } from '@/dc/api/shop';

const dataCenter: any = {
  install(Vue: any, options: any) {
    Vue.prototype.dc = {
      profile: new Profile(),
      shop: new Shop(),
    };
  },
};

export default dataCenter;
