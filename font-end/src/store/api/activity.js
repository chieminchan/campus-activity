import axios from '@/utils/axios';

const BASE_URL = '/api';

// 活动筛选， 返回适合条件的全部活动
const ACTIVITIES_URL = `${BASE_URL}/activity/all`;
export const getActivities = () => axios.get(ACTIVITIES_URL);

// 最新活动
const LATEST_ACTIVITIES = `${BASE_URL}/activity/latest`;
export const getLatestActivities = () => axios.get(LATEST_ACTIVITIES);

// 首页活动列表
let ACTIVITY_TYPE_LISTS = `${BASE_URL}/activity/typeLists`;
export const getActivityTypeLists = ({type}) => {
  const params = { type };
  return axios.get(ACTIVITY_TYPE_LISTS, {params});
};

// 活动详情
let ACTIVITY_INFO = `${BASE_URL}/activity/detail`;
export const getActivityInfo = ({userId, activityId}) => {
  const params = { userId, activityId };
  return axios.get(ACTIVITY_INFO, {params});
};

// 活动评分 
const ACTIVITY_SCORE = `${BASE_URL}/activity/score`;
export const updateScore = ({id, score}) => {
  const params = { id, score };
  return axios.put(ACTIVITY_SCORE, {params});
};

// 活动收藏
const UPDATE_ACTIVITY_COLLECTION = `${BASE_URL}/activity/addCollection`;
export const updateActivityCollection = ({userId, activityId}) => {
  const params = {userId, activityId};
  return axios.post(UPDATE_ACTIVITY_COLLECTION, {params});
};

// 活动取消收藏
const REMOVE_ACTIVITY_COLLECTION = `${BASE_URL}/activity/removeCollection`;
export const removeActivityCollection = ({userId, activityId}) => {
  const params = {userId, activityId};
  return axios.delete(REMOVE_ACTIVITY_COLLECTION, {params});
};

// 活动报名
const UPDATE_ACTIVITY_ENROLL = `${BASE_URL}/activity/updateEnroll`;
export const updateActivityEnroll = ({userId, activityId}) => {
  const params = {userId, activityId};
  return axios.post(UPDATE_ACTIVITY_ENROLL, {params});
};

const REMOVE_ACTIVITY_ENROLL = `${BASE_URL}/activity/removeEnroll`;
export const removeActivityEnroll = ({userId, activityId}) => {
  const params = {userId, activityId};
  return axios.delete(REMOVE_ACTIVITY_ENROLL, {params});
};