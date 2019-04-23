import axios from '@/utils/axios';

const BASE_URL = '/api/admin';

const LOAD_ACTIVITIES = `${BASE_URL}/activities`;
export const getActivities = ({ currentPage, pageSize }) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_ACTIVITIES, { params });
};

const LOAD_APPROVALS = `${BASE_URL}/approvals`;
export const getApprovals = ({currentPage, pageSize}) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_APPROVALS, { params });
};

const LOAD_STUDENTS = `${BASE_URL}/students`;
export const getStudents = ({currentPage, pageSize}) => {
  const params = {
    currentPage, 
    pageSize
  };
  return axios.get(LOAD_STUDENTS, { params });
};

const LOAD_MANAGERS = `${BASE_URL}/managers`;
export const getManagers = ({userType, currentPage, pageSize}) => {
  const params = {
    userType,
    currentPage, 
    pageSize
  }; 
  return axios.get(LOAD_MANAGERS, { params });
};
