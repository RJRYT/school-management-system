import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import AddStudentForm from "./AddStudentForm";

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

test("renders Add Student Form and submits data", () => {
  const initialState = {};
  renderWithRedux(<AddStudentForm />, { initialState });

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByLabelText(/class/i), {
    target: { value: "6th" },
  });
  fireEvent.change(screen.getByLabelText(/age/i), { target: { value: 11 } });

  fireEvent.submit(screen.getByRole("button", { name: /add student/i }));

  expect(screen.getByLabelText(/name/i).value).toBe("Jane Doe");
  expect(screen.getByLabelText(/class/i).value).toBe("6th");
  expect(screen.getByLabelText(/age/i).value).toBe("11");
});
