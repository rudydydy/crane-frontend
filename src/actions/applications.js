import { SubmissionError } from 'redux-form';
import axios from 'axios';
import {
  FETCH_APPLICATIONS_PENDING,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILED,
  FETCH_APPLICATION_PENDING,
  FETCH_APPLICATION_SUCCESS,
  FETCH_APPLICATION_FAILED,
  CREATE_APPLICATION_PENDING,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILED,
  UPDATE_APPLICATION_PENDING,
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_FAILED,
  DELETE_APPLICATION_PENDING,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILED,
} from '../constants/applications';
import { errorResponse } from './errors';
import HttpStatus from '../helpers/http_status';
import { errorFormatter } from '../helpers/formatter';

const fetchApplicationsPending = () => ({
  type: FETCH_APPLICATIONS_PENDING,
})

const fetchApplicationsSuccess = (payload) => ({
  type: FETCH_APPLICATIONS_SUCCESS,
  payload,
})

const fetchApplicationsFailed = () => ({
  type: FETCH_APPLICATIONS_FAILED,
})

export const fetchApplications = () => (dispatch) => {
  const endpoint = '/api/v1/applications';
  
  dispatch(fetchApplicationsPending());
  return axios.get(endpoint)
    .then(res => res.data)
    .then(json => {
      dispatch(fetchApplicationsSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(fetchApplicationsFailed());
    });
}

const fetchApplicationPending = () => ({
  type: FETCH_APPLICATION_PENDING,
})

const fetchApplicationSuccess = (payload) => ({
  type: FETCH_APPLICATION_SUCCESS,
  payload,
})

const fetchApplicationFailed = () => ({
  type: FETCH_APPLICATION_FAILED,
})

export const fetchApplication = (applicationId) => (dispatch, getState) => {
  const { 
    applications: { 
      list 
    } 
  } = getState();

  const selectedApplication = list.find((application) => application.id === parseInt(applicationId));

  if (selectedApplication) {
    return new Promise((resolve, reject) => {
      dispatch(fetchApplicationSuccess(selectedApplication));
      resolve()
    });
  } 

  const endpoint = `/api/v1/applications/${applicationId}`;

  dispatch(fetchApplicationPending());
  return axios.get(endpoint)
    .then(res => res.data)
    .then(json => {
      dispatch(fetchApplicationSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(fetchApplicationFailed());
    });
}

const createApplicationPending = () => ({
  type: CREATE_APPLICATION_PENDING,
})

const createApplicationSuccess = (payload) => ({
  type: CREATE_APPLICATION_SUCCESS,
  payload,
})

const createApplicationFailed = () => ({
  type: CREATE_APPLICATION_FAILED,
})

export const createApplication = (params) => (dispatch) => {
  const endpoint = '/api/v1/applications';
  const body = { application: { ...params } };

  dispatch(createApplicationPending());
  return axios.post(endpoint, body)
    .then(res => res.data)
    .then(json => {
      dispatch(createApplicationSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(createApplicationFailed());

      if (error.response.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = error.response.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      }
    });
}

const updateApplicationPending = () => ({
  type: UPDATE_APPLICATION_PENDING,
})

const updateApplicationSuccess = (payload) => ({
  type: UPDATE_APPLICATION_SUCCESS,
  payload,
})

const updateApplicationFailed = () => ({
  type: UPDATE_APPLICATION_FAILED,
})

export const updateApplication = (applicationId, params) => (dispatch) => {
  const endpoint = `/api/v1/applications/${applicationId}`;
  const body = { application: { ...params } };

  dispatch(updateApplicationPending());
  return axios.put(endpoint, body)
    .then(res => res.data)
    .then(json => {
      dispatch(updateApplicationSuccess(json.data));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(updateApplicationFailed());

      if (error.response.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = error.response.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      }
    });
}

const deleteApplicationPending = (payload) => ({
  type: DELETE_APPLICATION_PENDING,
  payload,
})

const deleteApplicationSuccess = (payload) => ({
  type: DELETE_APPLICATION_SUCCESS,
  payload,
})

const deleteApplicationFailed = (payload) => ({
  type: DELETE_APPLICATION_FAILED,
  payload,
})

export const deleteApplication = (applicationId) => (dispatch) => {
  const endpoint = `/api/v1/applications/${applicationId}`;

  dispatch(deleteApplicationPending(applicationId));
  return axios.delete(endpoint)
    .then(() => {
      dispatch(deleteApplicationSuccess(applicationId));
    })
    .catch(error => {
      dispatch(errorResponse(error.response));
      dispatch(deleteApplicationFailed(applicationId));
    });
}
