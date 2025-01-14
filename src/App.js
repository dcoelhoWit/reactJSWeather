import './App.css';
import "./styles.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherForecast from './components/WeatherForecast';
import WeatherToday from './components/WeatherToday';
import { formatEpochToUTCDate } from './utils/DateUtils.js';

function App() {
  const [activeLink, setActiveLink] = useState('/');

  const [searchValue, setSearchValue] = useState("")

  const [appTitle, setAppTitle] = useState("");
  const [forecasts, setForecasts] = useState([]);
  const [groupedForecasts, setGroupedForecasts] = useState({});
  const [groupedForecastsIndices, setGroupedForecastsIndices] = useState([]);

  const apiKey = "b9072fabfcea0a52eeabff31f050bffd"
  const unit = "metric"

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=${unit}&appid=${apiKey}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("Network request failed");
      }
      return response.json();
    })
    .then(responseJson => {
      updateForecast(responseJson);
    })
    .catch(error => {
      console.error("There was a problem with the weather fetch operation: ", error)
      setAppTitle("Please Search For A City")
    });
  });

  function updateForecast(responseJson) {
    // Update Title
    const city = responseJson.city
    if(city!==undefined) {
      setAppTitle("Weather in: " + city.name)
    } else {
      setAppTitle("Please Search For A City")
    }

    // Update forecasts
    const list = responseJson.list
    setForecasts(list)
    
    groupForecastByDays()
  }

  function groupForecastByDays() {
      const days = {};
      if(forecasts !== undefined) { 
          forecasts.forEach(entry => {
              const day = formatEpochToUTCDate(entry.dt)
              if (!days[day]) {
                  days[day] = [];
                  
              }
              days[day].push(entry);
          });
      }
      
      setGroupedForecastsIndices(Object.keys(days));
      setGroupedForecasts(days);
      
  }

  const handleClick = (path) => {
     setActiveLink(path); 
  };

  const handleSearchValueUpdate = (e) => {
    setSearchValue(e.target.value)
  };

  return (
    <div className="App">
      <div className="container">
        <br></br>
        <h2>{appTitle}</h2>
        <input
              type="text"
              className="search-input"
              placeholder="Search city..."
              value={searchValue}
              onChange={handleSearchValueUpdate}
          />
        <Router>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/"
                  onClick={() => handleClick("/")}
                  style={{ 
                    backgroundColor: activeLink === "/" ? "#ffffff" : "#000000",
                    color: activeLink === "/" ? "#000000" : "#ffffff"
                  }}>
                    Today's Chart
                </Link>
              </li>
              <li>
                <Link 
                  to="/forecast"
                  onClick={() => handleClick("/forecast")}
                  style={{ 
                    backgroundColor: activeLink === "/forecast" ? "#ffffff" : "#000000",
                    color: activeLink === "/forecast" ? "#000000" : "#ffffff"
                  }}>
                    Weather Forecast
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<WeatherToday groupedForecasts={groupedForecasts}></WeatherToday>}></Route>
            <Route path="/forecast" element={<WeatherForecast groupedForecastsIndices={groupedForecastsIndices} groupedForecasts={groupedForecasts}></WeatherForecast>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
