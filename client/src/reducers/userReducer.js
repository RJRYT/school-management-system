import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  DELETE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

const initialState = {
  users: [],
  selectedUser: null,
  error: null,
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, error: null, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload.data, loading: false };
    case FETCH_USERS_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ADD_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload.data] };
    case ADD_USER_FAIL:
      return { ...state, error: action.payload }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user) => user._id !== action.payload
        ),
      };
    case FETCH_USER:
      return { ...state, error: null, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, selectedUser: action.payload.data, loading: false };
    case FETCH_USER_FAIL:
      return { ...state, selectedUser: null, error: action.payload, loading: false };
    case UPDATE_USER_SUCCESS:
      return { ...state, selectedUser: action.payload.data }
    case UPDATE_USER_FAIL:
      return { ...state, error: action.payload }
    default:
      return state;
  }
};
