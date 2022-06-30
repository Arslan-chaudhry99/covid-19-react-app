import "./components/style.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";
function Summery() {
  const [userInput, setuserInput] = useState("");
  const [newData, setnewData] = useState([]);
  const [desireValue, setdesireValue] = useState();

  const sumery = async () => {
    try {
      const response = await fetch(`https://api.covid19api.com/summary`);
      const data = await response.json();
      setnewData(data.Countries)
      console.log(data.Countries);
    } catch (error) {
      console.log("not po");
    }
  };
  
  useEffect(() => {
    sumery();
    
  }, []);
  return (
    <>
      <div className="input_part">
        <div className="input_part_main">
          <input
            type="text"
            placeholder="Search In covid summery"
            value={userInput}
            onChange={(e) => {
              setuserInput(e.target.value);
            }}
          />
          <button>{/* <i className="bi bi-search"></i> */}/</button>
        </div>
      </div>
      <table className="table ">
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
             newData.map((e,index)=>{
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
      
    </>
  );
}

export default Summery;
