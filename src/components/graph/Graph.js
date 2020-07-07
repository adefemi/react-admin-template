import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

export default function Graph({
  chartType,
  labels,
  datasets,
  options,
  width,
  height,
  className
}) {
  const data = {
    labels: labels,
    datasets: datasets
  };

  const NewT = chartType;

  return (
    <div className={className}>
      <NewT data={data} options={options} width={width} height={height} />
    </div>
  );
}

Graph.propTypes = {
  chartType: PropTypes.func,
  labels: PropTypes.array,
  datasets: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

Graph.defaultProps = {
  chartType: Line
};
