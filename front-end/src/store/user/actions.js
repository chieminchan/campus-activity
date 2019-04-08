import { generateAsyncAction } from '@/store/generateAsync';
import * as api from '@/store/api/auth';
import * as types from './mutationTypes';

export default {
  getProfile: generateAsyncAction(api.getProfile, { mutateType: types.LOAD_USERINFO }),
};