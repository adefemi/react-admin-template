import React from "react";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./login.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="login-form">
        <h3>Sign In</h3>
        <FormGroup label="Email">
          <Input />
        </FormGroup>
        <FormGroup label="Password">
          <Input type="password" />
        </FormGroup>
        <br />
        <Button>Login</Button>
      </div>

      <Link to="/forgot-password">
        <div className="link">Forgot Password?</div>
      </Link>
    </div>
  );
}

export default Login;
