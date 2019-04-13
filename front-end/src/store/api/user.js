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