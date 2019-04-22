import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    activities: {},
    approvals: {},
    students: {},
    managers: {},
  },
  actions,
  mutations
};