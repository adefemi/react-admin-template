import React, { useEffect, useState } from "react";
import calenderSvg from "./assets/calender.svg";
import chevron from "./assets/chevron.svg";
import chevrons from "./assets/chevrons.svg";
import "./datePicker.scss";
import proptype from "prop-types";

function getDaysInMonth(m, y) {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

function getStartWeekDay(m, y) {
  return new Date(y + "-" + m + "-01").getDay();
}

function DatePicker(props) {
  const weekShortArray = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const weekFullArray = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  const monthFullArray = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  const monthShortArray = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec"
  ];

  const getToday = () => {
    return new Date();
  };

  const [activeValue, setActiveValue] = useState(props.value || "");
  const [activeType, setActiveType] = useState(props.dateType);
  const [activeYear, setActiveYear] = useState(getToday().getFullYear());
  const [activeMonth, setActiveMonth] = useState(getToday().getMonth() + 1);
  const [activeDay, setActiveDay] = useState(getToday().getDate());
  const [startValue, setStartValue] = useState(props.startDate || "");
  const [endValue, setEndValue] = useState(props.endDate || "");
  const [activeState, setActiveState] = useState(0);
  const [visibility, setVisibility] = useState(false);

  const getRenderContext = () => {
    let returnValue = [];
    returnValue.push(
      weekShortArray.map((item, key) => (
        <div key={key} className="weekTitle">
          {item}
        </div>
      ))
    );

    const totalDaysInMonth = getDaysInMonth(activeMonth, activeYear);
    const startWeekDay = getStartWeekDay(activeMonth, activeYear);

    let counter = 0;
    let tempArray = [];

    const checkPast = val => {
      let today = getToday().getDate();
      if (props.showToday) {
        today = getToday().setDate(getToday().getDate() - 1);
        today = new Date(today).getDate();
      }
      let month = getToday().getMonth() + 1;
      let year = getToday().getFullYear();

      if (activeYear < year || activeMonth < month) return false;

      if (activeYear <= year) {
        if (activeMonth <= month) {
          if (val <= today) return false;
        }
      }

      return true;
    };

    const checkDisabled = val => {
      if (props.rangePicker && activeState === 1) {
        let selected = startValue.split("-");
        if (activeYear === parseInt(selected[0])) {
          if (activeMonth === parseInt(selected[1])) {
            if (val <= parseInt(selected[selected.length - 1])) {
              return false;
            }
          }
        }
      }
      return true;
    };

    for (let j = 0; j < startWeekDay; j++) {
      tempArray.push(<div key={"k" + j} className="weekDays disabled" />);
      counter++;
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      tempArray.push(
        <div
          key={"d" + i}
          onClick={() => {
            if (props.disablePastDate && !checkPast(i)) return;
            if (!checkDisabled(i)) return;
            setDate(i);
          }}
          className={`weekDays ${getIsToday(i) ? "active" : ""} ${
            !checkDisabled(i) ? "disabled" : ""
          } ${props.disablePastDate && !checkPast(i) ? "disabled" : ""}`}
        >
          {i}
        </div>
      );

      counter++;
      if (counter >= 7) {
        returnValue.push(tempArray);
        counter = 0;
        tempArray = [];
      }
      if (i === totalDaysInMonth) returnValue.push(tempArray);
    }

    return returnValue;
  };

  const setDate = i => {
    setActiveDay(i);
    if (props.rangePicker) {
      const value = `${activeYear}-${dualizer(activeMonth)}-${dualizer(i)}`;
      if (activeState === 1) {
        setEndValue(value);
        setActiveValue(activeValue + value);
        setVisibility(false);
        if (props.onChange) {
          props.onChange({
            startDate: startValue,
            endDate: value,
            value: activeValue + value
          });
        }
      } else {
        setStartValue(value);
        setActiveValue(`${value} - `);
        setActiveState(1);
      }
    } else {
      const value = `${activeYear}-${dualizer(activeMonth)}-${dualizer(i)}`;
      setActiveValue(value);
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          target: {
            name: props.name || "",
            value
          }
        });
      }
    }
  };

  const setMonth = i => {
    if (props.dateType === "month") {
      setActiveValue(monthFullArray[i]);
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value: monthFullArray[i]
        });
      }
    } else if (props.dateType === "week") {
      setActiveValue(weekFullArray[i]);
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value: weekFullArray[i]
        });
      }
    } else {
      setActiveMonth(i);
      setActiveType("date");
    }
  };

  const setYear = i => {
    if (props.dateType === "year") {
      setActiveValue(i.toString());
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value: i.toString()
        });
      }
    } else {
      setActiveYear(i);
      setActiveType("month");
    }
  };

  const dualizer = val => {
    if (val.toString().length < 2) {
      return `${0}${val}`;
    }
    return val;
  };

  const getIsToday = i => {
    if (
      activeMonth === getToday().getMonth() + 1 &&
      activeYear === getToday().getFullYear()
    ) {
      if (activeDay === i) return true;
    }
    return false;
  };
  const getIsMonth = i => {
    if (activeYear === getToday().getFullYear()) {
      if (getToday().getMonth() === i) return true;
    }
    return false;
  };

  const changeMonth = _type => {
    if (_type === "prev") {
      let newMonth = activeMonth - 1;
      let newYear = activeYear;
      if (newMonth <= 0) {
        newMonth = 12;
        newYear = newYear - 1;
      }
      setActiveMonth(newMonth);
      setActiveYear(newYear);
    } else {
      let newMonth = activeMonth + 1;
      let newYear = activeYear;
      if (newMonth >= 13) {
        newMonth = 1;
        newYear = newYear + 1;
      }
      setActiveMonth(newMonth);
      setActiveYear(newYear);
    }
  };

  const changeYear = _type => {
    if (_type === "prev") {
      setActiveYear(activeYear - (activeType === "year" ? 12 : 1));
    } else {
      setActiveYear(activeYear + (activeType === "year" ? 12 : 1));
    }
  };

  const getRenderContextMonth = () => {
    const returnValue = [];
    monthShortArray.map((item, i) => {
      returnValue.push(
        <div
          onClick={() => setMonth(i)}
          key={"m" + i}
          className={`weekDays ${getIsMonth(i) ? "active" : ""}`}
        >
          {item}
        </div>
      );
      return null;
    });
    return returnValue;
  };

  const getRenderContextWeek = () => {
    const returnValue = [];
    weekFullArray.map((item, i) => {
      returnValue.push(
        <div
          onClick={() => setMonth(i)}
          key={"w" + i}
          className={`weekDays ${getIsMonth(i) ? "active" : ""}`}
        >
          {item}
        </div>
      );
      return null;
    });
    return returnValue;
  };

  useEffect(() => {
    if (visibility) {
      setPosition();
    }
    if (props.defaultValue) {
      setActiveValue(props.defaultValue);
    }
  }, [visibility]);

  const setPosition = () => {
    try {
      let dropDown = document.getElementById("datepicker" + props.id);
      let inputField = document.getElementById("datepickerInput" + props.id);
      const inputBounds = inputField.getBoundingClientRect();
      dropDown.style.left = `${props.translated ? 0 : inputBounds.x}px`;
      dropDown.style.position = `${props.translated ? "absolute" : "fixed"}`;

      const dropDownVPos =
        dropDown.getBoundingClientRect().height +
        inputBounds.top +
        inputBounds.height;
      const windowHeight = window.innerHeight - 20;

      if (dropDownVPos > windowHeight) {
        dropDown.style.top = `${
          props.translated
            ? 0
            : inputBounds.top +
              inputBounds.height -
              dropDown.getBoundingClientRect().height
        }px`;
      } else {
        dropDown.style.top = `${
          props.translated
            ? -dropDown.getBoundingClientRect().height
            : inputBounds.top
        }px`;
      }
    } catch (e) {}
  };

  const getRenderContextYear = () => {
    let toCount = activeYear + 12;
    const returnValue = [];
    for (let i = activeYear; i < toCount; i++) {
      returnValue.push(
        <div
          onClick={() => setYear(i)}
          key={"y" + i}
          className={`weekDays ${
            i === getToday().getFullYear() ? "active" : ""
          }`}
        >
          {i}
        </div>
      );
    }
    return returnValue;
  };

  return (
    <div className="adx-datePicker">
      <div
        className="input-field"
        onClick={() => setVisibility(!visibility)}
        id={"datepickerInput" + props.id}
      >
        <input
          type="text"
          placeholder={`Select ${activeType}`}
          value={activeValue}
          disabled
        />
        <img src={calenderSvg} alt="" />
      </div>
      {visibility && (
        <div className="date-picker-con" onClick={() => setVisibility(false)} />
      )}
      <div
        className={`date-picker ${visibility ? "show" : ""}`}
        id={"datepicker" + props.id}
      >
        <div className="picker-heading">
          {props.rangePicker && activeState === 1 ? (
            <div
              className="backKey"
              onClick={() => {
                setActiveState(0);
                setActiveValue("");
                setStartValue("");
              }}
            >
              Back
            </div>
          ) : (
            <div className="lcontrol">
              {activeType !== "week" && (
                <button type="button" onClick={() => changeYear("prev")}>
                  <img src={chevrons} alt="" />
                </button>
              )}
              {activeType === "date" && (
                <button type="button" onClick={() => changeMonth("prev")}>
                  <img src={chevron} alt="" />
                </button>
              )}
            </div>
          )}

          <div className="context-main">
            {activeType === "date" && (
              <span onClick={() => setActiveType("month")}>
                {monthShortArray[activeMonth - 1]}
              </span>
            )}
            {(activeType === "date" || activeType === "month") && (
              <span onClick={() => setActiveType("year")}>{activeYear}</span>
            )}
          </div>

          <div className="rcontrol">
            {activeType === "date" && (
              <button type="button" onClick={() => changeMonth()}>
                <img src={chevron} alt="" />
              </button>
            )}

            {activeType !== "week" && (
              <button type="button" onClick={() => changeYear()}>
                <img src={chevrons} alt="" />
              </button>
            )}
          </div>
        </div>
        <div className="body">
          {activeType === "date" && (
            <div className="date-data">{getRenderContext()}</div>
          )}
          {activeType === "month" && (
            <div className="month-data">{getRenderContextMonth()}</div>
          )}
          {activeType === "week" && (
            <div className="month-data">{getRenderContextWeek()}</div>
          )}
          {activeType === "year" && (
            <div className="month-data">{getRenderContextYear()}</div>
          )}
        </div>
      </div>
    </div>
  );
}

DatePicker.propType = {
  dateType: proptype.oneOf(["date", "month", "year", "week"]),
  rangePicker: proptype.bool,
  value: proptype.string,
  startDate: proptype.string,
  endDate: proptype.string,
  onChange: proptype.func,
  translated: proptype.bool,
  translationWidth: proptype.number,
  disablePastDate: proptype.bool,
  showToday: proptype.bool
};

DatePicker.defaultProps = {
  dateType: "date",
  rangePicker: false,
  translationWidth: window.innerWidth
};

export default DatePicker;
