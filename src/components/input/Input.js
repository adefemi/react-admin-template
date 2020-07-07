import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";
import { getNewProps } from "../../utils/helper";
import { DebounceInput } from "react-debounce-input";
import { Spinner } from "../spinner/Spinner";

const defaultPropList = {
  value: PropTypes.any,
  type: PropTypes.oneOf(["text", "number", "password", "tel", "phone", "date"]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "small", "large"]),
  disabled: PropTypes.bool,
  disableCurrencySwap: PropTypes.bool,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  placeholder: PropTypes.string,
  setPhoneNumber: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrencyState: PropTypes.func,
  defaultCurrencyValue: PropTypes.object,
  isError: PropTypes.bool,
  noCurrencySelect: PropTypes.bool,
  debounce: PropTypes.bool,
  minLength: PropTypes.number,
  debounceTimeout: PropTypes.number,
  loader: PropTypes.bool,
};

export const Input = (props) => {
  let newProps = getNewProps(props, defaultPropList);
  let inputType = props.type;

  return (
    <div
      className={
        props.error
          ? props.className + " input-control error " + props.size
          : props.className + " input-control " + props.size
      }
      style={props.style}
    >
      <div className="input-container-cover">
        <div
          className={`input-field ${props.className} ${
            props.disabled ? "disabled" : ""
          }`}
          style={props.isError ? { border: "1px solid red" } : {}}
        >
          {props.iconLeft && <span className="iconLeft">{props.iconLeft}</span>}
          {props.debounce ? (
            <DebounceInput
              placeholder={props.placeholder}
              type={inputType === "phone" ? "number" : inputType}
              disabled={props.disabled}
              onChange={(e) => {
                props.onChange(e);
              }}
              minLength={props.minLength || 1}
              debounceTimeout={props.debounceTimeout || 300}
              {...newProps}
              value={props.value === null ? "" : props.value}
              className={`${props.className} ${
                props.iconRight ? "iconRight" : ""
              } ${props.iconLeft ? "iconLeft" : ""}`}
            />
          ) : (
            <input
              placeholder={props.placeholder}
              type={inputType === "phone" ? "number" : inputType}
              disabled={props.disabled}
              onChange={(e) => {
                props.onChange(e);
              }}
              autoComplete="new-password"
              {...newProps}
              value={props.value === null ? "" : props.value}
              className={`${props.className} ${
                props.iconRight ? "iconRight" : ""
              } ${props.iconLeft ? "iconLeft" : ""}`}
            />
          )}
          {props.iconRight && (
            <span className="iconRight">{props.iconRight}</span>
          )}
          {props.loader && (
            <span className="iconRight">
              <Spinner color="#000" size={10} />
            </span>
          )}
        </div>
      </div>
      {props.isError && (
        <div className={"input-error-text"}>{props.errorText}</div>
      )}
    </div>
  );
};

Input.propTypes = defaultPropList;

Input.defaultProps = {
  value: "",
  type: "text",
  onChange: () => null,
  error: false,
  errorText: "Invalid input",
  className: "",
  size: "default",
  disabled: false,
  loader: false,
  placeholder: "",
};

export default Input;
