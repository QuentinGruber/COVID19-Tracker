import React from "react";
import BarChart from "./components/BarChart";
import "./App.css";

class App extends React.Component {
  render() {
    const covid_data = require("./Covid-19-json.json");
    const jsonQuery = require("json-query");
    console.log(
      jsonQuery("records[*geoId=DZ].cases", {
        data: covid_data,
      })
    );

    var fuck_dz = jsonQuery("records[*geoId=DZ].cases", {
      data: covid_data,
    });

    return (
      <div className="App">
        <div className="App-header">
          <h1>COVID-19 Tracker</h1>
        </div>
        <div>
          <BarChart data={[13, 14]} size={[500, 500]} />
        </div>
      </div>
    );
  }
}

export default App;
