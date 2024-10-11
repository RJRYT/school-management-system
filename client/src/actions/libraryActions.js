import axios from "../instances/axiosInstance";
import {
  FETCH_LIBRARY_HISTORY_SUCCESS,
  FETCH_LIBRARY_HISTORY_FAIL,
} from "../constants/libraryConstants";

// Fetch library history
export const fetchLibraryHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get("library");
    dispatch({ type: FETCH_LIBRARY_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_LIBRARY_HISTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
