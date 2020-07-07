import React, { useEffect, useState } from "react";
import { Select } from "../select/Select";
import Input from "../input/Input";
import "./currencyInput.scss";
import { numberWithCommas } from "../../utils/helper";
import proptype from "prop-types";

function CurrencyInput(props) {
  const [activeCurrency, setActiveCurrency] = useState("NGN");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.defaultCurrencyOption) {
      setActiveCurrency(props.defaultCurrencyOption.value);
    }
  }, []);

  useEffect(() => {
    if (props.value) {
      onChangeCurrency({ target: { value: props.value } });
    }
  }, [props.value, activeCurrency]);

  const onChangeCurrency = ({ target: { value } }) => {
    let newValue;

    newValue = value.toString().replace(/,/g, "");
    newValue = numberWithCommas(newValue);
    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: newValue,
          rawValue: !newValue ? "" : newValue.replace(/,/g, ""),
          currency: activeCurrency
        }
      });
    }
    setValue(newValue);
  };

  return (
    <div className="currency-input-field">
      {!props.hideCurrency && (
        <Select
          defaultOption={{ title: activeCurrency, value: activeCurrency }}
          onChange={e => setActiveCurrency(e.target.value)}
          name="currency"
          optionList={[
            { title: "NGN", value: "NGN" },
            { title: "USD", value: "USD" },
            { title: "GBP", value: "GBP" }
          ]}
        />
      )}
      <Input
        placeholder="0.00"
        value={value}
        style={props.hideCurrency ? { minWidth: 200 } : {}}
        onChange={onChangeCurrency}
        disabled={props.disabled}
        onBlur={props.onBlur}
        required={props.required}
        type={props.type}
      />
    </div>
  );
}

CurrencyInput.propTypes = {
  value: proptype.number,
  onChange: proptype.func,
  defaultCurrencyOption: proptype.objectOf(proptype.any),
  hideCurrency: proptype.bool
};

CurrencyInput.defaultProps = {
  hideCurrency: false
};

export default CurrencyInput;
