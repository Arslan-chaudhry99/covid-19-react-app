import "./components/style.css";
import { useEffect,  useState } from "react";
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
    let wholeValues = Object.values(covidData);

    for (let i = 2; i < 8; i++) {
      actualValue.push(wholeValues[i].replace(/[+,]/g, ""));
    }
  } else {
   
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
        label: [`Covid-18 ${Country_text}`],

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
  let colors = [
    "#17a2b8",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#dc3545",
    "#dc3545",
  ];
  let graphTxt=Object.keys(covidData)
  
  return (
    <>
      <button
        type="button"
        className="btn btn-warning alig"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{color:"white"}}
      >
        
      <i className="bi bi-bar-chart-line-fill"></i>
      </button>

      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog" style={{margin:"0", padding:"0", height:"60%"}}>
          <div className="modal-content" style={{width:"95vw", margin:"0px",}}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
              
           {
            
             actualValue.map((val,index)=>{
               return(<>
               
                <div className="table_items" style={{float:"left"}}><span className="tab_cir shadow"style={{backgroundColor:`${colors[index]}`}}></span><span>{val ? val:"N/A"}</span></div>
                
               </>)
             })
           }
          
         
         
            </div>
            <span style={{wordBreak:"break-all"}}><strong style={{color:"red"}}>Note:</strong>This is a free API that I have used in this project.<br/> And if you find data blank it's means.Data is not avaiable.<br/> Thanks! Regard Arslan Chaudhry.</span> 
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="total_body">
        <div className="input_part ">
          <input
            type="text"
            className="shadow-lg"
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
          <i className="dptext" style={{ color: "white", fontFamily:"sans-serif" }}>
            {Country_text},LIVE CORONA UPDATE
          </i>
          <div className="spinner-grow text-danger " role="status">
            <span className="sr-only"></span>
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
              <th scope="row" >{Country_text}</th>
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
