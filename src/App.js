import React from "react";
import BarChart from "./components/BarChart";
import StackedBarchart from "./components/StackedBarChart";
import "./App.css";
import jsonQuery from "json-query";
import LineChart from "./components/LineChart";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.covid_data = require("./data/Covid-19-json.json");
    this.NbCaseFR = null;
    this.TotalNbCaseFR = null;
    this.NbCaseALL = null;
    this.TotalNbCaseALL = null;
    this.GetCases = this.GetCases.bind(this);
    this.GetDeath = this.GetDeath.bind(this);
    this.GetFRCasesFrom = this.GetFRCasesFrom.bind(this);
  }

  GetFRCasesFrom(Month, Year = 2020) {
    var FRdataForMonth_unordonized = jsonQuery(
      "records[*countriesAndTerritories=France & month= " +
        Month +
        " & year= " +
        Year +
        " ]",
      {
        data: this.covid_data,
      }
    );

    var FRdataForMonth = [];
    for (let i = 0; i < FRdataForMonth_unordonized.value.length; i++) {
      FRdataForMonth.unshift(FRdataForMonth_unordonized.value[i]);
    }
    return FRdataForMonth;
  }

  GetCases() {
    this.NbCaseFR = jsonQuery(
      "records[*countriesAndTerritories=France].cases",
      {
        data: this.covid_data,
      }
    );
    this.TotalNbCaseFR = 0;
    for (let i = 0; i < this.NbCaseFR.value.length; i++) {
      this.TotalNbCaseFR += parseInt(this.NbCaseFR.value[i]);
    }

    this.NbCaseALL = jsonQuery("records[*].cases", {
      data: this.covid_data,
    });
    this.TotalNbCaseALL = 0;
    for (let i = 0; i < this.NbCaseALL.value.length; i++) {
      this.TotalNbCaseALL += parseInt(this.NbCaseALL.value[i]);
    }
  }

  GetDeath() {
    this.NbDeathFR = jsonQuery(
      "records[*countriesAndTerritories=France].deaths",
      {
        data: this.covid_data,
      }
    );
    this.TotalNbDeathFR = 0;
    for (let i = 0; i < this.NbDeathFR.value.length; i++) {
      this.TotalNbDeathFR += parseInt(this.NbDeathFR.value[i]);
    }

    this.NbDeathALL = jsonQuery("records[*].deaths", {
      data: this.covid_data,
    });
    this.TotalNbDeathALL = 0;
    for (let i = 0; i < this.NbDeathALL.value.length; i++) {
      this.TotalNbDeathALL += parseInt(this.NbDeathALL.value[i]);
    }
  }
  render() {
    this.GetCases();
    this.GetDeath();
    var Jan_data = this.GetFRCasesFrom(1);
    var jan_data_date = [];
    var jan_data_cases = [];
    for (let i = 0; i < Jan_data.length; i++) {
      jan_data_date.push(Jan_data[i].dateRep);
      jan_data_cases.push(Jan_data[i].cases);
    }
    var Feb_data = this.GetFRCasesFrom(2);
    var Feb_data_date = [];
    var Feb_data_cases = [];

    for (let i = 0; i < Feb_data.length; i++) {
      Feb_data_date.push(Feb_data[i].dateRep);
      Feb_data_cases.push(Feb_data[i].cases);
    }
    var Mar_data = this.GetFRCasesFrom(3);
    var Mar_data_date = [];
    var Mardata_cases = [];

    for (let i = 0; i < Mar_data.length; i++) {
      Mar_data_date.push(Mar_data[i].dateRep);
      Mardata_cases.push(Mar_data[i].cases);
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1>COVID-19 Tracker</h1>
        </div>

        <div>
          <h2>Case of COVID-19 in France between 1/1/2020 and 31/3/2020</h2>
          <LineChart
            datalabel={"COVID-19 Cases"}
            data_date={jan_data_date.concat(Feb_data_date)}
            data={jan_data_cases.concat(Feb_data_cases)}
            color_cases={"#cb24f0"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Spread of COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"COVID-19 Cases"}
            data={[this.TotalNbCaseFR, this.TotalNbCaseALL]}
            color={"#cb24f0"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Death due to COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"Death from COVID-19"}
            data={[this.TotalNbDeathFR, this.TotalNbDeathALL]}
            color={"#ff0000"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Death & Cases of COVID-19 on March 31, 2020</h2>
          <StackedBarchart
            datalabel={"COVID-19 Cases"}
            data={{
              TotalNbCaseFR: this.TotalNbCaseFR,
              TotalNbCaseALL: this.TotalNbCaseALL,
              TotalNbDeathFR: this.TotalNbDeathFR,
              TotalNbDeathALL: this.TotalNbDeathALL,
            }}
            color_cases={"#cb24f0"}
            color_deaths={"#ff0000"}
            size={[500, 500]}
          />
        </div>
      </div>
    );
  }
}

export default App;
