import { Profile } from '@/dc/api/profile';
import { Shop } from '@/dc/api/shop';
import { WorkType } from '@/dc/api/common';
import { Staff } from '@/dc/api/staff';

interface Idc {
  profile: Profile;
  shop: Shop;
  workType: WorkType;
  staff: Staff;
}

declare module 'vue/types/vue' {
  interface Vue {
    dc: Idc;
  }
}
