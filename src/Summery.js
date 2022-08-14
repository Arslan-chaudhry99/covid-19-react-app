import "./components/style.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function Summery() {
  const [userInput, setuserInput] = useState("");
  const [getnewData, setgetNewData] = useState([]);
  const [desireValue, setdesireValue] = useState([]);
const [More, setMore]=useState(15)
const [Leng,setLeng]=useState()
const moveTop=()=>{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}
let bodyBlur=document.getElementById("total_body")

let moreNow=()=>{
  let seeMore=More+10
  setMore(seeMore)
  sumery()
    bodyBlur.classList.add("total_body")
    
  
  
}
  const sumery = async () => {
    try {

      const response = await fetch(`https://api.covid19api.com/summary`);
      const data = await response.json();
      setLeng(data.Countries.length)
      let sli=data.Countries.slice(0,More)
      setgetNewData(sli);
      bodyBlur.classList.remove("total_body")
    } catch (error) {
      console.log("not po");
    }
  };

  useEffect(() => {
    sumery();
  }, []);
  return (
    <>
      <table className="table " style={{color:"white"}}>
        <thead className="thead-dark">
          <tr>
            <th scope="col ">#</th>
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
          {getnewData.map((e, index) => {
            return (
              <>
                <tr>
                  <th scope="row">{1 + index}</th>
                  <th scope="row">{e.Country === "" ? "N/A" : e.Country}</th>
                  <th scope="row">
                    {e.NewConfirmed === "" ? "N/A" : e.NewConfirmed}
                  </th>
                  <th scope="row">
                    {e.NewDeaths === "" ? "N/A" : e.NewDeaths}
                  </th>
                  <th scope="row">
                    {e.NewRecovered === "" ? "N/A" : e.NewRecovered}
                  </th>
                  <th scope="row " className="red">
                    {e.TotalConfirmed === "" ? "N/A" : e.TotalConfirmed}
                  </th>
                  <th scope="row " className="red">
                    {e.TotalDeaths === "" ? "N/A" : e.TotalDeaths}
                  </th>
                  <th scope="row">
                    {e.TotalRecovered === "" ? "N/A" : e.TotalRecovered}
                  </th>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {
        
        Leng >= More ? <button className="btn btn-warning shadow  float-end data-bs-toggle={{popover}} data-bs-trigger={{hover focus}}" onClick={moreNow}>See more</button>:<button className="btn btn-warning shadow  float-end" onClick={moveTop}><i class="bi bi-arrow-up-circle-fill"></i></button>
      }
     
    </>
  );
}

export default Summery;
