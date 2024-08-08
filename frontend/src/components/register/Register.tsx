import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css"; 
import { signUp } from '../../utils/actions';
import { useCookies } from 'react-cookie';

const Register = ({noteRegister, setNoteRegister,
  noteLogin, setNoteLogin,
  noteFoodCard, setNoteFoodCard,
  noteMainPage, setNoteMainPage}) => {
  const [formData, setFormData] = useState({
    // username: '',
    email: '',
    password: '',
    // confirmPassword: ''
  });
  const [cookie, setCookie, removeCookie] = useCookies();
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   try {
  //       const res = await axios.post(`http://localhost:8060/register`, formData);
  //       console.log(formData);
  //       setNoteLogin(true);
  //       setNoteRegister(false);
  //       setNoteFoodCard(false);
  //       setNoteMainPage(false);
        
  //     } catch (err) {
        
  //       console.log(err);
        
  //     }
  // };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const response = await signUp(formData);
    console.log("Response received:", response);
    if (response.status !== 200) {
      setError(response.error);
    } else {
      setCookie("Email", response.user_email);
      setCookie("AuthToken", response.token);
      setIsLoggedIn(true);
      setError(null);
      window.location.reload();
    }
  };

  return (
    <div  className="registerContainer" id="registerContainerOutside">
      <div className="container" id="registerContainerInside">
        <div className="row justify-content-center" id="rowRegisterContainer">
          <div className="col-md-6" id="collumnRegisterContainer">
            <div className="card" id="cardRegisterContainer">
              <div className="card-header" id="headerRegisterContainer">
                <h4 className="text-center">Register</h4>
              </div>
              <div className="card-body" id="bodyRegisterContainer">
                <form method="post" action="/register" onSubmit={handleSignUp}>
                  <div className="mb-3">
                    {/* <label htmlFor="username" className="form-label">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    /> */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    {/* <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    /> */}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-outline-secondary" id="registerButton">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;