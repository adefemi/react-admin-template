import React, { useContext, useEffect, useState } from "react";
import "./globalLoader.scss";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { store } from "../../stateManagement/store";

function GlobalLoader(props) {
  const [loader, setLoading] = useState({});
  const {
    state: { globalLoader }
  } = useContext(store);
  useEffect(() => {
    setLoading(globalLoader);
  }, [globalLoader]);
  return (
    <div className={`global-loader ${loader.status ? "show" : ""}`}>
      <div className="inner-loader">
        <Spinner size={15} color={secondaryColor} />
        <div className="context">{loader.content}</div>
      </div>
    </div>
  );
}

export default GlobalLoader;
