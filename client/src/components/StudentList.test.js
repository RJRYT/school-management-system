import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers"; // Adjust according to your file structure
import StudentList from "./StudentList";

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

test("renders Student List", () => {
  const initialState = {
    student: {
      students: [{ id: 1, name: "John Doe", classLevel: "5th", age: 10 }],
    },
  };
  renderWithRedux(<StudentList />, { initialState });

  expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/5th/i)).toBeInTheDocument();
});
