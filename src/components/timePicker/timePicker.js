import React, { useEffect, useState } from "react";
import calenderSvg from "./assets/timePicker.png";
import "./timePicker.scss";
import proptype from "prop-types";
import { Select } from "../select/Select";
import { getArrayCount } from "../../utils/helper";

function TimePicker(props) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [section, setSection] = useState("AM");

  useEffect(() => {
    if (hour && minute) {
      if (props.onChange) {
        props.onChange({
          target: {
            name: props.name || "",
            value: formatTimeChange()
          }
        });
      }
    }
  }, [hour, minute, section]);

  const formatTime = () => {
    return `${hour.length < 2 ? `0${hour}` : hour}:${
      minute.length < 2 ? `0${minute}` : minute
    } ${section}`;
  };

  const formatTimeChange = () => {
    let newHour = parseInt(hour);
    if (section === "PM") {
      if (newHour === 12) {
        newHour = 0;
      }
      newHour = (12 + newHour).toString();
    }
    if (section === "AM") {
      if (newHour === 12) {
        newHour = 0;
      }
    }

    return `${newHour.length < 2 ? `0${newHour}` : newHour}:${
      minute.length < 2 ? `0${minute}` : minute
    }`;
  };

  const getHour = () => {
    const retVal = [];
    getArrayCount({ start: 1, count: 13, includePlus: false }).map(item => {
      retVal.push({
        title: item,
        value: item
      });
      return null;
    });
    return retVal;
  };
  const getMinute = () => {
    const retVal = [];
    getArrayCount({ start: 0, count: 61, includePlus: false }).map(item => {
      retVal.push({
        title: item,
        value: item
      });
      return null;
    });
    return retVal;
  };

  const getTimeSection = () => {
    return [{ title: "PM", value: "PM" }, { title: "AM", value: "AM" }];
  };

  return (
    <div className="adx-timepicker">
      <div className="input-field">
        <Select
          optionList={getHour()}
          onChange={e => setHour(e.target.value)}
          placeholder="Hour"
        />
        <Select
          optionList={getMinute()}
          onChange={e => setMinute(e.target.value)}
          placeholder="Minute"
        />
        <Select
          optionList={getTimeSection()}
          value={section}
          onChange={e => setSection(e.target.value)}
        />
        <img src={calenderSvg} alt="" />
      </div>

      {hour && minute && <div className="timeFormat">{formatTime()}</div>}
    </div>
  );
}

TimePicker.defaultProps = {};

TimePicker.propType = {
  value: proptype.string,
  onChange: proptype.func
};

export default TimePicker;
