import axios from '@/utils/axios';

const BASE_URL = '/api/user';

const COLLECTIONS_URL = `${BASE_URL}/collections`;
export const getUserCollections = ({ userId }) => {
    const params = { userId };
    return axios.get(COLLECTIONS_URL, { params });
}

const ENROLLED_URL = `${BASE_URL}/enrolled`;
export const getUserEnrolled = ({ userId }) => {
    const params = { userId };
    return axios.get(ENROLLED_URL, { params });
}

const UPDATE_PWD = `${BASE_URL}/update/pwd`;
export const updateUserPwd = ({ userId, oldPwd, newPwd }) => {
    const params = { userId, oldPwd, newPwd };
    return axios.post(UPDATE_PWD, { params });
}

const UPDATE_INFO = `${BASE_URL}/update/info`;
export const updateUserInfo = ({ userId, oldPhone, newPhone }) => {
    const params = { userId, oldPhone, newPhone };
    return axios.post(UPDATE_INFO, { params });
}