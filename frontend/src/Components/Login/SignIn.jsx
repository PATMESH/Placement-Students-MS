import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function SignInForm({ change }) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const { email, password } = state;
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      await localStorage.setItem("email" , email)
      try {
        const response = await fetch("http://localhost:8000/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        
        const data = await response.json();
        const { message, id } = data;
        navigate(message === "Yes" ? `/profile/${id}` : "/details");
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message || "Internal Server Error");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Internal Server Error");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="form">
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="/" className="social">
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          </a>
          <a href="/" className="social">
            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
          </a>
          <a href="/" className="social">
            <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
          </a>
        </div>
        <span>or use your account</span>
        <input
          className="input"
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        {error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : (
          <br />
        )}

        <a href="/" style={{ textDecoration: "none" }}>
          Forgot your password?
        </a>
        <button className="btn">Sign In</button>
        <p className="mob-text">
          Don't have ah account?{" "}
          <a href="/" style={{ color: "blue" }} onClick={() => change(false)}>
            SignUp
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
