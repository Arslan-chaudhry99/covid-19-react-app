import "./components/style.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function Summery() {
  const [userInput, setuserInput] = useState("");
  const [getnewData, setgetNewData] = useState([]);
  const [desireValue, setdesireValue] = useState([]);
  
  const filterNow=()=>{
    console.log(
      
      getnewData.filter((e)=>{
      return e.Country === "pakistan"
      

       
         
      }),
     
    );
     
      
    
    
  }


  const sumery = async () => {
    try {
      const response = await fetch(`https://api.covid19api.com/summary`);
      const data = await response.json();
      setgetNewData(data.Countries)
    } catch (error) {
      console.log("not po");
    }
  };
  
  useEffect(() => {
    sumery();
    
  }, []);
  return (
    <>
    <div className="">
      <div className="input_part">
        <div className="input_part_main">
          {/* <input
            type="text"
            placeholder="Search In covid summery"
            value={userInput}
            onChange={(e) => {
              setuserInput(e.target.value);
            }}
          /> */}
          {/* <button onClick={filterNow}><i className="bi bi-search"></i>/</button> */}
        </div>
      </div>
      <table className="table flow">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NO#</th>
            <th scope="col">Country</th>
            <th scope="col">New Confirmed</th>
            <th scope="col">New Deaths</th>
            <th scope="col">New Recovered</th>
            <th scope="col">Total Confirmed</th>
            <th scope="col">Total Deaths</th>
            <th scope="col">Total Recovered</th>
          </tr>
        </thead>
        <tbody>
          
            {
             getnewData.map((e,index)=>{
              return(
                <>
                <tr>
                <th scope="row">{1+index}</th>
                <th scope="row">{e.Country}</th>
                <th scope="row">{e.NewConfirmed}</th>
                <th scope="row">{e.NewDeaths}</th>
                <th scope="row">{e.NewRecovered}</th>
            <th scope="row " className="red">{e.TotalConfirmed}</th>
            <th scope="row " className="red">{e.TotalDeaths}</th>
            <th scope="row">{e.TotalRecovered}</th>
            </tr>
            </>
              )

             })
            }
            
          
        </tbody>
      </table>
      </div>
    </>
  );
}

export default Summery;
