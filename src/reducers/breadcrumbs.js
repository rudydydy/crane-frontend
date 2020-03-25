import { SET_BREADCRUMB_ITEMS } from '../constants/breadcrumbs';

const breadcrumbssReducer = (state = [], action) => {
  switch(action.type) {
    case SET_BREADCRUMB_ITEMS:
      return action.payload;
    default:
      return state;
  }
}

export default breadcrumbssReducer;
