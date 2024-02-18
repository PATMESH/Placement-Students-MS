import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";


const SignUpForm = ({change}) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const[error, setError] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }; 

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, email, password } = state;
  
    try {
      const response = await fetch('https://vsbec-placement-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      setState({
        name: '',
        email: '',
        password: '',
      });
      setError("");
      change("signIn");
    } catch (error) {
      console.log(error);
      setError(error.message || 'Internal Server Error');
    }
  };
  

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="form">
        <h2 style={{fontWeight:'bold'}}>Create Account</h2>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          </a>
          <a href="#" className="social">
          <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
          </a>
          <a href="#" className="social">
          <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
        className="input"
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
        className="input"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
        className="input"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error&& <h5 style={{color:'red'}}>{error}</h5>}
        <button className="btn">Sign Up</button>
        <p className="mob-text">Already have ah account? <a style={{color:'blue'}} onClick={()=>change(true)}>Login</a></p>
      </form>
    </div>
  );
};

export default SignUpForm;
