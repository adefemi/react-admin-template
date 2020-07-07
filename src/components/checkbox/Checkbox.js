import React, { Fragment } from "react";

import "./Checkbox.scss";

export const Checkbox = ({
  checked,
  id,
  label = "",
  name = "",
  onChange,
  className,
  disabled,
  title
}) => {
  const properties = {
    className: "Checkbox " + className,
    type: "checkbox"
  };

  return (
    <Fragment>
      <input
        checked={checked}
        id={id}
        name={name}
        onChange={e =>
          onChange({
            target: {
              name,
              value: !checked
            }
          })
        }
        disabled={disabled}
        title={title || ""}
        {...properties}
      />
      <label title={title || ""} htmlFor={id}>
        {label}
      </label>
    </Fragment>
  );
};
