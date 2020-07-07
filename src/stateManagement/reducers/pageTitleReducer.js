import { setPageTitleAction } from "../actions";

export const stateData = { pageTitle: "Main Layout" };

export const pageTitleReducer = (state, action) => {
  switch (action.type) {
    case setPageTitleAction:
      return {
        ...state,
        pageTitle: action.payload
      };
    default:
      return state;
  }
};
