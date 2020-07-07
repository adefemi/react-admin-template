import React from "react";
import PropTypes from "prop-types";
import ms from "microseconds";
import "./Radio.scss";
import { randomIDGenerator } from "../../utils/helper";

export const Radio = props => {
  const id = `${randomIDGenerator(5)}-${ms.now()}`;

  const properties = {
    ...props,
    className: "Radio " + props.className,
    type: "radio",
    id
  };

  return (
    <div className="input-radio">
      <input {...properties} />
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

//proptypes definition
Radio.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

//default proptypes
Radio.defaultProps = {
  label: "",
  name: "",
  onChange: null,
  className: ""
};
