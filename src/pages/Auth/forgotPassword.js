import React from "react";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./login.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="login-form">
        <h3>Retrieve Password</h3>
        <FormGroup label="Email">
          <Input />
        </FormGroup>
        <br />
        <Button>Submit</Button>
      </div>

      <Link to="/login">
        <div className="link">Goto Login</div>
      </Link>
    </div>
  );
}

export default ForgotPassword;
