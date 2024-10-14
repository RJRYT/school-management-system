import {
  FETCH_FEES_HISTORY_ALL,
  FETCH_FEES_HISTORY_ALL_SUCCESS,
  FETCH_FEES_HISTORY_ALL_FAIL,
  FETCH_FEES_HISTORY,
  FETCH_FEES_HISTORY_SUCCESS,
  FETCH_FEES_HISTORY_FAIL,
  ADD_FEES_HISTORY_SUCCESS,
  ADD_FEES_HISTORY_FAIL,
  DELETE_FEES_HISTORY,
  UPDATE_FEES_HISTORY_SUCCESS,
  UPDATE_FEES_HISTORY_FAIL,
} from "../constants/feesConstants";

const initialState = {
  feesHistory: [],
  singleHistory: null,
  error: null,
  loading: false,
};

export const feesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_HISTORY_ALL:
      return { ...state, error: null, loading: true };
    case FETCH_FEES_HISTORY_ALL_SUCCESS:
      return { ...state, feesHistory: action.payload.data, loading: false };
    case FETCH_FEES_HISTORY_ALL_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ADD_FEES_HISTORY_SUCCESS:
      return { ...state, feesHistory: [...state.feesHistory, action.payload.data] };
    case ADD_FEES_HISTORY_FAIL:
      return { ...state, error: action.payload }
    case DELETE_FEES_HISTORY:
      return {
        ...state,
        feesHistory: state.feesHistory.filter(
          (history) => history._id !== action.payload
        ),
      };
    case FETCH_FEES_HISTORY:
      return { ...state, error: null, loading: true };
    case FETCH_FEES_HISTORY_SUCCESS:
      return { ...state, singleHistory: action.payload.data, loading: false };
    case FETCH_FEES_HISTORY_FAIL:
      return { ...state, singleHistory: null, error: action.payload, loading: false };
    case UPDATE_FEES_HISTORY_SUCCESS:
      return { ...state, singleHistory: action.payload.data }
    case UPDATE_FEES_HISTORY_FAIL:
      return { ...state, error: action.payload }
    default:
      return state;
  }
};
