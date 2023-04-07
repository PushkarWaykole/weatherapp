// api.openweathermap.org/data/2.5/weather?q=mumbai&appid=6e8bb5dbcdfd3c4f57f3859046377344

import React,{useState,useEffect} from 'react';
import "./style.css";
import Weathercard from './Weathercard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("mumbai");

    const [tempInfo, setTempInfo] = useState("");
    const getWeatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6e8bb5dbcdfd3c4f57f3859046377344`;

            let response=await fetch(url);

            let data=await response.json();

            const {temp,humidity,pressure}=data.main;
            const { main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;
            
            const myNewWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            
            setTempInfo(myNewWeatherInfo);
            console.log(myNewWeatherInfo);

        } catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
          <div className="wrap">
              <div className="search">
                  <input type="search" 
                  placeholder="Search"
                  autoFocus
                  id="search"
                  className="searchTerm"
                  value={searchValue}
                  onChange={(e)=>setSearchValue(e.target.value)}
                  />

                  <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>

              </div>
          </div>

          <Weathercard tempInfo={tempInfo}/>
 
        </>
    )
}

export default Temp;
