import React, { useState, useEffect } from "react";
import proptype from "prop-types";

import "./Select.scss";
import Input from "../input/Input";
import AppIcon from "../icons/Icon";
import ms from "microseconds";
import {
  addClass,
  hasClass,
  randomIDGenerator,
  removeClass
} from "../../utils/helper";

export const Select = props => {
  const [optionList, setOptionList] = useState([]);
  const [defaultOptionList, setDefaultOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selection, setSelection] = useState("");
  const [name, setName] = useState("");
  const [activeOption, setActiveOption] = useState("");
  const [activeID] = useState(`${randomIDGenerator(6)}-${ms.now()}`);
  const [selectId] = useState(`${randomIDGenerator(6)}-${ms.now()}`);

  useEffect(() => {
    setOptionList(props.optionList);
    setDefaultOptionList(props.optionList);
    setName(props.name);
    if (props.value) {
      setActiveOption(props.value);
    } else {
      if (props.canAllowEmptyValue) {
        setActiveOption(props.value || "");
      }
    }
  }, [props.value, props.optionList, props.name]);

  useEffect(() => {
    if (selection !== "") {
      handleSelection();
    }
  }, [selection]);

  useEffect(() => {
    createSetupOption();
    if (props.defaultOption && props.defaultOption.title) {
      setSelection(props.defaultOption.title);
    }
    setTimeout(() => positionOptionDrop(), 1000);
    document
      .getElementById("mainBar")
      .addEventListener("scroll", positionOptionDrop);
    window.addEventListener("resize", positionOptionDrop);
    handleClicks();
  }, [props.optionList]);

  useEffect(() => {
    if (props.triggerPosition) {
      positionOptionDrop();
      props.triggerReset();
    }

    if (props.selectTrigger) {
      setActiveOption("");
      props.selectTriggerReset();
    }
  }, [props.triggerPosition, props.selectTrigger]);

  useEffect(() => {
    const selectDrop = document.getElementById(activeID);
    const ul = selectDrop.getElementsByTagName("ul")[0];
    if (!ul) {
      return;
    }
    ul.innerHTML = "";
    appendSelections(ul, optionList);
    setTimeout(() => positionOptionDrop(), 200);
  }, [optionList]);

  const createSetupOption = () => {
    let el = document.createElement("div");
    el.id = activeID;
    el.classList.add("select-root");
    document.body.appendChild(el);
    addOptions(el);
  };

  const addOptions = el => {
    let ul = document.createElement("ul");
    ul.classList.add("select-ul");
    appendSelections(ul, defaultOptionList);
    el.appendChild(ul);
  };

  const appendSelections = (ul, _list) => {
    _list.map((item, index) => {
      let li = document.createElement("li");
      li.classList.add("select-li");
      li.innerHTML = item.title;
      li.onclick = e => {
        setSelection(e.target.innerHTML);
      };
      ul.appendChild(li);
      return null;
    });
  };

  const positionOptionDrop = _ => {
    try {
      let el = document.getElementById(activeID.toString());
      let inputField = document.getElementById(selectId.toString());
      const inputBounds = inputField.getBoundingClientRect();
      el.style.left = `${inputBounds.x}px`;
      el.style.width = `${inputBounds.width}px`;
      const dropDownVPos =
        el.getBoundingClientRect().height +
        inputBounds.top +
        inputBounds.height;
      const windowHeight = window.innerHeight - 20;

      if (dropDownVPos > windowHeight) {
        el.style.top = `${inputBounds.top -
          10 -
          el.getBoundingClientRect().height}px`;
      } else {
        el.style.top = `${inputBounds.top + inputBounds.height + 10}px`;
      }
    } catch (e) {}
  };

  const handleSelection = _ => {
    const valueCheck = defaultOptionList.filter(
      item => item.title === selection
    );
    if (valueCheck.length > 0) {
      const inputElement = document.getElementById(selectId);
      inputElement.onblur = e => false;
      setSelectedOption(valueCheck[0]);
      setActiveOption(valueCheck[0].title);
      if (props.onChange) {
        props.onChange({
          target: {
            name,
            value: valueCheck[0].value
          }
        });
      }
      closeAllSelect();
    }
  };

  const handleClicks = () => {
    const input = document.getElementById(selectId);

    document.body.onclick = e => {
      if (
        hasClass(e.target, "select-li") ||
        hasClass(e.target, "select-input")
      ) {
        return;
      }
      closeAllSelect();
    };
    input.onclick = () => {
      const selectDrop = document.getElementById(activeID);

      if (!hasClass(selectDrop, "open")) {
        closeAllSelect(activeID);
        addClass(selectDrop, "open");
      } else {
        removeClass(selectDrop, "open");
      }
    };
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const closeAllSelect = id => {
    const allSelect = document.getElementsByClassName("select-root");
    if (allSelect) {
      for (let i = 0; i < allSelect.length; i++) {
        if (hasClass(allSelect[i], "open")) {
          if (id && allSelect[id] !== id) {
            removeClass(allSelect[i], "open");
          } else {
            removeClass(allSelect[i], "open");
          }
        }
      }
    }
  };

  const onChange = e => {
    if (props.onTypeChange) {
      props.onTypeChange({
        target: {
          name: props.name,
          value: e.target.value
        }
      });
    }
    setActiveOption(e.target.value);
    setSelectedOption(null);
    const newList = defaultOptionList.filter(item =>
      item.title.toString().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 0) {
      setOptionList(newList);
    } else {
      setOptionList(defaultOptionList);
    }
  };

  return (
    <Input
      id={selectId}
      type="text"
      style={props.style}
      className={`select-input ${props.className ? props.className : ""}`}
      value={activeOption}
      onBlur={_ => {
        if (props.onBlur) {
          props.onBlur();
        }
        if (props.autoComplete) {
          return;
        }
        if (!selectedOption) {
          setActiveOption("");
          setTimeout(() => setOptionList(defaultOptionList), 500);
        }
      }}
      onChange={onChange}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.fetching}
      iconRight={
        props.autoComplete ? (
          <></>
        ) : props.icon ? (
          props.icon
        ) : (
          <AppIcon name="ic_arrow_drop_down" type="md" />
        )
      }
    />
  );
};

Select.propTypes = {
  defaultOption: proptype.objectOf(proptype.any),
  optionList: proptype.arrayOf(proptype.objectOf(proptype.any)),
  placeholder: proptype.string,
  onChange: proptype.func,
  name: proptype.string,
  value: proptype.any,
  autoComplete: proptype.bool,
  fetching: proptype.bool,
  onTypeChange: proptype.func
};

Select.defaultProps = {
  autoComplete: false,
  fetching: false
};
