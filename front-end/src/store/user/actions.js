import { generateAsyncAction } from '@/store/generateAsync';
import * as auth from '@/store/api/auth';
import * as api from '@/store/api/user';
import * as types from './mutationTypes';

export default {
    getProfile: generateAsyncAction(auth.getProfile, { mutateType: types.LOAD_USERINFO }),

    getUserCollections: generateAsyncAction(api.getUserCollections, { mutateType: types.LOAD_USERCOLLECTIONS }),
};