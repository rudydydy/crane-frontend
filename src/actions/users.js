import axios from 'axios';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from '../constants/users';
import { errorResponse } from './errors';

const fetchUsersPending = () => ({
  type: FETCH_USERS_PENDING,
})

const fetchUsersSuccess = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload,
})

const fetchUsersFailed = () => ({
  type: FETCH_USERS_FAILED,
})

export const fetchUsers = () => (dispatch) => {
  const endpoint = '/api/v1/users';
  
  dispatch(fetchUsersPending());
  return axios.get(endpoint)
    .then(res => res.data)
    .then(json => {
      dispatch(fetchUsersSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(fetchUsersFailed());
    });
}

const fetchUserPending = () => ({
  type: FETCH_USER_PENDING,
})

const fetchUserSuccess = (payload) => ({
  type: FETCH_USER_SUCCESS,
  payload,
})

const fetchUserFailed = () => ({
  type: FETCH_USER_FAILED,
})

export const fetchUser = (userId) => (dispatch, getState) => {
  const { 
    users: { 
      list 
    } 
  } = getState();

  const selectedUser = list.find((user) => user.id === parseInt(userId));

  if (selectedUser) {
    return new Promise((resolve, reject) => {
      dispatch(fetchUserSuccess(selectedUser));
      resolve()
    });
  } else {
    const endpoint = `/api/v1/users/${userId}`;

    dispatch(fetchUserPending());
    return axios.get(endpoint)
      .then(res => res.data)
      .then(json => {
        dispatch(fetchUserSuccess(json.data));
      })
      .catch(error => {
        dispatch(errorResponse(error.response));
        dispatch(fetchUserFailed());
      });
  }
}

const updateUserPending = () => ({
  type: UPDATE_USER_PENDING,
})

const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
})

const updateUserFailed = () => ({
  type: UPDATE_USER_FAILED,
})

export const updateUser = (userId, params) => (dispatch) => {
  const endpoint = `/api/v1/users/${userId}`;
  const body = { user: { ...params } };

  dispatch(updateUserPending());
  return axios.put(endpoint, body)
    .then(res => res.data)
    .then(json => {
      dispatch(updateUserSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(updateUserFailed());
    });
}

const deleteUserPending = (payload) => ({
  type: DELETE_USER_PENDING,
  payload,
})

const deleteUserSuccess = (payload) => ({
  type: DELETE_USER_SUCCESS,
  payload,
})

const deleteUserFailed = (payload) => ({
  type: DELETE_USER_FAILED,
  payload,
})

export const deleteUser = (userId) => (dispatch) => {
  const endpoint = `/api/v1/users/${userId}`;

  dispatch(deleteUserPending(userId));
  return axios.delete(endpoint)
    .then(() => {
      dispatch(deleteUserSuccess(userId));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(deleteUserFailed(userId));
    });
}
