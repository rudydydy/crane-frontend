import { ERROR_RESPONSE } from '../constants/errors';

export const errorResponse = (payload) => ({
  type: ERROR_RESPONSE,
  payload,
})
