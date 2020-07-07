import PropTypes from "prop-types";
import React from "react";

import "./TextAreaField.scss";

export const TextAreaField = props => {
  return (
    <React.Fragment>
      <textarea
        name={props.name}
        disabled={props.disabled}
        placeholder={props.placeholder}
        maxLength={props.maxlength}
        onChange={props.onChange}
        style={{ ...props.style, resize: "none", height: "120px" }}
        className={props.error ? "textarea-error" : ""}
        defaultValue={props.defaultValue}
        value={props.value}
        required={props.required}
      />
      {props.error && <span className="error">{props.errorText}</span>}
    </React.Fragment>
  );
};

TextAreaField.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxlength: PropTypes.number,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string
};

TextAreaField.defaultProps = {
  disabled: false,
  placeholder: "Click here to start typing . . .",
  id: "textAreaOne",
  error: false,
  errorText: "Error validating the input"
};
