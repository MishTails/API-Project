// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../Navigation/Navigation.css'
import { NavLink } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credental: "Demo-lition", password: "password" }))
  };

  return (
    <div className="fullsite">

      <form className="text" onSubmit={handleSubmit}>
        <div className="form-all">
          <div className="form text">
            <h2>Log In</h2>
          </div>

            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label className="login-label">
             <div>Username or Email</div>
              <input
                type="text"
                className="textInput"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label className="login-label">
              <div>Password</div>
              <input
                type="password"
                className="textInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="login-button" type="submit">Log In</button>

            <button className="login-button" type="submit" onClick={() => {
            setCredential("Demo-lition");
            setPassword('password')
          }}
          > Demo User
          </button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
