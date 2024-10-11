import axios from "../instances/axiosInstance";
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_UPDATED,
} from "../constants/authConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("auth/login", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const response = await axios.get("user/me");

    if (response.data.success) {
      dispatch({
        type: AUTH_SUCCESS,
        payload: response.data.user,
      });
    } else {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching user data", error);
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const updateUser = (newUserData) => (dispatch) => {
  dispatch({
    type: USER_UPDATED,
    payload: newUserData,
  });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
