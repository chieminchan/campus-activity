import { generateAsyncAction } from '@/store/generateAsync';
import * as api from '@/store/api/activity';
import * as types from './mutationTypes';

export default {
  getActivities: generateAsyncAction(api.getActivities, { mutateType: types.LOAD_ACTIVITIES })
};