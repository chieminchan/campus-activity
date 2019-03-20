import {
  generateAsyncAction
} from '@/store/generateAsync';
import * as api from '@/store/api/activity';
import * as types from './mutationTypes';

export default {
  getActivities: generateAsyncAction(api.getActivities, {
    mutateType: types.LOAD_ACTIVITIES
  }),
  getLatestActivities: generateAsyncAction(api.getLatestActivities, {
    mutateType: types.LOAD_LATEST_ACTIVITIES
  }),
  getActivityTypeLists: generateAsyncAction(api.getActivityTypeLists, {
    mutateType: types.LOAD_ACTIVITY_TYPE_LISTS
  })
};