import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../actions/studentActions";

const AddStudentForm = () => {
  const [name, setName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { name, classLevel, age };
    dispatch(addStudent(studentData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Class:</label>
      <input
        type="text"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
      />

      <label>Age:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
