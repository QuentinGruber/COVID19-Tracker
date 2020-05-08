import React from "react";
import BarChart from "./components/BarChart";
import StackedBarchart from "./components/StackedBarChart";
import "./App.css";
import jsonQuery from "json-query";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.country_continent = require("./data/Country-continent.json");
    this.covid_data = require("./data/Covid-19-json.json");
    this.GetCases = this.GetCases.bind(this);
    this.GetDeath = this.GetDeath.bind(this);
    this.GetDeathsBetweenDates = this.GetDeathsBetweenDates.bind(this);
    this.GetDateRepBetweenDates = this.GetDateRepBetweenDates.bind(this);
    this.GetCasesBetweenDates = this.GetCasesBetweenDates.bind(this);
    this.GetCasesFrom = this.GetCasesFrom.bind(this);
    this.GetForContinent = this.GetForContinent.bind(this);
  }

  GetDateRepBetweenDates(Country, Month1, Month2) {
    let DateRep = [];
    for (let j = 0; j <= Month2 - Month1; j++) {
      let month_data = this.GetCasesFrom(Country, Month1 + j);
      for (let i = 0; i < month_data.length; i++) {
        DateRep.push(month_data[i].dateRep);
      }
    }
    return DateRep;
  }

  GetCasesBetweenDates(Country, Month1, Month2) {
    let Cases = [];
    for (let j = 0; j <= Month2 - Month1; j++) {
      let month_data = this.GetCasesFrom(Country, Month1 + j);
      for (let i = 0; i < month_data.length; i++) {
        Cases.push(month_data[i].cases);
      }
    }
    return Cases;
  }

  GetDeathsBetweenDates(Country, Month1, Month2) {
    let Deaths = [];
    for (let j = 0; j <= Month2 - Month1; j++) {
      let month_data = this.GetCasesFrom(Country, Month1 + j);
      for (let i = 0; i < month_data.length; i++) {
        Deaths.push(month_data[i].deaths);
      }
    }
    return Deaths;
  }

  GetCasesFrom(Country, Month, Year = 2020) {
    var dataForMonth_unordonized = jsonQuery(
      "records[*countriesAndTerritories=" +
        Country +
        " & month= " +
        Month +
        " & year= " +
        Year +
        " ]",
      {
        data: this.covid_data,
      }
    );

    var dataForMonth = [];
    for (let i = 0; i < dataForMonth_unordonized.value.length; i++) {
      dataForMonth.unshift(dataForMonth_unordonized.value[i]);
    }
    return dataForMonth;
  }

  GetForContinent(what, Continent) {
    let Country_on_continent = jsonQuery(
      "[*continent=" + Continent + "].country",
      {
        data: this.country_continent,
      }
    ).value;

    if (what == "cases") {
      let Total_cases_continent = 0;
      Country_on_continent.forEach((element) => {
        Total_cases_continent += this.GetCases(element);
      });
      return Total_cases_continent;
    } else if (what == "deaths") {
      let Total_cases_continent = 0;
      Country_on_continent.forEach((element) => {
        Total_cases_continent += this.GetDeath(element);
      });
      return Total_cases_continent;
    } else {
      console.error("Unknow 'what' value !");
    }
  }

  GetCases(Country) {
    let NbCase;
    if (Country === "All") {
      NbCase = jsonQuery("records[*].cases", {
        data: this.covid_data,
      });
    } else {
      NbCase = jsonQuery(
        "records[*countriesAndTerritories=" + Country + "].cases",
        {
          data: this.covid_data,
        }
      );
    }
    let TotalNbCase = 0;
    for (let i = 0; i < NbCase.value.length; i++) {
      TotalNbCase += parseInt(NbCase.value[i]);
    }
    return TotalNbCase;
  }

  GetDeath(Country) {
    let NbDeath;
    if (Country === "All") {
      NbDeath = jsonQuery("records[*].deaths", {
        data: this.covid_data,
      });
    } else {
      NbDeath = jsonQuery(
        "records[*countriesAndTerritories=" + Country + "].deaths",
        {
          data: this.covid_data,
        }
      );
    }
    let TotalNbDeath = 0;
    for (let i = 0; i < NbDeath.value.length; i++) {
      TotalNbDeath += parseInt(NbDeath.value[i]);
    }
    return TotalNbDeath;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>COVID-19 Tracker</h1>
        </div>

        <div>
          <h2>TODO</h2>
          <PieChart
            datalabel={"COVID-19 Cases"}
            data={{
              Asia: 1,
              Africa: 2,
              Europe: 3,
              South_America: 4,
              North_America: 5,
              Oceania: 6,
            }}
            color={[
              "#FC7889",
              "#9f7a42",
              "#a3acff",
              "#f79862",
              "#fe7d6a",
              "#66cccc",
            ]}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Spread of COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"COVID-19 Cases"}
            data={[this.GetCases("France"), this.GetCases("All")]}
            color={"#cb24f0"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Death due to COVID-19 on March 31, 2020</h2>
          <BarChart
            datalabel={"Death from COVID-19"}
            data={[this.GetDeath("France"), this.GetDeath("All")]}
            color={"#ff0000"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Death & Cases of COVID-19 on March 31, 2020</h2>
          <StackedBarchart
            datalabel={"COVID-19 Cases"}
            data={{
              TotalNbCaseFR: this.GetCases("France"),
              TotalNbCaseALL: this.GetCases("All"),
              TotalNbDeathFR: this.GetDeath("France"),
              TotalNbDeathALL: this.GetDeath("All"),
            }}
            color_cases={"#cb24f0"}
            color_deaths={"#ff0000"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>Case of COVID-19 in France between 1/1/2020 and 31/3/2020</h2>
          <LineChart
            datalabel={"COVID-19 Cases"}
            data_date={this.GetDateRepBetweenDates("France", 1, 3)}
            data={this.GetDeathsBetweenDates("France", 1, 3)}
            color={"#ff0000"}
            size={[500, 500]}
          />
        </div>

        <div>
          <h2>
            Death due to COVID-19 in France between 1/1/2020 and 31/3/2020
          </h2>
          <LineChart
            datalabel={"COVID-19 Cases"}
            data_date={this.GetDateRepBetweenDates("France", 1, 3)}
            data={this.GetCasesBetweenDates("France", 1, 3)}
            color={"#cb24f0"}
            size={[500, 500]}
          />
        </div>
      </div>
    );
  }
}

export default App;
