import React from "react";
import BarChart from "./components/BarChart";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.NbCaseFR = null;
    this.TotalNbCaseFR = null;
    this.NbCaseALL = null;
    this.TotalNbCaseALL = null;
    this.GetCases = this.GetCases.bind(this);
    this.GetDeath = this.GetDeath.bind(this);
  }

  GetCases(covid_data, jsonQuery) {
    this.NbCaseFR = jsonQuery(
      "records[*countriesAndTerritories=France].cases",
      {
        data: covid_data,
      }
    );
    console.log(this.NbCaseFR);
    this.TotalNbCaseFR = 0;
    for (let i = 0; i < this.NbCaseFR.value.length; i++) {
      this.TotalNbCaseFR += parseInt(this.NbCaseFR.value[i]);
    }
    console.log(this.TotalNbCaseFR);

    this.NbCaseALL = jsonQuery("records[*].cases", {
      data: covid_data,
    });
    console.log(this.NbCaseALL);
    this.TotalNbCaseALL = 0;
    for (let i = 0; i < this.NbCaseALL.value.length; i++) {
      this.TotalNbCaseALL += parseInt(this.NbCaseALL.value[i]);
    }
    console.log(this.TotalNbCaseALL);
  }

  GetDeath(covid_data, jsonQuery) {
    this.NbDeathFR = jsonQuery(
      "records[*countriesAndTerritories=France].deaths",
      {
        data: covid_data,
      }
    );
    console.log(this.NbDeathFR);
    this.TotalNbDeathFR = 0;
    for (let i = 0; i < this.NbDeathFR.value.length; i++) {
      this.TotalNbDeathFR += parseInt(this.NbDeathFR.value[i]);
    }
    console.log(this.TotalNbDeathFR);

    this.NbDeathALL = jsonQuery("records[*].deaths", {
      data: covid_data,
    });
    console.log(this.NbDeathALL);
    this.TotalNbDeathALL = 0;
    for (let i = 0; i < this.NbDeathALL.value.length; i++) {
      this.TotalNbDeathALL += parseInt(this.NbDeathALL.value[i]);
    }
    console.log(this.TotalNbDeathALL);
  }
  render() {
    const covid_data = require("./Covid-19-json.json");
    const jsonQuery = require("json-query");

    this.GetCases(covid_data, jsonQuery);
    this.GetDeath(covid_data, jsonQuery);

    return (
      <div className="App">
        <div className="App-header">
          <h1>COVID-19 Tracker</h1>
        </div>
        <div>
          <h2>Spread of COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"COVID-19 Cases"}
            data={[this.TotalNbCaseFR, this.TotalNbCaseALL]}
            size={[500, 500]}
          />
        </div>
        <div>
          <h2>Death due to COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"Death from COVID-19"}
            data={[this.TotalNbDeathFR, this.TotalNbDeathALL]}
            size={[500, 500]}
          />
        </div>
      </div>
    );
  }
}

export default App;
