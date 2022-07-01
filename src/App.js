import "./components/style.css";
import { useEffect, useState } from "react";
import Summery from "./Summery.js";
// import Summery from "./summery";
function App() {
  const [covidData, setcovidData] = useState("");
  const [desireCountry, setdesireCountry] = useState("pakistan");
  const getData = async () => {
    try {
      const url = `https://covid-19.dataflowkit.com/v1/${desireCountry}`;
    setdesireCountry("");
    const covidData = await fetch(url);
    const featchedData = await covidData.json();
    
    // destruing of object
    const {
      Country_text,
      ["Last Update"]: lastUpdate,
      ["Total Cases_text"]: totalCases,
      ["Total Deaths_text"]: deathCases,
      ["Total Recovered_text"]: recoverCases,
      ["New Deaths_text"]: newDeaths,
      ["Active Cases_text"]: activeCases,
      ["New Cases_text"]: newCases,
      ["Total Deaths_text"]: totalDeaths,
    } = featchedData;
    // use to check if country exist or not
    if (Country_text === "World") {
      alert("Country name not correct.please Enter a correct country name");
    } else {
      const coronaData = {
        Country_text,
        lastUpdate,
        totalCases,
        deathCases,
        recoverCases,
        newDeaths,
        activeCases,
        newCases,
        totalDeaths,
      };
      setcovidData(coronaData);
    }
    }
    catch(err) {
      alert(`server not responding`)
    }
    
  };
  useEffect(() => {
    getData();
  }, []);
  const {
    Country_text,
    lastUpdate,
    totalCases,
    deathCases,
    recoverCases,
    newDeaths,
    activeCases,
    newCases,
    totalDeaths,
  } = covidData;

  return (
    <>
    <div className="">
      <div className="input_part">
        <div className="input_part_main">
          <input
            type="text"
            placeholder="Search Your Location"
            value={desireCountry}
            onChange={(e) => {
              setdesireCountry(e.target.value);
            }}
          />
          <button onClick={getData}>
            {/* <i className="bi bi-search"></i> */}/
          </button>
        </div>
      </div>
      <div className="update">
        <h4>{Country_text},LIVE CORONA UPDATE</h4>
        <div className="redlight"></div>
      </div>
      <table className="table flow">
        <thead className="thead-dark ">
          <tr className="">
            <th scope="col ">COUNTRY</th>
            <th scope="col ">Total Cases</th>
            <th scope="col">Active Cases</th>
            <th scope="col">Recover Cases</th>
            <th scope="col">New Cases</th>
            <th scope="col">New Death Cases</th>
            <th scope="col">Total Deaths</th>
            <th scope="col">Last Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{Country_text}</th>
            <th scope="row">{totalCases}</th>
            <th scope="row">{activeCases}</th>
            <th scope="row">{recoverCases}</th>
            <th scope="row " className="red">
              {newCases}
            </th>
            {/* <th scope="row">{deathCases}</th> */}
            <th scope="row " className="red">
              {newDeaths}
            </th>
            <th scope="row">{totalDeaths}</th>
            <th scope="row">{lastUpdate}</th>
          </tr>
        </tbody>
      </table>
      <Summery/>
      </div>
    </>
  );
}

export default App;
