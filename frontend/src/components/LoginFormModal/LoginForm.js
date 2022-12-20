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
        <div className="form">
          <div className="form text">
            <h2>Log In</h2>
            <h4>Not a Member yet? <NavLink className="navLogSign" to="/signup">Sign Up</NavLink></h4>
          </div>

            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
             <div>Username or Email</div>
              <input
                type="text"
                className="textInput"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              <div>Password</div>
              <input
                type="password"
                className="textInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>

            <button type="submit" onClick={() => {
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
