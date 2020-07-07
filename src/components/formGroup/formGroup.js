import React from "react";
import "./formGroup.scss";

function FormGroup({ className, label, subLabel, children, required }) {
  return (
    <div className={`form-group ${className ? className : ""}`}>
      <label>
        <span className={"label " + (required ? "flex" : "")}>
          {label}{" "}
          {required ? <span className={"required-indicator"}>*</span> : ""}
        </span>
        <small>{subLabel}</small>
        {children}
      </label>
    </div>
  );
}

export default FormGroup;
