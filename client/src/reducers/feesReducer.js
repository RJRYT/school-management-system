import {
  FETCH_FEES_HISTORY_SUCCESS,
  FETCH_FEES_HISTORY_FAIL,
} from "../constants/feesConstants";

const initialState = {
  feesHistory: [],
  error: null,
};

export const feesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_HISTORY_SUCCESS:
      return { ...state, feesHistory: action.payload };
    case FETCH_FEES_HISTORY_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
