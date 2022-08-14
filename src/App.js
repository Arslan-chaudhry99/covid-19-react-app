import "./components/style.css";
import { useEffect, useState } from "react";
import Summery from "./Summery.js";
import Graph from "./Graph";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
// import Summery from "./summery";
function App() {
  let initial = "pakistan";
  let [covidData, setcovidData] = useState("");
  let [desireCountry, setdesireCountry] = useState(initial);
  let [Blur, setBlur] = useState(true);
  let bodyBlur = document.getElementById("total_body");
  const takeAction = () => {
    getData();
  };
  const getData = async () => {
    try {
      const url = `https://covid-19.dataflowkit.com/v1/${desireCountry}`;
      
      setdesireCountry("");
      const covidD = await fetch(url);
      const featchedData = await covidD.json();

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
        alert(
          `${desireCountry} not correct.please Enter a correct country name`
        );
      } else {
        const coronaData = {
          Country_text,
          lastUpdate,
          totalCases,
          recoverCases,
          activeCases,
          newCases,
          deathCases,
          totalDeaths,
          newDeaths,
        };
        setcovidData(coronaData);
      }
    } catch (err) {
      alert(`server not responding`);
      bodyBlur.classList.remove("total_body");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const {
    Country_text,
    lastUpdate,
    totalCases,
    activeCases,
    recoverCases,
    newDeaths,
    newCases,
    totalDeaths,
  } = covidData;
  
  
  let actualValue = [];
 
if (covidData) {
  
 let wholeValues=Object.values(covidData)
 let wholekeys=Object.keys(covidData)
 console.log(wholeValues, wholekeys);
 for (let i = 2; i < wholeValues.length-2; i++) {
  actualValue.push(parseFloat(wholeValues[i].replace(/,/g, '')))
 
  
 }
}
else{
  console.log("not");
}
  const emptyAlert = () => {
    alert("Please Enter your query before continue");
  };
  

  const state = {
    labels: [
      "Total Cases",
      "Recover Cases",
      "Active Cases",
      "New Cases",
      "Total Deaths",
      "New Deaths",
    ],
    datasets: [
      {
        label: `Covid-18 ${Country_text}`,
        label: `Covid-18 ${Country_text}`,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "white",

        data: actualValue,
        backgroundColor: [
          "#17a2b8",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#dc3545",
          "#dc3545",
          "rgba(201, 203, 207, 0.2)",
        ],
        barPercentage: 0.6,
        borderRadius: 2,
      },
    ],
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-info btn-setting shadow"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"

      >
        <i class="bi bi-bar-chart-line-fill"></i>
      </button>

      <div
        class="modal fade bd-example-modal-lg d-pos"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div>
              <Bar
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 30,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
             <span><strong style={{color:"red"}}>Note:</strong>This is a free API that I have used in this project.And if you find data blank it's means.Data is not avaiable. Thanks! Regard Arslan Chaudhry.</span> 
            </div>
          </div>
        </div>
      </div>

      <div id="total_body">
        <div className="input_part">
          <input
            type="text"
            placeholder="Search Your Location"
            value={desireCountry}
            onChange={(e) => {
              setdesireCountry(e.target.value);
            }}
            required
          />
          {desireCountry ? (
            <button onClick={takeAction}>
              <i className="bi bi-search"></i>
            </button>
          ) : (
            <button onClick={emptyAlert}>
              <i className="bi bi-search"></i>
            </button>
          )}
        </div>
        <div className="update">
          <i className="dptext" style={{ color: "white" }}>
            {Country_text},LIVE CORONA UPDATE
          </i>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
        <table className="table " style={{ color: "white" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col w">COUNTRY</th>
              <th scope="col ">Total Cases</th>
              <th scope="col">Active Cases</th>
              <th scope="col">Recover Cases</th>
              <th scope="col">New Cases</th>
              <th scope="col">New Deaths</th>
              <th scope="col">Total Deaths</th>
              <th scope="col">Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            
              <th scope="row">{Country_text}</th>
              <th scope="row">{totalCases === "" ? "N/A" : totalCases}</th>
              <th scope="row">{activeCases === "" ? "N/A" : activeCases}</th>
              <th scope="row">{recoverCases === "" ? "N/A" : recoverCases}</th>
              <th scope="row " className="red">
                {newCases === "" ? "N/A" : newCases}
              </th>
              {/* <th scope="row">{deathCases}</th> */}
              <th scope="row " className="red">
                {newDeaths === "" ? "N/A" : newDeaths}
              </th>
              <th scope="row">{totalDeaths === "" ? "N/A" : totalDeaths}</th>
              <th scope="row">{lastUpdate === "" ? "N/A" : lastUpdate}</th>
            </tr>
          </tbody>
        </table>
        <Summery />
      </div>
    </>
  );
}

export default App;
