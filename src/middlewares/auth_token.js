import axios from 'axios';
import config from '../config';
import { SESSION_TOKEN } from '../constants/sessions';

const authTokenMiddleware = (store) => (next) => (action) => {
  const { sessions } = store.getState();
  const token = localStorage.getItem(SESSION_TOKEN);
  
  axios.defaults.baseURL = config.backendBaseUrl

  if (token && sessions.authenticated && typeof action === 'function') {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  return next(action);
}

export default authTokenMiddleware;
