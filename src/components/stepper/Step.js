import React, { Fragment } from "react";

export function Step({ active, step = 1, value = "" }) {
  let activeStatus = active ? " active " : "";

  return (
    <Fragment>
      <div className="dflex">
        <button className={"outline-btn-primary btn-page-nav" + activeStatus}>
          {step}
        </button>
        <div>{value}</div>
      </div>
    </Fragment>
  );
}
