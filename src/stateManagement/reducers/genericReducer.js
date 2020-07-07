import {
  reloadApplication,
  reloadBank,
  reloadBankAction,
  reloadChat,
  reloadNotification,
  reloadPropertyListing,
  setGlobalLoader,
  setOrderSummary,
  setRoles,
  setUnitTypes,
  setUserDetails
} from "../actions";

export const userDetailsState = {
  userDetails: {}
};

export const bankReloadState = {
  reloadBank: false
};

export const reloadNotificationState = {
  reloadNotificationStatus: true
};

export const reloadChatState = {
  reloadChatStatus: true
};

export const rolesState = {
  roles: []
};
export const reloadPropertyListState = {
  reloadPropertyListingStatus: false
};
export const reloadApplicationState = {
  reloadApplicationStatus: false
};
export const unitTypeState = {
  unitTypes: []
};
export const orderSummaryState = {
  orderSummaryMain: {
    status: false,
    data: null
  }
};
export const globalLoaderState = {
  globalLoader: {
    status: false,
    content: ""
  }
};

export const unitTypeReducer = (state, action) => {
  if (action.type === setUnitTypes) {
    return {
      ...state,
      unitTypes: action.payload
    };
  } else {
    return state;
  }
};

export const bankReloadReducer = (state, action) => {
  if (action.type === reloadBankAction) {
    return {
      ...state,
      reloadBank: action.payload
    };
  } else {
    return state;
  }
};

export const reloadNotificationReducer = (state, action) => {
  if (action.type === reloadNotification) {
    return {
      ...state,
      reloadNotificationStatus: action.payload
    };
  } else {
    return state;
  }
};

export const reloadChatReducer = (state, action) => {
  if (action.type === reloadChat) {
    return {
      ...state,
      reloadChatStatus: action.payload
    };
  } else {
    return state;
  }
};

export const reloadPropertyListingReducer = (state, action) => {
  if (action.type === reloadPropertyListing) {
    return {
      ...state,
      reloadPropertyListingStatus: action.payload
    };
  } else {
    return state;
  }
};

export const userDetailReducer = (state, action) => {
  if (action.type === setUserDetails) {
    return {
      ...state,
      userDetails: action.payload
    };
  } else {
    return state;
  }
};

export const userRolesReducer = (state, action) => {
  if (action.type === setRoles) {
    return {
      ...state,
      roles: action.payload
    };
  } else {
    return state;
  }
};

export const reloadApplicationReducer = (state, action) => {
  if (action.type === reloadApplication) {
    return {
      ...state,
      reloadApplicationStatus: action.payload
    };
  } else {
    return state;
  }
};

export const globalLoaderReducer = (state, action) => {
  if (action.type === setGlobalLoader) {
    return {
      ...state,
      globalLoader: action.payload
    };
  } else {
    return state;
  }
};

export const orderSummaryReducer = (state, action) => {
  if (action.type === setOrderSummary) {
    return {
      ...state,
      orderSummaryMain: action.payload
    };
  } else {
    return state;
  }
};
