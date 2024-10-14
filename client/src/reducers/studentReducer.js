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

const initialState = {
  students: [],
  student: null,
  error: null,
  loading: false,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, error: null, loading: true };
    case FETCH_STUDENTS_SUCCESS:
      return { ...state, students: action.payload, loading: false };
    case FETCH_STUDENTS_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ADD_STUDENT_SUCCESS:
      return { ...state, students: [...state.students, action.payload] };
    case ADD_STUDENT_FAIL:
      return { ...state, error: action.payload };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    case FETCH_STUDENT:
      return { ...state, error: null, loading: true };
    case FETCH_STUDENT_SUCCESS:
      return { ...state, student: action.payload?.student, loading: false };
    case FETCH_STUDENT_FAIL:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_STUDENT_SUCCESS:
      return { ...state, student: action.payload?.student }
    case UPDATE_STUDENT_FAIL:
      return { ...state, error: action.payload }
    default:
      return state;
  }
};
