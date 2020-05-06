import React, { Component } from "react";
import Chart from "chart.js";

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: ["France", "Worldwide"],
        datasets: [
          {
            label: "Coronavirus Cases",
            data: this.props.data,
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
