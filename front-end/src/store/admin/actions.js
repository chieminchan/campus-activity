import { generateAsyncAction } from '@/store/generateAsync';
import * as api from '@/store/api/admin';
import * as types from './mutationTypes';

export default {
  getActivities: generateAsyncAction(api.getActivities, {
    mutateType: types.LOAD_ACTIVITIES,
  }),
  getApprovals: generateAsyncAction(api.getApprovals, {
    mutateType: types.LOAD_APPROVALS,
  }),
  getStudents: generateAsyncAction(api.getStudents, {
    mutateType: types.LOAD_STUDENTS,
  }),
  getManagers: generateAsyncAction(api.getManagers, {
    mutateType: types.LOAD_MANAGERS,
  })
};
