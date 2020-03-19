import axios from '../axios_instance';
import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED
} from '../constants/sessions';

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
  axios.post(endpoint, params)
    .then(res => {
      console.log('Sign in success', res);
      dispatch(signInUserSuccess());
    })
    .catch(error => {
      console.log('Error sign in', error);
      dispatch(signInUserFailed(error));
    });
}
