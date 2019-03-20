import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    latestActivities: {},
    activityTypeLists: {},
    activities: {},
  },
  actions,
  mutations
};
