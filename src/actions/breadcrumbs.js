import { 
  SET_BREADCRUMB_ITEMS,
  SET_NEW_LINK,
} from '../constants/breadcrumbs';

export const setBreadcrumbItems = (payload) => ({
  type: SET_BREADCRUMB_ITEMS,
  payload,
})

export const setNewLink = (payload) => ({
  type: SET_NEW_LINK,
  payload,
})
