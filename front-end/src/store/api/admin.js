import axios from '@/utils/axios';

const BASE_URL = '/api/admin';
const LOAD_ACTIVITIES = `${BASE_URL}/activities`;
export const getActivities = ({ currentPage, pageSize }) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_ACTIVITIES, { params });
}
