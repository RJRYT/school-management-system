import {
  FETCH_LIBRARY_HISTORY_SUCCESS,
  FETCH_LIBRARY_HISTORY_FAIL,
} from "../constants/libraryConstants";

const initialState = {
  libraryHistory: [],
  error: null,
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIBRARY_HISTORY_SUCCESS:
      return { ...state, libraryHistory: action.payload };
    case FETCH_LIBRARY_HISTORY_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
