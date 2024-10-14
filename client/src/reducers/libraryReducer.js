import {
  FETCH_LIBRARY_HISTORY_ALL,
  FETCH_LIBRARY_HISTORY_ALL_SUCCESS,
  FETCH_LIBRARY_HISTORY_ALL_FAIL,
  ADD_LIBRARY_HISTORY_SUCCESS,
  ADD_LIBRARY_HISTORY_FAIL,
  DELETE_LIBRARY_HISTORY,
  UPDATE_LIBRARY_HISTORY_SUCCESS,
  UPDATE_LIBRARY_HISTORY_FAIL,
  FETCH_LIBRARY_HISTORY,
  FETCH_LIBRARY_HISTORY_SUCCESS,
  FETCH_LIBRARY_HISTORY_FAIL,
} from "../constants/libraryConstants";

const initialState = {
  libraryHistory: [],
  singleHistory: null,
  error: null,
  loading: false,
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIBRARY_HISTORY_ALL:
      return { ...state, error: null, loading: true };
    case FETCH_LIBRARY_HISTORY_ALL_SUCCESS:
      return { ...state, libraryHistory: action.payload.data, loading: false };
    case FETCH_LIBRARY_HISTORY_ALL_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ADD_LIBRARY_HISTORY_SUCCESS:
      return { ...state, libraryHistory: [...state.libraryHistory.data, action.payload] };
    case ADD_LIBRARY_HISTORY_FAIL:
      return { ...state, error: action.payload };
    case DELETE_LIBRARY_HISTORY:
      return {
        ...state,
        libraryHistory: state.libraryHistory.filter(
          (history) => history._id !== action.payload
        ),
      };
    case FETCH_LIBRARY_HISTORY:
      return { ...state, error: null, loading: true };
    case FETCH_LIBRARY_HISTORY_SUCCESS:
      return { ...state, singleHistory: action.payload.data, loading: false };
    case FETCH_LIBRARY_HISTORY_FAIL:
      return { ...state, singleHistory: null, error: action.payload, loading: false };
    case UPDATE_LIBRARY_HISTORY_SUCCESS:
      return { ...state, singleHistory: action.payload }
    case UPDATE_LIBRARY_HISTORY_FAIL:
      return { ...state, error: action.payload }
    default:
      return state;
  }
};
