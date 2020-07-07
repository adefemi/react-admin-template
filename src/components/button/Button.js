import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";
import { Spinner } from "../spinner/Spinner";

export const Button = props => {
  return (
    <button
      style={props.style}
      id={props.id}
      onClick={e => {
        e.target = e.currentTarget;
        return props.onClick ? props.onClick(e) : null;
      }}
      className={`btn ${props.color} ${props.loading &&
        "loading"} ${props.block && "block"} ${props.className}`}
      disabled={props.disabled}
      type={props.type}
      value={props.value}
      title={props.title}
      onBlur={props.onBlur}
    >
      <span className={"content"}>
        {props.icon && <span className={"icon-left"}>{props.icon}</span>}
        {props.children}
      </span>
      {props.loading ? <Spinner /> : null}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "success", "danger", "default"]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  block: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  color: "primary",
  loading: false,
  disabled: false,
  onClick: null,
  style: {},
  className: "",
  type: "button"
};
