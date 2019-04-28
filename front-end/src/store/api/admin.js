import axios from '@/utils/axios';

const BASE_URL = '/api/admin';

// 全部活动信息
const LOAD_ACTIVITIES = `${BASE_URL}/activities`;
export const getActivities = ({ currentPage, pageSize }) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_ACTIVITIES, { params });
};

// 活动信息详情
const LOAD_ACTIVITY_DETAIL = `${BASE_URL}/activity`;
export const getActivityDetail = ({ activityId }) => {
  const params = { activityId };
  return axios.get(LOAD_ACTIVITY_DETAIL, { params });
};

// 活动报名名单
const LOAD_ENROLLED_LIST = `${BASE_URL}/enrolled`;
export const getEnrolledList = ({activityId}) => {
  const params = {activityId};
  return axios.get(LOAD_ENROLLED_LIST, { params });
}

// 活动作品
const LOAD_ACTIVITY_WORKS = `${BASE_URL}/works`;
export const getActivityWorks = ({activityId}) => {
  const params = {activityId};
  return axios.get(LOAD_ACTIVITY_WORKS, { params });
}

// 全部待审批活动
const LOAD_APPROVALS = `${BASE_URL}/approvals`;
export const getApprovals = ({ currentPage, pageSize }) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_APPROVALS, { params });
};

// 全部学生信息
const LOAD_STUDENTS = `${BASE_URL}/students`;
export const getStudents = ({ currentPage, pageSize }) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_STUDENTS, { params });
};

// 全部管理员信息
const LOAD_MANAGERS = `${BASE_URL}/managers`;
export const getManagers = ({ userType, currentPage, pageSize }) => {
  const params = {
    userType,
    currentPage, 
    pageSize
  }; 
  return axios.get(LOAD_MANAGERS, { params });
};
