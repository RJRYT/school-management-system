import axios from "axios";
import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAIL,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
} from "../constants/studentConstants";

// Fetch all students
export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/students");
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add new student
export const addStudent = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/students", studentData);
    dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_STUDENT_FAIL, payload: error.response.data.message });
  }
};
