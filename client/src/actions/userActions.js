import axios from "../instances/axiosInstance";
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

// Fetch all users
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS });
    const { data } = await axios.get("users");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload: error.message,
    });
  }
};

export const addUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("users", userData);
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`users/${userId}`);
    dispatch({
      type: DELETE_USER,
      payload: userId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`users/${id}`, userData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data });
  }
};

export const fetchUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER });
    const response = await axios.get(`users/${id}`);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAIL, payload: error.response.data });
  }
};