import axios from '@/utils/axios';

// const BASE_URL = process.env.VUE_APP_BASE_URL;
const BASE_URL = '/api';

const USER_LOGIN = `${BASE_URL}/user/login`;
export const login = ({
  character,
  userId,
  password
}) => axios.post(USER_LOGIN, {
  character,
  userId,
  password
});

const GET_USER_INFO = `${BASE_URL}/user/profile`;
export const getProfile = () => axios.get(GET_USER_INFO);

const USER_LOGOUT = `${BASE_URL}/user/logout`;
export const signOut = () => axios.get(USER_LOGOUT);