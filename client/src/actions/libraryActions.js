import axios from "../instances/axiosInstance";
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

export const fetchLibraryHistory = () => async (dispatch) => {
  try {
    dispatch({type: FETCH_LIBRARY_HISTORY_ALL});
    const { data } = await axios.get("library");
    dispatch({ type: FETCH_LIBRARY_HISTORY_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_LIBRARY_HISTORY_ALL_FAIL,
      payload: error.message,
    });
  }
};

export const addLibraryHistory = (libraryData) => async (dispatch) => {
  try {
    const { data } = await axios.post("library", libraryData);
    dispatch({ type: ADD_LIBRARY_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_LIBRARY_HISTORY_FAIL, payload: error.message });
  }
};

export const deleteLibraryHistory = (historyId) => async (dispatch) => {
  try {
    await axios.delete(`library/${historyId}`);
    dispatch({
      type: DELETE_LIBRARY_HISTORY,
      payload: historyId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateLibraryHistory = (id, libraryData) => async (dispatch) => {
  try {
    const response = await axios.put(`library/${id}`, libraryData);
    dispatch({ type: UPDATE_LIBRARY_HISTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_LIBRARY_HISTORY_FAIL, payload: error.response.data });
  }
};

export const fetchLibraryHistoryById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LIBRARY_HISTORY });
    const response = await axios.get(`library/${id}`);
    dispatch({ type: FETCH_LIBRARY_HISTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_LIBRARY_HISTORY_FAIL, payload: error.response.data });
  }
};