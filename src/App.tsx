import "./App.css";
import "./styles.css";

import React, { useState, useEffect, ChangeEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherForecast from "./components/WeatherForecast";
import WeatherToday from "./components/WeatherToday";
import { formatEpochToUTCDate } from "./utils/DateUtils"; 

interface ForecastEntry {
  dt: number;
  dt_txt: string;
  weather: any;
  main: {
    temp_max: number;
    temp_min: number;
    temp: number;
    feels_like: number;
  };
}

interface City {
  name: string;
  [key: string]: any;
}

interface ResponseJson {
  city: City;
  list: ForecastEntry[];
}

function App() {
  const [activeLink, setActiveLink] = useState<string>("/");

  const [searchValue, setSearchValue] = useState<string>("");

  const [appTitle, setAppTitle] = useState<string>("");
  const [forecasts, setForecasts] = useState<ForecastEntry[]>([]);
  const [groupedForecasts, setGroupedForecasts] = useState<{[key: string]: ForecastEntry[];}>({});
  const [groupedForecastsIndices, setGroupedForecastsIndices] = useState<string[]>([]);

  const apiKey = "b9072fabfcea0a52eeabff31f050bffd";
  const unit = "metric";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=${unit}&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request failed");
        }
        return response.json();
      })
      .then((responseJson: ResponseJson) => {
        updateForecast(responseJson);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the weather fetch operation: ",
          error
        );
        setAppTitle("Please Search For A City");
      });
  });

  function updateForecast(responseJson: ResponseJson) {
    // Update Title
    const city = responseJson.city;
    if (city !== undefined) {
      setAppTitle("Weather in: " + city.name);
    } else {
      setAppTitle("Please Search For A City");
    }

    // Update forecasts
    const list = responseJson.list;
    console.log("WEATHER: " + list[0].weather)
    console.log("CITY: " + responseJson.city)
    setForecasts(list);

    groupForecastByDays(forecasts);
  }

  function groupForecastByDays(forecasts: ForecastEntry[]) {
    const days: { [key: string]: ForecastEntry[] } = {};
    if (forecasts !== undefined) {
      forecasts.forEach((entry) => {
        const day = formatEpochToUTCDate(entry.dt);
        if (!days[day]) {
          days[day] = [];
        }
        days[day].push(entry);
      });
    }

    setGroupedForecastsIndices(Object.keys(days));
    setGroupedForecasts(days);
  }

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const handleSearchValueUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
                    color: activeLink === "/" ? "#000000" : "#ffffff",
                  }}
                >
                  Today's Chart
                </Link>
              </li>
              <li>
                <Link
                  to="/forecast"
                  onClick={() => handleClick("/forecast")}
                  style={{
                    backgroundColor:
                      activeLink === "/forecast" ? "#ffffff" : "#000000",
                    color: activeLink === "/forecast" ? "#000000" : "#ffffff",
                  }}
                >
                  Weather Forecast
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <WeatherToday
                  groupedForecasts={groupedForecasts}
                ></WeatherToday>
              }
            ></Route>
            <Route
              path="/forecast"
              element={
                <WeatherForecast
                  groupedForecastsIndices={groupedForecastsIndices}
                  groupedForecasts={groupedForecasts}
                ></WeatherForecast>
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
