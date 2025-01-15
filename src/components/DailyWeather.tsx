import "../styles.css";

import React from "react";
import WeatherCard from "./WeatherCard";
import { formatEpochToUTCTime } from "../utils/DateUtils";

interface DailyWeatherProps {
  day: string;
  forecasts: ForecastEntry[];
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ day, forecasts }) => {
  return (
    <div>
      <h1>{day}</h1>
      <br />
      <div className="grid">
        {forecasts.map((forecastEntry) => (
          <WeatherCard
            key={forecastEntry.dt_txt}
            time={formatEpochToUTCTime(forecastEntry.dt)}
            weather={forecastEntry.weather}
            maxTemp={forecastEntry.main.temp_max}
            minTemp={forecastEntry.main.temp_min}
          />
        ))}
      </div>
    </div>
  );
}

export default DailyWeather