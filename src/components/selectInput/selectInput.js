import React, { useEffect, useState } from "react";
import { Select } from "../select/Select";
import Input from "../input/Input";
import "./selectInput.scss";
import { numberWithCommas } from "../../utils/helper";
import proptype from "prop-types";
import CurrencyInput from "../currencyInput/currencyInput";

function SelectInput(props) {
  const [inputValue, setValue] = useState(props.value || "");
  const [currencyData, setCurrencyData] = useState(null);
  const [selectValue, setSelectValue] = useState(props.defaultOption.value);

  const selectChange = e => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    props.onChange([
      {
        target: props.isCurrency
          ? currencyData
          : {
              name: props.name,
              value: inputValue
            }
      },
      { target: { name: props.selectName, value: selectValue } }
    ]);
  }, [inputValue, selectValue]);

  useEffect(() => {
    if (props.value !== inputValue) {
      setValue(props.value);
    }
  }, []);

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="select-input-field">
      {props.selectPosition === "left" && (
        <SelectComp
          name={props.selectName}
          optionList={props.optionList}
          activeOption={props.defaultOption}
          selectChange={selectChange}
          {...props}
        />
      )}
      {props.isCurrency ? (
        <CurrencyInput
          onChange={e => {
            setCurrencyData(e.target);
            onChange(e);
          }}
          value={inputValue}
          hideCurrency={props.hideCurrency}
          name={props.name}
          required={props.required}
          defaultCurrencyOption={props.defaultCurrencyOption}
        />
      ) : (
        <Input
          placeholder={props.placeholder}
          value={inputValue}
          name={props.name}
          type={props.type}
          required={props.required}
          onChange={onChange}
        />
      )}

      {props.selectPosition === "right" && (
        <SelectComp
          name={props.selectName}
          optionList={props.optionList}
          activeOption={props.defaultOption}
          selectChange={selectChange}
          {...props}
        />
      )}
    </div>
  );
}

const SelectComp = ({
  activeOption,
  selectChange,
  optionList,
  name,
  minWidth
}) => (
  <Select
    defaultOption={activeOption}
    onChange={selectChange}
    name={name}
    style={{ maxWidth: minWidth, minWidth: minWidth }}
    className={`select-comp ${minWidth ? "extra" : ""}`}
    optionList={optionList}
  />
);

SelectInput.propTypes = {
  defaultOption: proptype.objectOf(proptype.any).isRequired,
  defaultCurrencyOption: proptype.objectOf(proptype.any),
  optionList: proptype.arrayOf(proptype.objectOf(proptype.any)),
  placeholder: proptype.string,
  onChange: proptype.func,
  onChangeSelect: proptype.func,
  minWidth: proptype.number,
  value: proptype.any,
  name: proptype.string,
  selectName: proptype.string,
  selectPosition: proptype.oneOf(["left", "right"]),
  isCurrency: proptype.bool,
  hideCurrency: proptype.bool
};

SelectInput.defaultProps = {
  selectPosition: "right",
  isCurrency: true,
  hideCurrency: false
};

export default SelectInput;
