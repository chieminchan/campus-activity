import axios from '@/utils/axios';

const BASE_URL = '/api';

const ACTIVITIES_URL = `${BASE_URL}/activity/all`;
export const getActivities = () => axios.get(ACTIVITIES_URL);

const LATEST_ACTIVITIES = `${BASE_URL}/activity/latest`;
export const getLatestActivities = () => axios.get(LATEST_ACTIVITIES);

let ACTIVITY_TYPE_LISTS = `${BASE_URL}/activity/typeLists`;
export const getActivityTypeLists = ({type}) => {
  const params = {type};
  return axios.get(ACTIVITY_TYPE_LISTS, {params});
};