import axios from "../instances/axiosInstance";
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

// Fetch fees history
export const fetchFeesHistory = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FEES_HISTORY_ALL });
    const { data } = await axios.get("fees");
    dispatch({ type: FETCH_FEES_HISTORY_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_FEES_HISTORY_ALL_FAIL,
      payload: error.message,
    });
  }
};

export const addFeesHistory = (feesData) => async (dispatch) => {
  try {
    const { data } = await axios.post("fees", feesData);
    dispatch({ type: ADD_FEES_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_FEES_HISTORY_FAIL, payload: error.message });
  }
};

export const deleteFeesHistory = (historyId) => async (dispatch) => {
  try {
    await axios.delete(`fees/${historyId}`);
    dispatch({
      type: DELETE_FEES_HISTORY,
      payload: historyId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateFeesHistory = (id, feesData) => async (dispatch) => {
  try {
    const response = await axios.put(`fees/${id}`, feesData);
    dispatch({ type: UPDATE_FEES_HISTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_FEES_HISTORY_FAIL, payload: error.response.data });
  }
};

export const fetchFeesHistoryById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FEES_HISTORY });
    const response = await axios.get(`fees/${id}`);
    dispatch({ type: FETCH_FEES_HISTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FEES_HISTORY_FAIL, payload: error.response.data });
  }
};