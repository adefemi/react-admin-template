import React, { useState } from "react";
import { Icon } from "../";
import "./Rater.scss";

export function Rater({ rate = 0, total = 5, size = 24, changeable, getRate }) {
  const [rateState, changeRateState] = useState(rate);
  const changeRateStateAndCB = rate => {
    changeRateState(rate);
    getRate(rate);
  };
  const generateRating = () => {
    let rating = [];
    for (let i = 1; i <= total; i++) {
      rating.push(
        <div
          className="myRate"
          onClick={() => (changeable ? changeRateStateAndCB(i) : null)}
          key={i}
        >
          <Icon
            type="ionicons"
            name={"androidStar"}
            className={
              (rateState >= i ? "star-filled" : "star-unfilled") +
              " " +
              (changeable ? "cursor-pointer" : "")
            }
            size={size}
          />
        </div>
      );
    }

    return rating;
  };
  return <div className="Rater">{generateRating()}</div>;
}
