import axios from 'axios';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} from '../constants/users';
import { errorResponse } from './errors';

const fetchUsersPending = () => ({
  type: FETCH_USERS_PENDING,
})

const fetchUsersSuccess = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload,
})

const fetchUsersFailed = (payload) => ({
  type: FETCH_USERS_FAILED,
  payload: payload
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
