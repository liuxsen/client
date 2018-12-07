import { Profile } from '@/dc/api/profile';
import { Shop } from '@/dc/api/shop';

interface Idc {
  profile: Profile;
  shop: Shop;
}

declare module 'vue/types/vue' {
  interface Vue {
    dc: Idc;
  }
}
