import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_UPDATED,
} from "../constants/authConstants";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: 
      localStorage.setItem("token", action.payload.token);
      return {
        token: action.payload.token,
        isAuthenticated: true,
        user: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case USER_UPDATED:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};
