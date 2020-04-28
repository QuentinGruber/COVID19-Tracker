import React from "react";
import BarChart from "./components/BarChart";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>COVID-19 Tracker</h1>
      </div>
      <div>
        <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
      </div>
    </div>
  );
}

export default App;
