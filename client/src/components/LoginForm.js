import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
