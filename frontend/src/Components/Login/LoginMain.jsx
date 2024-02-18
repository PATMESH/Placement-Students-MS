import React, { useState } from "react";
import "../../Css/login.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import logo from "../../Css/logo.png";

export default function LoginMain() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const [login,  setLogin] = useState(false);
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm change={setType}/>
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src={logo} alt="Logo" width={"350px"} height={"350px"} />
              <button
                className="ghost btn"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img src={logo} alt="Logo" width={"350px"} height={"350px"} />
              <button
                className="ghost btn "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mob-container">
        {login?<SignInForm change={setLogin}/>:<SignUpForm change={setLogin}/>}
      </div>
    </div>
  );
}
