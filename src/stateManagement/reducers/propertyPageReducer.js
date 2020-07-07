import { setPropertyPage } from "../actions";

export const propertyPageData = {
  propertyPageData: { modalStatus: false, activePropertyId: null }
};

export const propertyPageReducer = (state, action) => {
  switch (action.type) {
    case setPropertyPage:
      return {
        ...state,
        propertyPageData: {
          ...state.propertyPageData,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
