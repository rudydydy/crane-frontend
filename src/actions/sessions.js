import { SubmissionError } from 'redux-form';
import axios from '../axios_instance';
import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED
} from '../constants/sessions';
import { errorFormatter } from '../helpers/formatter';

const signInUserPending = () => ({
  type: SIGN_IN_PENDING,
})

const signInUserSuccess = () => ({
  type: SIGN_IN_SUCCESS,
})

const signInUserFailed = (payload) => ({
  type: SIGN_IN_FAILED,
  payload: payload
})

export const signInUser = (params) => (dispatch) => {
  const endpoint = '/api/v1/users/login';

  dispatch(signInUserPending());
  return axios.post(endpoint, params)
    .then(res => {
      dispatch(signInUserSuccess());
    })
    .catch(error => {
      dispatch(signInUserFailed(error.response.data.message));
    });
}

const signUpUserPending = () => ({
  type: SIGN_UP_PENDING,
})

const signUpUserSuccess = () => ({
  type: SIGN_UP_SUCCESS,
})

const signUpUserFailed = () => ({
  type: SIGN_UP_FAILED,
})

export const signUpUser = (params) => (dispatch) => {
  const endpoint = '/api/v1/users';
  const body = { user: { ...params } };

  dispatch(signUpUserPending());
  return axios.post(endpoint, body)
    .then(res => {
      dispatch(signUpUserSuccess());
    })
    .catch(error => {
      const errorsRes = error.response;
      dispatch(signUpUserFailed());

      if (errorsRes.status === 422) {
        const errorValidation = errorsRes.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      } else {

      }
    });
}
