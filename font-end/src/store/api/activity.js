import axios from '@/utils/axios';

const BASE_URL = '/api';
const ACTIVITIES_URL = `${BASE_URL}/activity/all`;
export const getActivities = () => axios.get(ACTIVITIES_URL);