import axios from "../instances/axiosInstance";
import {
  FETCH_FEES_HISTORY_SUCCESS,
  FETCH_FEES_HISTORY_FAIL,
} from "../constants/feesConstants";

// Fetch fees history
export const fetchFeesHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get("fees");
    dispatch({ type: FETCH_FEES_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_FEES_HISTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
