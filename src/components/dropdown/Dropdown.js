import React, { Component } from "react";
import "./Dropdown.scss";
import { hasClass, addClass, removeClass } from "../../utils/helper";
import { hasSomeParentTheClass } from "../../utils/helper";
import propTypes from "prop-types";
import shortID from "shortid";
const proptypes = {
  dropDownWidth: propTypes.string,
  active: propTypes.any.isRequired,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  onChange: propTypes.func.isRequired,
  staticContent: propTypes.bool
};

export class DropDown extends Component {
  onCLickSet = option => {
    this.props.onChange(option);
    this.setState({ active: option.value });
  };

  state = {
    active: this.props.active
  };

  dropDownID = shortID.generate();
  dropDownUlID = shortID.generate();

  dropDownRef = null;
  dropDownUlRef = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.active !== prevState.active) {
      return { active: nextProps.active };
    } else return null;
  }

  getActive = () => {
    const { options, staticContent } = this.props;
    const { active } = this.state;

    if (staticContent) {
      return active;
    }

    let activeOption = options.filter(option => option.value === active)[0];
    return <div className="dropdown-content">{activeOption.content}</div>;
  };

  getOptions = () => {
    const { options, staticContent } = this.props;
    const list = [];

    options.map((option, index) => {
      list.push(
        <li
          key={index}
          onClick={() => (!staticContent ? this.onCLickSet(option) : null)}
        >
          {option.content}
        </li>
      );
      return null;
    });
    return list;
  };

  toggleDropDown = id => {
    let el = document.getElementById(id);
    let overlay = el.getElementsByClassName("overlay-drop")[0];
    if (!hasClass(el, "open")) {
      addClass(el, "open");
      addClass(overlay, "open");
    } else {
      removeClass(el, "open");
      removeClass(overlay, "open");
    }
  };

  componentDidMount() {
    document.body.onclick = this.removeDrop;
  }

  removeDrop = e => {
    let dropDownCon = document.getElementsByClassName("dropdown-main");
    for (let i = 0; i < dropDownCon.length; i++) {
      let el = document.getElementById(dropDownCon[parseInt(i, 10)].id);
      if (
        hasClass(el, "open") &&
        !hasSomeParentTheClass(e.target, "dropdown-ul")
      ) {
        removeClass(el, "open");
      }
    }
  };

  render() {
    return (
      <>
        <div
          id={this.dropDownID}
          ref={ref => (this.dropDownRef = ref)}
          onClick={() => this.toggleDropDown(this.dropDownID)}
          className="dropdown-main"
        >
          <div className="overlay-drop" />
          {this.props.static ? (
            <div className="dropdown-content">{this.props.children}</div>
          ) : (
            this.getActive()
          )}
          <ul
            style={{ width: this.props.dropDownWidth }}
            id={this.dropDownUlID}
            ref={ref => (this.dropDownUlRef = ref)}
            className="dropdown-ul"
          >
            {this.getOptions()}
          </ul>
        </div>
      </>
    );
  }
}

DropDown.propTypes = proptypes;

DropDown.defaultProps = {
  dropDownWidth: "100px",
  staticContent: false
};
