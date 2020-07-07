import React from "react";
import noContentImg from "../../assets/undraw/not_found.svg";
import proptype from "prop-types";

function NoFound(props) {
  return (
    <div
      className={
        props.small ? "min-height-40vh loader" : "min-height-60vh loader"
      }
    >
      <br />
      <br />
      <br />
      <img
        src={noContentImg}
        height={props.small ? "150px" : "250px"}
        width="100%"
        alt="no content"
      />
      <br />

      {props.showText && <p>No content found!, Check back later</p>}
      {props.text && props.text}
      <br />
      <br />
    </div>
  );
}

NoFound.defaultProps = {
  showText: true
};

NoFound.propTypes = {
  small: proptype.bool,
  showText: proptype.bool,
  text: proptype.any
};

export default NoFound;
