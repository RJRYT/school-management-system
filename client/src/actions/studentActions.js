import axios from "../instances/axiosInstance";
import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAIL,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  DELETE_STUDENT,
  UPDATE_STUDENT_FAIL,
  UPDATE_STUDENT_SUCCESS,
  FETCH_STUDENT,
  FETCH_STUDENT_SUCCESS,
  FETCH_STUDENT_FAIL,
} from "../constants/studentConstants";

// Fetch all students
export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STUDENTS });
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

export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    const response = await axios.put(`student/${id}`, studentData);
    dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_STUDENT_FAIL, payload: error.response.data });
  }
};

export const fetchStudentById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STUDENT });
    const response = await axios.get(`student/${id}`);
    dispatch({ type: FETCH_STUDENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_STUDENT_FAIL, payload: error.response.data });
  }
};