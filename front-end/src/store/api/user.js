import axios from '@/utils/axios';

const BASE_URL = '/api/user';

const COLLECTIONS_URL = `${BASE_URL}/collections`;
export const getUserCollections = ({ userId }) => {
    const params = { userId };
    return axios.get(COLLECTIONS_URL, { params });
};

const ENROLLED_URL = `${BASE_URL}/enrolled`;
export const getUserEnrolled = ({ userId }) => {
    const params = { userId };
    return axios.get(ENROLLED_URL, { params });
};

const PUBLISHED_URL = `${BASE_URL}/published`;
export const getUserPublished = ({ userId }) => {
    const params = { userId };
    return axios.get(PUBLISHED_URL, { params });
};

const UPDATE_PUBLISHEDINFO = `${BASE_URL}/published/update`;
export const updatePublished = (params => {
    const { activity_addition } = params;
    if (activity_addition) {
        const addition = JSON.stringify(activity_addition);
        params.activity_addition = addition;
    } 
    return axios.put(UPDATE_PUBLISHEDINFO, params, { paramType: 'form' });
})

const UPDATE_PWD = `${BASE_URL}/update/pwd`;
export const updateUserPwd = ({ userId, oldPwd, newPwd }) => {
    const params = { userId, oldPwd, newPwd };
    return axios.put(UPDATE_PWD, { params });
};

const UPDATE_INFO = `${BASE_URL}/update/info`;
export const updateUserInfo = ({ userId, oldPhone, newPhone }) => {
    const params = { userId, oldPhone, newPhone };
    return axios.put(UPDATE_INFO, { params });
};