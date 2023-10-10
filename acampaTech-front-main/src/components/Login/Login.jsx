import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../utils/auth.service";

import "./style.scss";  

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-login">
      <div className="div">
      <Form onSubmit={handleLogin} ref={form}>
        <div className="form">
          <div className="center">

         <div className="text-wrapper-5">Login</div> 

          <input className="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        placeholder="usuario">
          </input>

           

          <input className="password"
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="Senha">
          </input>



          {
          <div className="section-forgot">
            <div className="text-wrapper">Ainda não tem cadastro?    
              <a href="/signup" className="link">  Clique aqui</a>
            </div>
          </div> 
          }

          <button className="login-btn" >login</button> 
          </div>

          
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    ); 
};

export default Login;