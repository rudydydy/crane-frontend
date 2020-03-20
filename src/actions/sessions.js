import { SubmissionError } from 'redux-form';
import jwtDecode from 'jwt-decode';
import axios from '../axios_instance';
import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SESSION_TOKEN,
} from '../constants/sessions';
import HttpStatus from '../helpers/http_status';
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
    .then(res => res.data)
    .then(json => {
      localStorage.setItem(SESSION_TOKEN, json.data.token);
      dispatch(signInUserSuccess());
    })
    .catch(error => {
      const errorsRes = error.response;
      if (errorsRes.status === HttpStatus.Unauthorized) {
        dispatch(signInUserFailed(errorsRes.data.message));  
      } else {
        // unknown error here
      }
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
    .then(res => res.data)
    .then(json => {
      localStorage.setItem(SESSION_TOKEN, json.data.token);
      dispatch(signUpUserSuccess());
    })
    .catch(error => {
      const errorsRes = error.response;
      dispatch(signUpUserFailed());

      if (errorsRes.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = errorsRes.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      } else {
        // unknown error here
      }
    });
}

export const sessionChecker = (store) => {
  // here we check if seller is authenticated or determine by 
  // localStorage token is empty or not
  const token = localStorage.getItem(SESSION_TOKEN);
  if (token) {
    try {
      // decode jwt token to get `exp` 
      const decode = jwtDecode(token);
      const dateTime = new Date().getTime() / 1000;

      // check if token is expired or not, if conditional is true
      if(decode.exp > dateTime) {
        // token is still valid, i will automatically signed you in
        store.dispatch(signInUserSuccess()); 
      }
    } catch {
      // to catch if decoding jwt token is failed
      localStorage.removeItem(SESSION_TOKEN);
    }
  }
};

