import { SET_BREADCRUMB_ITEMS } from '../constants/breadcrumbs';

export const setBreadcrumbItems = (payload) => ({
  type: SET_BREADCRUMB_ITEMS,
  payload,
})
