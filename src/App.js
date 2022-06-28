import "./components/style.css";
import { useEffect, useState } from "react";
function App() {
  const[covidData,setcovidData]=useState("")
  const[desireCountry,setdesireCountry]=useState("pakistan")
  const getData= async ()=>{
    const url=`https://covid-19.dataflowkit.com/v1/${desireCountry}`
    setdesireCountry('')
    const covidData= await fetch(url);
    const featchedData=await covidData.json()
    // destruing of object
    const{ Country_text,['Last Update']:lastUpdate,['Total Cases_text']:totalCases,['Total Deaths_text']:deathCases,['Total Recovered_text']:recoverCases,['New Deaths_text']:newDeaths}=featchedData
    // use to check if country exist or not
    if(Country_text==="World"){
      alert("Country name not correct.please Enter a correct country name")
    }
    else{
      const coronaData={
        Country_text,
        lastUpdate,
        totalCases,
        deathCases,
        recoverCases,
        newDeaths
      };
      setcovidData(coronaData)
    }
    

  };
  useEffect(()=>{
    getData()
  },[]);
  const{Country_text,lastUpdate,totalCases,deathCases,recoverCases,newDeaths}=covidData
  
  return (
    <>
    
      <div className="input_part">
        <div className="input_part_main">
        <input type="text" placeholder="Search Your Location" value={desireCountry} onChange={(e)=>{setdesireCountry(e.target.value)}} />
        <button onClick={getData}>
          {/* <i className="bi bi-search"></i> */}
          /
        </button>
        </div>
      </div>
      <div className="update">
        <h4>{Country_text},LIVE CORONA UPDATE</h4>
        <div className="redlight"></div>
      </div>
      <div className="row wid">
        <div className="col-sm-4">
          <div className="card p-0 m-0 bg-dark text-white data">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0"> COUNTRY</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{Country_text}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-4 ">
          <div className="card p-0 m-0 bg-dark text-white">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0">Total Cases</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{totalCases}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-4 ">
          <div className="card p-0 m-0 bg-dark text-white">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0">Last Update</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{lastUpdate}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row wid">
        <div className="col-sm-4 ">
          <div className="card p-0 m-0 bg-dark text-white">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0">Death Cases</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{deathCases}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-4 ">
          <div className="card p-0 m-0 bg-dark text-white">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0">Recover Cases</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{recoverCases}</h1>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-4 ">
          <div className="card p-0 m-0 bg-dark text-white">
            <div className="card-body m-0 p-0">
              <h3 className="card-title text-center m-0">New Deaths</h3>
              <hr className="m-1 p-0 bg-white" />
              <h1 className="text-center m-0 p-0">{newDeaths}</h1>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default App;
