import React from "react";
import "./result.scss";
import error from "./assets/error.svg";
import accessDenied from "./assets/access-denied.svg";
import info from "./assets/info.svg";
import notFound from "./assets/not-found.svg";
import wrong from "./assets/something-wrong.svg";
import success from "./assets/success.svg";
import warning from "./assets/warning.svg";
import { Button } from "../button/Button";

function Result(props) {
  const getStatus = () => {
    switch (props.status) {
      case "success":
        return success;
      case "warning":
        return warning;
      case "403":
        return accessDenied;
      case "404":
        return notFound;
      case "500":
        return wrong;
      case "error":
        return error;
      default:
        return info;
    }
  };

  return (
    <div className="adx-result">
      <div className="status">
        <img src={getStatus()} alt="" />
      </div>
      {props.title && <div className="title">{props.title}</div>}
      {props.subTitle && <div className="subtitle">{props.subTitle}</div>}
      {props.func && (
        <>
          <br />
          <Button onClick={props.func} type="button">
            {props.funcName}
          </Button>
        </>
      )}
      <div className="extra">{props.extra}</div>
    </div>
  );
}

export default Result;
