import axios from "../instances/axiosInstance";
import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAIL,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  DELETE_STUDENT,
} from "../constants/studentConstants";

// Fetch all students
export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("student");
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
    const { data } = await axios.post("student", studentData);
    dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_STUDENT_FAIL, payload: error.response.data.message });
  }
};

// **Delete student**
export const deleteStudent = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`student/${studentId}`);
    dispatch({
      type: DELETE_STUDENT,
      payload: studentId,
    });
  } catch (err) {
    console.error(err);
  }
};