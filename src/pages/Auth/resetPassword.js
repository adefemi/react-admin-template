import React from "react";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./login.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="login-form">
        <h3>Reset Password</h3>
        <FormGroup label="New password">
          <Input type="password" />
        </FormGroup>
        <FormGroup label="Confirm password">
          <Input type="password" />
        </FormGroup>
        <br />
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default ResetPassword;
