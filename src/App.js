import './App.css';
import "./styles.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherForecast from './components/WeatherForecast';
import WeatherToday from './components/WeatherToday';
import APIContext from './context/APIContext';

function App() {
  const [activeLink, setActiveLink] = useState('/');
  const [searchValue, setSearchValue] = useState("")

  const handleClick = (path) => {
     setActiveLink(path); 
  };

  const handleSearchValueUpdate = (e) => {
    setSearchValue(e.target.value)
  };

  return (
    <div className="App">
      <APIContext.Provider value={{apiKey: "b9072fabfcea0a52eeabff31f050bffd", unit: "metric"}}>
        <div className="container">
          <br></br>
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
                      Weather Forecast
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/today"
                    onClick={() => handleClick("/today")}
                    style={{ 
                      backgroundColor: activeLink === "/today" ? "#ffffff" : "#000000",
                      color: activeLink === "/today" ? "#000000" : "#ffffff"
                    }}>
                      Today's Chart
                  </Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<WeatherForecast city={searchValue}></WeatherForecast>}></Route>
              <Route path="/today" element={<WeatherToday city={searchValue}></WeatherToday>}></Route>
            </Routes>
          </Router>
        </div>
      </APIContext.Provider>
    </div>
  );
}

export default App;
