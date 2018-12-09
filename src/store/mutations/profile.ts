import { UPDATE_PROFILE } from './types';

export const profileMutation = {
  [UPDATE_PROFILE](state: any, data: any) {
    state.profile = data;
  },
};
