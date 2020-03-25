import {
  SET_BREADCRUMB_ITEMS,
  SET_NEW_LINK,
} from '../constants/breadcrumbs';

const initialState = {
  breadcrumbItems: [],
  newLink: null,
};

const breadcrumbssReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREADCRUMB_ITEMS:
      return {
        ...state,
        breadcrumbItems: action.payload,
      };
    case SET_NEW_LINK:
      return {
        ...state,
        newLink: action.payload,
      };
    default:
      return state;
  }
};

export default breadcrumbssReducer;
