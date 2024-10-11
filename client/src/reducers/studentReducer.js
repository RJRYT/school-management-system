import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAIL,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
} from "../constants/studentConstants";

const initialState = {
  students: [],
  error: null,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      return { ...state, students: action.payload };
    case FETCH_STUDENTS_FAIL:
      return { ...state, error: action.payload };
    case ADD_STUDENT_SUCCESS:
      return { ...state, students: [...state.students, action.payload] };
    case ADD_STUDENT_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
