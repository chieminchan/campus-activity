import axios from '@/utils/axios';
import _ from 'lodash';

const BASE_URL = '/api/activity';

// 活动筛选， 返回适合条件的全部活动
const ACTIVITIES_URL = `${BASE_URL}/all`;
export const getActivities = ({ activityType, activityStatus, currentPage, pageSize }) => {
    const params = { activityType, activityStatus, currentPage, pageSize };
    return axios.get(ACTIVITIES_URL, { params });
};

// 最新活动
const LATEST_ACTIVITIES = `${BASE_URL}/latest`;
export const getLatestActivities = () => axios.get(LATEST_ACTIVITIES);

// 首页活动列表
let ACTIVITY_TYPE_LISTS = `${BASE_URL}/typeLists`;
export const getActivityTypeLists = ({ type }) => {
    const params = { type };
    return axios.get(ACTIVITY_TYPE_LISTS, { params });
};

// 活动详情
let ACTIVITY_INFO = `${BASE_URL}/detail`;
export const getActivityInfo = ({ userId, activityId }) => {
    const params = { userId, activityId };
    return axios.get(ACTIVITY_INFO, { params });
};

// 活动评论
let ACTIVITY_COMMENTS = `${BASE_URL}/comments`;
export const getActivityComments = ({ activityId }) => {
    const params = { activityId };
    return axios.get(ACTIVITY_COMMENTS, { params });
};

// 发表活动评论
let UPDATE_ACTIVITY_COMMENT = `${BASE_URL}/comment/new`;
export const addActivityComment = ({ activityId, userId, commentContent, commentTime }) => {
    const params = { activityId, userId, commentContent, commentTime };
    return axios.post(UPDATE_ACTIVITY_COMMENT, { params });
};

// 回复活动评论
let UPDATE_ACTIVITY_REPLY = `${BASE_URL}/reply/new`;
export const addActivityReply = ({ replyCommentId, userId, targetId, replyContent, replyTime }) => {
    const params = { replyCommentId, userId, targetId, replyContent, replyTime };
    return axios.post(UPDATE_ACTIVITY_REPLY, { params });
};

// 活动评分 
const ACTIVITY_SCORE = `${BASE_URL}/score`;
export const updateScore = ({ activityId, score }) => {
    const params = { activityId, score };
    return axios.put(ACTIVITY_SCORE, { params });
};

// 活动收藏
const UPDATE_ACTIVITY_COLLECTION = `${BASE_URL}/addCollection`;
export const updateActivityCollection = ({ userId, activityId }) => {
    const params = { userId, activityId };
    return axios.post(UPDATE_ACTIVITY_COLLECTION, { params });
};

// 活动取消收藏
const REMOVE_ACTIVITY_COLLECTION = `${BASE_URL}/removeCollection`;
export const removeActivityCollection = ({ userId, activityId }) => {
    const params = { userId, activityId };
    return axios.delete(REMOVE_ACTIVITY_COLLECTION, { params });
};

// 活动报名
const UPDATE_ACTIVITY_ENROLL = `${BASE_URL}/updateEnroll`;
export const updateActivityEnroll = ({ userId, activityId }) => {
    const params = { userId, activityId };
    return axios.post(UPDATE_ACTIVITY_ENROLL, { params });
};

// 活动作品上传
const ADD_ACTIVITY_WORK = `${BASE_URL}/postWork`;
export const addActivityWork = (params) => {
    return axios.post(ADD_ACTIVITY_WORK, params, { paramType: 'form' });
};

// 活动发布申请
const UPDATE_ACTIVITY_APPROVAL = `/api/approval/addApproval`;
export const updateApproval = (params) => {
    if (_.isObject(params.addition)) {
        const addition = JSON.stringify(params.addition);
        params.addition = addition;
    }
    if(!_.has(params, 'backPoster')) {
        params['backPoster'] = '';
    }
    if(!_.has(params, 'address')) {
        params['address'] = '';
    }
    return axios.post(UPDATE_ACTIVITY_APPROVAL, params, { paramType: 'form' });
};

// 报名名单导出
const DOWNLOAD_ACTIVITY_ENROLLS = `${BASE_URL}/downloadEnrolls`;
export const downloadEnrolls = ({activityId}) => {
    const params = {activityId};
    return axios.get(DOWNLOAD_ACTIVITY_ENROLLS, {params})
};