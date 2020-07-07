import React from "react";
import "./badge.scss";

function Badge(props) {
  const statuses = {
    success: "#58dc64",
    error: "#ff4329",
    default: "#c4c4c4",
    processing: "#1681ee",
    warning: "#ffb72f"
  };

  const getColor = () => {
    return statuses[props.status];
  };

  return (
    <div className="adx-badge">
      {props.status && (
        <span
          className={`status ${props.status}`}
          style={props.style || { backgroundColor: getColor() }}
        />
      )}
      {props.color && (
        <span
          className="status"
          style={props.style || { backgroundColor: getColor() }}
        />
      )}
      {(props.count || props.dot) && (
        <span
          className={`counter ${props.dot ? "dot" : ""}`}
          style={props.style}
        >
          {props.overflowCount ? props.overflowCount + "+" : props.count}
        </span>
      )}
      {props.children}
      {props.text}
    </div>
  );
}

export default Badge;
